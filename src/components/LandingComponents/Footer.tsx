'use client'
import React from 'react';
import { Button } from "@/components/ui/button";
import { Droplet, Leaf, Twitter, Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                <Droplet className="text-white h-6 w-6" />
              </div>
              <span className="ml-3 text-xl font-semibold text-blue-100">EcoFarm Assist</span>
            </div>
            <p className="text-slate-300">
              Revolutionizing farming through AI technology and smart solutions for sustainable agriculture.
            </p>
            <div className="mt-6 flex space-x-4">
              {[Twitter, Facebook, Linkedin, Instagram].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-300"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-100">Quick Links</h3>
            <ul className="space-y-4">
              {["About Us", "Services", "Testimonials", "Blog", "Contact"].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-100">Services</h3>
            <ul className="space-y-4">
              {["AI Chatbot", "Crop Recommendation", "Yield Prediction", "Disease Detection", "Weather Analysis"].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors duration-300">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-100">Contact</h3>
            <ul className="space-y-4 text-slate-300">
              {[
                { icon: Mail, text: "contact@ecofarm.com" },
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: MapPin, text: "123 Farming Road, AgriTech Valley" }
              ].map(({ icon: Icon, text }, index) => (
                <li key={index} className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                    <Icon className="text-blue-500 h-5 w-5" />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-12 text-center text-slate-300">
          <p>&copy; 2025 EcoFarm Assist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;