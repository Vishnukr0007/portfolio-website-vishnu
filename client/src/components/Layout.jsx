import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Menu, X, Home, Cpu, Award, Folder, Briefcase, Mail, Download, Lock } from 'lucide-react';
import QuickActions from './ui/QuickActions';

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAdmin } = useSelector((state) => state.auth);
    const { contactInfo } = useSelector((state) => state.portfolio);

    const resumeUrl = contactInfo?.resumeUrl || '#';

    // Body scroll lock when menu is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const navItems = [
        { name: 'Home', href: '/#hero', icon: <Home size={18} className="text-amber-500" /> },
        { name: 'Skills', href: '/#skills', icon: <Cpu size={18} className="text-emerald-500" /> },
        { name: 'Certifications', href: '/#certifications', icon: <Award size={18} className="text-amber-400" /> },
        { name: 'Projects', href: '/#projects', icon: <Folder size={18} className="text-cyan-500" /> },
        { name: 'Experience', href: '/#experience', icon: <Briefcase size={18} className="text-emerald-400" /> },
        { name: 'Contact', href: '/#contact', icon: <Mail size={18} className="text-amber-500" /> },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <header className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-[#060913]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 transition-colors">
                <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-1">
                        Vishnu<span className="text-amber-500 font-extrabold">.k</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-7">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                        {isAdmin && (
                            <Link to="/admin" className="text-sm font-medium text-amber-500 hover:underline">
                                Admin
                            </Link>
                        )}
                        <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full border border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white transition-all shadow-sm"
                        >
                            <Download size={14} /> Resume
                        </a>
                        <ThemeToggle />
                    </nav>

                    {/* Mobile Controls */}
                    <div className="lg:hidden flex items-center gap-3">
                        <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        >
                            <Download size={14} /> Resume
                        </a>
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-900 dark:text-white p-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                            aria-label="Toggle Navigation"
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer Backdrop Overlay */}
            <div
                className={`lg:hidden fixed inset-0 z-[99] bg-slate-950/60 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Navigation Side Drawer */}
            <div
                className={`lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm z-[100] bg-slate-50 dark:bg-[#090d1a] shadow-2xl border-l border-slate-200 dark:border-white/10 transition-transform duration-300 ease-out flex flex-col justify-between overflow-y-auto ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div>
                    {/* Drawer Top Header */}
                    <div className="flex justify-between items-center p-6 h-20 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#060913]">
                        <Link to="/" onClick={() => setIsOpen(false)} className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-1">
                            Vishnu<span className="text-amber-500 font-extrabold">.k</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-900 dark:text-white p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-colors"
                                aria-label="Close Menu"
                            >
                                <X size={22} />
                            </button>
                        </div>
                    </div>

                    {/* Navigation Items List */}
                    <nav className="flex flex-col p-6 gap-3">
                        <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 px-1">
                            Navigation Menu
                        </div>
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-slate-100 hover:bg-amber-500/10 hover:border-amber-500/40 hover:text-amber-500 dark:hover:text-amber-400 font-semibold text-base transition-all shadow-xs active:scale-[0.98]"
                            >
                                <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 shrink-0">
                                    {item.icon}
                                </div>
                                <span>{item.name}</span>
                            </a>
                        ))}

                        {isAdmin && (
                            <Link
                                to="/admin"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-semibold text-base hover:bg-amber-500 hover:text-slate-950 transition-all shadow-xs active:scale-[0.98]"
                            >
                                <div className="p-2 rounded-xl bg-amber-500/20 shrink-0">
                                    <Lock size={18} />
                                </div>
                                <span>Admin Dashboard</span>
                            </Link>
                        )}
                    </nav>
                </div>

                {/* Drawer Footer CTA */}
                <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#060913]">
                    <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-2.5 py-3.5 px-6 text-sm font-bold rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98]"
                    >
                        <Download size={18} /> Download Resume
                    </a>
                </div>
            </div>

            <main className="flex-grow pt-20">
                <Outlet />
            </main>

            <footer className="py-8 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-white/10 relative bg-slate-50 dark:bg-[#060913]">
                <p>&copy; {new Date().getFullYear()} Vishnu K. Built with React & Node.js.</p>
                <Link to="/login" className="absolute bottom-4 right-4 opacity-0 hover:opacity-20 transition-opacity text-[10px] text-slate-400">admin</Link>
            </footer>

            <QuickActions />
        </div>
    );
};

export default Layout;
