'use client'
import { Leaf } from 'lucide-react';
import React from 'react'
import { motion } from 'framer-motion';


export default function pestAndDiseaseDetection() {

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
                        <h2 className="text-3xl font-extrabold tracking-tight text-blue-100">Pest & Disease Detection</h2>
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
        </div>
    )
}