import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faGlobe, faHeart, faUsers } from '@fortawesome/free-solid-svg-icons';

const AboutUsSection: React.FC = () => {
    const values = [
        {
            icon: faLeaf,
            title: "Sustainable Innovation",
            description: "We leverage cutting-edge AI to develop agricultural solutions that are environmentally responsible and economically viable."
        },
        {
            icon: faGlobe,
            title: "Global Impact",
            description: "Our mission extends beyond individual farms, aiming to contribute to global food security and agricultural resilience."
        },
        {
            icon: faHeart,
            title: "Farmer-Centric Approach",
            description: "Every feature we develop is designed with the farmer's needs, challenges, and aspirations at the forefront."
        },
        {
            icon: faUsers,
            title: "Community Empowerment",
            description: "We believe in democratizing agricultural technology, making advanced insights accessible to farmers of all scales."
        }
    ];

    return (
        <section id="about" className="py-24 bg-[#1B263B]/15 text-[#dae0ff]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-extrabold mb-4 text-[#4E94FD] drop-shadow-[0_0_10px_rgba(78,148,253,0.3)]">
                        Our Vision and Mission
                    </h2>
                    <p className="text-xl max-w-3xl mx-auto">
                        Transforming agriculture through intelligent technology, one farm at a time.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h3 className="text-3xl font-bold text-[#4E94FD] mb-4">
                            Who We Are
                        </h3>
                        <p className="text-lg leading-relaxed mb-4">
                            Eco-Farm-Assist was born from a profound understanding of the challenges faced by small and marginal farmers. Our team of agricultural experts, data scientists, and technology innovators are united by a single vision: to democratize advanced agricultural insights.
                        </p>
                        <p className="text-lg leading-relaxed">
                            By integrating machine learning, remote sensing, we provide personalized, actionable recommendations that help farmers make informed decisions, optimize resource usage, and improve crop yields.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {values.map((value, index) => (
                            <Card 
                                key={index} 
                                className="bg-[#1D3461]/50 backdrop-blur-lg border border-[#4E94FD]/30 hover:border-[#4E94FD] transition-all duration-300 p-6"
                            >
                                <div className="text-[#4E94FD] text-3xl bg-[#4E94FD]/10 h-16 w-16 rounded-2xl flex items-center justify-center">
                                    <FontAwesomeIcon icon={value.icon} />
                                </div>
                                <h4 className="text-xl font-semibold text-[#4E94FD]">
                                    {value.title}
                                </h4>
                                <p className="text-[#dae0ff]">
                                    {value.description}
                                </p>
                            </Card>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;