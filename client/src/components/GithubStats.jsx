import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, Users, BookOpen, Orbit, ExternalLink } from 'lucide-react';
import GlowCard from './ui/GlowCard';

const GithubStats = ({ username = 'Vishnukr0007' }) => {
    const [stats, setStats] = useState({
        publicRepos: 12,
        totalStars: 5,
        followers: 4,
        url: `https://github.com/${username}`
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userRes = await fetch(`https://api.github.com/users/${username}`);
                const userData = await userRes.json();

                const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
                const reposData = await reposRes.json();

                let totalStars = 0;
                if (Array.isArray(reposData)) {
                    totalStars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
                }

                if (userData.public_repos !== undefined) {
                    setStats({
                        followers: userData.followers || 0,
                        publicRepos: userData.public_repos || 0,
                        totalStars: totalStars,
                        url: userData.html_url || `https://github.com/${username}`
                    });
                }
            } catch (error) {
                console.error('Error fetching GitHub stats', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [username]);

    return (
        <section className="py-12 relative z-10">
            <div className="container mx-auto px-6">
                <GlowCard glowColor="gold" className="p-8 sm:p-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        {/* GitHub Planet Icon */}
                        <div className="flex items-center gap-5">
                            <div className="relative w-16 h-16 rounded-full bg-slate-900 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
                                {/* Orbit Ring */}
                                <div className="absolute inset-0 rounded-full border border-dashed border-amber-400/30 animate-orbit-slow" />
                                <Github size={30} />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 mb-1">
                                    <Orbit size={14} className="animate-spin" /> Open-Source Orbit
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white">
                                    GitHub Activity Metrics
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Live code contributions and open-source projects (@{username})
                                </p>
                            </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-2 text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white">
                                    <BookOpen size={20} className="text-amber-500" />
                                    <span>{stats.publicRepos}</span>
                                </div>
                                <span className="text-xs text-slate-500 font-medium mt-1">Repositories</span>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-2 text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white">
                                    <Star size={20} className="text-amber-400" />
                                    <span>{stats.totalStars}</span>
                                </div>
                                <span className="text-xs text-slate-500 font-medium mt-1">Stars Earned</span>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-2 text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white">
                                    <Users size={20} className="text-emerald-400" />
                                    <span>{stats.followers}</span>
                                </div>
                                <span className="text-xs text-slate-500 font-medium mt-1">Followers</span>
                            </div>
                        </div>

                        {/* CTA Link */}
                        <a
                            href={stats.url}
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-amber-500/20"
                        >
                            View GitHub Profile <ExternalLink size={14} />
                        </a>
                    </div>
                </GlowCard>
            </div>
        </section>
    );
};

export default GithubStats;
