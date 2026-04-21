import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion, useScroll, useSpring } from 'framer-motion';
import ExperienceSkeleton from './skeletons/ExperienceSkeleton';

const Experience = () => {
    const { experience, loading } = useSelector((state) => state.portfolio);

    if (loading) {
        return (
            <section id="experience" className="py-24">
                <div className="container mx-auto px-6">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 w-1/3 mb-12 rounded animate-pulse"></div>
                    <div className="max-w-3xl mx-auto pl-6 md:pl-8 border-l-2 border-gray-200 dark:border-white/10 space-y-12">
                        {[1, 2].map((n) => (
                            <ExperienceSkeleton key={n} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (!experience || experience.length === 0) {
        return null;
    }

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });
    
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="experience" className="py-24">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold font-heading mb-12 text-text-primary-light dark:text-text-primary-dark"
                >
                    Experience & <span className="text-primary-light dark:text-primary-dark">Education</span>
                </motion.h2>

                <div ref={containerRef} className="relative max-w-3xl mx-auto pl-6 md:pl-8 space-y-12">
                    {/* Static Background Line */}
                    <div className="absolute top-0 bottom-0 left-[9px] md:left-[11px] w-[2px] bg-gray-200 dark:bg-white/10 origin-top"></div>
                    
                    {/* Animated Scroll Line */}
                    <motion.div 
                        className="absolute top-0 bottom-0 left-[9px] md:left-[11px] w-[2px] bg-primary-light dark:bg-primary-dark origin-top"
                        style={{ scaleY }}
                    ></motion.div>

                    {experience.map((item, idx) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ margin: "-100px", once: true }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="relative"
                        >
                            <div className="absolute -left-[30px] md:-left-[38px] top-1 w-5 h-5 rounded-full bg-primary-light dark:bg-primary-dark border-4 border-white dark:border-dark shadow-lg shadow-primary-light/30 dark:shadow-primary-dark/30 z-10 transition-all duration-500 hover:scale-125 hover:bg-white hover:dark:bg-white"></div>

                            <span className="text-primary-light dark:text-primary-dark font-semibold text-sm tracking-wider uppercase mb-2 block">{item.date}</span>
                            <h3 className="text-2xl font-bold mb-1 text-text-primary-light dark:text-text-primary-dark">{item.title}</h3>
                            <div className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-4">{item.subtitle}</div>

                            {item.description && item.description.length > 0 && (
                                <ul className="list-disc list-inside space-y-2 text-text-secondary-light dark:text-text-secondary-dark">
                                    {item.description.map((desc, dIdx) => (
                                        <li key={dIdx}>{desc}</li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
