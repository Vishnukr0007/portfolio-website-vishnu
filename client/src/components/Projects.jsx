import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Rocket, ExternalLink, Github, CheckCircle2, Target, Cpu } from 'lucide-react';
import GlowCard from './ui/GlowCard';
import BotanicalDivider from './ui/BotanicalDivider';
import ProjectSkeleton from './skeletons/ProjectSkeleton';

const Projects = () => {
    const { projects, loading } = useSelector((state) => state.portfolio);
    const [activeCategory, setActiveCategory] = useState('All');

    if (loading) {
        return (
            <section id="projects" className="py-20">
                <div className="container mx-auto px-6">
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 w-1/3 mb-12 rounded animate-pulse" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((n) => (
                            <ProjectSkeleton key={n} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    const defaultProjects = [
        {
            _id: '6974a0849fc4cf2ec9a8516e',
            title: 'Blinkeyit — Full-Stack E-Commerce Platform',
            category: 'MERN Web App',
            description: 'Developed a scalable e-commerce platform with secure authentication, Stripe payments, cart management, infinite scroll, debounced search, and order tracking.',
            challenge: 'Managing complex cart state, responsive product search, and secure payment processing.',
            solution: 'Built with MERN stack, Redux Toolkit state management, Stripe payment gateway, and Cloudinary media optimization.',
            outcomes: [
                'Sub-100ms API response time for cart & product operations',
                'Integrated Stripe checkout & Cloudinary image hosting',
                'Built responsive admin dashboard for order processing',
                'Deployed production frontend and backend on Vercel'
            ],
            image: 'https://res.cloudinary.com/dzpihh1nu/image/upload/v1769251855/portfolio/ngniodh7vy6cdays0crz.png',
            tags: ['MERN Stack', 'Redux Toolkit', 'Tailwind CSS', 'Stripe', 'Cloudinary'],
            links: {
                code: 'https://github.com/Vishnukr0007/Blinkeyit-full-stack.git',
                demo: 'https://blinkeyit-full-stack-sooty.vercel.app/'
            }
        },
        {
            _id: '6974a3d29fc4cf2ec9a85171',
            title: 'Netflix-GPT — AI Movie Recommendation App',
            category: 'AI-Powered Web Application',
            description: 'Built a Netflix-style movie browsing interface featuring Firebase authentication, OpenAI GPT personalized movie recommendations, and TMDB API metadata.',
            challenge: 'Integrating dynamic natural language GPT suggestions with real-time movie API metadata.',
            solution: 'Leveraged OpenAI GPT API with TMDB search endpoints and global Redux state.',
            outcomes: [
                'Personalized AI movie recommendations using GPT prompts',
                'Firebase authentication for secure user sessions',
                'Responsive Netflix-inspired hero banner and category carousels'
            ],
            image: 'https://res.cloudinary.com/dzpihh1nu/image/upload/v1769251793/portfolio/dmibb1iuazvzzdb8hy9u.png',
            tags: ['React (Vite)', 'Tailwind CSS', 'Firebase', 'Redux', 'OpenAI GPT', 'TMDB API'],
            links: {
                code: 'https://netflix-gpt-6b7eb.web.app',
                demo: 'https://netflix-gpt-theta-dusky.vercel.app/'
            }
        }
    ];

    const displayProjects = projects && projects.length > 0 ? projects : defaultProjects;

    const categories = ['All', ...new Set(displayProjects.map((p) => p.category).filter(Boolean))];
    const filteredProjects =
        activeCategory === 'All'
            ? displayProjects
            : displayProjects.filter((p) => p.category === activeCategory);

    return (
        <section id="projects" className="py-20 relative">
            <BotanicalDivider />

            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-semibold mb-3"
                    >
                        <Rocket size={14} /> Featured Missions
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white"
                    >
                        Featured Projects & Case Studies
                    </motion.h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
                        Software built with clear technical goals, scalable architectures, and measurable outcomes.
                    </p>
                </div>

                {categories.length > 1 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                    activeCategory === cat
                                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredProjects.map((project, idx) => {
                        const defaultOutcomes = [
                            'Built responsive, accessible user interfaces',
                            'Designed modular REST APIs with error handling',
                            'Optimized database queries and state management'
                        ];

                        const outcomes = project.outcomes && project.outcomes.length > 0
                            ? project.outcomes
                            : defaultOutcomes;

                        return (
                            <GlowCard
                                key={project._id || idx}
                                glowColor={idx % 2 === 0 ? 'gold' : 'emerald'}
                                className="flex flex-col justify-between"
                            >
                                <div>
                                    {/* Mission Header */}
                                    <div className="flex items-center justify-between gap-3 mb-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-mono font-bold border border-amber-500/20">
                                            <Target size={12} /> MISSION-0{idx + 1}
                                        </div>
                                        {project.category && (
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                                                {project.category}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white mb-3">
                                        {project.title}
                                    </h3>

                                    {/* Project Image */}
                                    {project.image && (
                                        <div className="mb-5 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-950 aspect-video flex items-center justify-center">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}

                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Challenge & Solution */}
                                    {project.challenge && (
                                        <div className="mb-4 p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 space-y-2 text-xs">
                                            <div>
                                                <span className="font-bold text-amber-600 dark:text-amber-400">Challenge: </span>
                                                <span className="text-slate-700 dark:text-slate-300">{project.challenge}</span>
                                            </div>
                                            {project.solution && (
                                                <div>
                                                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Solution: </span>
                                                    <span className="text-slate-700 dark:text-slate-300">{project.solution}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Outcomes Section */}
                                    <div className="mb-6">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                                            <Cpu size={14} className="text-emerald-400" /> Key Outcomes
                                        </h4>
                                        <ul className="space-y-1.5">
                                            {outcomes.map((outcome, oIdx) => (
                                                <li key={oIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                                                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                                    <span>{outcome}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    {/* Tech Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-slate-200 dark:border-white/10">
                                        {(project.tags || []).map((tag, tIdx) => (
                                            <span
                                                key={tIdx}
                                                className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-[11px] font-medium text-slate-700 dark:text-slate-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex items-center gap-3">
                                        {project.links?.code && (
                                            <a
                                                href={project.links.code}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                                            >
                                                <Github size={14} /> Source Code
                                            </a>
                                        )}
                                        {project.links?.demo && project.links.demo !== '#' && (
                                            <a
                                                href={project.links.demo}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-600 transition-colors shadow-md shadow-amber-500/20"
                                            >
                                                <ExternalLink size={14} /> Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </GlowCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Projects;
