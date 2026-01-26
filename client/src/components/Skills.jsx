import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import SkillSkeleton from './skeletons/SkillSkeleton';

const Skills = () => {
    const { skills, loading } = useSelector((state) => state.portfolio);

    if (loading) {
        return (
            <section id="skills" className="py-24">
                <div className="container mx-auto px-6">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 w-1/3 mb-12 rounded animate-pulse"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {[1, 2, 3, 4].map((n) => (
                            <SkillSkeleton key={n} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (!skills || skills.length === 0) {
        return null;
    }

    const categories = [...new Set(skills.map(s => s.category))];

    return (
        <section id="skills" className="py-24">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold font-heading mb-12 dark:text-white"
                >
                    My <span className="text-primary">Skills</span>
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {categories.map((category, idx) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-card p-8 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-primary dark:hover:border-primary transition-colors shadow-sm dark:shadow-none"
                        >
                            <h3 className="text-xl font-semibold mb-6 text-primary">{category}</h3>
                            <div className="flex flex-wrap gap-3">
                                {skills.filter(s => s.category === category).map((skill, sIdx) => (
                                    <span key={sIdx} className="px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-full text-sm text-gray-600 dark:text-text-secondary">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
