'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { 
    Sun, Leaf
} from 'lucide-react';

const cropRemarks = {
    "rice": "Grows well in high rainfall areas with clayey soil.",
    "Moth Beans": "Thrives in arid and semi-arid regions with sandy soil.",
    "pomegranate": "Prefers hot and dry climates with well-drained soil.",
    "papaya": "Needs warm temperatures and well-drained, loamy soil.",
    "orange": "Requires subtropical climate with good irrigation.",
    "muskmelon": "Grows best in warm climate and sandy loam soil.",
    "mango": "Thrives in tropical climate with deep, well-drained soil.",
    "apple": "Prefers cold climate with well-drained loamy soil.",
    "grapes": "Needs warm climate and deep, well-drained soil.",
    "banana": "Requires high humidity and loamy soil with good drainage.",
    "Chickpea": "Grows well in dry, cool climates with well-drained soil.",
    "Pigeon Peas": "Thrives in tropical and subtropical regions with light soil.",
    "Adzuki Beans": "Requires warm temperatures and well-drained loamy soil.",
    "Black gram": "Grows well in tropical regions with loamy soil.",
    "Coconut": "Needs coastal tropical climate with sandy loam soil.",
    "Kidney Beans": "Prefers warm days and cool nights with loamy soil.",
    "wheat": "Thrives in temperate regions with well-drained loamy soil.",
    "Tobacco": "Needs warm climate with well-drained sandy soil.",
    "Sugarcane": "Requires hot, humid climate with deep fertile soil.",
    "Rubber": "Grows in hot and humid climate with laterite soil.",
    "Peas": "Prefers cool climate with well-drained clayey soil.",
    "Ground Nut": "Thrives in warm climate with sandy loam soil.",
    "Cotton": "Needs warm climate with black soil for good growth.",
    "Coffee": "Requires cool climate with well-drained, rich soil.",
    "Jute": "Grows best in warm, humid climate with alluvial soil.",
    "Lentil": "Thrives in cool climate with sandy loam soil.",
    "maize": "Requires warm climate with well-drained loamy soil.",
    "millet": "Grows well in dry, sandy soil with minimal water.",
    "Tea": "Prefers humid climate with acidic, well-drained soil.",
    "Mung Bean": "Thrives in warm, semi-arid climate with loamy soil.",
    "watermelon": "Needs hot climate with sandy loam, well-drained soil."
};

interface FertilizerRecommendationResultProps {
    fertilizer: string;
    explanation: string;
    cropDetails?: {
        cropName: string;
        soilType: string;
    };
}

export default function FertilizerRecommendationResult({ 
    fertilizer, 
    explanation, 
    cropDetails,
}: FertilizerRecommendationResultProps) {
    const [showSoilRemarks, setShowSoilRemarks] = useState(false);

    if (!fertilizer) return (
        <div className="flex flex-col items-center justify-center h-full p-10 text-center">
            <h3 className="text-xl font-bold text-blue-100">Ready for Your Recommendation</h3>
            <p className="text-slate-400 mt-2">
                Select a crop and soil type to get personalized fertilizer recommendations.
            </p>
        </div>
    );
    console.log("explanation -> ", explanation);
    console.log("fertilizer -> ", fertilizer);
    
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6"
        >
            <div className="bg-slate-700 border border-slate-600 rounded-lg p-6 mb-6">
                <div className="flex items-center">
                    <span className="text-5xl mr-4">🌱</span>
                    <div>
                        <h2 className="text-2xl font-bold text-blue-100">
                            Recommended Fertilizer: {fertilizer}
                        </h2>
                        <div className="mt-1 flex space-x-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-900 text-teal-400">
                                {cropDetails?.cropName}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-400">
                                {cropDetails?.soilType}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="prose dark:prose-invert max-w-none mt-6">
                <h3 className="text-lg font-semibold flex items-center text-blue-100">
                    <Sun className="mr-2 h-5 w-5 text-yellow-400" />
                    Why This Fertilizer Is Recommended
                </h3>
                <p className="text-slate-300 whitespace-pre-line">
                    {explanation || "Generating explanation..."}
                </p>
            </div>

            {cropDetails?.cropName && (
                <div className="mt-8">
                    <button 
                        className="flex items-center justify-between w-full p-3 bg-slate-700 text-blue-100 font-medium mb-4 rounded-md"
                        onClick={() => setShowSoilRemarks(prev => !prev)}
                    >
                        <span className="flex items-center">
                            <Leaf className="mr-2 h-5 w-5 text-teal-400" />
                            Soil & Growing Conditions
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {showSoilRemarks ? 
                                <polyline points="6 9 12 15 18 9"></polyline> : 
                                <polyline points="18 15 12 9 6 15"></polyline>
                            }
                        </svg>
                    </button>

                    {showSoilRemarks && (
                        <div className="bg-slate-700 border border-slate-600 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-900 p-3 rounded-full mr-4">
                                    <Leaf className="h-6 w-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-lg text-blue-100">
                                        {cropDetails.cropName} remarks
                                    </h3>
                                    <p className="text-slate-300 mt-1">
                                        {cropRemarks[cropDetails.cropName as keyof typeof cropRemarks] || 
                                        "Information about this crop's ideal growing conditions is not available."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
}