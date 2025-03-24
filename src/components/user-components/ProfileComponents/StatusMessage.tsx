'use client'
import React from 'react';
import { AlertCircle, Check } from 'lucide-react';

interface StatusMessageProps {
    type: 'error' | 'success';
    message: string | null;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ type, message }) => {
    if (!message) return null;
    
    if (type === 'error') {
        return (
            <div className="p-2 bg-red-900/40 border border-red-800 rounded-md flex items-start">
                <AlertCircle className="h-4 w-4 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{message}</p>
            </div>
        );
    }
    
    return (
        <div className="p-2 bg-green-900/40 border border-green-800 rounded-md flex items-start">
            <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-green-300 text-sm">{message}</p>
        </div>
    );
};

export default StatusMessage;