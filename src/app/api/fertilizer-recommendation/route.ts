import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dbConnect from "@/lib/dbConnect";
import getAccessToken from "@/utils/google-access-token";

const PROJECT_ID = process.env.GCP_PROJECT_ID!;
const REGION = process.env.GCP_REGION!;
const ENDPOINT_ID = process.env.VERTEX_ENDPOINT_ID_FER_REC!;
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

export async function POST(req: NextRequest) {
    dbConnect();
    try {
        const { instances } = await req.json();
        // const userId = new mongoose.Types.ObjectId(user);
        const ACCESS_TOKEN = await getAccessToken();
        console.log(instances);
        
        if (!instances) {
            return NextResponse.json(
                new ApiResponse(400, "Invalid input: 'instances' is required"),
                { status: 400 }
            );
        }
        
        const vertexAiUrl = `https://${REGION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${REGION}/endpoints/${ENDPOINT_ID}:predict`;
        
        const vertexResponse = await axios.post(vertexAiUrl, instances, {
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
        });
    
        const predictedFertilizer = vertexResponse.data.predictions?.fertilizer_name ?? null;
        console.log(predictedFertilizer);
        
        if (predictedFertilizer === null) {
            return NextResponse.json(
                new ApiResponse(500, "Prediction error: No valid fertilizer found"),
                { status: 500 }
            );
        }
        
        const userMessage = `
            You are an expert agricultural advisor. Given the soil nutrient levels and crop requirements, justify why a specific fertilizer is recommended.

            ### Input Conditions:  
            - Nitrogen (N): ${instances.Nitrogen}  
            - Phosphorus (P): ${instances.Phosphorus}  
            - Potassium (K): ${instances.Potassium} 
            - Soil Moisture : ${instances.Moisture}  
            - Carbon (C): ${instances.Moisture}  
            - Crop Type: ${instances.Crop}  
            - Soil Type: ${instances.Soil}  
            - Temperature (C): ${instances.Temperature}  
            - Rainfall (mm): ${instances.Rainfall}  

            ### ML Model Prediction:  
            - Recommended Fertilizer: ${predictedFertilizer}  

            ### Task:  
            Provide a short, science-backed explanation (under 50 words) on why **${predictedFertilizer}** is the best choice for **${instances.Crop}** under these soil & weather conditions. Keep it concise and easy to understand for farmers.
        `;
        
        const chatSession = model.startChat({ generationConfig, history: [] });
        const resultStream = await chatSession.sendMessageStream(userMessage);

        let explanation = "";

        for await (const chunk of resultStream.stream) {
            explanation += chunk.text();
        }

        return NextResponse.json({
            fertilizer: predictedFertilizer,
            explanation: explanation.trim(),
        });

    } catch (error: any) {
        console.error("Error in Prediction & Explanation: ", error.response?.data || error.message);

        return NextResponse.json(
            new ApiResponse(500, "Prediction & Explanation failed"),
            { status: 500 }
        );
    }
}
