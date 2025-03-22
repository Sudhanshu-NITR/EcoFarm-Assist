import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const lat = url.searchParams.get("lat");
        const lng = url.searchParams.get("lng");
    
        if (!lat || !lng) {
            return NextResponse.json(
                { success: false, message: "Latitude and Longitude are required." },
                { status: 400 }
            );
        }
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    lat: parseFloat(lat),
                    lon: parseFloat(lng),
                    appid: process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY,
                    units: "metric",
                },
            }
            
        );
        
        const weatherData = weatherResponse.data;
        if (weatherData.cod !== 200) {
            throw new Error(weatherData.message);
        }
        return NextResponse.json(
			new ApiResponse(200, "Successfully fetched weather data!!", weatherData),
            { status: 200 }
		);

    } catch (error) {
        console.error("Error Fetching Weather Data, ", error);
        return NextResponse.json(
            new ApiResponse(500, "Error fetching weather data"),
            { status: 500 }
        );
    }
}