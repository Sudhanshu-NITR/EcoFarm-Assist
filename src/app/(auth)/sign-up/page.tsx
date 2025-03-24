'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, {AxiosError} from 'axios'
import { IApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Leaf, Droplet } from "lucide-react"


function Page() {
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setPassword, 300);
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      language: '',
      password: '',
    }
  })

  useEffect(()=>{
    const checkPasswordValid = async () =>{
      if(password){
        setIsCheckingPassword(true);
        setPasswordMessage('');

        try {
          const response = await axios.get(`/api/password-validation?password=${password}`);
          let message = response.data.message;
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
  }, [password]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>)=>{
    setIsSubmitting(true);
    try {
      const response = await axios.post<IApiResponse>('/api/sign-up', data);
      
      toast((response.data.success)? 'Success':'Failure', {
          description: response.data.message
        }
      );
      if(response.data.success){
        router.replace(`/verify/${data.email}`);
        setIsSubmitting(false);
      }
      else{
        const error = response.data.message;
        console.error("Error in signup of user, ", error);
        toast.error('SignUp Failed, Please try again', {
          description: error,
        })
      }
    } catch (error) {
      console.error("Error in signup of user, ", error);
      const axiosError = error as AxiosError<IApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast.error('SignUp Failed, Please try again', {
        description: errorMessage,
      })
    }
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 bg-fixed overflow-auto">
        <div className="w-full max-w-md p-8 space-y-6 bg-slate-800 rounded-lg shadow-lg my-8 border border-slate-700 relative">
          <div className="absolute -top-4 -left-4 h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
            <Droplet className="h-6 w-6 text-white" />
          </div>
          <div className="absolute -top-4 -right-4 h-12 w-12 bg-teal-500 rounded-full flex items-center justify-center">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-4 text-blue-100">
              Join EcoFarm Assist
            </h1>
            <p className="mb-4 text-slate-300 italic">
              Smart farming solutions for a sustainable future
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto rounded-full"></div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your name" 
                          {...field} 
                          className="bg-slate-700 border-slate-600 focus:border-blue-400 focus:ring-blue-400 text-slate-200"
                        />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email address" 
                        {...field}
                        className="bg-slate-700 border-slate-600 focus:border-blue-400 focus:ring-blue-400 text-slate-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="language"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Preferred Language</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 focus:border-blue-400 focus:ring-blue-400 text-slate-200">
                          <SelectValue placeholder="Select your language" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600 text-slate-200">
                          {[
                            "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", 
                            "Urdu", "Gujarati", "Malayalam", "Kannada", "Odia", 
                            "Punjabi", "Assamese", "Maithili", "Santali", "Kashmiri", 
                            "Nepali", "Konkani", "Sindhi", "Dogri", "Manipuri", "Bodo"
                          ].map((lang) => (
                            <SelectItem key={lang} value={lang}>
                              {lang}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Password</FormLabel>
                      <FormControl>
                        <Input 
                          type='password' 
                          placeholder="Create a password" 
                          {...field}
                          className="bg-slate-700 border-slate-600 focus:border-blue-400 focus:ring-blue-400 text-slate-200"
                          onChange={(e)=>{
                            field.onChange(e)
                            debounced(e.target.value)
                          }}
                        />
                      </FormControl>
                      {isCheckingPassword &&
                        <Loader2 className="animate-spin text-blue-400"/>
                      }
                      <p className={`text-sm ${passwordMessage=="Valid Password" ? 'text-teal-400':'text-red-400'}`}>
                        {passwordMessage}
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
                  isSubmitting? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                    </>
                  ) : (<>Create Account</>)
                }
              </Button>
            </form>
          </Form>
          
          <div className="text-center mt-4 pt-4 border-t border-slate-700">
            <p className="text-slate-300">
              Already have an account?{' '}
              <Link href="/sign-in" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign in
              </Link> 
            </p>
          </div>
          
          <div className="text-center text-xs text-slate-400 mt-2">
            <p>Advanced agricultural technology for modern farmers</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page