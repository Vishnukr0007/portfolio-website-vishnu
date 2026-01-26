import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Menu, X, Home, Cpu, Folder, Lock } from 'lucide-react';
import { fetchContactInfo } from '../redux/slices/portfolioSlice';

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAdmin } = useSelector((state) => state.auth);
    const { contactInfo } = useSelector((state) => state.portfolio);
    const dispatch = useDispatch();

    // Body scroll lock when menu is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <div className="min-h-screen flex flex-col">
            <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-dark border-b border-gray-100 dark:border-white/5 transition-colors">
                <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold font-heading text-gray-900 dark:text-white">
                        Vishnu<span className="text-primary">.k</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-gray-600 dark:text-text-secondary hover:text-primary dark:hover:text-white transition-colors">Home</Link>
                        <a href="#skills" className="text-gray-600 dark:text-text-secondary hover:text-primary dark:hover:text-white transition-colors">Skills</a>
                        <a href="#projects" className="text-gray-600 dark:text-text-secondary hover:text-primary dark:hover:text-white transition-colors">Projects</a>
                        {isAdmin && <Link to="/admin" className="text-gray-600 dark:text-text-secondary hover:text-primary dark:hover:text-white transition-colors">Admin</Link>}
                        <ThemeToggle />
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 dark:text-white">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav Overlay (Drawer Style) */}
                <div className={`md:hidden fixed inset-0 z-[60] bg-white dark:bg-[#0a0a0b] transition-all duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between items-center p-6 h-20 border-b border-gray-100 dark:border-white/5">
                        <Link to="/" onClick={() => setIsOpen(false)} className="text-xl font-bold font-heading dark:text-white">
                            Vishnu<span className="text-primary">.k</span>
                        </Link>
                        <button onClick={() => setIsOpen(false)} className="text-gray-900 dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors border border-gray-100 dark:border-white/10">
                            <X size={24} />
                        </button>
                    </div>
                    
                    <nav className="flex flex-col p-6 gap-1">
                        <Link to="/" onClick={() => setIsOpen(false)} className="group flex items-center gap-4 py-4 border-b border-gray-50 dark:border-white/5 transition-all">
                            <div className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                <Home size={22} />
                            </div>
                            <span className="text-xl font-bold font-heading dark:text-white group-hover:translate-x-1 transition-transform italic">Home</span>
                        </Link>
                        
                        <a href="/#skills" onClick={() => setIsOpen(false)} className="group flex items-center gap-4 py-4 border-b border-gray-50 dark:border-white/5 transition-all">
                            <div className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                <Cpu size={22} />
                            </div>
                            <span className="text-xl font-bold font-heading dark:text-white group-hover:translate-x-1 transition-transform italic">Skills</span>
                        </a>

                        <a href="/#projects" onClick={() => setIsOpen(false)} className="group flex items-center gap-4 py-4 border-b border-gray-50 dark:border-white/5 transition-all">
                            <div className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                <Folder size={22} />
                            </div>
                            <span className="text-xl font-bold font-heading dark:text-white group-hover:translate-x-1 transition-transform italic">Projects</span>
                        </a>

                        {isAdmin && (
                            <Link to="/admin" onClick={() => setIsOpen(false)} className="group flex items-center gap-4 py-4 border-b border-gray-50 dark:border-white/5 transition-all">
                                <div className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                    <Lock size={22} />
                                </div>
                                <span className="text-xl font-bold font-heading dark:text-white group-hover:translate-x-1 transition-transform italic">Admin</span>
                            </Link>
                        )}
                    </nav>

                    {/* Mobile Footer Contact */}
                    <div className="mt-auto p-6 pt-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Quick Contact</p>
                        <a href={`tel:${(contactInfo?.phone || '+916282899456').replace(/[^0-9+]/g, '')}`} className="block text-lg font-heading dark:text-gray-300 text-gray-600 mb-2 hover:text-primary transition-colors">{contactInfo?.phone || '+91 6282899456'}</a>
                        <a href={`mailto:${contactInfo?.email || 'vishnukrishnankutty54@gmail.com'}`} className="block text-sm dark:text-gray-400 text-gray-600 hover:text-primary transition-colors truncate">{contactInfo?.email || 'vishnukrishnankutty54@gmail.com'}</a>
                    </div>
                </div>
            </header>

            <main className="flex-grow pt-20">
                <Outlet />
            </main>

            <footer className="py-8 text-center text-gray-500 dark:text-text-secondary border-t border-gray-100 dark:border-white/5 mt-auto relative">
                <p>&copy; 2024 Vishnu K. All rights reserved.</p>
                <Link to="/login" className="absolute bottom-4 right-4 opacity-0 hover:opacity-10 cursor-default transition-opacity text-[8px]">admin entry</Link>
            </footer>
        </div>
    );
};

export default Layout;
