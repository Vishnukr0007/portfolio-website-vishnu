import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Mail, Phone, Github, Linkedin, Twitter, Share2, Send, Download, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import GlowCard from './ui/GlowCard';
import BotanicalDivider from './ui/BotanicalDivider';

const Contact = () => {
    const { socials, contactInfo } = useSelector((state) => state.portfolio);

    const getIcon = (platform) => {
        const p = platform.toLowerCase();
        if (p.includes('github')) return <Github size={18} />;
        if (p.includes('linkedin')) return <Linkedin size={18} />;
        if (p.includes('twitter') || p.includes('x')) return <Twitter size={18} />;
        return <Share2 size={18} />;
    };

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill in all fields');
            return;
        }

        setSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1200));
            toast.success('Message sent successfully! I will get back to you shortly.');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            toast.error('Failed to send message. Please try again or email directly.');
        } finally {
            setSubmitting(false);
        }
    };

    const email = contactInfo?.email || 'vishnukrishnankutty54@gmail.com';
    const phone = contactInfo?.phone || '+91 6282899456';
    const resumeUrl = contactInfo?.resumeUrl || '#';

    return (
        <section id="contact" className="py-20 relative">
            <BotanicalDivider />

            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-xs font-semibold mb-3"
                    >
                        <Sparkles size={14} /> Direct Communication
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white"
                    >
                        Let’s Build Something Meaningful
                    </motion.h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
                        I am currently open to Software Engineer and Full-Stack Developer positions. Let's start a conversation!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
                    {/* Direct Contact Cards */}
                    <div className="md:col-span-2 space-y-4">
                        <GlowCard glowColor="gold" className="p-6">
                            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-4">
                                Quick Reach
                            </h3>
                            <div className="space-y-4 text-xs">
                                <a
                                    href={`mailto:${email}`}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-amber-500/50 hover:text-amber-500 transition-all truncate"
                                >
                                    <Mail size={16} className="text-amber-500 shrink-0" />
                                    <span className="truncate">{email}</span>
                                </a>

                                <a
                                    href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-emerald-500/50 hover:text-emerald-500 transition-all"
                                >
                                    <Phone size={16} className="text-emerald-500 shrink-0" />
                                    <span>{phone}</span>
                                </a>

                                <a
                                    href={resumeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-semibold hover:bg-amber-500 hover:text-slate-950 transition-all"
                                >
                                    <Download size={16} className="shrink-0" />
                                    <span>Download Resume (PDF)</span>
                                </a>
                            </div>
                        </GlowCard>

                        {/* Social Profiles */}
                        <GlowCard glowColor="emerald" className="p-6">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                                Professional Profiles
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {(socials && socials.length > 0
                                    ? socials
                                    : [
                                          { _id: 's1', platform: 'GitHub', url: 'https://github.com/Vishnukr0007' },
                                          { _id: 's2', platform: 'LinkedIn', url: 'https://linkedin.com' }
                                      ]
                                ).map((social) => (
                                    <a
                                        key={social._id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-400 border border-slate-200 dark:border-white/10 transition-colors"
                                    >
                                        {getIcon(social.platform)}
                                        <span>{social.platform}</span>
                                    </a>
                                ))}
                            </div>
                        </GlowCard>
                    </div>

                    {/* Contact Form */}
                    <div className="md:col-span-3">
                        <GlowCard glowColor="gold" className="p-6 sm:p-8">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#060913] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-amber-500 outline-none transition-all"
                                        placeholder="Full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#060913] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-amber-500 outline-none transition-all"
                                        placeholder="email@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#060913] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-amber-500 outline-none transition-all resize-none"
                                        placeholder="Tell me about your project, team opportunity, or inquiry..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Send Message <Send size={15} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </GlowCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
