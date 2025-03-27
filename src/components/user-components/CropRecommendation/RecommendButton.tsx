'use client'
import React from 'react'
import { Leaf, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

interface RecommendButtonProps {
    onRecommend: () => Promise<void>;
    loading: boolean;
    animationProgress: number;
}

export default function RecommendButton({ 
    onRecommend, 
    loading, 
    animationProgress 
}: RecommendButtonProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-4"
        >
            <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all h-fit">
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
                        onClick={onRecommend} 
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
    );
}