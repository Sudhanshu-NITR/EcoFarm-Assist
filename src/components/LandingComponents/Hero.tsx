'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';

const HeroSection: React.FC = () => {
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="space-y-6"
          >
            <motion.h1 
            variants={fadeIn} 
            className="text-5xl md:text-6xl font-bold leading-tight"
            >
              <span className="block">Empowering Farmers</span>
              <span className="block text-blue-400">With AI Technology</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-slate-300 max-w-lg"
            >
              Access 24/7 AI support, smart crop recommendations, and advanced disease detection to optimize your farming operations and increase yield.
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link href={'/sign-up'}>
                <Button size="lg" className="bg-blue-400 hover:bg-blue-700 text-white px-8 py-7 rounded-full text-lg cursor-pointer">
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="flex items-center space-x-4 text-sm text-slate-300"
            >
              <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <Avatar key={i} className="border-2 border-slate-800">
                  <AvatarImage src={`hero_image-${i}.jpg`} className='w-full h-full object-cover' alt={`Avatar ${i}`} />
                </Avatar>
              ))}

              </div>
              <span >Trusted by farmers across India</span>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;