'use client'
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordFormInputProps {
    id: string;
    label: string;
    value: string;
    showPassword: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onToggleVisibility: () => void;
    required?: boolean;
    minLength?: number;
    hint?: string;
}

const PasswordFormInput: React.FC<PasswordFormInputProps> = ({ 
    id, 
    label, 
    value, 
    showPassword, 
    onChange, 
    onToggleVisibility, 
    required = false,
    minLength,
    hint
}) => {
    return (
        <div>
            <label htmlFor={id} className="block text-xs font-medium text-slate-200 mb-1">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    className="w-full py-2 px-3 bg-slate-700 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:border-blue-400 focus:ring-blue-400 text-sm"
                    required={required}
                    minLength={minLength}
                />
                <button
                    type="button"
                    onClick={onToggleVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-slate-400 hover:text-white"
                >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            </div>
            {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
        </div>
    );
};

export default PasswordFormInput;