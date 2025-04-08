import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
    try {
        const { instances } = await req.json();
        console.log(instances);
        
        if (!instances) {
            return NextResponse.json(
                new ApiResponse(400, "Invalid input: 'instances' is required"),
                { status: 400 }
            );
        }
        
        const apiURL = `https://fertilizer-prediction-app.onrender.com/predict`;
        
        const apiResponse = await axios.post(apiURL, instances, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    
        const predictedFertilizer = apiResponse.data.predicted_fertilizer ?? null;
        
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
            - Carbon (C): ${instances.Carbon}  
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
