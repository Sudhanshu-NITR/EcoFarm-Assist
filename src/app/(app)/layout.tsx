'use client'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import Dashboard from "@/components/user-components/dashboard";
import CropRecommendation from "@/components/user-components/CropRecommendation/CropRecommendation";
import { LocationProvider } from "@/context/LocationContext";
import Profile from "@/components/user-components/Profile";
import PestAndDiseaseDetectionPage from "@/components/user-components/PestAndDiseaseDetection/PestAndDiseaseDetectionPage";
import WeatherInsights from "@/components/WeatherInsights";
import FertilizerRecommendation from "@/components/user-components/FertilizerRecommendation/FertilizerRecommendation";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

const geistSans = GeistSans;
const geistMono = GeistMono;


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  useEffect(()=>{
    const storedTab = localStorage.getItem('activetab');
    if(storedTab){
      setActiveTab(storedTab);
    }
  }, [])

  return (
    <html lang="en">
      <head>
      <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,geometry&loading=async`}
      ></script>
      </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Navbar />
            <LocationProvider >
              <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 bg-fixed flex">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="flex-1">
                  {activeTab === "dashboard" && <Dashboard/>}
                  {activeTab === "cropRecommendation" && <CropRecommendation />}
                  {activeTab === "pestAndDiseaseDetection" && <PestAndDiseaseDetectionPage />}
                  {activeTab === "fertilizerRecommendation" && <FertilizerRecommendation />}
                  {activeTab === "profile" && <Profile />}
                  {activeTab === "weatherInsights" && <WeatherInsights />}
                  {children}
                </div>
              </div>
              {/* <Chatbot /> */}
            </LocationProvider>
          <Footer />
      </body>
    </html>
  );
}
