'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
    Sun, Sprout, Leaf, Thermometer, Droplets, Cloud 
} from 'lucide-react';

interface CropRecommendationResultProps {
    crop: string;
    explanation: string;
    data: any;
}

const cropImageMap: Record<string, string> = {
    "apple": "🍎", "banana": "🍌", "blackgram": "🌱", "chickpea": "🌱",
    "coconut": "🥥", "coffee": "☕", "cotton": "🧶", "grapes": "🍇",
    "jute": "🧵", "kidneybeans": "🫘", "lentil": "🌰", "maize": "🌽",
    "mango": "🥭", "mothbeans": "🌱", "mungbean": "🌱", "muskmelon": "🍈",
    "orange": "🍊", "papaya": "🍈", "pigeonpeas": "🌿", "pomegranate": "🍎",
    "rice": "🌾", "watermelon": "🍉"
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

export default function RecommendationResult({ 
    crop, 
    explanation, 
    data 
}: CropRecommendationResultProps) {
    const [showDetails, setShowDetails] = useState(false);

    if (!crop) return (
        <div className="flex flex-col items-center justify-center h-full p-10 text-center">
            <h3 className="text-xl font-bold text-blue-100">Ready for Your Recommendation</h3>
            <p className="text-slate-400 mt-2">
                Click &quot;Recommend Crop&quot; to get started with your personalized agricultural guidance.
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
                    <span className="text-5xl mr-4">
                        {cropImageMap[crop.toString().toLowerCase()] || '🌱'}
                    </span>
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

            {data && (
                <AnimatePresence>
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

                        {showDetails && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                {/* Nutrient and Environmental Details Cards */}
                                {[
                                    { 
                                        icon: Leaf, 
                                        color: 'green', 
                                        title: 'Nitrogen', 
                                        value: data.nitrogen.toFixed(2), 
                                        type: 'N' 
                                    },
                                    { 
                                        icon: Leaf, 
                                        color: 'purple', 
                                        title: 'Phosphorus', 
                                        value: data.phosphorus, 
                                        type: 'P' 
                                    },
                                    { 
                                        icon: Leaf, 
                                        color: 'blue', 
                                        title: 'Potassium', 
                                        value: data.potassium, 
                                        type: 'K' 
                                    }
                                ].map(({ icon: Icon, color, title, value, type }) => (
                                    <div 
                                        key={title} 
                                        className="bg-slate-700 border border-slate-600 rounded-lg p-4 shadow-sm"
                                    >
                                        <div className="flex items-center mb-2">
                                            <div className={`bg-${color}-900 p-2 rounded-full mr-3`}>
                                                <Icon className={`h-5 w-5 text-${color}-400`} />
                                            </div>
                                            <span className="font-medium text-slate-200">{title}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-slate-200">{value} ppm</span>
                                            <span 
                                                className={`${getNutrientColor(getNutrientLevel(value, type))} text-sm font-medium`}
                                            >
                                                {getNutrientLevel(value, type)}
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                {[
                                    { 
                                        icon: Sprout, 
                                        color: 'yellow', 
                                        title: 'Soil pH', 
                                        value: data.ph.toFixed(2),
                                        note: data.ph < 6 ? '(Acidic)' : data.ph > 7 ? '(Alkaline)' : '(Neutral)' 
                                    },
                                    { 
                                        icon: Thermometer, 
                                        color: 'red', 
                                        title: 'Temperature', 
                                        value: data.temperature,
                                        unit: '°C' 
                                    },
                                    { 
                                        icon: Droplets, 
                                        color: 'blue', 
                                        title: 'Humidity', 
                                        value: data.humidity,
                                        unit: '%' 
                                    },
                                    { 
                                        icon: Cloud, 
                                        color: 'indigo', 
                                        title: 'Rainfall', 
                                        value: data.rainfall,
                                        unit: 'mm' 
                                    }
                                ].map(({ icon: Icon, color, title, value, unit, note }) => (
                                    <div 
                                        key={title} 
                                        className="bg-slate-700 border border-slate-600 rounded-lg p-4 shadow-sm"
                                    >
                                        <div className="flex items-center mb-2">
                                            <div className={`bg-${color}-900 p-2 rounded-full mr-3`}>
                                                <Icon className={`h-5 w-5 text-${color}-400`} />
                                            </div>
                                            <span className="font-medium text-slate-200">{title}</span>
                                        </div>
                                        <div className="text-lg font-bold text-slate-200">
                                            {value}{unit} {note || ''}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            )}
        </motion.div>
    );
}