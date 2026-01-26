import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6">
                <div className="max-w-2xl text-center md:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl sm:text-5xl md:text-8xl font-bold font-heading mb-6 leading-tight dark:text-white"
                    >
                        MERN Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Developer</span>
                        <div className="text-2xl sm:text-3xl md:text-4xl mt-4 font-medium text-gray-500 dark:text-gray-400">
                            Full-Stack JavaScript Engineer
                        </div>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 dark:text-text-secondary mb-8 leading-relaxed"
                    >
                        Hi, I’m Vishnu K — a MERN Stack Developer specializing in building scalable, responsive, and secure web applications using React, Node.js, Express, and MongoDB. I focus on writing clean, efficient code and delivering high-quality products that meet real-world business needs.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                    >
                        <a href="#projects" className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all">
                            View Work
                        </a>
                        <a
                            href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/resume/download`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-full border-2 border-primary/20 dark:border-white/10 text-primary dark:text-white font-semibold hover:border-primary hover:bg-primary/5 transition-all text-center"
                        >
                            Download Resume
                        </a>
                        <a href="#contact" className="px-8 py-4 rounded-full border-2 border-gray-200 dark:border-white/10 text-gray-700 dark:text-white font-semibold hover:border-primary hover:bg-primary/5 transition-all">
                            Contact Me
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
