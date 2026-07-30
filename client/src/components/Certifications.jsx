import React from 'react';
import { motion } from 'framer-motion';
import { Award, Building2, CalendarDays, ExternalLink, Sparkles } from 'lucide-react';
import { useSelector } from 'react-redux';
import GlowCard from './ui/GlowCard';
import BotanicalDivider from './ui/BotanicalDivider';

const Certifications = () => {
    const { certificates } = useSelector((state) => state.portfolio);

    const defaultCertificates = [
        {
            _id: 'default-1',
            title: 'MERN Stack Web Development',
            issuer: 'Professional Training Institute',
            issueDate: '2024',
            description: 'Comprehensive hands-on training in MongoDB, Express.js, React.js, Node.js, REST API development, and deployment.',
            credentialUrl: '#',
        },
        {
            _id: 'default-2',
            title: 'Full-Stack JavaScript & React Development',
            issuer: 'Online Learning Platform',
            issueDate: '2023',
            description: 'Specialized training covering modern React Hooks, Redux Toolkit, state architecture, and responsive Tailwind UI design.',
            credentialUrl: '#',
        }
    ];

    const displayCerts = certificates && certificates.length > 0 ? certificates : defaultCertificates;

    return (
        <section id="certifications" className="py-20 relative">
            <BotanicalDivider flip />

            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-semibold mb-3"
                    >
                        <Sparkles size={14} /> Learning Constellation
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white"
                    >
                        Certifications & Continuous Training
                    </motion.h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
                        Structured learning milestones and verified technical qualifications.
                    </p>
                </div>

                {/* Constellation Grid */}
                <div className="relative grid gap-8 md:grid-cols-2">
                    {/* Connecting Constellation Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/10 via-amber-500/40 to-emerald-500/10 -translate-y-1/2 pointer-events-none z-0" />

                    {displayCerts.map((cert, idx) => (
                        <GlowCard
                            key={cert._id || idx}
                            glowColor={idx % 2 === 0 ? 'gold' : 'emerald'}
                            className="relative z-10 flex flex-col justify-between"
                        >
                            {/* Constellation Star Node */}
                            <div className="absolute -top-3 left-8 px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-400 text-[10px] font-mono border border-amber-500/40 flex items-center gap-1 shadow-md">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                                NODE-0{idx + 1}
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500 mb-3 mt-2">
                                    <Award size={16} /> Verified Qualification
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white mb-3">
                                    {cert.title}
                                </h3>

                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                    {cert.description}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                                        <Building2 size={14} className="text-amber-500" /> {cert.issuer}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                                        <CalendarDays size={14} className="text-emerald-500" /> {cert.issueDate}
                                    </div>
                                </div>

                                {(cert.credentialUrl || cert.image) && (
                                    <a
                                        href={cert.credentialUrl || cert.image}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950 transition-all"
                                    >
                                        Verify Certificate <ExternalLink size={14} />
                                    </a>
                                )}
                            </div>
                        </GlowCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
