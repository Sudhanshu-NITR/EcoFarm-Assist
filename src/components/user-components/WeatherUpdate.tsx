'use client';
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import useWeatherData from "@/hooks/useWeatherData";
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
} from "lucide-react";

function WeatherUpdate() {
  const { weatherData } = useWeatherData();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    if (weatherData) {
      setIsLoaded(true);
    }
  }, [weatherData]);

  const weatherIcons: Record<string, LucideIcon> = {
    "01d": Sun,               // ☀️ Clear sky (Day)
    "01n": Moon,              // 🌙 Clear sky (Night)
    "02d": CloudSun,          // 🌤️ Few clouds (Day)
    "02n": CloudMoon,         // 🌙 Few clouds (Night)
    "03d": Cloud,             // ☁️ Scattered clouds (Day)
    "03n": Cloud,             // ☁️ Scattered clouds (Night)
    "04d": Cloud,             // 🌥️ Broken clouds (Overcast)
    "04n": Cloud,             // 🌥️ Broken clouds (Overcast Night)
    "09d": CloudRain,         // 🌧️ Shower rain
    "09n": CloudRain,         // 🌧️ Shower rain (Night)
    "10d": CloudSunRain,      // 🌦️ Rain (Day)
    "10n": CloudRain,         // 🌧️ Rain (Night)
    "11d": CloudLightning,    // ⛈️ Thunderstorm
    "11n": CloudLightning,    // ⛈️ Thunderstorm (Night)
    "13d": CloudSnow,         // ❄️ Snow
    "13n": CloudSnow,         // ❄️ Snow (Night)
    "50d": CloudFog,          // 🌫️ Mist
    "50n": CloudFog,          // 🌫️ Mist (Night)
  };
  

  if (!weatherData?.currentWeather || !isLoaded) {
    return (
      <Card
        Icon={Cloud}
        title="Weather Update"
        description="Loading..."
        content={`Temperature: Loading... \nHumidity: Loading... \nWind Speed: Loading...`}
        buttonText="See 7-day forecast"
        buttonLink="/weather-forecast"
        iconColor="text-blue-400"
      />
    )
  }

  const { icon, description, temperature, humidity, windSpeed, rainfall } = weatherData.currentWeather;

  // const SelectedIcon = weatherIcons[icon as string] || Cloud;
  

  return (
    <Card
      Icon={(weatherIcons[icon as string] || Cloud) as LucideIcon}
      title="Weather Update"
      description={description as string}
      content={`Temperature: ${temperature}°C\nHumidity: ${humidity}%\nWind Speed: ${windSpeed} m/s \nRainfall: ${rainfall} mm`}
      buttonText="See 7-day forecast"
      buttonLink="/weather-forecast"
    />
  );
}

export default WeatherUpdate;