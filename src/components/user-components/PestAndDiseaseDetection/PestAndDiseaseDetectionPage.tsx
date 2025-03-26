'use client';
import axios from 'axios';
import PageHeader from '@/components/user-components/PestAndDiseaseDetection/PageHeader';
import ImageUploadTabs from '@/components/user-components/PestAndDiseaseDetection/ImageUploadsTab';
import ImageUploadSection from '@/components/user-components/PestAndDiseaseDetection/ImageUploadsSection';
import ActionButtons from '@/components/user-components/PestAndDiseaseDetection/ActionButtons';
import ErrorDisplay from '@/components/user-components/PestAndDiseaseDetection/ErrorDisplay';
import ResultDisplay from '@/components/user-components/PestAndDiseaseDetection/ResultDisplay';
import React, { useRef, RefObject, useState } from 'react'

export default function PestAndDiseaseDetectionPage() {
  const [image, setImage] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ disease: string; details: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

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

        const maxSize = 512;
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

        canvas.toBlob((blob) => {
          if (blob) {
            setImage(blob);
            setPreview(URL.createObjectURL(blob));
            setResult(null);
          }
        }, 'image/jpeg', 0.7);
      };
    };
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      compressImage(file);
    }
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
        '/api/disease-prediction',
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
      <div className="max-w-4xl mx-auto py-6">
        <PageHeader />

        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6">
            <ImageUploadTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            <ImageUploadSection
              activeTab={activeTab}
              preview={preview}
              videoRef={videoRef as RefObject<HTMLVideoElement>}
              fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
              onFileChange={handleFileChange}
              onCaptureImage={captureImage}
              onStartCamera={startCamera}
            />

            <ActionButtons
              preview={preview}
              loading={loading}
              onUpload={handleUpload}
              onReset={handleReset}
            />

            <ErrorDisplay error={error} />

            <ResultDisplay result={result} />
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>For best results, capture clear images of affected Crop leaf areas in good lighting.</p>
        </div>
      </div>
    </div>
  );
}