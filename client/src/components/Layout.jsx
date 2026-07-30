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
        { name: 'Home', href: '/#hero' },
        { name: 'Skills', href: '/#skills' },
        { name: 'Certifications', href: '/#certifications' },
        { name: 'Projects', href: '/#projects' },
        { name: 'Experience', href: '/#experience' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-[#060913]/90 backdrop-blur-xl border-b border-gray-100 dark:border-white/10 transition-colors">
                <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold font-heading text-gray-900 dark:text-white flex items-center gap-1">
                        Vishnu<span className="text-amber-500 font-extrabold">.k</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-7">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
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
                            className="text-gray-900 dark:text-white p-2 rounded-lg bg-gray-100 dark:bg-white/5"
                            aria-label="Toggle Navigation"
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                <div className={`lg:hidden fixed inset-0 z-[60] bg-white dark:bg-[#060913] transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
                    <div className="flex justify-between items-center p-6 h-20 border-b border-gray-100 dark:border-white/10">
                        <Link to="/" onClick={() => setIsOpen(false)} className="text-xl font-bold font-heading dark:text-white">
                            Vishnu<span className="text-amber-500">.k</span>
                        </Link>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-900 dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    
                    <nav className="flex flex-col p-6 gap-2">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 py-3 text-lg font-heading text-gray-800 dark:text-slate-200 border-b border-gray-100 dark:border-white/5 hover:text-amber-500 transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                        {isAdmin && (
                            <Link
                                to="/admin"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 py-3 text-lg font-heading text-amber-500"
                            >
                                <Lock size={18} /> Admin Dashboard
                            </Link>
                        )}
                        <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            className="mt-4 flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/25"
                        >
                            <Download size={18} /> Download Resume
                        </a>
                    </nav>
                </div>
            </header>

            <main className="flex-grow pt-20">
                <Outlet />
            </main>

            <footer className="py-8 text-center text-xs text-gray-500 dark:text-slate-400 border-t border-gray-100 dark:border-white/10 relative bg-slate-50 dark:bg-[#060913]">
                <p>&copy; {new Date().getFullYear()} Vishnu K. Built with React & Node.js.</p>
                <Link to="/login" className="absolute bottom-4 right-4 opacity-0 hover:opacity-20 transition-opacity text-[10px] text-gray-400">admin</Link>
            </footer>

            <QuickActions />
        </div>
    );
};

export default Layout;
