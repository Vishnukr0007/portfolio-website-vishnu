import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import ProjectSkeleton from './skeletons/ProjectSkeleton';

const Projects = () => {
    const { projects, loading } = useSelector((state) => state.portfolio);
    const [activeCategory, setActiveCategory] = useState('All');

    if (loading) {
        return (
            <section id="projects" className="py-24 bg-gray-50 dark:bg-black/20">
                <div className="container mx-auto px-6">
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 w-1/3 mb-16 rounded animate-pulse"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
                        {[1, 2, 3].map((n) => (
                            <ProjectSkeleton key={n} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (!projects || projects.length === 0) {
        return null;
    }

    const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];
    const filteredProjects = activeCategory === 'All' 
        ? projects 
        : projects.filter(p => p.category === activeCategory);

    return (
        <section id="projects" className="py-24 bg-gray-50 dark:bg-black/20">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold font-heading mb-12 dark:text-white text-center md:text-left"
                >
                    Featured <span className="text-primary border-b-4 border-primary/20 pb-2">Projects</span>
                </motion.h2>

                {categories.length > 1 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-3 justify-center md:justify-start mb-12"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                                    activeCategory === cat 
                                    ? 'bg-primary-light dark:bg-primary-dark text-white shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20'
                                    : 'bg-white/10 text-gray-600 dark:text-gray-400 hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 hover:text-primary-light dark:hover:text-primary-dark'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                )}

                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group flex flex-col h-full bg-card-light dark:bg-card-dark rounded-2xl overflow-hidden border border-gray-200 dark:border-primary-dark/80 hover:border-primary-light dark:hover:border-primary-dark transition-all duration-500 shadow-[0_10px_40px_-15px_rgba(217,119,6,0.15)] dark:shadow-none hover:shadow-[0_20px_50px_-12px_rgba(217,119,6,0.25)] dark:hover:shadow-[0_0_30px_0_rgba(255,191,0,0.2)] hover:-translate-y-2"
                            style={{
                                boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)'
                            }}
                        >
                            {project.image && (
                                <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-black/40 flex items-center justify-center p-4">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-4 gap-3">
                                    <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors leading-tight">{project.title}</h3>
                                    {project.category && (
                                        <span className="shrink-0 px-2 py-1 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark text-[10px] font-bold uppercase rounded tracking-wider">
                                            {project.category}
                                        </span>
                                    )}
                                </div>
                                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 line-clamp-4 leading-relaxed flex-1">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags?.map((tag, tIdx) => (
                                        <span key={tIdx} className="px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-full text-xs font-medium text-text-secondary-light dark:text-gray-400 group-hover:bg-primary-light/5 dark:group-hover:bg-primary-dark/5 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 mt-auto">
                                    {project.links?.code && (
                                        <a
                                            href={project.links.code}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-sm font-semibold text-text-primary-light dark:text-text-primary-dark hover:bg-primary-light dark:hover:bg-primary-dark hover:text-white dark:hover:text-black transition-all duration-300"
                                        >
                                            <Github size={18} /> Code
                                        </a>
                                    )}
                                    {project.links?.demo && (
                                        <a
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark text-sm font-semibold hover:bg-primary-light dark:hover:bg-primary-dark hover:text-white dark:hover:text-black transition-all duration-300"
                                        >
                                            <ExternalLink size={18} /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
