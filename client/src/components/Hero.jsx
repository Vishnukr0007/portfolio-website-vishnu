import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Sparkles, ArrowRight, Download, Mail, Layers, Layout, Server, GraduationCap } from 'lucide-react';
import GlowCard from './ui/GlowCard';

const Hero = () => {
    const { contactInfo } = useSelector((state) => state.portfolio);
    const resumeUrl = contactInfo?.resumeUrl || '#';

    const recruiterPillars = [
        {
            icon: <Layers className="w-5 h-5 text-amber-500" />,
            title: 'Full-Stack MERN Development',
            desc: 'End-to-end web apps with React, Express, Node.js, and MongoDB.'
        },
        {
            icon: <Layout className="w-5 h-5 text-emerald-500" />,
            title: 'Responsive, Production-Ready UIs',
            desc: 'Pixel-perfect, accessible layouts powered by Tailwind CSS & Framer Motion.'
        },
        {
            icon: <Server className="w-5 h-5 text-cyan-500" />,
            title: 'REST APIs & Database Design',
            desc: 'Scalable backend architectures, secure auth, and clean schema models.'
        },
        {
            icon: <GraduationCap className="w-5 h-5 text-indigo-400" />,
            title: 'Continuous Learning & Training',
            desc: 'Passionate about adopting modern best practices and solving complex problems.'
        }
    ];

    return (
        <section id="hero" className="relative pt-12 pb-16 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Hero Top Grid */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                    {/* Hero Text */}
                    <div className="flex-1 text-center lg:text-left max-w-2xl">
                        {/* Availability Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium mb-6 shadow-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Open to Software Engineer / Full-Stack Developer opportunities
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight text-slate-900 dark:text-white mb-6"
                        >
                            Growing ideas into{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 dark:from-amber-300 dark:via-amber-400 dark:to-emerald-400">
                                scalable software
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed"
                        >
                            {contactInfo?.heroDescription ||
                                "Hi, I'm Vishnu K — a passionate Full-Stack Engineer crafting robust MERN applications, clean RESTful services, and engaging user experiences."}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                        >
                            <a
                                href="#projects"
                                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
                            >
                                View Projects <ArrowRight size={16} />
                            </a>
                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold text-sm flex items-center gap-2 hover:bg-amber-500/20 transition-all hover:scale-[1.02]"
                            >
                                <Download size={16} /> Download Resume
                            </a>
                            <a
                                href="#contact"
                                className="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-white/5 transition-all hover:scale-[1.02]"
                            >
                                <Mail size={16} /> Contact Me
                            </a>
                        </motion.div>
                    </div>

                    {/* Planetary Frame Avatar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative flex-1 flex justify-center items-center"
                    >
                        <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
                            {/* Outer Orbital Ring */}
                            <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/30 animate-orbit-slow pointer-events-none">
                                {/* Orbiting Tech Badges */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/90 text-amber-400 text-xs border border-amber-500/40 shadow-lg font-mono font-semibold">
                                    React
                                </div>
                                <div className="absolute top-1/2 -right-4 -translate-y-1/2 px-3 py-1 rounded-full bg-slate-900/90 text-emerald-400 text-xs border border-emerald-500/40 shadow-lg font-mono font-semibold">
                                    Node.js
                                </div>
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/90 text-cyan-400 text-xs border border-cyan-500/40 shadow-lg font-mono font-semibold">
                                    MongoDB
                                </div>
                                <div className="absolute top-1/2 -left-4 -translate-y-1/2 px-3 py-1 rounded-full bg-slate-900/90 text-amber-300 text-xs border border-amber-300/40 shadow-lg font-mono font-semibold">
                                    Express
                                </div>
                            </div>

                            {/* Planetary Halo */}
                            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-500/20 via-emerald-500/10 to-indigo-500/20 blur-2xl pointer-events-none" />

                            {/* Circular Image Container */}
                            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full p-1.5 bg-gradient-to-br from-amber-400 via-emerald-400 to-indigo-500 shadow-2xl overflow-hidden">
                                <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center">
                                    {contactInfo?.heroImage ? (
                                        <img
                                            src={contactInfo.heroImage}
                                            alt="Vishnu K"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-b from-slate-900 to-[#0a0f1d] flex flex-col items-center justify-center p-4 text-center">
                                            <Sparkles className="w-10 h-10 text-amber-400 mb-2 animate-bounce" />
                                            <span className="text-xs font-semibold text-slate-300">Vishnu K</span>
                                            <span className="text-[10px] text-slate-500 mt-1">Full-Stack Engineer</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Recruiter "What I Bring" Section */}
                <div className="mt-16 pt-10 border-t border-slate-200 dark:border-white/10">
                    <div className="text-center max-w-xl mx-auto mb-8">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Recruiter Highlights</span>
                        <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mt-1">
                            What I Bring To Your Team
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {recruiterPillars.map((pillar, idx) => (
                            <GlowCard key={idx} glowColor="emerald" className="flex flex-col gap-3">
                                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 w-fit">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                                    {pillar.title}
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </GlowCard>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
