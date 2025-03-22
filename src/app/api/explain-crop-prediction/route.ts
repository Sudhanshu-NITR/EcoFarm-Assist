import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/types/ApiResponse";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 300,
    responseMimeType: "text/plain",
};



export default async function POST(req: Request){
    try {
        const { crop, data } = await req.json();
        if (!crop || !data) {
            return new Response(JSON.stringify({ success: false, error: "Crop Recommendation & Soil data is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const userMessage = `
            You are an expert agricultural advisor. Given the soil and climate conditions, justify why a specific crop is recommended.  

            ### **Input Conditions:**  
            - **Nitrogen (N):** 50  
            - **Phosphorus (P):** 40  
            - **Potassium (K):** 30  
            - **Soil pH:** 6.5  
            - **Temperature:** 27°C  
            - **Humidity:** 80%  
            - **Rainfall:** 1200 mm  

            ### **ML Model Prediction:**  
            - **Recommended Crop:** Rice  

            ### **Task:**  
            Provide a short, science-backed explanation (under **50 words**) on why **Rice** is the best crop for these conditions. Keep it concise and easy to understand for farmers.
        `;

        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const resultStream = await chatSession.sendMessageStream(userMessage);

        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of resultStream.stream) {
                    controller.enqueue(new TextEncoder().encode(chunk.text()));
                }
                controller.close();
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Transfer-Encoding": "chunked",
            },
        });
    } catch (error) {
        console.error("Error Fetching Prediction Explaination, ", error);
        return Response.json(new ApiResponse(500, "Error fetching Prediction Explaination"));
    }
}