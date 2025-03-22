"use client";
import { Leaf, Cloud, Droplet, BarChart3, MessageCircle } from "lucide-react";
import { useLocation } from "@/context/LocationContext";
import LocationSelector from "@/components/LocationSelector/LocationSelector";
import Card from "@/components/Card";
import WeatherUpdate from "@/components/user-components/WeatherUpdate";
import SoilUpdate from "@/components/user-components/SoilUpdate";

const Dashboard = () => {
  const { location } = useLocation();

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="space-y-6">

        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-blue-100">Dashboard Overview</h2>
          <div className="h-10 w-10 bg-teal-500 rounded-full flex items-center justify-center">
            <Droplet className="h-5 w-5 text-white" />
          </div>
        </div>

        <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            icon={Leaf}
            title="Latest Crop Advice"
            description="Recommended Crop: Wheat 🌾"
            content="Optimal planting time in your region based on soil conditions and forecasted weather patterns."
            buttonText="View detailed analysis"
            buttonLink="/crop-analysis"
            iconColor="text-teal-400"
          />
          
          <WeatherUpdate />

          <SoilUpdate />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card
            icon={BarChart3}
            title="Yield Forecast"
            description="Projected harvest based on current conditions"
            content="Yield visualization chart would appear here."
            buttonText="View forecast"
            buttonLink="/yield-forecast"
          />

          <Card
            icon={MessageCircle}
            title="Recent AI Insights"
            description="Custom recommendations from your AI assistant"
            content="Based on your recent soil samples and weather patterns, consider increasing irrigation by 15% for the next week."
            buttonText="Ask AI Assistant"
            buttonLink="/ai-insights"
          />
        </div>
      </div>

      <div className="mt-8 p-6 bg-white border rounded">
        <h1 className="text-xl font-bold mb-2">Set Location</h1>
        <LocationSelector />
        {location && (
          <div className="mt-4 p-3 border rounded">
            <p><strong>Latitude:</strong> {location.lat}</p>
            <p><strong>Longitude:</strong> {location.lng}</p>
            <p><strong>Address:</strong> {location.address}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;