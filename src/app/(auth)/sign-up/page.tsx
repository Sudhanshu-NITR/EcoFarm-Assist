'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceValue, useDebounceCallback } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, {AxiosError} from 'axios'
import { IApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Loader2 } from "lucide-react"


function Page() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
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
      <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="w-full max-w-md p-8 space-y-8 bg-gray-100 rounded-lg shadow-md my-20">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Join EcoFarm Assist
            </h1>
            <p className="mb-4">
              Sign Up & Cultivate a Smarter Future 
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Name" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Email Id" {...field}/>
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
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Preferred Language" />
                        </SelectTrigger>
                        <SelectContent>
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
                    <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder="Enter a passoword" {...field}
                          onChange={(e)=>{
                            field.onChange(e)
                            debounced(e.target.value)
                          }}
                        />
                      </FormControl>
                      {isCheckingPassword &&
                        <Loader2 className="animate-spin"/>
                      }
                      <p className={`text-sm ${passwordMessage=="Valid Password" ? 'text-green-500':'text-red-500'}`}>
                        {passwordMessage}
                      </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' disabled={isSubmitting}>
                {
                  isSubmitting? (
                    <>
                      <Loader2  className="mr-2 h-4 w-4 animate-spin"/> Please wait
                    </>
                  ) : ('SignUp')
                }
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link> 
          </p>
        </div>
        </div>
      </div>
    </>
  )
}

export default Page
