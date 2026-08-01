import React from 'react';
import { motion } from 'framer-motion';
import { Award, Building2, CalendarDays, ExternalLink, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import GlowCard from './ui/GlowCard';
import BotanicalDivider from './ui/BotanicalDivider';

const Certifications = () => {
    const { certificates } = useSelector((state) => state.portfolio);

    const defaultCertificates = [
        {
            _id: '6a6afa74b09be5e10955b578',
            title: 'Node.js Industrial Training Workshop',
            issuer: 'Outfox Technologies',
            issueDate: '22 Apr 2026 – 06 May 2026',
            description: 'Completed an intensive 10-day industrial training workshop in Node.js conducted by Outfox Technologies. Gained practical experience in backend architecture, REST API design, server-side JavaScript, async patterns, and production web service engineering.',
            image: 'https://res.cloudinary.com/dzpihh1nu/image/upload/v1785395827/portfolio/dh2x6fumlpbfeddymnu9.jpg',
            credentialUrl: 'https://res.cloudinary.com/dzpihh1nu/image/upload/v1785395827/portfolio/dh2x6fumlpbfeddymnu9.jpg',
        }
    ];

    const displayCerts = certificates && certificates.length > 0 ? certificates : defaultCertificates;

    return (
        <section id="certifications" className="py-20 relative">
            <BotanicalDivider flip />

            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-semibold mb-3"
                    >
                        <Sparkles size={14} /> Verified Credentials
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white"
                    >
                        Certifications & Industrial Training
                    </motion.h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
                        Official technical certifications, workshops, and verified qualifications.
                    </p>
                </div>

                {/* Horizontal Certificate Cards Stack */}
                <div className="space-y-8">
                    {displayCerts.map((cert, idx) => (
                        <GlowCard
                            key={cert._id || idx}
                            glowColor={idx % 2 === 0 ? 'gold' : 'emerald'}
                            className="relative overflow-hidden p-6 sm:p-8"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-8">
                                {/* Left Column: Certificate Document Preview */}
                                {cert.image ? (
                                    <div className="w-full md:w-5/12 shrink-0 relative group">
                                        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-950 shadow-xl">
                                            <img
                                                src={cert.image}
                                                alt={cert.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                                                <a
                                                    href={cert.credentialUrl || cert.image}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg"
                                                >
                                                    <ExternalLink size={14} /> Full View
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full md:w-5/12 shrink-0 aspect-[4/3] rounded-2xl bg-gradient-to-br from-amber-500/10 to-emerald-500/10 border border-amber-500/20 flex flex-col items-center justify-center p-6 text-center">
                                        <Award className="w-12 h-12 text-amber-500 mb-3" />
                                        <span className="text-xs font-bold text-slate-300">Verified Certificate</span>
                                    </div>
                                )}

                                {/* Right Column: Professional Details */}
                                <div className="flex-1 w-full flex flex-col justify-between space-y-4 text-left">
                                    <div>
                                        {/* Status Badges */}
                                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-mono font-semibold border border-amber-500/20">
                                                <ShieldCheck size={14} /> OFFICIAL CREDENTIAL
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                                                <CalendarDays size={14} className="text-emerald-500 shrink-0" />
                                                <span>{cert.issueDate}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white mb-2 leading-snug">
                                            {cert.title}
                                        </h3>

                                        <div className="flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400 mb-4">
                                            <Building2 size={16} className="shrink-0" />
                                            <span>{cert.issuer}</span>
                                        </div>

                                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                            {cert.description}
                                        </p>
                                    </div>

                                    {/* Action Bar */}
                                    <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500">
                                            <CheckCircle2 size={16} /> Verified Qualification
                                        </div>

                                        {(cert.credentialUrl || cert.image) && (
                                            <a
                                                href={cert.credentialUrl || cert.image}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 hover:scale-105"
                                            >
                                                Verify Certificate <ExternalLink size={14} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </GlowCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
