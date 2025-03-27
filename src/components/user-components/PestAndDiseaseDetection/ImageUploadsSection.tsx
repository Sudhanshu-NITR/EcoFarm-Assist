'use client'
import React, { RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, RefreshCw } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadSectionProps {
  activeTab: 'upload' | 'camera';
  preview: string | null;
  videoRef: RefObject<HTMLVideoElement>;
  fileInputRef: RefObject<HTMLInputElement>;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCaptureImage: () => void;
  onStartCamera: () => void;
}

export default function ImageUploadSection({
  activeTab,
  preview,
  videoRef,
  fileInputRef,
  onFileChange,
  onCaptureImage,
  onStartCamera
}: ImageUploadSectionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="w-full p-6 bg-slate-800 rounded-lg border border-slate-700 relative"
      >
        {activeTab === 'upload' ? (
          <UploadSection
            preview={preview}
            fileInputRef={fileInputRef}
            onFileChange={onFileChange}
          />
        ) : (
          <CameraSection
            preview={preview}
            videoRef={videoRef}
            onCaptureImage={onCaptureImage}
            onStartCamera={onStartCamera}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function UploadSection({
  preview,
  fileInputRef,
  onFileChange
}: {
  preview: string | null,
  fileInputRef: RefObject<HTMLInputElement>,
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
        id="fileInput"
        ref={fileInputRef}
      />
      <label htmlFor="fileInput" className={`
        w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center
        ${preview ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600 hover:border-blue-500 hover:bg-blue-500/10'}
        transition-all duration-300 cursor-pointer
      `}>
        {preview ? (
          <div className="relative w-full h-full">
            <Image src={preview} alt="Uploaded Leaf" className="w-full h-full object-contain p-2" />
            <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
              <p className="text-blue-100 text-sm">Click to replace image</p>
            </div>
          </div>
        ) : (
          <>
            <Upload className="h-10 w-10 text-slate-400 mb-2" />
            <p className="text-slate-300 text-center">
              Drag & drop your leaf image here<br />
              <span className="text-sm text-slate-400">or click to browse files</span>
            </p>
          </>
        )}
      </label>
    </div>
  );
}

function CameraSection({
  preview,
  videoRef,
  onCaptureImage,
  onStartCamera
}: {
  preview: string | null,
  videoRef: RefObject<HTMLVideoElement>,
  onCaptureImage: () => void,
  onStartCamera: () => void
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-64 bg-slate-900 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        {preview && (
          <div className="absolute inset-0">
            <Image src={preview} alt="Captured" className="w-full h-full object-contain" />
          </div>
        )}
      </div>
      <div className="mt-4 flex space-x-4">
        {!preview ? (
          <button
            onClick={onCaptureImage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition-colors"
          >
            <Camera className="h-5 w-5 mr-2" /> Capture Image
          </button>
        ) : (
          <button
            onClick={() => {
              onStartCamera();
            }}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg flex items-center hover:bg-slate-600 transition-colors"
          >
            <RefreshCw className="h-5 w-5 mr-2" /> Retake
          </button>
        )}
      </div>
    </div>
  );
}