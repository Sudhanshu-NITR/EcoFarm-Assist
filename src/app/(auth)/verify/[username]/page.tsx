'use client'
import { useParams, useRouter } from 'next/navigation';
import { toast } from "sonner"
import React, { useState, useRef, useEffect } from 'react'
import { verifySchema } from '@/schemas/verifySchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios, { AxiosError } from 'axios';
import { IApiResponse } from '../../../../types/ApiResponse';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form';
import { Button } from '@/components/ui/button';

function VerifyAccount() {
    const router = useRouter();
    const params = useParams<{username: string}>();
    const [verificationCode, setVerificationCode] = useState<string[]>(['', '', '', '', '', '']);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    
    // Initialize refs array
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 6);
    }, []);

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
    });

    // Handle input change for OTP fields
    const handleChange = (index: number, value: string): void => {
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        // Auto-focus next input field when current one is filled
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Update form value with combined code
        form.setValue('code', newCode.join(''));
    };

    // Handle key down for backspace navigation
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle paste functionality for entire OTP
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        
        // Only process if the pasted content looks like an OTP code
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split('');
            setVerificationCode(digits);
            form.setValue('code', pastedData);
            
            // Focus the last input
            inputRefs.current[5]?.focus();
        }
    };

    const onSubmit = async (data: z.infer<typeof verifySchema>): Promise<void> => {
        try {
            const decodedEmail = decodeURIComponent(params.username);

            const response = await axios.post(`/api/verify-code`, {
                email: decodedEmail,
                code: verificationCode.join('')
            });
            
            if(response.data.success){
                router.replace('/sign-in');
                toast((response.data.success)? 'Success':'Failure', {
                    description: response.data.message,
                });
            }
            else{
                const error = response.data.message;
                console.error("Error in verification of user, ", error);
                toast.error('Verification Failed, Please try again', {
                    description: error,
                    className: "text-red-500 bg-white"
                });
            }
        } catch (error) {
            console.error("Error in verification of user, ", error);
            const axiosError = error as AxiosError<IApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            toast.error('Verification Failed, Please SignUp again', {
                description: errorMessage,
                className: "text-red-500 bg-white"
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-md my-20">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-6">
                        Verify Your Account
                    </h1>
                    <p className="mb-8 text-gray-600">
                        Enter the 6-digit verification code sent to your email
                    </p>
                    
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                name="code"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-center gap-2 mb-6">
                                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                                <Input
                                                    key={index}
                                                    ref={(el: HTMLInputElement | null) => {
                                                        if (el) inputRefs.current[index] = el;
                                                    }}
                                                    type="text"
                                                    maxLength={1}
                                                    value={verificationCode[index]}
                                                    onChange={(e) => handleChange(index, e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                                    onPaste={index === 0 ? handlePaste : undefined}
                                                    className="w-12 h-12 text-center text-xl font-bold rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    aria-label={`Digit ${index + 1} of verification code`}
                                                />
                                            ))}
                                        </div>
                                        <FormMessage className="text-center" />
                                    </FormItem>
                                )}
                            />
                            
                            <div className="flex justify-center">
                                <Button 
                                    type="submit" 
                                    className="w-full max-w-xs"
                                >
                                    Verify
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default VerifyAccount;