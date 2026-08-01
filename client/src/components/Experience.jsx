import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion, useScroll, useSpring } from 'framer-motion';
import { GitCommit, Briefcase, GraduationCap, CalendarDays } from 'lucide-react';
import GlowCard from './ui/GlowCard';
import BotanicalDivider from './ui/BotanicalDivider';
import ExperienceSkeleton from './skeletons/ExperienceSkeleton';

const Experience = () => {
    const { experience, loading } = useSelector((state) => state.portfolio);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start center', 'end center'],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    if (loading) {
        return (
            <section id="experience" className="py-20">
                <div className="container mx-auto px-6">
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 w-1/3 mb-12 rounded animate-pulse" />
                    <div className="max-w-3xl mx-auto pl-6 md:pl-8 space-y-8">
                        {[1, 2].map((n) => (
                            <ExperienceSkeleton key={n} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    const defaultExperience = [
        {
            _id: 'exp-1',
            title: 'Full-Stack Developer Trainee / Projects',
            subtitle: 'Practical Training & Self-Directed Projects',
            date: '2023 - Present',
            description: [
                'Engineered full-stack web applications using React 19, Node.js, Express, and MongoDB.',
                'Designed and implemented REST APIs with secure JWT authentication and error-handling middlewares.',
                'Integrated state management using Redux Toolkit slices and optimized frontend component performance.',
                'Configured continuous deployment pipelines using Vercel, Git, and GitHub workflows.'
            ],
        },
        {
            _id: 'exp-2',
            title: 'Computer Science & Software Engineering Studies',
            subtitle: 'Degree / Higher Secondary Education',
            date: '2020 - 2023',
            description: [
                'Built solid foundational knowledge in Data Structures, Algorithms, Database Management (DBMS), and Web Engineering.',
                'Developed collaborative group projects focusing on responsive frontend interfaces and relational/document databases.'
            ],
        },
    ];

    const displayExperience = experience && experience.length > 0 ? experience : defaultExperience;

    return (
        <section id="experience" className="py-20 relative">
            <BotanicalDivider flip />

            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-xs font-semibold mb-3"
                    >
                        <GitCommit size={14} /> Growth Timeline
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white"
                    >
                        Experience & Milestone Path
                    </motion.h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
                        My career path, hands-on training, and software development milestones.
                    </p>
                </div>

                <div ref={containerRef} className="relative max-w-3xl mx-auto pl-6 sm:pl-10 space-y-8">
                    {/* Background Glowing Vine Path */}
                    <div className="absolute top-0 bottom-0 left-[11px] sm:left-[19px] w-[2px] bg-slate-200 dark:bg-white/10 origin-top" />

                    {/* Animated Scroll Progress Vine */}
                    <motion.div
                        className="absolute top-0 bottom-0 left-[11px] sm:left-[19px] w-[2px] bg-gradient-to-b from-amber-500 via-emerald-400 to-amber-500 origin-top shadow-[0_0_12px_#10b981]"
                        style={{ scaleY }}
                    />

                    {displayExperience.map((item, idx) => (
                        <motion.div
                            key={item._id || idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ margin: '-80px', once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            {/* Glowing Milestone Node */}
                            <div className="absolute -left-[31px] sm:-left-[43px] top-4 w-6 h-6 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_12px_#f59e0b] z-10">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            </div>

                            <GlowCard glowColor={idx % 2 === 0 ? 'emerald' : 'gold'}>
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                                        <CalendarDays size={12} /> {item.date}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-400">NODE 0{idx + 1}</span>
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-1.5">
                                    <Briefcase size={14} /> {item.subtitle}
                                </p>

                                {item.description && item.description.length > 0 && (
                                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                        {item.description.map((desc, dIdx) => (
                                            <li key={dIdx} className="flex items-start gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                                                <span>{desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </GlowCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
