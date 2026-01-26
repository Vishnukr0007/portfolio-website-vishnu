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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark p-6 md:p-10">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-card p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-white/5">
                <h1 className="text-3xl font-bold font-heading mb-8 text-center dark:text-white">Admin Login</h1>
                
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 dark:text-white focus:outline-none focus:border-primary"
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 dark:text-white focus:outline-none focus:border-primary"
                    />
                </div>

                <button type="submit" className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
