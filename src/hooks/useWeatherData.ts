'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "@/context/LocationContext";
import { WeatherResponse } from "@/types/WeatherData";

export default function useWeatherData() {
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const { location } = useLocation();
    const lat = location?.lat;
    const lng = location?.lng;

    const refreshWeatherData = async () => {
        if (!lat || !lng) {
            throw new Error("Latitude and Longitude are required for fetching weather data.");
        }
        try {
            const { data } = await axios.get("/api/weather-data", {
                params: { lat, lng }
            });

            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            throw error;
        }
    };

    useEffect(() => {
        if (lat && lng) {
            refreshWeatherData();
        }
    }, [lat, lng]);

    return { weatherData: weatherData?.data ?? null, refreshWeatherData }; 
};
