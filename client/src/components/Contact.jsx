import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Mail, Phone, Github, Linkedin, Twitter, Share2, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
    const { socials, contactInfo } = useSelector((state) => state.portfolio);
    const dispatch = useDispatch();

    const getIcon = (platform) => {
        const p = platform.toLowerCase();
        if (p.includes('github')) return <Github size={24} />;
        if (p.includes('linkedin')) return <Linkedin size={24} />;
        if (p.includes('twitter') || p.includes('x')) return <Twitter size={24} />;
        return <Share2 size={24} />;
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
        // Simulate API call
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.success('Message sent successfully! I will get back to you soon.');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            toast.error('Failed to send message. Please try again or use direct email.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-gray-50 dark:bg-black/20">
            <div className="container mx-auto px-6 text-center max-w-2xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold font-heading mb-6 text-text-primary-light dark:text-text-primary-dark"
                >
                    Let's <span className="text-primary-light dark:text-primary-dark">Connect</span>
                </motion.h2>

                <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-12">
                    I'm currently available for freelance work and full-time opportunities. Feel free to reach out!
                </p>

                {contactInfo && (
                    <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
                        <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center justify-center gap-3 text-text-primary-light dark:text-text-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors">
                            <Phone size={20} /> {contactInfo.phone}
                        </a>
                        <a href={`mailto:${contactInfo.email}`} className="flex items-center justify-center gap-3 text-text-primary-light dark:text-text-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors">
                            <Mail size={20} /> {contactInfo.email}
                        </a>
                    </div>
                )}

                <motion.form 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onSubmit={handleSubmit}
                    className="max-w-xl mx-auto bg-white/50 dark:bg-card-dark p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 backdrop-blur-sm"
                >
                    <div className="mb-6 text-left">
                        <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-dark border border-gray-200 dark:border-white/10 focus:border-primary-light dark:focus:border-primary-dark focus:ring-1 focus:ring-primary-light dark:focus:ring-primary-dark outline-none transition-all dark:text-white"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="mb-6 text-left">
                        <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-dark border border-gray-200 dark:border-white/10 focus:border-primary-light dark:focus:border-primary-dark focus:ring-1 focus:ring-primary-light dark:focus:ring-primary-dark outline-none transition-all dark:text-white"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="mb-8 text-left">
                        <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">Message</label>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-dark border border-gray-200 dark:border-white/10 focus:border-primary-light dark:focus:border-primary-dark focus:ring-1 focus:ring-primary-light dark:focus:ring-primary-dark outline-none transition-all dark:text-white resize-none"
                            placeholder="Hello, I'd like to talk about..."
                        ></textarea>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={submitting}
                        className="w-full py-4 rounded-xl bg-primary-light dark:bg-primary-dark text-white dark:text-black font-bold shadow-lg shadow-primary-light/30 dark:shadow-primary-dark/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                        {submitting ? (
                            <div className="w-6 h-6 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin"></div>
                        ) : (
                            <>Send Message <Send size={18} /></>
                        )}
                    </button>
                    
                    <div className="mt-4 text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        Or <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo?.email || 'vishnukrishnankutty54@gmail.com'}`} target="_blank" rel="noreferrer" className="underline hover:text-primary-light dark:hover:text-primary-dark transition-colors">send via Gmail directly</a>
                    </div>
                </motion.form>

                {socials.length > 0 && (
                    <div className="flex flex-col items-center gap-8 mt-16">
                        <div className="flex justify-center gap-6">
                            {socials.map((social) => (
                                <a
                                    key={social._id}
                                    href={social.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                                    title={social.platform}
                                >
                                    {getIcon(social.platform)}
                                </a>
                            ))}
                        </div>

                        <a
                            href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/resume/download`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-all flex items-center gap-2 underline underline-offset-4 decoration-primary-light/30 dark:decoration-primary-dark/30"
                        >
                            Download My Resume (PDF)
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Contact;
