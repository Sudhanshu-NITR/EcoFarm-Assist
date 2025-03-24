'use client'
import React, { useState } from 'react';
import { Lock, Save, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PasswordFormInput from './PasswordFormInput';
import StatusMessage from './StatusMessage';

const PasswordChangeCard: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
            await new Promise(resolve => setTimeout(resolve, 1200));
            
            if (currentPassword === 'wrongpassword') {
                setPasswordError("Current password is incorrect");
                setIsLoading(false);
                return;
            }
            
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
        <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all">
            <CardHeader className="pb-1 pt-3">
                <CardTitle className="text-blue-100 flex items-center text-lg">
                    <Lock className="mr-2 h-4 w-4 text-blue-400" />
                    Change Password
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-slate-300 mb-3 text-sm">Update your password to maintain account security</p>
                
                <form onSubmit={handlePasswordChange} className="space-y-3">
                    <PasswordFormInput
                        id="currentPassword"
                        label="Current Password"
                        value={currentPassword}
                        showPassword={showCurrentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        onToggleVisibility={() => setShowCurrentPassword(!showCurrentPassword)}
                        required
                    />
                    
                    <PasswordFormInput
                        id="newPassword"
                        label="New Password"
                        value={newPassword}
                        showPassword={showNewPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onToggleVisibility={() => setShowNewPassword(!showNewPassword)}
                        required
                        minLength={8}
                        hint="Password must be at least 8 characters long"
                    />
                    
                    <PasswordFormInput
                        id="confirmPassword"
                        label="Confirm New Password"
                        value={confirmPassword}
                        showPassword={showConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                        required
                    />
                    
                    {/* Error/Success Messages */}
                    {passwordError && <StatusMessage type="error" message={passwordError} />}
                    {passwordSuccess && <StatusMessage type="success" message={passwordSuccess} />}
                    
                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-colors font-medium text-sm"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4 mr-2" />
                                Update Password
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default PasswordChangeCard;