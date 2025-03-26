import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export default function PageHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="flex-1 p-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-blue-100">
          Crop Health Assistant
        </h2>
        <div className="h-10 w-10 bg-teal-500 rounded-full flex items-center justify-center">
          <Leaf className="h-5 w-5 text-white" />
        </div>
      </div>

      <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full mt-2"></div>

      <p className="mt-4 text-gray-300 max-w-2xl">
        Instantly identify pests and diseases in your crops with our AI-powered detection system.
      </p>
    </motion.div>
  );
}