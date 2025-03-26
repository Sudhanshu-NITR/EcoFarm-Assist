'use client'
import React, { useEffect, useState } from 'react';
import { Merriweather } from "next/font/google";
import Navbar from '@/components/LandingComponents/Navbar';
import HeroSection from '@/components/LandingComponents/Hero';
import StatsSection from '@/components/LandingComponents/Stats';
import ServicesSection from '@/components/LandingComponents/Services';
import AboutUsSection from '../components/LandingComponents/AboutUs';
import Footer from '../components/Footer';

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
});



const EcoFarmLanding: React.FC = () => {
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
    <div className={`${merriweather.className} min-h-screen font-sans text-white overflow-x-hidden`}>

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