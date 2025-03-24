'use client';
import { Leaf, Upload, AlertCircle, Loader2, Camera, RefreshCw, Info } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function PestAndDiseaseDetection() {
    const [image, setImage] = useState<Blob | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<{ disease: string; details: string } | null>(null);
    const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            compressImage(file);
        }
    };

    // Compress & Convert Image to JPEG/WebP using Canvas
    const compressImage = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            if (!event.target?.result) return;
            const img = new Image();
            img.src = event.target.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                const maxSize = 512; // Resize to 512x512 max
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to JPEG with compression
                canvas.toBlob((blob) => {
                    if (blob) {
                        setImage(blob);
                        setPreview(URL.createObjectURL(blob));
                        // Reset result when new image is selected
                        setResult(null);
                    }
                }, 'image/jpeg', 0.7);
            };
        };
    };

    // Start camera
    const startCamera = async () => {
        try {
            if (streamRef.current) {
                stopCamera();
            }
            
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment', width: 512, height: 512 } 
            });
            
            streamRef.current = stream;
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
            setError('Unable to access camera. Please check permissions.');
        }
    };

    // Stop camera
    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }
    };

    // Capture image from camera
    const captureImage = () => {
        if (!videoRef.current) return;
        
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        
        if (ctx && videoRef.current) {
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            
            canvas.toBlob((blob) => {
                if (blob) {
                    setImage(blob);
                    setPreview(URL.createObjectURL(blob));
                    setResult(null);
                    stopCamera();
                }
            }, 'image/jpeg', 0.85);
        }
    };

    // Switch between tabs
    const handleTabChange = (tab: 'upload' | 'camera') => {
        setActiveTab(tab);
        if (tab === 'camera') {
            startCamera();
        } else {
            stopCamera();
        }
    };

    // Reset everything
    const handleReset = () => {
        setImage(null);
        setPreview(null);
        setResult(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Handle file upload
    const handleUpload = async () => {
        if (!image) return;
        setLoading(true);
        setResult(null);
        setError(null);

        const formData = new FormData();
        formData.append('file', image, 'leaf.jpeg');

        try {
            const response = await axios.post<{ disease: string; details: string }>(
                '/api/detect', 
                formData, 
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setResult(response.data);
        } catch (error) {
            console.error('Upload failed:', error);
            setError('Failed to analyze the image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Clean up on unmount
    React.useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
                                Crop Health Assistant
                            </h2>
                            <div className="h-1 w-48 bg-gradient-to-r from-green-400 to-teal-500 rounded-full mt-2"></div>
                            <p className="mt-4 text-gray-300 max-w-2xl">
                                Instantly identify pests and diseases in your crops with our AI-powered detection system.
                            </p>
                        </div>
                        <motion.div 
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                            className="h-16 w-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg"
                        >
                            <Leaf className="h-8 w-8 text-white" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-6">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-700 mb-6">
                            <button 
                                onClick={() => handleTabChange('upload')} 
                                className={`px-4 py-2 font-medium flex items-center ${activeTab === 'upload' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400 hover:text-gray-300'}`}
                            >
                                <Upload className="h-4 w-4 mr-2" /> Upload Image
                            </button>
                            <button 
                                onClick={() => handleTabChange('camera')} 
                                className={`px-4 py-2 font-medium flex items-center ${activeTab === 'camera' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400 hover:text-gray-300'}`}
                            >
                                <Camera className="h-4 w-4 mr-2" /> Use Camera
                            </button>
                        </div>

                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'upload' ? (
                                    <div className="flex flex-col items-center justify-center">
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handleFileChange} 
                                            className="hidden" 
                                            id="fileInput" 
                                            ref={fileInputRef}
                                        />
                                        <label htmlFor="fileInput" className={`
                                            w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center
                                            ${preview ? 'border-green-500 bg-green-500/10' : 'border-gray-600 hover:border-teal-500 hover:bg-teal-500/10'}
                                            transition-all duration-300 cursor-pointer
                                        `}>
                                            {preview ? (
                                                <div className="relative w-full h-full">
                                                    <img src={preview} alt="Uploaded Leaf" className="w-full h-full object-contain p-2" />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                                                        <p className="text-white text-sm">Click to replace image</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                                    <p className="text-gray-400 text-center">
                                                        Drag & drop your leaf image here<br />
                                                        <span className="text-sm text-gray-500">or click to browse files</span>
                                                    </p>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden">
                                            <video 
                                                ref={videoRef} 
                                                autoPlay 
                                                playsInline 
                                                className="w-full h-full object-cover"
                                            />
                                            {preview && (
                                                <div className="absolute inset-0">
                                                    <img src={preview} alt="Captured" className="w-full h-full object-contain" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-4 flex space-x-4">
                                            {!preview ? (
                                                <button 
                                                    onClick={captureImage} 
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-700 transition-colors"
                                                >
                                                    <Camera className="h-5 w-5 mr-2" /> Capture Image
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => {
                                                        setPreview(null);
                                                        setImage(null);
                                                        startCamera();
                                                    }} 
                                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center hover:bg-gray-700 transition-colors"
                                                >
                                                    <RefreshCw className="h-5 w-5 mr-2" /> Retake
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Action Buttons */}
                        <div className="mt-6 flex space-x-3">
                            <button 
                                onClick={handleUpload} 
                                className={`
                                    px-6 py-3 rounded-lg shadow flex items-center justify-center
                                    ${preview ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white hover:from-green-600 hover:to-teal-700' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
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
                                    onClick={handleReset} 
                                    className="px-4 py-3 bg-gray-700 text-gray-300 rounded-lg shadow hover:bg-gray-600 transition-colors"
                                    disabled={loading}
                                >
                                    <RefreshCw className="h-5 w-5" />
                                </button>
                            )}
                        </div>

                        {/* Error Message */}
                        <AnimatePresence>
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mt-6 p-4 bg-red-900/40 border border-red-800 rounded-lg flex items-start"
                                >
                                    <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <p className="text-red-300">{error}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Result Display */}
                        <AnimatePresence>
                            {result && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="mt-6"
                                >
                                    <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-xl">
                                        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
                                            <Leaf className="h-5 w-5 mr-2" /> Analysis Results
                                        </h3>
                                        
                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider flex items-center">
                                                    <AlertCircle className="h-4 w-4 mr-1 text-yellow-400" /> Detected Issue
                                                </h4>
                                                <p className="text-xl font-semibold text-white mt-1">{result.disease}</p>
                                            </div>
                                            
                                            <div>
                                                <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider flex items-center">
                                                    <Info className="h-4 w-4 mr-1 text-blue-400" /> Information & Treatment
                                                </h4>
                                                <div className="mt-2 text-white leading-relaxed bg-gray-800/50 p-4 rounded-lg border border-gray-700">
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
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>For best results, capture clear images of affected Crop leaf areas in good lighting.</p>
                </div>
            </div>
        </div>
    );
}