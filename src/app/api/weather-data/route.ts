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
            "https://api.openweathermap.org/data/2.5/forecast",
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

        const totalEntries = weatherData.list.length;

        const averages = weatherData.list.reduce(
            (acc: any, entry: any) => {
                acc.temperature += entry.main.temp;
                acc.humidity += entry.main.humidity;
                acc.rainfall += entry.rain?.["3h"] || 0;
                acc.windSpeed += entry.wind.speed;
                return acc;
            },
            { temperature: 0, humidity: 0, rainfall: 0, windSpeed: 0 }
        );

        const averagedWeather = {
            temperature: averages.temperature / totalEntries,
            humidity: averages.humidity / totalEntries,
            rainfall: averages.rainfall / totalEntries,
            windSpeed: averages.windSpeed / totalEntries
        };

        
        
        const currentWeather = {
            temperature: weatherData.list[0].main.temp,
            humidity: weatherData.list[0].main.humidity,
            rainfall: weatherData.list[0].rain?.["3h"] || 0,
            windSpeed: weatherData.list[0].wind.speed,
            icon: weatherData.list[0].weather[0].icon,
            description: weatherData.list[0].weather[0].description,
        };
        
        return NextResponse.json(
            new ApiResponse(200, "Successfully fetched weather data!", {currentWeather, averagedWeather}),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error Fetching Weather Data: ", error);
        return NextResponse.json(
            new ApiResponse(500, "Error fetching weather data"),
            { status: 500 }
        );
    }
}
