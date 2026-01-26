import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl sm:text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight dark:text-white"
                        >
                            Welcome to my <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary-dark dark:from-primary-dark dark:to-primary-light">Portfolio</span>
                            <div className="text-2xl sm:text-3xl md:text-3xl mt-4 font-medium text-gray-500 dark:text-text-secondary-dark">
                                MERN Stack & Full-Stack Engineer
                            </div>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg md:text-xl text-text-secondary-light dark:text-text-secondary-dark mb-8 leading-relaxed"
                        >
                            Hi, I’m Vishnu K — specializing in building scalable, responsive, and secure web applications using React, Node.js, Express, and MongoDB. I focus on writing clean, efficient code and delivering high-quality products.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-wrap gap-4 justify-center md:justify-start"
                        >
                            <a href="#projects" className="px-8 py-4 rounded-full bg-primary-light dark:bg-primary-dark text-white dark:text-black font-bold shadow-lg shadow-primary-light/30 dark:shadow-primary-dark/20 hover:-translate-y-1 transition-all">
                                View Work
                            </a>
                            <a
                                href="#contact"
                                className="px-8 py-4 rounded-full border-2 border-primary-light/20 dark:border-primary-dark/20 text-text-primary-light dark:text-text-primary-dark font-semibold hover:bg-primary-light/5 dark:hover:bg-primary-dark/5 transition-all text-center flex items-center justify-center gap-2"
                            >
                                Connect
                            </a>
                            <a
                                href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/resume/download`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-8 py-4 rounded-full border-2 border-primary-light/20 dark:border-primary-dark/20 text-primary-light dark:text-primary-dark font-semibold hover:bg-primary-light/5 dark:hover:bg-primary-dark/5 transition-all text-center flex items-center justify-center gap-2"
                            >
                                Download Resume
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 flex justify-center md:justify-end"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-light to-primary-dark rounded-3xl rotate-6 opacity-20 blur-2xl"></div>
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-primary-light/20 dark:border-primary-dark/20 bg-card-light dark:bg-card-dark shadow-2xl">
                                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                                    <span className="text-gray-400 dark:text-gray-500 font-medium">Professional Headshot</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
