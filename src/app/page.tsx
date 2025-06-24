'use client'
import React from 'react';
import "@fontsource/merriweather/300.css";
import "@fontsource/merriweather/400.css";
import "@fontsource/merriweather/700.css";
import "@fontsource/merriweather/900.css";
import Navbar from '@/components/LandingComponents/Navbar';
import HeroSection from '@/components/LandingComponents/Hero';
import StatsSection from '@/components/LandingComponents/Stats';
import ServicesSection from '@/components/LandingComponents/Services';
import AboutUsSection from '@/components/LandingComponents/AboutUs';
import Footer from '@/components/Footer';
import axios from 'axios';

const url = `https://eco-farm-assist.onrender.com`; 
  const interval = 1000 * 60 * 14; 

  setInterval(() => {
    axios
      .get(url)
      .then(() => {
        console.log("Keep-alive ping sent.");
      })
      .catch((error) => {
        console.error("Keep-alive error:", error.message);
      });
  }, interval);

const EcoFarmLanding: React.FC = () => {

  return (
    <div className="min-h-screen font-[Merriweather] text-white overflow-x-hidden">

      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1920&auto=format&fit=crop')`,
          filter: 'brightness(0.3)'
        }}
      />

      <Navbar />

      <HeroSection />

      <AboutUsSection />

      <ServicesSection />

      <StatsSection />
      
      <Footer />
    </div>
  );
};

export default EcoFarmLanding;