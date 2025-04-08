'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Leaf, Mail, ArrowRight, Loader2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import Navbar from '@/components/Navbar'

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center mx-auto mb-6">
              <Leaf className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 mb-4">
              Coming Soon
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 font-medium mb-8">
              We&apos;re working hard on this new feature for EcoFarm Assist
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mb-12"
          >
            <p className="text-slate-600 mb-6">
              Our team is developing new smart farming tools to revolutionize your eco-friendly 
              agricultural practices. Stay updated with our progress and be the first to know 
              when we launch.
            </p>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 max-w-xl mx-auto">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Stay Updated</h2>
              
              {isSubscribed ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-green-800">Thank you for subscribing! We&apos;ll keep you updated on our progress.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
                      Email address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Notify me
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                Return to Home
              </Button>
            </Link>
            <Link href="/#contact">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} EcoFarm Assist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}