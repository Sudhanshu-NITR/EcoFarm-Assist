'use client'
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios, { AxiosError } from "axios"
import { IApiResponse } from "@/types/ApiResponse"
import { Loader2, Lock } from "lucide-react"
import { useDebounceCallback } from "usehooks-ts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react"

function Password() {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [isCheckingPassword, setIsCheckingPassword] = useState(false);
    const [isCheckingConfirmPassword, setIsCheckingConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const debounced = useDebounceCallback(setNewPassword, 300);
    const debouncedConfirm = useDebounceCallback(setConfirmPassword, 300);
    const { data: session } = useSession();


    const form = useForm({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    })

    useEffect(() => {
        const checkPasswordValid = async () => {
            if (newPassword) {
                setIsCheckingPassword(true);
                setPasswordMessage('');

                try {
                    const response = await axios.get(`/api/password-validation?password=${newPassword}`);
                    const message = response.data.message;
                    setPasswordMessage(message);
                } catch (error) {
                    const axiosError = error as AxiosError<IApiResponse>;
                    setPasswordMessage(
                        axiosError.response?.data.message ?? "Error checking password"
                    )
                } finally {
                    setIsCheckingPassword(false);
                }
            }
        }

        checkPasswordValid();
    }, [newPassword]);


    useEffect(() => {
        const checkConfirmPassword = async () => {
            if (confirmPassword) {
                setIsCheckingConfirmPassword(true);
                setConfirmPasswordMessage('');

                try {
                    const response = await axios.get(`/api/confirm-password-validation?newPassword=${newPassword}&confirmPassword=${confirmPassword}`);
                    const message = response.data.message;
                    setConfirmPasswordMessage(message);
                } catch (error) {
                    const axiosError = error as AxiosError<IApiResponse>;
                    setConfirmPasswordMessage(
                        axiosError.response?.data.message ?? "Error confirming password"
                    )
                } finally {
                    setIsCheckingConfirmPassword(false);
                }
            }
        }

        checkConfirmPassword();
    }, [confirmPassword]);

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post<IApiResponse>('/api/change-password', {
                ...data,
                userId: session?.user._id
            });

            toast((response.data.success) ? "🌿 Success" : "🚫 Failure", {
                description: response.data.message
            }
            );

            setIsSubmitting(false);
        } catch (error) {
            console.error("Error changing password of user, ", error);
            const axiosError = error as AxiosError<IApiResponse>;
            const errorMessage = axiosError.response?.data.message;
            toast.error('🚫 Password Change Failed, Please try again', {
                description: errorMessage,
            })
        }
    }

    return (
        <>
            <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all">
                <CardHeader className="pb-1 pt-3">
                    <CardTitle className="text-blue-100 flex items-center text-lg">
                        <Lock className="mr-2 h-4 w-4 text-blue-400" />
                        Change Password
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                name="currentPassword"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-200">Current Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                placeholder="Enter the current password"
                                                {...field}
                                                className="bg-slate-700 border-slate-600 focus:border-blue-400 focus:ring-blue-400 text-slate-200"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="newPassword"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-200">New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                placeholder="Create a new password"
                                                {...field}
                                                className="bg-slate-700 border-slate-600 focus:border-blue-400 focus:ring-blue-400 text-slate-200"
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    debounced(e.target.value)
                                                }}
                                            />
                                        </FormControl>
                                        {isCheckingPassword &&
                                            <Loader2 className="animate-spin text-blue-400" />
                                        }
                                        <p className={`text-sm ${passwordMessage == "Valid Password" ? 'text-teal-400' : 'text-red-400'}`}>
                                            {passwordMessage}
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="confirmPassword"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-200">Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                placeholder="Confirm password"
                                                {...field}
                                                className="bg-slate-700 border-slate-600 focus:border-blue-400 focus:ring-blue-400 text-slate-200"
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    debouncedConfirm(e.target.value)
                                                }}
                                            />
                                        </FormControl>
                                        {isCheckingConfirmPassword &&
                                            <Loader2 className="animate-spin text-blue-400" />
                                        }
                                        <p className={`text-sm ${confirmPasswordMessage == "Password Matched" ? 'text-teal-400' : 'text-red-400'}`}>
                                            {confirmPasswordMessage}
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type='submit'
                                className='w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-colors duration-200'
                                disabled={isSubmitting}
                            >
                                {
                                    isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                        </>
                                    ) : (<>Update Password</>)
                                }
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}

export default Password
