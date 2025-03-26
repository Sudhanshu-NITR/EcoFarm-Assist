'use client'
import React from 'react'
import { Leaf, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";

interface FertilizerRecommendButtonProps {
    onRecommend: () => Promise<void>;
    loading: boolean;
    animationProgress: number;
    cropName: string;
    soilType: string;
    setCropName: (crop: string) => void;
    setSoilType: (soil: string) => void;
}

const CROP_OPTIONS = [
    'Rice', 'Wheat', 'Maize', 'Sugarcane', 'Cotton', 
    'Pulses', 'Soybean', 'Groundnut', 'Potato', 'Tomato'
];

const SOIL_TYPES = [
    'Loamy Soil', 
    'Peaty Soil', 
    'Acidic Soil', 
    'Neutral Soil', 
    'Alkaline Soil'
];

export default function FertilizerRecommendButton({ 
    onRecommend, 
    loading, 
    animationProgress,
    cropName,
    soilType,
    setCropName,
    setSoilType
}: FertilizerRecommendButtonProps) {
    return (
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
                        Fertilizer Recommendation
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        Get personalized fertilizer recommendations
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Select Crop
                            </label>
                            <Select 
                                value={cropName} 
                                onValueChange={setCropName}
                            >
                                <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-slate-200">
                                    <SelectValue placeholder="Choose a Crop" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                                    {CROP_OPTIONS.map(crop => (
                                        <SelectItem 
                                            key={crop} 
                                            value={crop} 
                                            className="hover:bg-slate-700 focus:bg-slate-700"
                                        >
                                            {crop}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Select Soil Type
                            </label>
                            <Select 
                                value={soilType} 
                                onValueChange={setSoilType}
                            >
                                <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-slate-200">
                                    <SelectValue placeholder="Choose Soil Type" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                                    {SOIL_TYPES.map(soil => (
                                        <SelectItem 
                                            key={soil} 
                                            value={soil} 
                                            className="hover:bg-slate-700 focus:bg-slate-700"
                                        >
                                            {soil}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button 
                        onClick={onRecommend} 
                        disabled={loading || !cropName || !soilType}
                        className={`w-full py-3 px-4 mt-4 font-medium text-white ${
                            (loading || !cropName || !soilType) 
                            ? 'bg-blue-800 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
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
                                <span>Recommend Fertilizer</span>
                            </div>
                        )}
                    </Button>
                    
                    {loading && (
                        <div className="mt-4">
                            <div className="w-full bg-slate-700 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${animationProgress}%` }}></div>
                            </div>
                            <div className="text-xs text-slate-400 mt-2">
                                {animationProgress < 30 && "Gathering crop and soil data..."}
                                {animationProgress >= 30 && animationProgress < 60 && "Analyzing fertilizer requirements..."}
                                {animationProgress >= 60 && animationProgress < 90 && "Matching with soil conditions..."}
                                {animationProgress >= 90 && "Finalizing recommendation..."}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}