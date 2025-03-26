'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useLocation } from '@/context/LocationContext';

import RecommendButton from '@/components/user-components/CropRecommendation/RecommendButton';
import RecommendationResult from '@/components/user-components/CropRecommendation/RecommendationResult';

export default function CropRecommendation() {
    const [loading, setLoading] = useState(false);
    const [crop, setCrop] = useState<string>("");
    const [explanation, setExplanation] = useState<string>("");
    const [data, setData] = useState<any>(null);
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
            "N": 100,
            "P": 50,
            "K": 150,
            "pH": 6.5
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

        const [weatherRes] = await Promise.all([
            fetch(`/api/weather-data?lat=${lat}&lng=${lng}`).then(res => res.json())
        ])
        const weatherData = weatherRes.data.averagedWeather;

        const soilRes = {
            "N": soilData.N,
            "P": 50,
            "K": 150,
            "pH": soilData.pH
        }

        return { ...soilRes, ...weatherData };
    }

    const handleRecommend = async () => {
        setLoading(true);
        setExplanation("");
        setCrop("");
        setData(null);
    
        try {
            const data = await getEnvironmentalData(location!.lat, location!.lng);
            const inputArray = [[
                data.N, 
                data.P, 
                data.K, 
                data.temperature, 
                data.humidity, 
                data.pH, 
                data.rainfall
            ]];
    
            const response = await fetch("/api/crop-prediction", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ instances: inputArray, user: session?.user._id }),
            });

            if (!response.ok) {
                console.error("Error:", response.status, response.statusText);
                return;
            }

            if (!response.body) {
                console.error("Response body is null");
                return;
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let text = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                text += decoder.decode(value, { stream: true });
            }
            
            const cleanedText = text.replace(/[\u0000-\u001F\u007F]/g, " ");
            console.log("Cleaned Response:", cleanedText);
            
            const parsedResult = JSON.parse(cleanedText);

            setCrop(parsedResult.crop);
            setExplanation(parsedResult.explanation);
            setData(data);
        } catch (error) {
            console.error("Streaming error:", error);
            toast.error("Failed to get crop recommendation.");
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
                        <h2 className="text-3xl font-extrabold tracking-tight text-blue-100">Crop Recommendations</h2>
                        <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full mt-2"></div>
                        <p className="mt-4 text-slate-300 max-w-2xl">
                            Our AI analyzes soil conditions, climate data, and agricultural best practices to recommend the optimal crop for your land.
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
                />

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="md:col-span-8"
                >
                    <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all h-full">
                        <RecommendationResult 
                            crop={crop as string} 
                            explanation={explanation as string} 
                            data={data} 
                        />
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}