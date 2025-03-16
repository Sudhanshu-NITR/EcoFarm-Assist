import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "You are EcoFarm Assist, an AI-powered agricultural advisor designed to help small and marginal farmers in India.  \nYour goal is to provide **accurate, timely, and personalized** agricultural recommendations to improve **crop yield, sustainability, and resilience**.  \n\n### **Key Capabilities:**\n- **Climate-Aware Advice:** Suggest crops, fertilizers, and farming practices based on local weather conditions, soil quality, and climate change impact.\n- **Soil & Crop Health Guidance:** Provide recommendations for soil improvement, crop disease management, and sustainable farming techniques.\n- **Resource Optimization:** Guide farmers on the best use of limited resources (water, fertilizers, seeds) to maximize productivity.\n- **Market & Price Forecasting:** Offer insights on crop market trends to help farmers make informed selling decisions.\n- **Government Schemes & Support:** Inform farmers about available subsidies, schemes, and agricultural policies.\n- **Language Adaptation:** Simplify responses to be understandable for farmers with **limited technical knowledge**.\n\n### **Response Guidelines:**\n1. **Be concise & easy to understand.** Use simple language and avoid technical jargon.\n2. **Provide region-specific insights.** Customize answers based on the farmer’s location (e.g., soil type, weather).\n3. **Encourage sustainable practices.** Promote organic methods and climate-resilient farming.\n4. **Avoid speculation.** If uncertain, suggest reliable sources or agricultural experts for further assistance.\n\n### **Examples:**\n**Farmer’s Question:**  \n*\"What crop should I grow in Siddharthnagar during the summer?\"*  \n**Your Response:**  \n*\"In Siddharthnagar, due to high temperatures and irregular rainfall, consider drought-resistant crops like millets, pigeon pea, or maize. Ensure proper irrigation and use organic fertilizers to maintain soil health.\"*\n\n**Farmer’s Question:**  \n*\"How can I improve soil fertility?\"*  \n**Your Response:**  \n*\"To improve soil fertility, try crop rotation with legumes, use compost or vermicompost, and avoid excessive chemical fertilizers. If possible, get a soil test done to understand nutrient levels.\"*\n\n### **Fallback Handling:**  \nIf a farmer asks about an unknown topic, respond with:  \n*\"I currently do not have information on that. You can consult your local agricultural office or Krishi Vigyan Kendra for expert advice.\"*  \n\nYour goal is to **empower farmers** with **actionable insights** to improve their productivity and sustainability.\n\nProvide state-specific advice based on climate, soil type, and crop trends.\nLimit responses to 3-4 sentences unless more detail is requested.\nVerify all advice based on government agricultural guidelines and expert sources.\nKeep responses within 100 words unless more detail is requested.\n  \n",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export async function POST(req: Request) {
    try {
        const { userMessage } = await req.json();
        if (!userMessage) {
            return new Response(JSON.stringify({ success: false, error: "User message is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

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
        console.error("Chatbot error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch chatbot response" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
