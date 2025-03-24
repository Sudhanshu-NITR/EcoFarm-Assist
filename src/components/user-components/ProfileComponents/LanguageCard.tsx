'use client'
import React, { useState } from 'react';
import { Globe, ChevronDown, Check, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface LanguageSettingsCardProps {
    language: string;
    onLanguageChange: (langCode: string) => Promise<void>;
    isLoading: boolean;
}

const LanguageSettingsCard: React.FC<LanguageSettingsCardProps> = ({ 
    language, 
    onLanguageChange,
    isLoading 
}) => {
    const [languageDropdownOpen, setLanguageDropdownOpen] = useState<boolean>(false);
    
    const languages = [
        { code: 'english', name: 'English' },
        { code: 'hindi', name: 'Hindi' },
        { code: 'spanish', name: 'Spanish' },
        { code: 'french', name: 'French' },
        { code: 'arabic', name: 'Arabic' },
    ];

    const handleLanguageSelect = async (langCode: string) => {
        await onLanguageChange(langCode);
        setLanguageDropdownOpen(false);
    };

    return (
        <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all">
            <CardHeader className="pb-1 pt-3">
                <CardTitle className="text-blue-100 flex items-center text-lg">
                    <Globe className="mr-2 h-4 w-4 text-blue-400" />
                    Language Settings
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-slate-300 text-sm mb-2">Select your preferred language</p>
                
                <div className="relative">
                    <button
                        onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                        className="w-full flex items-center justify-between py-2 px-3 bg-slate-700 border border-slate-600 rounded-md text-white hover:bg-slate-600 transition-colors text-sm"
                        disabled={isLoading}
                    >
                        <span className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-slate-400" />
                            {languages.find(lang => lang.code === language)?.name || 'Select language'}
                        </span>
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 text-slate-400 animate-spin" />
                        ) : (
                            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${languageDropdownOpen ? 'transform rotate-180' : ''}`} />
                        )}
                    </button>
                    
                    {languageDropdownOpen && (
                        <div className="absolute mt-1 w-full bg-slate-700 border border-slate-600 rounded-md shadow-lg overflow-hidden z-10">
                            {languages.map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageSelect(lang.code)}
                                    className="w-full text-left py-2 px-3 flex items-center justify-between hover:bg-slate-600 transition-colors text-sm"
                                >
                                    <span>{lang.name}</span>
                                    {lang.code === language && (
                                        <Check className="h-4 w-4 text-green-400" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default LanguageSettingsCard;