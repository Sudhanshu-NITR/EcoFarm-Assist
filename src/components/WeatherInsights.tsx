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
  Droplets,
  Wind,
  Gauge,
  Eye,
  LucideIcon,
  CalendarDays,
  BarChart,
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
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
}

interface DailyWeatherSummary {
  date: string;
  formattedDate: string;
  minTemp: number;
  maxTemp: number;
  mainIcon: string;
  mainDescription: string;
  hourlyData: WeatherDataItem[];
}

const WeatherInsights = () => {
  const [weatherData, setWeatherData] = useState<DailyWeatherSummary[]>([]);
  const [currentWeather, setCurrentWeather] = useState<WeatherDataItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const { location } = useLocation();
  const lat = location?.lat;
  const lng = location?.lng;
  
  const processWeatherData = (data: WeatherDataItem[]): DailyWeatherSummary[] => {
    const groupedData: Record<string, WeatherDataItem[]> = {};
    
    // Group by date
    data.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });
    
    // Create daily summaries
    return Object.entries(groupedData).map(([date, items]) => {
      // Find min and max temps
      const temps = items.map(item => item.main.temp);
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);
      
      // Get the most common weather condition for the day
      const weatherCounts: Record<string, number> = {};
      items.forEach(item => {
        const icon = item.weather[0].icon;
        weatherCounts[icon] = (weatherCounts[icon] || 0) + 1;
      });
      
      const mainIcon = Object.entries(weatherCounts).sort((a, b) => b[1] - a[1])[0][0];
      const mainDescription = items.find(item => item.weather[0].icon === mainIcon)?.weather[0].description || "";
      
      // Format date for display
      const dateObj = new Date(date);
      const formattedDate = dateObj.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
      
      return {
        date,
        formattedDate,
        minTemp,
        maxTemp,
        mainIcon,
        mainDescription,
        hourlyData: items
      };
    });
  };

  useEffect(() => {
    const fetchWeather = async () => {
      if (!lat || !lng) {
        setError("Location not available");
        setLoading(false);
        return;
      }
      
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
        );
        
        const processedData = processWeatherData(res.data.list);
        setWeatherData(processedData);
        
        // Set current weather to the first item of the first day
        if (processedData.length > 0 && processedData[0].hourlyData.length > 0) {
          setCurrentWeather(processedData[0].hourlyData[0]);
        }
        
      } catch (error) {
        console.error("Error fetching weather data", error);
        setError("Failed to load weather data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeather();
  }, [lat, lng]);

  const formatTime = (dtTxt: string) => {
    const time = dtTxt.split(" ")[1].substring(0, 5);
    return time;
  };

  const formatDay = (date: string) => {
    const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
    return day;
  };

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 h-64 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-teal-400 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 border border-red-400">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (weatherData.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <p className="text-blue-100">No weather data available</p>
      </div>
    );
  }

  const selectedDayData = weatherData[selectedDay];
  const IconComponent = weatherIcons[currentWeather?.weather[0].icon || "01d"];

  return (
    <div className="bg-gray-900 rounded-lg p-8 md:p-10 w-full">
      {/* Header with title and icon */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-blue-100">Weather Insights</h2>
        <div className="h-10 w-10 bg-teal-500 rounded-full flex items-center justify-center">
          <BarChart className="h-5 w-5 text-white" />
        </div>
      </div>
      
      <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full mb-6"></div>
      
      {/* Current Weather Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-800 rounded-lg">
          <div className="flex flex-col items-center">
            {IconComponent && <IconComponent size={64} className="text-teal-400" />}
            <p className="text-lg font-semibold mt-2 capitalize text-blue-100">
              {currentWeather?.weather[0].description || "Unknown"}
            </p>
          </div>
          
          <div className="flex-1 ml-0 md:ml-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-blue-100">
                  {Math.round(currentWeather?.main.temp || 0)}°C
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Droplets className="text-teal-400" size={20} />
                <span className="text-blue-100">Humidity: {currentWeather?.main.humidity || 0}%</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Wind className="text-teal-400" size={20} />
                <span className="text-blue-100">Wind: {currentWeather?.wind.speed || 0} m/s</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Gauge className="text-teal-400" size={20} />
                <span className="text-blue-100">Pressure: {currentWeather?.main.pressure || 0} hPa</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Eye className="text-teal-400" size={20} />
                <span className="text-blue-100">Visibility: {(currentWeather?.visibility || 0) / 1000} km</span>
              </div>
              
              <div className="flex items-center gap-2">
                <CalendarDays className="text-teal-400" size={20} />
                <span className="text-blue-100">{new Date(currentWeather?.dt_txt || "").toLocaleString(undefined, { 
                  hour: '2-digit',
                  minute: '2-digit',
                  weekday: 'short',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Daily Forecast Section */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-3 text-blue-100">5-Day Forecast</h3>
        
        <div className="flex overflow-x-auto gap-2 pb-2">
          {weatherData.map((day, index) => {
            const DayIcon = weatherIcons[day.mainIcon] || Cloud;
            return (
              <div 
                key={day.date}
                className={`flex-shrink-0 p-3 rounded-lg cursor-pointer transition-all ${
                  selectedDay === index ? 'bg-gray-700 border-teal-400 border-2' : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => {
                  setSelectedDay(index);
                  setCurrentWeather(day.hourlyData[0]);
                }}
              >
                <div className="flex flex-col items-center w-20">
                  <p className="font-semibold text-blue-100">{formatDay(day.date)}</p>
                  <DayIcon size={28} className="my-2 text-teal-400" />
                  <div className="flex gap-2 items-center">
                    <span className="text-sm font-bold text-blue-100">{Math.round(day.maxTemp)}°</span>
                    <span className="text-sm text-gray-400">{Math.round(day.minTemp)}°</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Hourly Forecast for Selected Day */}
      <div>
        <h3 className="text-md font-semibold mb-3 text-blue-100">Hourly Forecast</h3>
        
        <div className="overflow-x-auto">
          <div className="flex gap-3 pb-2">
            {selectedDayData.hourlyData.map((hourData) => {
              const HourIcon = weatherIcons[hourData.weather[0].icon] || Cloud;
              return (
                <div 
                  key={hourData.dt}
                  className={`flex-shrink-0 p-3 rounded-lg cursor-pointer transition-all ${
                    currentWeather?.dt === hourData.dt ? 'bg-gray-700 border-teal-400 border-2' : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => setCurrentWeather(hourData)}
                >
                  <div className="flex flex-col items-center w-16">
                    <p className="font-medium text-sm text-blue-100">{formatTime(hourData.dt_txt)}</p>
                    <HourIcon size={24} className="my-2 text-teal-400" />
                    <p className="font-semibold text-blue-100">{Math.round(hourData.main.temp)}°C</p>
                    <div className="mt-1 flex items-center text-xs text-gray-400">
                      <Wind size={12} className="mr-1" />
                      <span>{hourData.wind.speed}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Weather Details */}
      {currentWeather && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-md font-semibold mb-3 text-blue-100">Weather Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm">Feels Like</span>
                <span className="font-semibold text-blue-100">{Math.round(currentWeather.main.feels_like)}°C</span>
              </div>
            </div>
            
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm">Cloud Cover</span>
                <span className="font-semibold text-blue-100">{currentWeather.clouds.all}%</span>
              </div>
            </div>
            
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm">Wind Direction</span>
                <span className="font-semibold text-blue-100">{currentWeather.wind.deg}°</span>
              </div>
            </div>
            
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm">Precipitation</span>
                <span className="font-semibold text-blue-100">{Math.round(currentWeather.pop * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherInsights;