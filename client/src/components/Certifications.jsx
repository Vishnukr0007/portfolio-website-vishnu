import { motion } from 'framer-motion';
import { Award, Building2, CalendarDays, ExternalLink } from 'lucide-react';
import { useSelector } from 'react-redux';

const Certifications = () => {
    const { certificates } = useSelector((state) => state.portfolio);

    if (certificates.length === 0) return null;

    return (
    <section id="certifications" className="py-24 bg-gray-50 dark:bg-black/20">
        <div className="container mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mb-12"
            >
                <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark mb-3">
                    <Award size={18} /> Professional development
                </p>
                <h2 className="text-4xl md:text-5xl font-bold font-heading text-text-primary-light dark:text-text-primary-dark">
                    Training & <span className="text-primary-light dark:text-primary-dark">Certifications</span>
                </h2>
                <p className="mt-4 text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                    Practical learning and industry training that support my full-stack development work.
                </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-2">
                {certificates.map((certificate) => (
            <motion.article
                key={certificate._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid overflow-hidden rounded-3xl border border-gray-200 bg-card-light shadow-xl dark:border-primary-dark/20 dark:bg-card-dark"
            >
                <a
                    href={certificate.image}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative block min-h-64 overflow-hidden bg-slate-100 dark:bg-black/30"
                    aria-label={`View ${certificate.title} certificate`}
                >
                    <img
                        src={certificate.image}
                        alt={`${certificate.title} certificate issued by ${certificate.issuer}`}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-sm font-bold text-white opacity-0 transition-all duration-300 group-hover:bg-black/45 group-hover:opacity-100">
                        View full certificate <ExternalLink className="ml-2" size={17} />
                    </span>
                </a>

                <div className="flex flex-col p-8 md:p-10">
                    <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary-light/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-light dark:bg-primary-dark/10 dark:text-primary-dark">
                        <Award size={16} /> Certificate of Participation
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark md:text-3xl">{certificate.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-text-secondary-light dark:text-text-secondary-dark">{certificate.description}</p>

                    <div className="mt-8 space-y-3 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                        <p className="flex items-center gap-3"><Building2 className="text-primary-light dark:text-primary-dark" size={19} /> {certificate.issuer}</p>
                        <p className="flex items-center gap-3"><CalendarDays className="text-primary-light dark:text-primary-dark" size={19} /> {certificate.issueDate}</p>
                    </div>

                    <a
                        href={certificate.credentialUrl || certificate.image}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-primary-light px-5 py-3 font-bold text-white transition-transform hover:-translate-y-0.5 dark:bg-primary-dark dark:text-black"
                    >
                        View certificate <ExternalLink size={18} />
                    </a>
                </div>
            </motion.article>
                ))}
            </div>
        </div>
    </section>
    );
};

export default Certifications;
