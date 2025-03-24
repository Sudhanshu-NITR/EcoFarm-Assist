import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import UserModel from "../../../model/Users.model";

const PROJECT_ID = process.env.GCP_PROJECT_ID!;
const REGION = process.env.GCP_REGION!;
const ENDPOINT_ID = process.env.VERTEX_ENDPOINT_ID_CROP_REC!;
const ACCESS_TOKEN = process.env.GCP_ACCESS_TOKEN_CROP_REC!;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 300,
    responseMimeType: "text/plain",
};

const labelMap: { [key: number]: string } = {
    0: "apple", 1: "banana", 2: "blackgram", 3: "chickpea", 4: "coconut",
    5: "coffee", 6: "cotton", 7: "grapes", 8: "jute", 9: "kidneybeans",
    10: "lentil", 11: "maize", 12: "mango", 13: "mothbeans", 14: "mungbean",
    15: "muskmelon", 16: "orange", 17: "papaya", 18: "pigeonpeas", 19: "pomegranate",
    20: "rice", 21: "watermelon"
};

export async function POST(req: NextRequest) {
    dbConnect();
    try {
        const { instances, user } = await req.json();
        const userId = new mongoose.Types.ObjectId(user);

        if (!instances || !Array.isArray(instances) || instances.length === 0) {
            return NextResponse.json(
                new ApiResponse(400, "Invalid input: 'instances' is required"),
                { status: 400 }
            );
        }
        
        const vertexAiUrl = `https://${REGION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${REGION}/endpoints/${ENDPOINT_ID}:predict`;
        // console.log(vertexAiUrl);
        
        const vertexResponse = await axios.post(vertexAiUrl, { instances }, {
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
        });
    
        const predictedLabel = vertexResponse.data.predictions?.[0] ?? null;

        if (predictedLabel === null || !(predictedLabel in labelMap)) {
            return NextResponse.json(
                new ApiResponse(500, "Prediction error: No valid crop found"),
                { status: 500 }
            );
        }

        const cropName = labelMap[predictedLabel];
        
        const userMessage = `
            You are an expert agricultural advisor. Given the soil and climate conditions, justify why a specific crop is recommended.

            ### **Input Conditions:**  
            - **Nitrogen (N):** ${instances[0][0]}
            - **Phosphorus (P):** ${instances[0][1]}
            - **Potassium (K):** ${instances[0][2]}
            - **Soil pH:** ${instances[0][3]}
            - **Temperature:** ${instances[0][4]}°C
            - **Humidity:** ${instances[0][5].humidity}%
            - **Rainfall:** ${instances[0][6]} mm  

            ### **ML Model Prediction:**  
            - **Recommended Crop:** ${cropName}  

            ### **Task:**  
            Provide a short, science-backed explanation (under **50 words**) on why **${cropName}** is the best crop for these conditions. Keep it concise and easy to understand for farmers.
        `;
        
        const chatSession = model.startChat({ generationConfig, history: [] });
        const resultStream = await chatSession.sendMessageStream(userMessage);

        const stream = new ReadableStream({
            async start(controller) {
                controller.enqueue(new TextEncoder().encode(`{"crop": "${cropName}", "explanation": "`));
        
                let details = "";
        
                for await (const chunk of resultStream.stream) {
                    const text = chunk.text();
                    details += text; 
                    controller.enqueue(new TextEncoder().encode(text));
                }
        
                controller.enqueue(new TextEncoder().encode(`"}`));
                controller.close();
        
                try {
                    const user = await UserModel.findByIdAndUpdate(
                        userId,
                        {
                            $set: {
                                "latestAdvice.crop": cropName,
                                "latestAdvice.details": details.trim()
                            }
                        },
                        { new: true }
                    );
                    console.log("Database updated successfully. ", user);
                } catch (error) {
                    console.error("Error updating the database:", error);
                }
            },
        });
        
        
        return new Response(stream, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Transfer-Encoding": "chunked",
            },
        });

    } catch (error: any) {
        console.error("Error in Prediction & Explanation: ", error.response?.data || error.message);

        return NextResponse.json(
            new ApiResponse(500, "Prediction & Explanation failed"),
            { status: 500 }
        );
    }
}
