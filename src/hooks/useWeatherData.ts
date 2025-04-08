'use client'
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation } from "@/context/LocationContext";
import { WeatherData } from "@/types/WeatherData";

export default function useWeatherData() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const { location } = useLocation();
    const lat = location?.lat;
    const lng = location?.lng;

    // Load from localStorage on first render
    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("weatherData");
            if (stored) {
                setWeatherData(JSON.parse(stored));
            }
        }
    }, []);

    // Function to refresh from API
    const refreshWeatherData = useCallback(async () => {
        if (!lat || !lng) return;

        try {
            const { data } = await axios.get("/api/weather-data", {
                params: { lat, lng },
            });

            const result = data.data.weatherData;
            setWeatherData(result);
            console.log("useWeatherData ->", result);

            if (typeof window !== "undefined") {
                localStorage.setItem("weatherData", JSON.stringify(result));
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }, [lat, lng]);

    // Fetch data when location changes
    useEffect(() => {
        refreshWeatherData();
    }, [refreshWeatherData]);

    return { weatherData, refreshWeatherData };
}
