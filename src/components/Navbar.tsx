'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Leaf, Menu } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react';
import { Link as ScrollLink } from 'react-scroll';
import { useRouter } from 'next/navigation';


function Navbar() {

  const {data: session} = useSession();
  const router = useRouter();

  return (
    <nav className={`w-full z-50 transition-all duration-300 bg-slate-900/95 backdrop-blur-md shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <Link href={'/'}>
                <span className="ml-3 text-xl font-semibold text-slate-100">EcoFarm Assist</span>
            </Link>
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
            {
              session? 
              (
                <>
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-bold transition-all cursor-pointer"
                    onClick={() => {
                      signOut({ redirect: false });
                      router.push("/")
                    }}
                  >
                    Logout
                  </Button>
                </>
              )
              : (
                <>
                  <Link href={'/sign-in'}>
                    <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-bold transition-all cursor-pointer">Login</Button>
                  </Link>
                  <Link href={'/sign-up'}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer">Sign Up</Button>
                  </Link>
                </>
              )
            }

          </motion.div>
          
          <div className="md:hidden flex items-center">
            <button className="text-slate-100">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar