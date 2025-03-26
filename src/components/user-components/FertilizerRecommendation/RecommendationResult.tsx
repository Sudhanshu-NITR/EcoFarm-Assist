'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Sun, Sprout, Leaf, BarChart3 
} from 'lucide-react';

interface FertilizerRecommendationResultProps {
    fertilizer: string;
    explanation: string;
    cropDetails?: {
        cropName: string;
        soilType: string;
    };
    recommendationDetails?: any;
}

export default function FertilizerRecommendationResult({ 
    fertilizer, 
    explanation, 
    cropDetails,
    recommendationDetails 
}: FertilizerRecommendationResultProps) {
    const [showDetails, setShowDetails] = useState(false);

    if (!fertilizer) return (
        <div className="flex flex-col items-center justify-center h-full p-10 text-center">
            <h3 className="text-xl font-bold text-blue-100">Ready for Your Recommendation</h3>
            <p className="text-slate-400 mt-2">
                Select a crop and soil type to get personalized fertilizer recommendations.
            </p>
        </div>
    );

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

            {recommendationDetails && (
                <div className="mt-8">
                    <button 
                        className="flex items-center justify-between w-full p-3 bg-slate-700 text-blue-100 font-medium mb-4"
                        onClick={() => setShowDetails(prev => !prev)}
                    >
                        <span className="flex items-center">
                            <BarChart3 className="mr-2 h-5 w-5 text-teal-400" />
                            Fertilizer Details
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                    </button>

                    {showDetails && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(recommendationDetails || {}).map(([key, value]) => (
                                <div 
                                    key={key} 
                                    className="bg-slate-700 border border-slate-600 rounded-lg p-4 shadow-sm"
                                >
                                    <div className="flex items-center mb-2">
                                        <div className="bg-blue-900 p-2 rounded-full mr-3">
                                            <Leaf className="h-5 w-5 text-blue-400" />
                                        </div>
                                        <span className="font-medium text-slate-200 capitalize">
                                            {key.replace(/_/g, ' ')}
                                        </span>
                                    </div>
                                    <div className="text-2xl font-bold text-slate-200">
                                        {value as string}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
}