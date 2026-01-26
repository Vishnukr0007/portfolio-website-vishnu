import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Mail, Phone, Github, Linkedin, Twitter, Share2 } from 'lucide-react';

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

    return (
        <section id="contact" className="py-24 bg-gray-50 dark:bg-black/20">
            <div className="container mx-auto px-6 text-center max-w-2xl">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold font-heading mb-6 dark:text-white"
                >
                    Let's <span className="text-primary">Connect</span>
                </motion.h2>

                <p className="text-lg text-gray-600 dark:text-text-secondary mb-12">
                    I'm currently available for freelance work and full-time opportunities. Feel free to reach out!
                </p>

                {contactInfo && (
                    <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
                        <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center justify-center gap-3 text-gray-700 dark:text-white hover:text-primary transition-colors">
                            <Phone size={20} /> {contactInfo.phone}
                        </a>
                        <a href={`mailto:${contactInfo.email}`} className="flex items-center justify-center gap-3 text-gray-700 dark:text-white hover:text-primary transition-colors">
                            <Mail size={20} /> {contactInfo.email}
                        </a>
                    </div>
                )}

                <a 
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo?.email || 'vishnukrishnankutty54@gmail.com'}`} 
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all"
                >
                    Send Email via Gmail
                </a>

                {socials.length > 0 && (
                    <div className="flex justify-center gap-6 mt-16">
                        {socials.map((social) => (
                            <a 
                                key={social._id} 
                                href={social.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-gray-400 hover:text-primary transition-colors"
                                title={social.platform}
                            >
                                {getIcon(social.platform)}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Contact;
