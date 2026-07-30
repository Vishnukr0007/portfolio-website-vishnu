import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Sprout, Code, Server, Database, Wrench } from 'lucide-react';
import GlowCard from './ui/GlowCard';
import BotanicalDivider from './ui/BotanicalDivider';
import SkillSkeleton from './skeletons/SkillSkeleton';

const categoryIcons = {
    Frontend: <Code className="w-5 h-5 text-emerald-400" />,
    Backend: <Server className="w-5 h-5 text-amber-400" />,
    Database: <Database className="w-5 h-5 text-cyan-400" />,
    Tools: <Wrench className="w-5 h-5 text-indigo-400" />,
};

const Skills = () => {
    const { skills, loading } = useSelector((state) => state.portfolio);

    if (loading) {
        return (
            <section id="skills" className="py-16">
                <div className="container mx-auto px-6">
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 w-1/3 mb-12 rounded animate-pulse"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((n) => (
                            <SkillSkeleton key={n} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Default fallback skills if database has empty set
    const defaultSkills = [
        { category: 'Frontend', name: 'React.js', level: 90 },
        { category: 'Frontend', name: 'JavaScript (ES6+)', level: 90 },
        { category: 'Frontend', name: 'Tailwind CSS', level: 88 },
        { category: 'Frontend', name: 'HTML5 / CSS3', level: 95 },
        { category: 'Backend', name: 'Node.js', level: 85 },
        { category: 'Backend', name: 'Express.js', level: 85 },
        { category: 'Backend', name: 'REST APIs', level: 90 },
        { category: 'Database', name: 'MongoDB', level: 82 },
        { category: 'Database', name: 'Mongoose ORM', level: 85 },
        { category: 'Tools', name: 'Git & GitHub', level: 88 },
        { category: 'Tools', name: 'Postman', level: 85 },
        { category: 'Tools', name: 'Vite / Vercel', level: 85 },
    ];

    const activeSkills = skills && skills.length > 0 ? skills : defaultSkills;
    const categories = ['Frontend', 'Backend', 'Database', 'Tools'];

    return (
        <section id="skills" className="py-20 relative">
            <BotanicalDivider />

            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-xs font-semibold mb-3"
                    >
                        <Sprout size={14} /> Technology Garden
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white"
                    >
                        Cultivated Skills & Stack
                    </motion.h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
                        Technologies I tend to and use daily to build production-grade web solutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, idx) => {
                        const categorySkills = activeSkills.filter(
                            (s) => s.category?.toLowerCase() === category.toLowerCase()
                        );

                        return (
                            <GlowCard
                                key={category}
                                glowColor={idx % 2 === 0 ? 'emerald' : 'gold'}
                                className="flex flex-col"
                            >
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5">
                                            {categoryIcons[category] || <Code className="w-5 h-5 text-emerald-400" />}
                                        </div>
                                        <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                                            {category}
                                        </h3>
                                    </div>
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400">
                                        {categorySkills.length} items
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2.5 flex-grow">
                                    {categorySkills.map((skill, sIdx) => (
                                        <motion.div
                                            key={sIdx}
                                            whileHover={{ scale: 1.05 }}
                                            className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all cursor-default"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                                            <span className="text-xs font-medium text-slate-700 dark:text-slate-200 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </GlowCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
