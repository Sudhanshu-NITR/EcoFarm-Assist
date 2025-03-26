'use client'
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, AlertCircle, Info } from 'lucide-react';

interface ResultDisplayProps {
  result: { disease: string; details: string } | null;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  return (
    <AnimatePresence>
      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="mt-6"
        >
          <div className="p-6 bg-slate-800 rounded-xl border border-slate-700 shadow-xl">
            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
              <Leaf className="h-5 w-5 mr-2" /> Analysis Results
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-slate-400 text-sm font-medium uppercase tracking-wider flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1 text-blue-400" /> Detected Issue
                </h4>
                <p className="text-xl font-semibold text-blue-100 mt-1">{result.disease}</p>
              </div>
              
              <div>
                <h4 className="text-slate-400 text-sm font-medium uppercase tracking-wider flex items-center">
                  <Info className="h-4 w-4 mr-1 text-blue-400" /> Information & Treatment
                </h4>
                <div className="mt-2 text-slate-200 leading-relaxed bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  {result.details.split('\n').map((paragraph, index) => (
                    <p key={index} className={index > 0 ? "mt-3" : ""}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}