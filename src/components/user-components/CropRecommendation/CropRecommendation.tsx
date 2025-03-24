'use client'
import { Cloud, Droplets, Leaf, Thermometer, Sprout, Sun, Loader2, BarChart3, Droplet } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner';
import { useLocation } from '@/context/LocationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from 'next-auth/react';

export default function CropRecommendation() {
    const [loading, setLoading] = useState(false);
    const [crop, setCrop] = useState<String>("");
    const [explanation, setExplanation] = useState<String>("");
    const [data, setData] = useState<any>(null);
    const [showDetails, setShowDetails] = useState<boolean>(false);
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
        // const [soilRes, weatherRes] = await Promise.all([
        //     fetch(`/api/getSoilData?lat=${lat}&lng=${lng}`).then(res => res.json()),
        //     fetch(`/api/getWeatherData?lat=${lat}&lng=${lng}`).then(res => res.json()),
        // ]);

        const [weatherRes] = await Promise.all([
            fetch(`/api/weather-data?lat=${lat}&lng=${lng}`).then(res => res.json())
        ])
        const weatherData = weatherRes.data.averagedWeather;

        const soilRes = {
            "N": 100,
            "P": 50,
            "K": 150,
            "pH": 6.5
        }

        return { ...soilRes, ...weatherData };
    }

    const handleRecommend = async () => {
        setLoading(true);
        setExplanation("");
        setCrop("");
        setData(null);
        setShowDetails(false);
    
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

            setTimeout(() => setShowDetails(true), 500);
        } catch (error) {
            console.error("Streaming error:", error);
            toast.error("Failed to get crop recommendation.");
        } finally {
            setLoading(false);
        }
    };
    
    
    
    const getNutrientLevel = (value: number, type: string) => {
        if (type === 'N') {
            return value < 50 ? 'Low' : value < 100 ? 'Medium' : 'High';
        } else if (type === 'P') {
            return value < 30 ? 'Low' : value < 60 ? 'Medium' : 'High';
        } else if (type === 'K') {
            return value < 40 ? 'Low' : value < 80 ? 'Medium' : 'High';
        }
        return 'Unknown';
    };

    const getNutrientColor = (level: string) => {
        if (level === 'Low') return 'text-red-500';
        if (level === 'Medium') return 'text-yellow-500';
        if (level === 'High') return 'text-green-500';
        return '';
    };

    const cropImageMap: Record<string, string> = {
        "apple": "🍎",
        "banana": "🍌",
        "blackgram": "🌱",
        "chickpea": "🌱",
        "coconut": "🥥",
        "coffee": "☕",
        "cotton": "🧶",
        "grapes": "🍇",
        "jute": "🧵",
        "kidneybeans": "🫘",
        "lentil": "🌰",
        "maize": "🌽",
        "mango": "🥭",
        "mothbeans": "🌱",
        "mungbean": "🌱",
        "muskmelon": "🍈",
        "orange": "🍊",
        "papaya": "🍈",
        "pigeonpeas": "🌿",
        "pomegranate": "🍎",
        "rice": "🌾",
        "watermelon": "🍉"
    };
    
    return (
        <div className="p-6 max-w-6xl mx-auto">
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
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="md:col-span-4"
                >
                    <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all h-full">
                        <CardHeader>
                            <CardTitle className="text-blue-100 flex items-center">
                                <Leaf className="mr-2 h-5 w-5 text-teal-400" />
                                Get Started
                            </CardTitle>
                            <CardDescription className="text-slate-400">Analyze your location for crop recommendations</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-300 mb-6">
                                Click the button below to analyze your location and receive a personalized crop recommendation based on local soil and climate conditions.
                            </p>
                            
                            <Button 
                                onClick={handleRecommend} 
                                disabled={loading}
                                className={`w-full py-3 px-4 font-medium text-white ${loading ? 'bg-blue-800 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                variant="default"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Analyzing Data...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <Leaf className="h-5 w-5" />
                                        <span>Recommend Crop</span>
                                    </div>
                                )}
                            </Button>
                            
                            {loading && (
                                <div className="mt-4">
                                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                                        <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${animationProgress}%` }}></div>
                                    </div>
                                    <div className="text-xs text-slate-400 mt-2">
                                        {animationProgress < 30 && "Gathering environmental data..."}
                                        {animationProgress >= 30 && animationProgress < 60 && "Analyzing soil conditions..."}
                                        {animationProgress >= 60 && animationProgress < 90 && "Comparing with crop requirements..."}
                                        {animationProgress >= 90 && "Finalizing recommendation..."}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="md:col-span-8"
                >
                    <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all h-full">
                        {!crop && !loading && (
                            <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                                {/* <img src="/farming_illustration.jpg" alt="Farming illustration" className="mb-6 rounded-lg" /> */}
                                <h3 className="text-xl font-bold text-blue-100">Ready for Your Recommendation</h3>
                                <p className="text-slate-400 mt-2">
                                    Click "Recommend Crop" to get started with your personalized agricultural guidance.
                                </p>
                            </div>
                        )}

                        <AnimatePresence>
                            {crop && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="p-6"
                                >
                                    <div className="bg-slate-700 border border-slate-600 rounded-lg p-6 mb-6">
                                        <div className="flex items-center">
                                            <span className="text-5xl mr-4">{cropImageMap[crop.toString().toLowerCase()] || '🌱'}</span>
                                            <div>
                                                <h2 className="text-2xl font-bold text-blue-100">
                                                    Recommended Crop: {crop}
                                                </h2>
                                                <div className="mt-1 flex">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-900 text-teal-400">
                                                        Best Match
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="prose dark:prose-invert max-w-none mt-6">
                                        <h3 className="text-lg font-semibold flex items-center text-blue-100">
                                            <Sun className="mr-2 h-5 w-5 text-yellow-400" />
                                            Why This Crop Is Recommended
                                        </h3>
                                        <p className="text-slate-300 whitespace-pre-line">
                                            {explanation || "Generating explanation..."}
                                        </p>
                                    </div>

                                    <AnimatePresence>
                                        {showDetails && data && (
                                            <motion.div 
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-8"
                                            >
                                                <Button 
                                                    className="flex items-center justify-between w-full p-3 bg-slate-700 text-blue-100 font-medium mb-4"
                                                    onClick={() => setShowDetails(prev => !prev)}
                                                    variant="ghost"
                                                >
                                                    <span className="flex items-center">
                                                        <Sprout className="mr-2 h-5 w-5 text-teal-400" />
                                                        Environmental Conditions
                                                    </span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="18 15 12 9 6 15"></polyline>
                                                    </svg>
                                                </Button>

                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                                    <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 shadow-sm">
                                                        <div className="flex items-center mb-2">
                                                            <div className="bg-green-900 p-2 rounded-full mr-3">
                                                                <Leaf className="h-5 w-5 text-green-400" />
                                                            </div>
                                                            <span className="font-medium text-slate-200">Nitrogen</span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-2xl font-bold text-slate-200">{data?.N} ppm</span>
                                                            <span className={`${getNutrientColor(getNutrientLevel(data?.N, 'N'))} font-medium`}>
                                                                {getNutrientLevel(data?.N, 'N')}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 shadow-sm">
                                                        <div className="flex items-center mb-2">
                                                            <div className="bg-purple-900 p-2 rounded-full mr-3">
                                                                <Leaf className="h-5 w-5 text-purple-400" />
                                                            </div>
                                                            <span className="font-medium text-slate-200">Phosphorus</span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-2xl font-bold text-slate-200">{data?.P} ppm</span>
                                                            <span className={`${getNutrientColor(getNutrientLevel(data?.P, 'P'))} font-medium`}>
                                                                {getNutrientLevel(data?.P, 'P')}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 shadow-sm">
                                                        <div className="flex items-center mb-2">
                                                            <div className="bg-blue-900 p-2 rounded-full mr-3">
                                                                <Leaf className="h-5 w-5 text-blue-400" />
                                                            </div>
                                                            <span className="font-medium text-slate-200">Potassium</span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-2xl font-bold text-slate-200">{data?.K} ppm</span>
                                                            <span className={`${getNutrientColor(getNutrientLevel(data?.K, 'K'))} font-medium`}>
                                                                {getNutrientLevel(data?.K, 'K')}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 shadow-sm">
                                                        <div className="flex items-center mb-2">
                                                            <div className="bg-yellow-900 p-2 rounded-full mr-3">
                                                                <Sprout className="h-5 w-5 text-yellow-400" />
                                                            </div>
                                                            <span className="font-medium text-slate-200">Soil pH</span>
                                                        </div>
                                                        <div className="text-2xl font-bold text-slate-200">
                                                            {data?.pH} {data?.pH < 6 ? '(Acidic)' : data?.pH > 7 ? '(Alkaline)' : '(Neutral)'}
                                                        </div>
                                                    </div>

                                                    <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 shadow-sm">
                                                        <div className="flex items-center mb-2">
                                                            <div className="bg-red-900 p-2 rounded-full mr-3">
                                                                <Thermometer className="h-5 w-5 text-red-400" />
                                                            </div>
                                                            <span className="font-medium text-slate-200">Temperature</span>
                                                        </div>
                                                        <div className="text-2xl font-bold text-slate-200">{data?.Temperature}°C</div>
                                                    </div>

                                                    <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 shadow-sm">
                                                        <div className="flex items-center mb-2">
                                                            <div className="bg-blue-900 p-2 rounded-full mr-3">
                                                                <Droplets className="h-5 w-5 text-blue-400" />
                                                            </div>
                                                            <span className="font-medium text-slate-200">Humidity</span>
                                                        </div>
                                                        <div className="text-2xl font-bold text-slate-200">{data?.Humidity}%</div>
                                                    </div>

                                                    <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 shadow-sm">
                                                        <div className="flex items-center mb-2">
                                                            <div className="bg-indigo-900 p-2 rounded-full mr-3">
                                                                <Cloud className="h-5 w-5 text-indigo-400" />
                                                            </div>
                                                            <span className="font-medium text-slate-200">Rainfall</span>
                                                        </div>
                                                        <div className="text-2xl font-bold text-slate-200">{data?.Rainfall} mm</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}