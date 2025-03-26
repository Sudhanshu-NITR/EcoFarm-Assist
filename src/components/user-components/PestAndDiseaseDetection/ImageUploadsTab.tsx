'use client'
import React from 'react';
import { Upload, Camera } from 'lucide-react';

interface ImageUploadTabsProps {
  activeTab: 'upload' | 'camera';
  onTabChange: (tab: 'upload' | 'camera') => void;
}

export default function ImageUploadTabs({ activeTab, onTabChange }: ImageUploadTabsProps) {
  return (
    <div className="flex border-b border-slate-700 mb-6">
      <button 
        onClick={() => onTabChange('upload')} 
        className={`px-4 py-2 font-medium flex items-center ${activeTab === 'upload' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-slate-300'}`}
      >
        <Upload className="h-4 w-4 mr-2" /> Upload Image
      </button>
      <button 
        onClick={() => onTabChange('camera')} 
        className={`px-4 py-2 font-medium flex items-center ${activeTab === 'camera' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-slate-300'}`}
      >
        <Camera className="h-4 w-4 mr-2" /> Use Camera
      </button>
    </div>
  );
}