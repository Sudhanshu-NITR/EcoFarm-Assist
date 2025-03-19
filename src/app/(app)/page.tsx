'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowRight, 
  faLeaf, 
  faBars, 
  faChevronDown, 
  faCheck,
  faCloudRain,
	faBug,
  faRobot,
  faSeedling,
  faChartLine,
  faEnvelope,
  faPhone,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { 
  faTwitter, 
  faFacebook, 
  faLinkedin, 
  faInstagram 
} from "@fortawesome/free-brands-svg-icons";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';

import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
});


interface Service {
  icon: React.ReactNode;
  iconName: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
}

const EcoFarmLanding: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [expandedServiceIndex, setExpandedServiceIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const services: Service[] = [
    {
      icon: <FontAwesomeIcon icon={faRobot} />,
      iconName: "robot",
      title: "24/7 AI Chatbot",
      description: "Get instant answers to your farming queries anytime, anywhere. Our AI assistant is always ready to help with personalized recommendations.",
      fullDescription: "Our AI farming assistant is always available to answer your questions, provide guidance on crop management, pest control, and optimal farming practices. Trained on vast agricultural data, it offers personalized advice based on your specific farming conditions and goals. The chatbot learns from your interactions to provide increasingly relevant recommendations over time.",
      image: "https://ai-public.creatie.ai/gen_page/farm-ai-chatbot.png"
    },
    {
			icon: <FontAwesomeIcon icon={faBug} />,
			iconName: "bug",
			title: "Pest & Disease Detection",
			description: "Upload an image of your crop, and our AI will identify pests and diseases, providing effective treatment suggestions.",
			fullDescription: "Our AI-driven pest and disease detection model helps farmers quickly diagnose crop issues by analyzing images. Simply upload a photo of your affected plant, and the model will identify potential pests or diseases, along with recommended treatment strategies. This enables early intervention, reducing crop damage and improving yield.",
			image: "https://ai-public.creatie.ai/gen_page/pest-disease-detection.png"
		},
    {
      icon: <FontAwesomeIcon icon={faSeedling} />,
      iconName: "seedling",
      title: "Crop Recommendation",
      description: "Get personalized crop suggestions based on soil quality, weather conditions, and location data to maximize your yield potential.",
      fullDescription: "Our advanced crop recommendation system analyzes your land's soil composition, local climate patterns, and historical weather data to suggest optimal crops for your specific conditions. It takes into account market trends and demand forecasts to help you maximize profitability. The system also provides rotation recommendations for sustainable farming and long-term soil health.",
      image: "https://ai-public.creatie.ai/gen_page/crop-recommendation.png"
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
    <div className={`${merriweather.className} min-h-screen font-sans text-white overflow-x-hidden`}>

      {/* Fixed background with parallax effect */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1920&auto=format&fit=crop')`,
          filter: 'brightness(0.3)'
        }}
      />

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0D1B2A]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center">
                <FontAwesomeIcon icon={faLeaf} className="text-white" />
              </div>
              <span className="ml-3 text-xl font-semibold">EcoFarm Assist</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex items-center space-x-8"
            >
              <a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300 border-b-2 border-transparent hover:border-emerald-500 pb-1">About</a>
              <a href="#services" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300 border-b-2 border-transparent hover:border-emerald-500 pb-1">Services</a>
              <a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300 border-b-2 border-transparent hover:border-emerald-500 pb-1">Contact</a>
              <Link href={'/sign-in'}>
                <Button variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer">Login</Button>
              </Link>
							<Link href={'/sign-up'}>
								<Button className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all cursor-pointer">Sign Up</Button>
							</Link>
            </motion.div>
            
            <div className="md:hidden flex items-center">
              <button className="text-white">
                <FontAwesomeIcon icon={faBars} className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/90 to-transparent z-0"></div>
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
                <span className="block text-emerald-500">With AI Technology</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeIn}
                className="text-xl text-gray-300 max-w-lg"
              >
                Access 24/7 AI support, smart crop recommendations, and advanced disease detection to optimize your farming operations and increase yield.
              </motion.p>
              
              <motion.div 
                variants={fadeIn}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-7 rounded-full text-lg">
                  <span>Get Started</span>
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Button>
              </motion.div>
              
              <motion.div 
                variants={fadeIn}
                className="flex items-center space-x-4 text-sm text-gray-300"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} className="border-2 border-[#0D1B2A]">
                      <AvatarFallback className="bg-gray-500">{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span>Trusted by 50,000+ farmers worldwide</span>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-3xl"></div>
              {/* <Image 
								src="/image.png" 
								alt="Smart Farming" 
								width={300} 
								height={300} 
								className="w-100 relative z-00 rounded-2xl shadow-2xl"
							/> */}
              
              <Card className="absolute -bottom-6 -left-6 bg-[#162447]/80 backdrop-blur-md border-[#1B263B] shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="bg-green-500 h-10 w-10 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faCheck} className="text-white" />
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold">Crop Prediction</div>
                      <div className="text-xs text-gray-300">98% accuracy rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="absolute -top-6 -right-6 bg-[#162447]/80 backdrop-blur-md border-[#1B263B] shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faCloudRain} className="text-white" />
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold">Weather Analysis</div>
                      <div className="text-xs text-gray-300">Real-time forecasting</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <a href="#services" className="text-white text-2xl">
            <FontAwesomeIcon icon={faChevronDown} />
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/95 to-[#1B263B]/95 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Smart Farming Solutions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Leverage the power of AI to transform your agricultural practices and boost productivity.</p>
          </motion.div>
          
          {expandedServiceIndex !== null ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}  
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Card className="bg-gradient-to-br from-[#162447]/70 to-[#162447]/40 backdrop-blur-md border-emerald-500/30 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8">
                    <div className="text-emerald-500 text-4xl mb-6 bg-emerald-500/10 h-16 w-16 rounded-2xl flex items-center justify-center">
                      {services[expandedServiceIndex].icon}
                    </div>
                    <CardTitle className="text-2xl font-semibold text-blue-200 mb-4">{services[expandedServiceIndex].title}</CardTitle>
                    <CardDescription className="text-gray-300 mb-4">{services[expandedServiceIndex].description}</CardDescription>
                    <p className="text-gray-300 mt-6">{services[expandedServiceIndex].fullDescription}</p>
                    <Button 
                      onClick={() => setExpandedServiceIndex(null)} 
                      variant="outline" 
                      className="mt-6 border-emerald-500 text-black font-bold hover:bg-emerald-500 hover:text-white"
                    >
                      Back to all services
                    </Button>
                  </div>
                  <div className="bg-gradient-to-r from-[#162447]/70 to-[#1B263B]/70">
                    <img 
                      src={services[expandedServiceIndex].image} 
                      alt={services[expandedServiceIndex].title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            <div>
              <Carousel className="w-full">
                <CarouselContent className="-ml-4">
                  {services.map((service, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                      >
                        <Card className="bg-gradient-to-br from-[#162447]/70 to-[#162447]/40 backdrop-blur-md border border-[#1B263B] hover:border-emerald-500 transition-all duration-300 h-full">
                          <CardHeader>
                            <div className="text-emerald-500 text-4xl mb-6 bg-emerald-500/10 h-16 w-16 rounded-2xl flex items-center justify-center">
                              {service.icon}
                            </div>
                            <CardTitle className="text-2xl text-blue-200 font-semibold">{service.title}</CardTitle>
                            <CardDescription className="text-gray-300">{service.description}</CardDescription>
                          </CardHeader>
                          <CardFooter className="pt-6 border-t border-[#657faf] flex justify-between items-center">
                            <Button 
                              variant="link" 
                              className="text-emerald-500 font-medium p-0"
                              onClick={() => handleExpandService(index)}
                            >
                              Learn more
                            </Button>
                            <div className="h-10 w-10 rounded-full bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-blue-200 transition-all duration-300 flex items-center justify-center cursor-pointer"
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
                <div className="flex justify-center gap-2 mt-8">
                  <CarouselPrevious className="relative" />
                  <CarouselNext className="relative" />
                </div>
              </Carousel>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section with animated counters */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#1B263B]/95 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">See how we're transforming agriculture with data-driven insights and AI technology.</p>
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
                <Card className="bg-gradient-to-br from-[#0D1B2A]/70 to-[#0D1B2A]/40 backdrop-blur-md border border-[#1B263B] hover:border-emerald-500/50 transition-all duration-300 text-center overflow-hidden group">
                  <div className="absolute -right-20 -top-20 h-40 w-40 bg-emerald-500/5 rounded-full group-hover:bg-emerald-500/10 transition-all duration-500"></div>
                  <CardContent className="pt-6 relative z-10">
                    <div className="text-emerald-500/30 text-6xl absolute top-0 right-4 opacity-30 group-hover:opacity-50 transition-all duration-300">
                      <FontAwesomeIcon icon={stat.icon} />
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-5xl font-bold text-emerald-500 mb-4"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-gray-300 text-lg">{stat.label}</div>
                    <div className="h-1 w-12 bg-emerald-500/50 mx-auto mt-4 rounded-full group-hover:w-24 transition-all duration-300"></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B263B]/95 to-[#0D1B2A]/95 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 mb-4">Testimonials</Badge>
            <h2 className="text-3xl font-bold mb-4">What Farmers Are Saying</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Hear from farmers who have transformed their operations with our AI solutions.</p>
          </motion.div>
          
          <Carousel className="w-full">
            <CarouselContent>
              {[
                {
                  name: "Michael Johnson",
                  role: "Organic Farmer",
                  image: "/api/placeholder/100/100",
                  quote: "The crop recommendation system helped me increase my yield by 35% while using less resources. The AI chatbot is like having an expert consultant available 24/7."
                },
                {
                  name: "Sarah Williams",
                  role: "Vineyard Owner",
                  image: "/api/placeholder/100/100",
                  quote: "The disease detection feature saved my vineyard from a potential blight. It spotted the early signs before they were visible to the naked eye, allowing me to take preventive measures."
                },
                {
                  name: "Robert Chen",
                  role: "Commercial Farmer",
                  image: "/api/placeholder/100/100",
                  quote: "The yield prediction tool has been invaluable for my business planning. It's consistently accurate and has helped me optimize my operations and improve profitability."
                }
              ].map((testimonial, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-gradient-to-br from-[#162447]/70 to-[#162447]/40 backdrop-blur-md border border-[#1B263B] p-8">
                      <CardContent className="pt-4">
                        <div className="flex flex-col items-center text-center px-4 md:px-12">
                          <div className="mb-6 text-emerald-500/40 text-6xl">❝</div>
                          <p className="text-lg text-gray-300 italic mb-8">{testimonial.quote}</p>
                          <Avatar className="h-16 w-16 border-2 border-emerald-500 mb-4">
                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                            <AvatarFallback className="bg-emerald-500">{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="font-semibold text-lg">{testimonial.name}</div>
                          <div className="text-emerald-500">{testimonial.role}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="relative" />
              <CarouselNext className="relative" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B263B]/95 to-[#0D1B2A]/95 z-0"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 backdrop-blur-md border border-emerald-500/30 text-center p-12 overflow-hidden relative">
              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 h-64 w-64 bg-emerald-500/10 rounded-full blur-2xl"></div>
              <div className="absolute -left-20 -bottom-20 h-64 w-64 bg-emerald-500/10 rounded-full blur-2xl"></div>
              
              <CardHeader className="pb-0 relative z-10">
                <CardTitle className="text-3xl md:text-4xl font-bold">Ready to Transform Your Farm?</CardTitle>
                <CardDescription className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
                  Join thousands of successful farmers who are leveraging AI technology to increase yields and optimize their farming operations.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 relative z-10">
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40">
                    Get Started Free
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-full">
                    Schedule a Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#0D1B2A] py-16">
        <div className="absolute inset-0 bg-[#0D1B2A]/95 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <FontAwesomeIcon icon={faLeaf} className="text-white" />
                </div>
                <span className="ml-3 text-xl font-semibold">EcoFarm Assist</span>
              </div>
              <p className="text-gray-300">Revolutionizing farming through AI technology and smart solutions for sustainable agriculture.</p>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300">
                  <FontAwesomeIcon icon={faTwitter} className="text-xl" />
                </a>
                <a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300">
                  <FontAwesomeIcon icon={faFacebook} className="text-xl" />
                </a>
                <a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300">
                  <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
                </a>
                <a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300">
                  <FontAwesomeIcon icon={faInstagram} className="text-xl" />
                </a>
              </div>
            </div>
						
						<div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300">Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300">Testimonials</a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300">AI Chatbot</a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300">Crop Recommendation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300">Yield Prediction</a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300">Disease Detection</a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors duration-300">Weather Analysis</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Contact</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faEnvelope} className="text-emerald-500" />
                  </div>
                  <span>contact@ecofarm.com</span>
                </li>
                <li className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faPhone} className="text-emerald-500" />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-emerald-500" />
                  </div>
                  <span>123 Farming Road, AgriTech Valley</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#1B263B] mt-12 pt-12 text-center text-gray-300">
            <p>&copy; 2025 EcoFarm Assist. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcoFarmLanding;