'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { faChartLine, faRobot, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StatsSection: React.FC = () => {
  return (
    <section className="py-24 relative bg-gradient-to-br bg-[#1B263B]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold mb-4 text-[#4E94FD] drop-shadow-[0_0_10px_rgba(78,148,253,0.3)]">Our Impact</h2>
            <p className="text-xl max-w-3xl mx-auto">See how we're transforming agriculture with data-driven insights and AI technology.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "50,000+", label: "Farmers Assisted", icon: faRobot },
              { value: "100,000+", label: "Crops Analyzed", icon: faSeedling },
              { value: "95%", label: "Success Rate", icon: faChartLine }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-[#1D3461]/50 hover:border-[#4E94FD] backdrop-blur-lg border border-[#4E94FD]/30 transition-all duration-300 text-center overflow-hidden group">
                  <div className="absolute -right-20 -top-20 h-40 w-40 text-[#4E94FD] bg-blue-200/5 rounded-full group-hover:bg-blue-400/10 transition-all duration-500"></div>
                  <CardContent className="pt-6 relative z-10">
                    <div className="text-6xl text-blue-300 absolute top-0 right-4 opacity-30 group-hover:opacity-50 transition-all duration-300">
                      <FontAwesomeIcon icon={stat.icon} />
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-5xl font-bold text-blue-400 mb-4"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-gray-300 text-lg">{stat.label}</div>
                    <div className="h-1 w-12 bg-blue-400/50 mx-auto mt-4 rounded-full group-hover:w-24 transition-all duration-300"></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default StatsSection;