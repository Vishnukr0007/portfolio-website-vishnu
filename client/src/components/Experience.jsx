import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
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

    return (
        <section id="experience" className="py-24">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold font-heading mb-12 dark:text-white"
                >
                    Experience & <span className="text-primary">Education</span>
                </motion.h2>

                <div className="max-w-3xl mx-auto pl-6 md:pl-8 border-l-2 border-gray-200 dark:border-white/10 space-y-12">
                    {experience.map((item, idx) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative"
                        >
                            <div className="absolute -left-[33px] md:-left-[41px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-dark shadow-lg shadow-primary/50"></div>

                            <span className="text-secondary font-semibold text-sm tracking-wider uppercase mb-2 block">{item.date}</span>
                            <h3 className="text-2xl font-bold mb-1 dark:text-white">{item.title}</h3>
                            <div className="text-lg text-gray-500 dark:text-gray-400 mb-4">{item.subtitle}</div>

                            {item.description && item.description.length > 0 && (
                                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-text-secondary">
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
