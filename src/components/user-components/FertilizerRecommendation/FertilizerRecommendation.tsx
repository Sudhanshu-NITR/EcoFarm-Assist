'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

import RecommendButton from '@/components/user-components/FertilizerRecommendation/RecommendButton';
import RecommendationResult from '@/components/user-components/FertilizerRecommendation/RecommendationResult';

export default function FertilizerRecommendation() {
    const [loading, setLoading] = useState(false);
    const [cropName, setCropName] = useState<string>("");
    const [soilType, setSoilType] = useState<string>("");
    const [fertilizer, setFertilizer] = useState<string>("");
    const [explanation, setExplanation] = useState<string>("");
    const [recommendationDetails, setRecommendationDetails] = useState<any>(null);
    const [animationProgress, setAnimationProgress] = useState<number>(0);

    const {data: session} = useSession();

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

    const handleRecommend = async () => {
        setLoading(true);
        setFertilizer("");
        setExplanation("");
        setRecommendationDetails(null);
    
        try {
            const response = await fetch("/api/fertilizer-prediction", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    crop: cropName, 
                    soil_type: soilType,
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
            setRecommendationDetails(result.details);
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
                            recommendationDetails={recommendationDetails}
                        />
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}