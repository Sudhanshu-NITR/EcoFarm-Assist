'use client'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Cloud, Home, Leaf, TestTube, Bug, User } from 'lucide-react'

function Sidebar({activeTab, setActiveTab} : {activeTab: string, setActiveTab: (tab: string) => void}) {

    useEffect(()=>{
        const storedTab = localStorage.getItem('activeTab');
        if(storedTab){
            setActiveTab(storedTab);
        }
    }, [setActiveTab]);

    const handleTabChange = (tab: string) =>{
        setActiveTab(tab);
        localStorage.setItem('activeTab', tab);
    }
    
    return (
        <>
            <div className="w-64 bg-slate-800 border-r border-slate-700 h-screen sticky top-0 overflow-y-auto flex flex-col">
                <nav className="p-4 space-y-2 flex-1">
                    <Button 
                        variant={activeTab === "dashboard" ? "default" : "ghost"} 
                        className={`w-full cursor-pointer justify-start ${activeTab === "dashboard" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
                        onClick={() => handleTabChange("dashboard")}
                    >
                        <Home className="mr-2 h-4 w-4" /> Home
                    </Button>
                    
                    <Button 
                        variant={activeTab === "cropRecommendation" ? "default" : "ghost"} 
                        className={`w-full cursor-pointer justify-start ${activeTab === "cropRecommendation" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
                        onClick={() => setActiveTab("cropRecommendation")}
                    >
                        <Leaf className="mr-2 h-4 w-4" />
                        Crop Recommedation
                    </Button>

                    <Button 
                        variant={activeTab === "pestAndDiseaseDetection" ? "default" : "ghost"} 
                        className={`w-full cursor-pointer justify-start ${activeTab === "pestAndDiseaseDetection" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
                        onClick={() => setActiveTab("pestAndDiseaseDetection")}
                    >
                        <Bug className="mr-2 h-4 w-4" />
                        Pest & Disease Detection
                    </Button>
                    <Button 
                        variant={activeTab === "fertilizerRecommendation" ? "default" : "ghost"} 
                        className={`w-full cursor-pointer justify-start ${activeTab === "fertilizerRecommendation" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
                        onClick={() => setActiveTab("fertilizerRecommendation")}
                    >
                        <TestTube className="mr-2 h-4 w-4" />
                        Fertilizer Recommendation
                    </Button>

                    <Button 
                        variant={activeTab === "weather" ? "default" : "ghost"} 
                        className={`w-full cursor-pointer justify-start ${activeTab === "weather" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
                        onClick={() => setActiveTab("weatherInsights")}
                    >
                        <Cloud className="mr-2 h-4 w-4" />
                        Weather Insights
                    </Button>

                    
                    <Button 
                        variant={activeTab === "profile" ? "default" : "ghost"} 
                        className={`w-full cursor-pointer justify-start ${activeTab === "profile" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
                        onClick={() => setActiveTab("profile")}
                    >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </Button>
                </nav>
                
                <div className="p-4 border-t border-slate-700">
                <div className="text-xs text-slate-400 text-center">
                    <p>Sustainable farming solutions</p>
                </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
