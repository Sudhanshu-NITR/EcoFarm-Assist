'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "@/context/LocationContext";

import React from "react";
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudSunRain,
  CloudLightning,
  CloudSnow,
  CloudFog,
  Cloud,
  LucideIcon,
  Wind,
  Droplet,
  Eye,
  Gauge,
  Compass,
} from "lucide-react";

const weatherIcons: Record<string, LucideIcon> = {
  "01d": Sun,
  "01n": Moon,
  "02d": CloudSun,
  "02n": CloudMoon,
  "03d": Cloud,
  "03n": Cloud,
  "04d": Cloud,
  "04n": Cloud,
  "09d": CloudRain,
  "09n": CloudRain,
  "10d": CloudSunRain,
  "10n": CloudRain,
  "11d": CloudLightning,
  "11n": CloudLightning,
  "13d": CloudSnow,
  "13n": CloudSnow,
  "50d": CloudFog,
  "50n": CloudFog,
};

interface WeatherDataItem {
  dt_txt: string;
  [key: string]: any;
}


const WeatherInsights = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { location } = useLocation();
  const lat = location?.lat;
  const lng = location?.lng;
  
  const processWeatherData = (weatherData: WeatherDataItem[]) => {
    const groupedData = weatherData.reduce((acc: Record<string, WeatherDataItem[]>, obj) => {
      const date = obj.dt_txt.split(" ")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(obj);
      return acc;
    }, {});
  
    return Object.values(groupedData);
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
        );
        const processedWeatherData = processWeatherData(res.data.list);
        console.log(processedWeatherData);
        
      } catch (error) {
        console.error("Error fetching weather data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (!weather) return <p>Loading weather data...</p>;


  return (
    <>
      
    </>
  );
};

export default WeatherInsights;