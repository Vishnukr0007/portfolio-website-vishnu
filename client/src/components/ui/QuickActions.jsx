import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

const QuickActions = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { socials, contactInfo } = useSelector((state) => state.portfolio);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const getIcon = (platform) => {
        const p = platform.toLowerCase();
        if (p.includes('github')) return <Github size={20} />;
        if (p.includes('linkedin')) return <Linkedin size={20} />;
        return null;
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.8 }}
                    className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
                >
                    <div className="flex flex-col gap-3 items-center bg-white/80 dark:bg-dark/80 backdrop-blur-md p-2 rounded-full border border-gray-200 dark:border-white/10 shadow-xl">
                        {socials && socials.map((social) => {
                            const icon = getIcon(social.platform);
                            if (!icon) return null;
                            return (
                                <a
                                    key={social._id}
                                    href={social.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-primary-light dark:hover:text-primary-dark transition-all group relative"
                                >
                                    {icon}
                                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        {social.platform}
                                    </span>
                                </a>
                            );
                        })}
                        
                        {contactInfo?.email && (
                            <a
                                href={`mailto:${contactInfo.email}`}
                                className="p-3 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-primary-light dark:hover:text-primary-dark transition-all group relative"
                            >
                                <Mail size={20} />
                                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    Email
                                </span>
                            </a>
                        )}

                        <div className="w-8 h-px bg-gray-200 dark:bg-white/10 my-1"></div>

                        <button
                            onClick={scrollToTop}
                            className="p-3 rounded-full bg-primary-light dark:bg-primary-dark text-white hover:-translate-y-1 transition-transform shadow-lg shadow-primary-light/30 dark:shadow-primary-dark/30 group relative"
                        >
                            <ArrowUp size={20} />
                            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                Scroll to Top
                            </span>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default QuickActions;
