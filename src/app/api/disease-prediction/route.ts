import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {

        const imageBuffer = await req.arrayBuffer();

        console.log(imageBuffer);
        

        const modelResponse = await axios.post(
            process.env.PEST_DETECTION_API_URL as string,
            imageBuffer, 
            {
                headers: {
                    "Content-Type": "image/jpeg",
                },
            }
        );

        const detectedDisease = modelResponse.data.disease;

        // Use Gemini API to get more information about the disease
        const geminiResponse = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
            {
                contents: [
                    {
                        role: "user",
                        parts: [{ text: `Explain about ${detectedDisease} in plants. Also, suggest how farmers can remove it.` }]
                    }
                ]
            },
            { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.GEMINI_API_KEY}` } }
        );

        const detailedInfo = geminiResponse.data.candidates[0]?.content?.parts[0]?.text || "No additional information available.";

        return NextResponse.json(new ApiResponse(200, "Detection successful!", { disease: detectedDisease, details: detailedInfo }), { status: 200 });

    } catch (error) {
        console.error("Error processing image:", error);
        return NextResponse.json(new ApiResponse(500, "Error processing image"), { status: 500 });
    }
}
