import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitCommit, Users, BookOpen } from 'lucide-react';

const GithubStats = ({ username = 'Vishnukr0007' }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch user data
                const userRes = await fetch(`https://api.github.com/users/${username}`);
                const userData = await userRes.json();
                
                // Fetch repos to calculate stars
                const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
                const reposData = await reposRes.json();
                
                let totalStars = 0;
                if (Array.isArray(reposData)) {
                    totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
                }

                setStats({
                    followers: userData.followers,
                    publicRepos: userData.public_repos,
                    totalStars: totalStars,
                    url: userData.html_url
                });
            } catch (error) {
                console.error("Error fetching GitHub stats", error);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchStats();
        } else {
            setLoading(false);
        }
    }, [username]);

    if (loading) return null; // or a skeleton

    return (
        <section className="py-12 bg-white dark:bg-dark relative z-10 border-y border-gray-100 dark:border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gray-50 dark:bg-card-dark rounded-3xl p-8 border border-gray-100 dark:border-white/5 shadow-sm">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-primary-light/10 dark:bg-primary-dark/20 flex items-center justify-center text-primary-light dark:text-primary-dark">
                            <Github size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold font-heading dark:text-white">GitHub Activity</h3>
                            <p className="text-gray-500 dark:text-gray-400">Live metrics from my open source contributions</p>
                        </div>
                    </div>
                    
                    {stats && (
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-2 text-3xl font-bold dark:text-white mb-1">
                                    <BookOpen size={24} className="text-primary-light dark:text-primary-dark" />
                                    <span>{stats.publicRepos}</span>
                                </div>
                                <span className="text-sm text-gray-500 font-medium">Repositories</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-2 text-3xl font-bold dark:text-white mb-1">
                                    <Star size={24} className="text-primary-light dark:text-primary-dark" />
                                    <span>{stats.totalStars}</span>
                                </div>
                                <span className="text-sm text-gray-500 font-medium">Total Stars</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-2 text-3xl font-bold dark:text-white mb-1">
                                    <Users size={24} className="text-primary-light dark:text-primary-dark" />
                                    <span>{stats.followers}</span>
                                </div>
                                <span className="text-sm text-gray-500 font-medium">Followers</span>
                            </div>
                        </div>
                    )}
                    
                    <a 
                        href={stats?.url || `https://github.com/${username}`}
                        target="_blank" 
                        rel="noreferrer"
                        className="px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:scale-105 transition-transform whitespace-nowrap"
                    >
                        Follow Me
                    </a>
                </div>
            </div>
        </section>
    );
};

export default GithubStats;
