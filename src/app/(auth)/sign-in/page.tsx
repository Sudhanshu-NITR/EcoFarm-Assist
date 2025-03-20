'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"
import { Loader2, Leaf, Droplet } from "lucide-react"

function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    }
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>)=>{
    setIsSubmitting(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password
      })

      if(result?.error){
        toast.error("Login Failed", {
            description: result?.error,
          }
        );
      }
      
      if(result?.url){
        router.replace('/user');
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Login Failed", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 bg-fixed overflow-auto">
        <div className="w-full max-w-md p-8 space-y-6 bg-slate-800 rounded-lg shadow-lg my-8 border border-slate-700 relative">
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
            <Droplet className="h-6 w-6 text-white" />
          </div>
          <div className="absolute -top-4 -right-4 h-12 w-12 bg-teal-500 rounded-full flex items-center justify-center">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-4 text-blue-100">
              Welcome Back
            </h1>
            <p className="mb-4 text-slate-300 italic">
              Sign in to continue your sustainable farming journey
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto rounded-full"></div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                name="identifier"
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
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Password</FormLabel>
                      <FormControl>
                        <Input 
                          type='password' 
                          placeholder="Enter your password" 
                          {...field}
                          className="bg-slate-700 border-slate-600 focus:border-blue-400 focus:ring-blue-400 text-slate-200"
                        />
                      </FormControl>
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
                      <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                    </>
                  ) : (<>Sign In</>)
                }
              </Button>
            </form>
          </Form>
          
          <div className="text-center mt-4 pt-4 border-t border-slate-700">
            <p className="text-slate-300">
              Don't have an account?{' '}
              <Link href="/sign-up" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign up
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