'use client';
import React, { useState } from 'react';
import { 
    User, 
    Globe, 
    Lock, 
    ChevronDown, 
    Check, 
    Eye, 
    EyeOff, 
    Save,
    AlertCircle,
    Loader2,
    Droplet,
    Leaf
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Profile() {
    const [language, setLanguage] = useState<string>('english');
    const [languageDropdownOpen, setLanguageDropdownOpen] = useState<boolean>(false);
    const languages = [
        { code: 'english', name: 'English' },
        { code: 'hindi', name: 'Hindi' },
        { code: 'spanish', name: 'Spanish' },
        { code: 'french', name: 'French' },
        { code: 'arabic', name: 'Arabic' },
    ];

    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Language change handler
    const handleLanguageChange = async (langCode: string) => {
        try {
            setIsLoading(true); 
            // Simulate API call with delay
            await new Promise(resolve => setTimeout(resolve, 800));
            setLanguage(langCode);
            setLanguageDropdownOpen(false);
            setIsLoading(false);
        } catch (error) {
            console.error('Error changing language:', error);
            setIsLoading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError(null);
        setPasswordSuccess(null);

        // Validate passwords
        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords don't match");
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            return;
        }

        try {
            setIsLoading(true);
            
            // Simulate API call with delay
            await new Promise(resolve => setTimeout(resolve, 1200));
            
            // Fake validation (in real app, this would be an API call)
            if (currentPassword === 'wrongpassword') {
                setPasswordError("Current password is incorrect");
                setIsLoading(false);
                return;
            }
            
            // Success path
            setPasswordSuccess("Password updated successfully");
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setIsLoading(false);
        } catch (error) {
            console.error('Error changing password:', error);
            setPasswordError("Failed to update password. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 bg-fixed overflow-auto">
            <div className="w-full max-w-3xl p-8 space-y-6 bg-slate-800 rounded-lg shadow-lg my-8 border border-slate-700 relative">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-4 text-blue-100">
                        Profile Settings
                    </h1>
                    <p className="mb-4 text-slate-300 italic">
                        Customize your account preferences
                    </p>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto rounded-full"></div>
                </div>

                <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-blue-100 flex items-center">
                            <User className="mr-2 h-5 w-5 text-blue-400" />
                            User Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center">
                                <User className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-200">John Doe</h3>
                                <p className="text-slate-400">john.doe@example.com</p>
                                <p className="text-slate-500 text-sm">Member since: March 2023</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-blue-100 flex items-center">
                                <Globe className="mr-2 h-5 w-5 text-blue-400" />
                                Language Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-300 mb-4">Select your preferred language for the application</p>
                            
                            <div className="relative">
                                <button
                                    onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                                    className="w-full flex items-center justify-between p-3 bg-slate-700 border border-slate-600 rounded-lg text-white hover:bg-slate-600 transition-colors"
                                    disabled={isLoading}
                                >
                                    <span className="flex items-center">
                                        <Globe className="h-5 w-5 mr-2 text-slate-400" />
                                        {languages.find(lang => lang.code === language)?.name || 'Select language'}
                                    </span>
                                    {isLoading ? (
                                        <Loader2 className="h-5 w-5 text-slate-400 animate-spin" />
                                    ) : (
                                        <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${languageDropdownOpen ? 'transform rotate-180' : ''}`} />
                                    )}
                                </button>
                                
                                {languageDropdownOpen && (
                                    <div className="absolute mt-1 w-full bg-slate-700 border border-slate-600 rounded-lg shadow-lg overflow-hidden z-10">
                                        {languages.map(lang => (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLanguageChange(lang.code)}
                                                className="w-full text-left p-3 flex items-center justify-between hover:bg-slate-600 transition-colors"
                                            >
                                                <span>{lang.name}</span>
                                                {lang.code === language && (
                                                    <Check className="h-5 w-5 text-green-400" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Card */}
                    <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-blue-100 flex items-center">
                                <Lock className="mr-2 h-5 w-5 text-blue-400" />
                                Security Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-slate-700 p-4 rounded-md border border-slate-600">
                                <h3 className="text-lg font-medium text-slate-200">Account Protection</h3>
                                <p className="text-slate-300 mt-2">Your account has standard security measures. Enable 2FA for enhanced protection.</p>
                                <Button variant="link" className="mt-2 text-blue-400 hover:text-blue-300 p-0">
                                    Set up 2-Factor Authentication
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Password Change Card */}
                <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-blue-100 flex items-center">
                            <Lock className="mr-2 h-5 w-5 text-blue-400" />
                            Change Password
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-300 mb-4">Update your password to maintain account security</p>
                        
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            {/* Current Password */}
                            <div>
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-200 mb-1">
                                    Current Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="currentPassword"
                                        type={showCurrentPassword ? "text" : "password"}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:border-blue-400 focus:ring-blue-400"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-white"
                                    >
                                        {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                            
                            {/* New Password */}
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-slate-200 mb-1">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="newPassword"
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:border-blue-400 focus:ring-blue-400"
                                        required
                                        minLength={8}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-white"
                                    >
                                        {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Password must be at least 8 characters long</p>
                            </div>
                            
                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-200 mb-1">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:border-blue-400 focus:ring-blue-400"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-white"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Error/Success Messages */}
                            {passwordError && (
                                <div className="p-3 bg-red-900/40 border border-red-800 rounded-lg flex items-start">
                                    <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <p className="text-red-300">{passwordError}</p>
                                </div>
                            )}
                            
                            {passwordSuccess && (
                                <div className="p-3 bg-green-900/40 border border-green-800 rounded-lg flex items-start">
                                    <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <p className="text-green-300">{passwordSuccess}</p>
                                </div>
                            )}
                            
                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors font-medium"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-5 w-5 mr-2" />
                                        Update Password
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                
                <div className="text-center text-xs text-slate-400 mt-2">
                    <p>Advanced agricultural technology for modern farmers</p>
                </div>
            </div>
        </div>
    );
}