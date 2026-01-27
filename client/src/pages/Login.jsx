import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';
import api from '../services/api';
import toast from 'react-hot-toast';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAdmin } = useSelector((state) => state.auth);

    if (isAdmin) return <Navigate to="/admin" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/login', { username, password });
            if (res.data.success) {
                dispatch(login(res.data.key));
                toast.success('Welcome back, Admin!');
                navigate('/admin');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark p-6 md:p-10 transition-colors duration-300">
            <div className="absolute inset-0 bg-primary-light/5 dark:bg-primary-dark/5 pointer-events-none"></div>

            <form onSubmit={handleSubmit} className="relative z-10 bg-card-light dark:bg-card-dark p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100 dark:border-primary-dark/10">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3 dark:text-white">Admin <span className="text-primary-light dark:text-primary-dark">Login</span></h1>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium px-4 leading-relaxed">Enter your credentials to manage your portfolio</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary-light dark:text-text-secondary-dark px-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g. admin"
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 dark:text-white focus:outline-none focus:border-primary-light dark:focus:border-primary-dark transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary-light dark:text-text-secondary-dark px-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 dark:text-white focus:outline-none focus:border-primary-light dark:focus:border-primary-dark transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-10 py-5 rounded-2xl bg-primary-light dark:bg-primary-dark text-white dark:text-black font-bold text-lg shadow-xl shadow-primary-light/20 dark:shadow-primary-dark/20 hover:-translate-y-1 transition-all active:scale-[0.98]"
                >
                    Sign In
                </button>

                <p className="mt-8 text-center text-[11px] font-bold uppercase tracking-widest text-text-secondary-light/40 dark:text-text-secondary-dark/20">
                    VISHNU K PORTFOLIO • SECURE ACCESS
                </p>
            </form>
        </div>
    );
};

export default Login;
