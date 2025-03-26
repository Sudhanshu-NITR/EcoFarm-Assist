'use client'
import React from 'react';
import { Leaf, Loader2, RefreshCw } from 'lucide-react';

interface ActionButtonsProps {
  preview: string | null;
  loading: boolean;
  onUpload: () => void;
  onReset: () => void;
}

export default function ActionButtons({ 
  preview, 
  loading, 
  onUpload, 
  onReset 
}: ActionButtonsProps) {
  return (
    <div className="mt-6 flex space-x-3">
      <button 
        onClick={onUpload} 
        className={`
          px-6 py-3 rounded-lg shadow flex items-center justify-center
          ${preview ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}
          transition-all duration-300 font-medium flex-1 max-w-xs
        `}
        disabled={!preview || loading}
      >
        {loading ? (
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
        ) : (
          <Leaf className="h-5 w-5 mr-2" />
        )}
        {loading ? 'Analyzing...' : 'Analyze Crop'}
      </button>
      
      {preview && (
        <button 
          onClick={onReset} 
          className="px-4 py-3 bg-slate-700 text-slate-300 rounded-lg shadow hover:bg-slate-600 transition-colors"
          disabled={loading}
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}