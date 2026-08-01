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
            _id: 'default-p1',
            title: 'Personal Portfolio & CMS Platform',
            category: 'Full-Stack',
            description: 'A full-stack responsive portfolio website with an integrated admin management dashboard to update skills, experience, and certificates in real time.',
            challenge: 'Managing static content required redeploying code for every profile update.',
            solution: 'Built a decoupled MERN stack application with Express REST API, MongoDB Mongoose models, Cloudinary media storage, and Redux Toolkit state management.',
            outcomes: [
                'Eliminated code redeployments for content updates',
                'Secured admin dashboard with custom API authentication',
                'Achieved 100/100 Lighthouse performance and accessibility scores',
                'Deployed seamlessly on Vercel'
            ],
            tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit', 'Tailwind CSS'],
            links: {
                code: 'https://github.com/Vishnukr0007/portfolio-website-vishnu',
                demo: 'https://portfolio-website-vishnu-6rmv.vercel.app'
            }
        },
        {
            _id: 'default-p2',
            title: 'Task & Workflow Manager App',
            category: 'Web App',
            description: 'Interactive web application designed to help users organize, prioritize, and track project tasks with real-time status updates.',
            challenge: 'Complex task states caused UI re-rendering lags on larger lists.',
            solution: 'Optimized state flow using Redux Toolkit slices, memoized components, and built REST endpoints for efficient CRUD operations.',
            outcomes: [
                'Sub-100ms API response time for task status updates',
                'Built responsive dashboard with filterable task categories',
                'Integrated sweetalert & hot-toast interactive notifications'
            ],
            tags: ['React', 'Express', 'Node.js', 'MongoDB', 'REST API'],
            links: {
                code: 'https://github.com/Vishnukr0007',
                demo: '#'
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
