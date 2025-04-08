'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Droplet, Leaf } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-800/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
              <Droplet className="text-white h-6 w-6" />
            </div>
            <span className="ml-3 text-xl font-semibold text-blue-100">EcoFarm Assist</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center space-x-8"
          >
            <ScrollLink to="/#about" className="text-slate-300 hover:text-blue-400 transition-colors duration-300">About</ScrollLink>
            <ScrollLink to="/#services" className="text-slate-300 hover:text-blue-400 transition-colors duration-300">Services</ScrollLink>
            <ScrollLink to="/#contact" className="text-slate-300 hover:text-blue-400 transition-colors duration-300">Contact</ScrollLink>
            <Link href={'/sign-in'}>
              <Button variant="outline" className="border-blue-500 text- text-blue-500 hover:bg-blue-500 hover:text-white transition-all cursor-pointer">Login</Button>
            </Link>
            <Link href={'/sign-up'}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer">Sign Up</Button>
            </Link>
          </motion.div>
          
          <div className="md:hidden flex items-center">
            <button className="text-slate-300">
              <Leaf className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;