'use client';
import React, { useState } from 'react';
import { Droplet, Leaf } from 'lucide-react';
import UserInfoCard from './ProfileComponents/ProfileHeader';
import LanguageSettingsCard from './ProfileComponents/LanguageCard';
import Password from './ProfileComponents/Password';

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>('english');

    const handleLanguageChange = async (langCode: string) => {
        try {
            setIsLoading(true); 
            await new Promise(resolve => setTimeout(resolve, 800));
            setLanguage(langCode);
            setIsLoading(false);
        } catch (error) {
            console.error('Error changing language:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 bg-fixed overflow-auto">
            <div className="w-full max-w-3xl p-4 sm:p-6 space-y-4 sm:space-y-6 bg-slate-800 rounded-lg shadow-lg my-8 border border-slate-700 relative">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight lg:text-4xl mb-2 sm:mb-4 text-blue-100">
                        Profile Settings
                    </h1>
                    <p className="mb-3 text-slate-300 italic text-sm">
                        Change your account preferences
                    </p>
                    <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto rounded-full"></div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                    <UserInfoCard />
                    <LanguageSettingsCard 
                        language={language}
                        onLanguageChange={handleLanguageChange}
                        isLoading={isLoading}
                    />
                    <Password />
                </div>

                
                <div className="text-center text-xs text-slate-400 mt-2 flex items-center justify-center">
                    <Droplet className="h-3 w-3 mr-1 text-blue-400" />
                        <p>Advanced agricultural technology for modern farmers</p>
                    <Leaf className="h-3 w-3 ml-1 text-green-400" />
                </div>
            </div>
        </div>
    );
}