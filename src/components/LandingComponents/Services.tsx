'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBug, faChartLine, faRobot, faSeedling } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

interface Service {
    icon: React.ReactNode;
    iconName: string;
    title: string;
    description: string;
    fullDescription: string;
    image: string;
}

const ServicesSection: React.FC = () => {
    const [expandedServiceIndex, setExpandedServiceIndex] = useState<number | null>(null);

    const services: Service[] = [
        {
            icon: <FontAwesomeIcon icon={faRobot} />,
            iconName: "robot",
            title: "24/7 AI Chatbot",
            description: "Get instant answers to your farming queries anytime, anywhere. Our AI assistant is always ready to help with personalized recommendations.",
            fullDescription: "Our AI farming assistant is always available to answer your questions, provide guidance on crop management, pest control, and optimal farming practices. Trained on vast agricultural data, it offers personalized advice based on your specific farming conditions and goals. The chatbot learns from your interactions to provide increasingly relevant recommendations over time.",
            image: "/chatbot.png"
        },
        {
            icon: <FontAwesomeIcon icon={faBug} />,
            iconName: "bug",
            title: "Pest & Disease Detection",
            description: "Upload an image of your crop leaf, and our AI will identify pests and diseases, providing effective treatment suggestions.",
            fullDescription: "Our AI-driven pest and disease detection model helps farmers quickly diagnose crop issues by analyzing images. Simply upload a photo of your affected plant, and the model will identify potential pests or diseases, along with recommended treatment strategies. This enables early intervention, reducing crop damage and improving yield.",
            image: "https://ai-public.creatie.ai/gen_page/pest-disease-detection.png"
        },
        {
            icon: <FontAwesomeIcon icon={faSeedling} />,
            iconName: "seedling",
            title: "Crop Recommendation",
            description: "Get personalized crop suggestions based on soil quality, weather conditions, and location data to maximize your yield potential.",
            fullDescription: "Our advanced crop recommendation system analyzes your land's soil composition, local climate patterns, and historical weather data to suggest optimal crops for your specific conditions. It takes into account market trends and demand forecasts to help you maximize profitability. The system also provides rotation recommendations for sustainable farming and long-term soil health.",
            image: "/crop-recommendation.png"
        },
        {
            icon: <FontAwesomeIcon icon={faChartLine} />,
            iconName: "chart-line",
            title: "Yield Prediction",
            description: "Predict crop yields and detect diseases early using our advanced AI analysis tools powered by machine learning algorithms.",
            fullDescription: "Using satellite imagery, IoT sensor data, and advanced machine learning, our yield prediction tool forecasts your expected harvest with remarkable accuracy. Early disease detection capabilities identify potential issues before they become visible to the human eye, allowing for preventative measures. The system provides actionable insights on irrigation, fertilization, and other interventions to optimize yields throughout the growing season.",
            image: "https://ai-public.creatie.ai/gen_page/yield-prediction.png"
        }
    ];

    const handleExpandService = (index: number) => {
        if (expandedServiceIndex === index) {
            setExpandedServiceIndex(null);
        } else {
            setExpandedServiceIndex(index);
        }
    };

    return (
        <section id="services" className="py-24 relative bg-[#1B263B]/15 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-extrabold mb-4 text-[#4E94FD] drop-shadow-[0_0_10px_rgba(78,148,253,0.3)]">
                        Our Smart Farming Solutions
                    </h2>
                    <p className="text-xl text-[#dae0ff] max-w-3xl mx-auto">
                        Leverage the power of AI to transform your agricultural practices and boost productivity.
                    </p>
                </motion.div>

                {expandedServiceIndex !== null ? (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        <Card className="bg-[#1D3461]/50 backdrop-blur-lg border border-[#4E94FD]/30 hover:border-[#4E94FD] transition-all duration-300 h-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8">
                                    <div className="text-blue-300 text-4xl mb-6 bg-[#4E94FD]/10 h-16 w-16 rounded-2xl flex items-center justify-center">
                                        {services[expandedServiceIndex].icon}
                                    </div>
                                    <CardTitle className="text-2xl font-semibold text-[#4E94FD]  mb-4">
                                        {services[expandedServiceIndex].title}
                                    </CardTitle>
                                    <CardDescription className="text-[#dae0ff] mb-4">
                                        {services[expandedServiceIndex].description}
                                    </CardDescription>
                                    <p className="text-[#dae0ff] mt-6">
                                        {services[expandedServiceIndex].fullDescription}
                                    </p>
                                    <Button
                                        onClick={() => setExpandedServiceIndex(null)}
                                        variant="outline"
                                        className="mt-6 border-[#4E94FD] text-[#4E94FD] font-bold hover:bg-[#4E94FD] hover:text-white"
                                    >
                                        Back to all services
                                    </Button>
                                </div>
                                <div className="mr-4">
                                    <Image
                                        src={services[expandedServiceIndex].image}
                                        alt={services[expandedServiceIndex].title}
                                        className="max-w-full max-h-full h-auto w-auto"
                                    />
                                    <div className="absolute inset-0 bg-[#1D3461]/20 mix-blend-multiply"></div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ) : (
                    <div className="relative group">
                        <Carousel
                            className="w-full relative"
                            opts={{
                                align: "start",
                                slidesToScroll: 1,
                            }}
                        >
                            <CarouselContent className="-ml-4 p-4">
                                {services.map((service, index) => (
                                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            whileHover={{ y: -10 }}
                                        >
                                            <Card className="bg-[#1D3461]/50 backdrop-blur-lg border border-[#4E94FD]/30 hover:border-[#4E94FD] transition-all duration-300 h-full">
                                                <CardHeader>
                                                    <div className="text-blue-300 text-4xl mb-6 bg-[#4E94FD]/10 h-16 w-16 rounded-2xl  flex items-center justify-center">
                                                        {service.icon}
                                                    </div>
                                                    <CardTitle className="text-2xl text-[#4E94FD] font-semibold">
                                                        {service.title}
                                                    </CardTitle>
                                                    <CardDescription className="text-[#dae0ff]">
                                                        {service.description}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardFooter className="pt-6 border-t border-[#4E94FD]/30 flex justify-between items-center">
                                                    <Button
                                                        variant="link"
                                                        className="text-blue-200 font-medium p-0 hover:underline"
                                                        onClick={() => handleExpandService(index)}
                                                    >
                                                        Learn more
                                                    </Button>
                                                    <div
                                                        className="h-10 w-10 rounded-full bg-[#4E94FD]/10 hover:bg-[#4E94FD] hover:text-white text-blue-200 transition-all duration-300 flex items-center justify-center cursor-pointer"
                                                        onClick={() => handleExpandService(index)}
                                                    >
                                                        <FontAwesomeIcon icon={faArrowRight} />
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        </motion.div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            {/* Custom Navigation Buttons */}
                            <div className="absolute inset-y-0 left-5 flex items-center -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                <CarouselPrevious
                                    className="bg-[#1D3461]/50 hover:bg-[#4E94FD]/70 text-white p-2 rounded-full shadow-lg"
                                    // icon={<ChevronLeft className="h-6 w-6" />}
                                />
                            </div>
                            <div className="absolute inset-y-0 right-5 flex items-center translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                <CarouselNext
                                    className="bg-[#1D3461]/50 hover:bg-[#4E94FD]/70 text-blue-200 p-2 rounded-full shadow-lg"
                                    // icon={<ChevronRight className="h-6 w-6" />}
                                />
                            </div>
                        </Carousel>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ServicesSection;