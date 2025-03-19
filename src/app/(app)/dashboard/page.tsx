'use client'
import { useState } from "react";
import { Home, Leaf, Cloud, MessageCircle, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h1 className="text-xl font-bold mb-6">EcoFarm Assist</h1>
        <nav className="space-y-4">
          <Button variant={activeTab === "home" ? "default" : "ghost"} onClick={() => setActiveTab("home")}>
            <Home className="mr-2" /> Dashboard
          </Button>
          <Button variant={activeTab === "crop" ? "default" : "ghost"} onClick={() => setActiveTab("crop")}>
            <Leaf className="mr-2" /> Crop Advice
          </Button>
          <Button variant={activeTab === "weather" ? "default" : "ghost"} onClick={() => setActiveTab("weather")}>
            <Cloud className="mr-2" /> Weather Insights
          </Button>
          <Button variant={activeTab === "chat" ? "default" : "ghost"} onClick={() => setActiveTab("chat")}>
            <MessageCircle className="mr-2" /> AI Chatbot
          </Button>
          <Button variant={activeTab === "profile" ? "default" : "ghost"} onClick={() => setActiveTab("profile")}>
            <User className="mr-2" /> Profile
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "home" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardContent>
                  <h3 className="text-lg font-medium">Latest Crop Advice</h3>
                  <p>Recommended Crop: Wheat 🌾</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <h3 className="text-lg font-medium">Weather Update</h3>
                  <p>Rain Expected Tomorrow ☔</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <h3 className="text-lg font-medium">Soil Insights</h3>
                  <p>pH Level: 6.8 - Ideal for crops ✅</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        {activeTab === "crop" && <h2 className="text-xl font-semibold">Crop Recommendations</h2>}
        {activeTab === "weather" && <h2 className="text-xl font-semibold">Weather Insights</h2>}
        {activeTab === "chat" && <h2 className="text-xl font-semibold">AI Chatbot</h2>}
        {activeTab === "profile" && <h2 className="text-xl font-semibold">User Profile</h2>}
      </main>
    </div>
  );
};

export default Dashboard;
