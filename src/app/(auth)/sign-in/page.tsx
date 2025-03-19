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
    console.log("Submitting data:", data);
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
      router.replace('/dashboard');
    }
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="w-full max-w-md p-8 space-y-8 bg-gray-100 rounded-lg shadow-md my-20">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Sign In
            </h1>
            <p className="mb-4">
              Sign In & Grow with Smart Farming
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="identifier"
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
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder="Enter a passoword" {...field} />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' disabled={isSubmitting}>
                Sign In
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
          <p>
            Not a member?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign Up
            </Link> 
          </p>
        </div>
        </div>
      </div>
    </>
  )
}

export default Page
