'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import RecommendButton from '@/components/user-components/FertilizerRecommendation/RecommendButton';
import RecommendationResult from '@/components/user-components/FertilizerRecommendation/RecommendationResult';
import { useLocation } from '@/context/LocationContext';


export default function FertilizerRecommendation() {
    const [loading, setLoading] = useState(false);
    const [cropName, setCropName] = useState<string>("");
    const [soilType, setSoilType] = useState<string>("");
    const [fertilizer, setFertilizer] = useState<string>("");
    const [explanation, setExplanation] = useState<string>("");
    const [animationProgress, setAnimationProgress] = useState<number>(0);
    
    const {data: session} = useSession();
    const { location } = useLocation();

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setAnimationProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 300);
            return () => clearInterval(interval);
        } else {
            setAnimationProgress(0);
        }
    }, [loading]);

    async function getEnvironmentalData(lat: number, lng: number) {
        let soilData = {
            "nitrogen": 66.70,
            "phosphorus": 76.96,
            "potassium": 96.42,
            "soc": 0.496,
            "soil_moisture": 0.725,
            "ph": 6.227
        }

        if (typeof window !== "undefined") {
            const storedData = localStorage.getItem("soilData");
            if (storedData) {
                try {
                    soilData = JSON.parse(storedData);
                    console.log(soilData);
                } catch (error) {
                    console.error("Error parsing soilData:", error);
                }
            } else {
                console.warn("No soilData found in localStorage.");
            }
        }
        console.log("soilData -> ", soilData);
        
        const [weatherRes] = await Promise.all([
            fetch(`/api/weather-data?lat=${lat}&lng=${lng}`).then(res => res.json())
        ])
        const weatherData = weatherRes.data.weatherData.averagedWeather;
        console.log(weatherRes);
        
        const soilRes = {
            "Nitrogen": soilData.nitrogen,
            "Phosphorus": 42,
            "Potassium": 43,
            "Carbon": soilData.soc,
            "Moisture": soilData.soil_moisture,
            "PH": soilData.ph
        }
        console.log("soilRes -> ", soilRes);
        return { 
            ...soilRes, 
            Temperature: weatherData.temperature,
            Rainfall: weatherData.rainfall
        };
    }


    const handleRecommend = async () => {
        setLoading(true);
        setFertilizer("");
        setExplanation("");
    
        try {
            const data = await getEnvironmentalData(location!.lat, location!.lng)

            if (!cropName || !soilType) {
                console.error("Error: Soil Type and Crop Name are required.");
                toast.error("Please provide Soil Type and Crop Name");
                return;
            }

            const response = await fetch("/api/fertilizer-recommendation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    instances: {
                        Crop: cropName, 
                        Soil: soilType,
                        ...data,
                    },
                    user: session?.user._id 
                }),
            });

            if (!response.ok) {
                console.error("Error:", response.status, response.statusText);
                toast.error("Failed to get fertilizer recommendation.");
                return;
            }

            const result = await response.json();

            setFertilizer(result.fertilizer);
            setExplanation(result.explanation);
        } catch (error) {
            console.error("Recommendation error:", error);
            toast.error("Failed to get fertilizer recommendation.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="p-12 max-w-6xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-blue-100">
                            Fertilizer Recommendations
                        </h2>
                        <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full mt-2"></div>
                        <p className="mt-4 text-slate-300 max-w-2xl">
                            Our AI analyzes crop requirements and soil conditions to recommend the optimal fertilizer for your agricultural needs.
                        </p>
                    </div>
                    <motion.div 
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 1 }}
                        className="h-12 w-12 bg-teal-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                        <Leaf className="h-6 w-6 text-white" />
                    </motion.div>
                </div>
            </motion.div>

            <div className="grid md:grid-cols-12 gap-6">
                <RecommendButton 
                    onRecommend={handleRecommend} 
                    loading={loading} 
                    animationProgress={animationProgress}
                    cropName={cropName}
                    soilType={soilType}
                    setCropName={setCropName}
                    setSoilType={setSoilType}
                />

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="md:col-span-8"
                >
                    <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all h-full">
                        <RecommendationResult 
                            fertilizer={fertilizer} 
                            explanation={explanation} 
                            cropDetails={{
                                cropName,
                                soilType
                            }}
                        />
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}