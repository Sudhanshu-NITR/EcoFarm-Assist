import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faLeaf, 
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
    faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { 
    faTwitter, 
    faFacebook, 
    faLinkedin, 
    faInstagram 
} from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#0F3460] to-[#0D1B2A] py-16">
      <div className="absolute inset-0 bg-[#0D1B2A]/90 bg-opacity-50 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
                <FontAwesomeIcon icon={faLeaf} className="text-white h-6 w-6" />
              </div>
              <span className="ml-3 text-xl font-semibold text-blue-100">EcoFarm Assist</span>
            </div>
            <p className="text-gray-300">Revolutionizing farming through AI technology and smart solutions for sustainable agriculture.</p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FontAwesomeIcon icon={faTwitter} className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FontAwesomeIcon icon={faFacebook} className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FontAwesomeIcon icon={faInstagram} className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-200">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <FontAwesomeIcon icon={faChevronRight} className="text-blue-400 h-3 mr-2" />
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <FontAwesomeIcon icon={faChevronRight} className="text-blue-400 h-3 mr-2" />
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <FontAwesomeIcon icon={faChevronRight} className="text-blue-400 h-3 mr-2" />
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <FontAwesomeIcon icon={faChevronRight} className="text-blue-400 h-3 mr-2" />
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <FontAwesomeIcon icon={faChevronRight} className="text-blue-400 h-3 mr-2" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-200">Services</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <FontAwesomeIcon icon={faChevronRight} className="text-blue-400 h-3 mr-2" />
                  AI Chatbot
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <FontAwesomeIcon icon={faChevronRight} className="text-blue-400 h-3 mr-2" />
                  Crop Recommendation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <FontAwesomeIcon icon={faChevronRight} className="text-blue-400 h-3 mr-2" />
                  Yield Prediction
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <FontAwesomeIcon icon={faChevronRight} className="text-blue-400 h-3 mr-2" />
                  Disease Detection
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <FontAwesomeIcon icon={faChevronRight} className="text-blue-400 h-3 mr-2" />
                  Weather Analysis
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-200">Contact</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faEnvelope} className="text-blue-400 h-4 w-4" />
                </div>
                <span>contact@ecofarm.com</span>
              </li>
              <li className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faPhone} className="text-blue-400 h-4 w-4" />
                </div>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-400 h-4 w-4" />
                </div>
                <span>123 Farming Road, AgriTech Valley</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1B263B] mt-12 pt-12 text-center text-gray-300">
          <p>&copy; 2025 EcoFarm Assist. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;