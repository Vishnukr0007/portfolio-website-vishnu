import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import ProjectSkeleton from './skeletons/ProjectSkeleton';

const Projects = () => {
    const { projects, loading } = useSelector((state) => state.portfolio);

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

    return (
        <section id="projects" className="py-24 bg-gray-50 dark:bg-black/20">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold font-heading mb-16 dark:text-white text-center md:text-left"
                >
                    Featured <span className="text-primary border-b-4 border-primary/20 pb-2">Projects</span>
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group flex flex-col h-full bg-white dark:bg-card rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
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
                                    <h3 className="text-2xl font-bold dark:text-white group-hover:text-primary transition-colors leading-tight">{project.title}</h3>
                                    {project.category && (
                                        <span className="shrink-0 px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded tracking-wider">
                                            {project.category}
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 dark:text-text-secondary mb-6 line-clamp-4 leading-relaxed flex-1">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags?.map((tag, tIdx) => (
                                        <span key={tIdx} className="px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-full text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
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
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-sm font-semibold text-gray-700 dark:text-white hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300"
                                        >
                                            <Github size={18} /> Code
                                        </a>
                                    )}
                                    {project.links?.demo && (
                                        <a
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                                        >
                                            <ExternalLink size={18} /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
