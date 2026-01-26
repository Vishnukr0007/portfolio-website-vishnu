import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import toast from 'react-hot-toast';
import { logout } from '../redux/slices/authSlice';
import { fetchProjects, fetchSkills, fetchExperience, fetchSocials, fetchContactInfo } from '../redux/slices/portfolioSlice';
import { Trash2, Edit, Plus, Briefcase, Award, Zap, LogOut, Share2, Settings, FileText, Download } from 'lucide-react';
import Swal from 'sweetalert2';

const Admin = () => {
    const { isAdmin, adminToken } = useSelector((state) => state.auth);
    const { projects, skills, experience, socials, contactInfo } = useSelector((state) => state.portfolio);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('projects');
    const [editingProject, setEditingProject] = useState(null);
    const [editingSkill, setEditingSkill] = useState(null);
    const [editingExp, setEditingExp] = useState(null);
    const [editingSocial, setEditingSocial] = useState(null);

    // Auth now handled by api service automatically

    // Forms
    const { register: registerProject, handleSubmit: handleProjectSubmit, reset: resetProject, setValue: setProjectValue } = useForm();
    const { register: registerSkill, handleSubmit: handleSkillSubmit, reset: resetSkill, setValue: setSkillValue } = useForm();
    const { register: registerExp, handleSubmit: handleExpSubmit, reset: resetExp, setValue: setExpValue } = useForm();
    const { register: registerSocial, handleSubmit: handleSocialSubmit, reset: resetSocial, setValue: setSocialValue } = useForm();
    const { register: registerContact, handleSubmit: handleContactSubmit, setValue: setContactValue } = useForm();

    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchSkills());
        dispatch(fetchExperience());
        dispatch(fetchSocials());
        dispatch(fetchContactInfo());
    }, [dispatch]);

    useEffect(() => {
        if (contactInfo) {
            setContactValue('email', contactInfo.email);
            setContactValue('phone', contactInfo.phone);
            setContactValue('resumeUrl', contactInfo.resumeUrl || '');
            setContactValue('heroTitle', contactInfo.heroTitle || '');
            setContactValue('heroSubtitle', contactInfo.heroSubtitle || '');
            setContactValue('heroDescription', contactInfo.heroDescription || '');
            setContactValue('heroImage', contactInfo.heroImage || '');
        }
    }, [contactInfo, setContactValue]);

    if (!isAdmin) return <Navigate to="/login" />;

    // Project Logic
    const onProjectSubmit = async (data) => {
        const toastId = toast.loading(editingProject ? 'Updating project...' : 'Adding project...');
        try {
            let imageUrl = editingProject ? editingProject.image : '';
            if (data.image && data.image[0]) {
                const formData = new FormData();
                formData.append('image', data.image[0]);
                const uploadRes = await api.post('/upload', formData);
                imageUrl = uploadRes.data.url;
            }

            const projectData = {
                ...data,
                image: imageUrl,
                tags: typeof data.tags === 'string' ? data.tags.split(',').map(t => t.trim()) : data.tags
            };

            if (editingProject) {
                if (!editingProject._id || typeof editingProject._id !== 'string' || editingProject._id.length < 10) {
                    toast.error('Cannot update demo project.', { id: toastId });
                    return;
                }
                await api.put(`/projects/${editingProject._id}`, projectData);
                toast.success('Project updated!', { id: toastId });
            } else {
                await api.post('/projects', projectData);
                toast.success('Project added!', { id: toastId });
            }

            resetProject();
            setEditingProject(null);
            dispatch(fetchProjects());
            setActiveTab('projects');
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Unauthorized or server error';
            toast.error(`Error: ${errorMsg}`, { id: toastId });
        }
    };

    const handleDeleteProject = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This project will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!',
            background: document.documentElement.classList.contains('dark') ? '#1e1e20' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/projects/${id}`);
                Swal.fire('Deleted!', 'Your project has been deleted.', 'success');
                dispatch(fetchProjects());
            } catch (error) { toast.error('Failed or Unauthorized'); }
        }
    };

    const handleEditProject = (p) => {
        setEditingProject(p);
        setProjectValue('title', p.title);
        setProjectValue('description', p.description);
        setProjectValue('category', p.category || '');
        setProjectValue('tags', p.tags.join(', '));
        setProjectValue('links.code', p.links?.code || '');
        setProjectValue('links.demo', p.links?.demo || '');
        setActiveTab('add-project');
    };

    // Skill Logic
    const onSkillSubmit = async (data) => {
        try {
            if (editingSkill) {
                await api.put(`/skills/${editingSkill._id}`, data);
                toast.success('Skill updated!');
            } else {
                await api.post('/skills', data);
                toast.success('Skill added!');
            }
            resetSkill();
            setEditingSkill(null);
            dispatch(fetchSkills());
            setActiveTab('manage-skills');
        } catch (error) { toast.error('Unauthorized or Failed'); }
    };

    const handleDeleteSkill = async (id) => {
        const result = await Swal.fire({
            title: 'Delete Skill?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!',
            background: document.documentElement.classList.contains('dark') ? '#1e1e20' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/skills/${id}`);
                Swal.fire('Deleted!', 'Skill removed.', 'success');
                dispatch(fetchSkills());
            } catch (error) { toast.error('Unauthorized or Failed'); }
        }
    };

    const handleEditSkill = (s) => {
        setEditingSkill(s);
        setSkillValue('name', s.name);
        setSkillValue('category', s.category);
        setActiveTab('add-skill');
    };

    // Experience Logic
    const onExpSubmit = async (data) => {
        try {
            const formattedData = {
                ...data,
                description: data.description.split('\n').filter(line => line.trim() !== '')
            };
            if (editingExp) {
                await api.put(`/experience/${editingExp._id}`, formattedData);
                toast.success('Experience updated!');
            } else {
                await api.post('/experience', formattedData);
                toast.success('Experience added!');
            }
            resetExp();
            setEditingExp(null);
            dispatch(fetchExperience());
            setActiveTab('manage-experience');
        } catch (error) { toast.error('Unauthorized or Failed'); }
    };

    const handleDeleteExp = async (id) => {
        const result = await Swal.fire({
            title: 'Delete Experience?',
            text: "Are you sure you want to remove this entry?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!',
            background: document.documentElement.classList.contains('dark') ? '#1e1e20' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/experience/${id}`);
                Swal.fire('Deleted!', 'Experience removed.', 'success');
                dispatch(fetchExperience());
            } catch (error) { toast.error('Unauthorized or Failed'); }
        }
    };

    const handleEditExp = (e) => {
        setEditingExp(e);
        setExpValue('type', e.type || 'Experience');
        setExpValue('title', e.title);
        setExpValue('subtitle', e.subtitle);
        setExpValue('date', e.date);
        setExpValue('description', e.description.join('\n'));
        setActiveTab('add-experience');
    };

    // Social Logic
    const onSocialSubmit = async (data) => {
        try {
            if (editingSocial) {
                await api.put(`/socials/${editingSocial._id}`, data);
                toast.success('Social link updated!');
            } else {
                await api.post('/socials', data);
                toast.success('Social link added!');
            }
            resetSocial();
            setEditingSocial(null);
            dispatch(fetchSocials());
            setActiveTab('manage-socials');
        } catch (error) { toast.error('Unauthorized or Failed'); }
    };

    const handleDeleteSocial = async (id) => {
        const result = await Swal.fire({
            title: 'Delete Social?',
            text: "Are you sure you want to remove this social link?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!',
            background: document.documentElement.classList.contains('dark') ? '#1e1e20' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/socials/${id}`);
                Swal.fire('Deleted!', 'Social link removed.', 'success');
                dispatch(fetchSocials());
            } catch (error) { toast.error('Unauthorized or Failed'); }
        }
    };

    const handleEditSocial = (s) => {
        setEditingSocial(s);
        setSocialValue('platform', s.platform);
        setSocialValue('url', s.url);
        setActiveTab('add-social');
    };

    // Contact & Hero Info Logic
    const onContactSubmit = async (data) => {
        const toastId = toast.loading('Updating settings...');
        try {
            let heroImageUrl = contactInfo?.heroImage || '';

            // Handle Hero Image Upload if present
            if (data.heroImageFile && data.heroImageFile[0]) {
                const formData = new FormData();
                formData.append('image', data.heroImageFile[0]);
                const uploadRes = await api.post('/upload', formData);
                heroImageUrl = uploadRes.data.url;
            }

            const finalData = {
                ...data,
                heroImage: heroImageUrl
            };

            await api.put(`/contact-info`, finalData);
            toast.success('Settings updated successfully!', { id: toastId });
            dispatch(fetchContactInfo());
        } catch (error) {
            toast.error('Failed to update settings', { id: toastId });
        }
    };

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark transition-colors duration-300">
            <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
                {/* Desktop Sidebar */}
                <aside className="hidden md:flex w-72 bg-card-light dark:bg-card-dark border-r border-gray-200 dark:border-primary-dark/10 p-6 flex-col justify-between sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
                    <nav className="flex flex-col gap-8">
                        <div>
                            <h2 className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-[0.2em] mb-6 px-2">Management</h2>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <button
                                        onClick={() => setActiveTab('projects')}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'projects' || activeTab === 'add-project' ? 'bg-primary-light dark:bg-primary-dark text-white dark:text-black shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20' : 'hover:bg-gray-100 dark:hover:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark'}`}
                                    >
                                        <div className="flex items-center gap-3"><Briefcase size={20} /> <span className="text-sm font-semibold">Projects</span></div>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'projects' || activeTab === 'add-project' ? 'bg-black/20 dark:bg-black/20' : 'bg-gray-100 dark:bg-white/10'}`}>{projects.length}</span>
                                    </button>

                                    <button
                                        onClick={() => setActiveTab('manage-skills')}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'manage-skills' || activeTab === 'add-skill' ? 'bg-primary-light dark:bg-primary-dark text-white dark:text-black shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20' : 'hover:bg-gray-100 dark:hover:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark'}`}
                                    >
                                        <div className="flex items-center gap-3"><Zap size={20} /> <span className="text-sm font-semibold">Skills</span></div>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'manage-skills' || activeTab === 'add-skill' ? 'bg-black/20 dark:bg-black/20' : 'bg-gray-100 dark:bg-white/10'}`}>{skills.length}</span>
                                    </button>

                                    <button
                                        onClick={() => setActiveTab('manage-experience')}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'manage-experience' || activeTab === 'add-experience' ? 'bg-primary-light dark:bg-primary-dark text-white dark:text-black shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20' : 'hover:bg-gray-100 dark:hover:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark'}`}
                                    >
                                        <div className="flex items-center gap-3"><Award size={20} /> <span className="text-sm font-semibold">Experience</span></div>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'manage-experience' || activeTab === 'add-experience' ? 'bg-black/20 dark:bg-black/20' : 'bg-gray-100 dark:bg-white/10'}`}>{experience.length}</span>
                                    </button>
                                </div>

                                <div className="pt-4 border-t border-gray-100 dark:border-white/5 space-y-1">
                                    <button
                                        onClick={() => setActiveTab('manage-socials')}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'manage-socials' || activeTab === 'add-social' ? 'bg-primary-light dark:bg-primary-dark text-white dark:text-black shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20' : 'hover:bg-gray-100 dark:hover:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark'}`}
                                    >
                                        <div className="flex items-center gap-3"><Share2 size={20} /> <span className="text-sm font-semibold">Socials</span></div>
                                    </button>

                                    <button
                                        onClick={() => setActiveTab('contact-settings')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'contact-settings' ? 'bg-primary-light dark:bg-primary-dark text-white dark:text-black shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20' : 'hover:bg-gray-100 dark:hover:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark'}`}
                                    >
                                        <Settings size={20} /> <span className="text-sm font-semibold">Contact Settings</span>
                                    </button>

                                    <button
                                        onClick={() => setActiveTab('hero-settings')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'hero-settings' ? 'bg-primary-light dark:bg-primary-dark text-white dark:text-black shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20' : 'hover:bg-gray-100 dark:hover:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark'}`}
                                    >
                                        <FileText size={20} /> <span className="text-sm font-semibold">Hero Settings</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                        <button
                            onClick={() => dispatch(logout())}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all duration-300 font-bold text-sm"
                        >
                            <LogOut size={20} /> Logout
                        </button>
                    </div>
                </aside>

                {/* Mobile Bottom Navigation */}
                <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-card-light/90 dark:bg-card-dark/90 backdrop-blur-xl border border-gray-200 dark:border-primary-dark/10 rounded-2xl px-4 py-2 flex items-center justify-between shadow-2xl z-50">
                    <button onClick={() => setActiveTab('projects')} className={`p-2.5 rounded-xl transition-all ${activeTab === 'projects' || activeTab === 'add-project' ? 'bg-primary-light dark:bg-primary-dark text-white dark:text-black' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}><Briefcase size={20} /></button>
                    <button onClick={() => setActiveTab('manage-skills')} className={`p-2.5 rounded-xl transition-all ${activeTab === 'manage-skills' || activeTab === 'add-skill' ? 'bg-primary-light dark:bg-primary-dark text-white dark:text-black' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}><Zap size={20} /></button>
                    <button onClick={() => setActiveTab('manage-experience')} className={`p-2.5 rounded-xl transition-all ${activeTab === 'manage-experience' || activeTab === 'add-experience' ? 'bg-primary-light dark:bg-primary-dark text-white dark:text-black' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}><Award size={20} /></button>
                    <button onClick={() => setActiveTab('manage-socials')} className={`p-2.5 rounded-xl transition-all ${activeTab === 'manage-socials' || activeTab === 'add-social' ? 'bg-primary-light dark:bg-primary-dark text-white dark:text-black' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}><Share2 size={20} /></button>
                    <button onClick={() => setActiveTab('contact-settings')} className={`p-2.5 rounded-xl transition-all ${activeTab === 'contact-settings' ? 'bg-primary-light dark:bg-primary-dark text-white dark:text-black' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}><Settings size={20} /></button>
                    <button onClick={() => setActiveTab('hero-settings')} className={`p-2.5 rounded-xl transition-all ${activeTab === 'hero-settings' ? 'bg-primary-light dark:bg-primary-dark text-white dark:text-black' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}><FileText size={20} /></button>
                    <div className="w-[1px] h-6 bg-gray-200 dark:bg-white/10 mx-1"></div>
                    <button onClick={() => dispatch(logout())} className="p-2.5 text-red-500"><LogOut size={20} /></button>
                </nav>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-32 md:pb-8">
                    <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
                        {/* Mobile Header Tabs (Switch between Manage & Add) */}
                        <div className="md:hidden flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl mb-6">
                            <button
                                onClick={() => setActiveTab(activeTab.startsWith('add') ? activeTab.replace('add-', '').replace('project', 'projects').replace('skill', 'manage-skills').replace('experience', 'manage-experience').replace('social', 'manage-socials') : activeTab)}
                                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${!activeTab.startsWith('add') ? 'bg-white dark:bg-white/10 shadow-sm' : 'text-gray-500'}`}
                            >
                                Manage
                            </button>
                            <button
                                onClick={() => setActiveTab(activeTab.startsWith('add') ? activeTab : activeTab === 'projects' ? 'add-project' : activeTab === 'manage-skills' ? 'add-skill' : activeTab === 'manage-experience' ? 'add-experience' : 'add-social')}
                                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab.startsWith('add') ? 'bg-white dark:bg-white/10 shadow-sm' : 'text-gray-500'}`}
                            >
                                Add New
                            </button>
                        </div>

                        {activeTab === 'projects' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">Manage <span className="text-primary-light dark:text-primary-dark">Projects</span></h3>
                                    <button
                                        onClick={() => { setActiveTab('add-project'); setEditingProject(null); resetProject(); }}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary-light dark:bg-primary-dark text-white dark:text-black rounded-xl font-bold text-sm shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20 hover:-translate-y-0.5 transition-all"
                                    >
                                        <Plus size={18} /> Add New Project
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {projects.map(p => (
                                        <div key={p._id} className="bg-card-light dark:bg-card-dark p-6 rounded-2xl border border-gray-200 dark:border-primary-dark/10 flex gap-6 hover:border-primary-light dark:hover:border-primary-dark/40 transition-all duration-300 shadow-sm">
                                            <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-black/20 flex-shrink-0">
                                                <img src={p.image} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-lg truncate dark:group-hover:text-primary-dark transition-colors">{p.title}</h3>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => handleEditProject(p)} className="p-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"><Edit size={16} /></button>
                                                        <button onClick={() => handleDeleteProject(p._id)} className="p-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2 leading-relaxed mb-4">{p.description}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {p.tags?.slice(0, 3).map((tag, i) => (
                                                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {projects.length === 0 && <p className="text-center py-20 text-text-secondary-light dark:text-text-secondary-dark col-span-full font-medium">No projects found.</p>}
                                </div>
                            </div>
                        )}

                        {activeTab === 'add-project' && (
                            <div className="max-w-4xl mx-auto bg-card-light dark:bg-card-dark p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-primary-dark/10 shadow-2xl">
                                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8">{editingProject ? 'Edit' : 'Add'} <span className="text-primary-light dark:text-primary-dark">Project</span></h2>
                                <form onSubmit={handleProjectSubmit(onProjectSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-1">Project Title</label>
                                            <input {...registerProject('title')} placeholder="Enter title" className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-1">Category</label>
                                            <input {...registerProject('category')} placeholder="e.g. Web App" className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-1">Description</label>
                                        <textarea {...registerProject('description')} placeholder="Detail your project..." rows={4} className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none resize-none" required />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-1">Tags</label>
                                            <input {...registerProject('tags')} placeholder="React, Node.js (comma separated)" className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-1">Project Image</label>
                                            <label className="flex items-center justify-center p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-dashed border-gray-300 dark:border-white/10 hover:border-primary-light dark:hover:border-primary-dark transition-all cursor-pointer">
                                                <input type="file" {...registerProject('image')} className="hidden" />
                                                <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark italic">Click to upload image</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-1">Demo link</label>
                                            <input {...registerProject('links.demo')} placeholder="https://..." className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-1">Code link</label>
                                            <input {...registerProject('links.code')} placeholder="https://github.com/..." className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none" />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full py-5 bg-primary-light dark:bg-primary-dark text-white dark:text-black rounded-2xl font-bold text-lg shadow-xl shadow-primary-light/20 dark:shadow-primary-dark/20 hover:-translate-y-1 transition-all">{editingProject ? 'Update Project' : 'Publish Project'}</button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'manage-skills' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">Manage <span className="text-primary-light dark:text-primary-dark">Skills</span></h3>
                                    <button
                                        onClick={() => { setActiveTab('add-skill'); setEditingSkill(null); resetSkill(); }}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary-light dark:bg-primary-dark text-white dark:text-black rounded-xl font-bold text-sm shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20 hover:-translate-y-0.5 transition-all"
                                    >
                                        <Plus size={18} /> Add New Skill
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {skills.map(s => (
                                        <div key={s._id} className="bg-card-light dark:bg-card-dark p-6 rounded-2xl border border-gray-200 dark:border-primary-dark/10 flex justify-between items-center group hover:border-primary-light dark:hover:border-primary-dark/40 transition-all duration-300">
                                            <div>
                                                <div className="font-bold text-lg">{s.name}</div>
                                                <div className="text-[10px] font-bold text-primary-light dark:text-primary-dark uppercase tracking-wider mt-1">{s.category}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEditSkill(s)} className="p-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"><Edit size={16} /></button>
                                                <button onClick={() => handleDeleteSkill(s._id)} className="p-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'add-skill' && (
                            <div className="max-w-xl mx-auto bg-card-light dark:bg-card-dark p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-primary-dark/10 shadow-2xl">
                                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8">{editingSkill ? 'Edit' : 'Add'} <span className="text-primary-light dark:text-primary-dark">Skill</span></h2>
                                <form onSubmit={handleSkillSubmit(onSkillSubmit)} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-1">Skill Name</label>
                                        <input {...registerSkill('name')} placeholder="e.g. React" className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-1">Category</label>
                                        <select {...registerSkill('category')} className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none">
                                            <option value="Frontend">Frontend</option><option value="Backend">Backend</option><option value="Database & API">Database & API</option><option value="Tools">Tools</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="w-full py-5 bg-primary-light dark:bg-primary-dark text-white dark:text-black rounded-2xl font-bold text-lg shadow-xl shadow-primary-light/20 dark:shadow-primary-dark/20 hover:-translate-y-1 transition-all">Save Skill</button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'manage-experience' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">Manage <span className="text-primary-light dark:text-primary-dark">Experience</span></h3>
                                    <button
                                        onClick={() => { setActiveTab('add-experience'); setEditingExp(null); resetExp(); }}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary-light dark:bg-primary-dark text-white dark:text-black rounded-xl font-bold text-sm shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20 hover:-translate-y-0.5 transition-all"
                                    >
                                        <Plus size={18} /> Add New Entry
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {experience.map(e => (
                                        <div key={e._id} className="bg-card-light dark:bg-card-dark p-6 rounded-2xl border border-gray-200 dark:border-primary-dark/10 flex flex-col sm:flex-row justify-between items-start sm:items-center group gap-4 hover:border-primary-light dark:hover:border-primary-dark/40 transition-all duration-300">
                                            <div>
                                                <h3 className="font-bold text-lg">{e.title}</h3>
                                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium">{e.subtitle} <span className="mx-2 opacity-30">•</span> {e.date}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEditExp(e)} className="p-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"><Edit size={20} /></button>
                                                <button onClick={() => handleDeleteExp(e._id)} className="p-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'add-experience' && (
                            <div className="max-w-2xl mx-auto bg-card-light dark:bg-card-dark p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-primary-dark/10 shadow-2xl">
                                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8">{editingExp ? 'Edit' : 'Add'} <span className="text-primary-light dark:text-primary-dark">Experience</span></h2>
                                <form onSubmit={handleExpSubmit(onExpSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-1">Type</label>
                                            <select {...registerExp('type')} className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none">
                                                <option value="Experience">Experience</option><option value="Education">Education</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-1">Date range</label>
                                            <input {...registerExp('date')} placeholder="e.g. 2022 - 2024" className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-1">Title</label>
                                        <input {...registerExp('title')} placeholder="Role or Degree" className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-1">Organization</label>
                                        <input {...registerExp('subtitle')} placeholder="Company or School name" className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-1">Description (Bullets)</label>
                                        <textarea {...registerExp('description')} placeholder="Achievements (one per line)" rows={4} className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none resize-none" />
                                    </div>
                                    <button type="submit" className="w-full py-5 bg-primary-light dark:bg-primary-dark text-white dark:text-black rounded-2xl font-bold text-lg shadow-xl shadow-primary-light/20 dark:shadow-primary-dark/20 hover:-translate-y-1 transition-all">Save Entry</button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'manage-socials' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">Manage <span className="text-primary-light dark:text-primary-dark">Socials</span></h3>
                                    <button
                                        onClick={() => { setActiveTab('add-social'); setEditingSocial(null); resetSocial(); }}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary-light dark:bg-primary-dark text-white dark:text-black rounded-xl font-bold text-sm shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20 hover:-translate-y-0.5 transition-all"
                                    >
                                        <Plus size={18} /> Add New Social
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {socials.map(s => (
                                        <div key={s._id} className="bg-card-light dark:bg-card-dark p-6 rounded-2xl border border-gray-200 dark:border-primary-dark/10 flex justify-between items-center group hover:border-primary-light dark:hover:border-primary-dark/40 transition-all duration-300">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-bold text-lg leading-tight">{s.platform}</h3>
                                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark truncate mt-1">{s.url}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEditSocial(s)} className="p-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"><Edit size={20} /></button>
                                                <button onClick={() => handleDeleteSocial(s._id)} className="p-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                                            </div>
                                        </div>
                                    ))}
                                    {socials.length === 0 && <p className="text-center py-20 text-text-secondary-light dark:text-text-secondary-dark col-span-full font-medium">No social links added yet.</p>}
                                </div>
                            </div>
                        )}

                        {activeTab === 'add-social' && (
                            <div className="max-w-xl mx-auto bg-card-light dark:bg-card-dark p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-primary-dark/10 shadow-2xl">
                                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8">{editingSocial ? 'Edit' : 'Add'} <span className="text-primary-light dark:text-primary-dark">Social</span></h2>
                                <form onSubmit={handleSocialSubmit(onSocialSubmit)} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-1">Platform Name</label>
                                        <input {...registerSocial('platform')} placeholder="e.g. GitHub, LinkedIn" className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-1">Profile link</label>
                                        <input {...registerSocial('url')} placeholder="https://..." className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none" required />
                                    </div>
                                    <button type="submit" className="w-full py-5 bg-primary-light dark:bg-primary-dark text-white dark:text-black rounded-2xl font-bold text-lg shadow-xl shadow-primary-light/20 dark:shadow-primary-dark/20 hover:-translate-y-1 transition-all">Save Social</button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'contact-settings' && (
                            <div className="max-w-3xl mx-auto bg-card-light dark:bg-card-dark p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-primary-dark/10 shadow-2xl">
                                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8">Contact <span className="text-primary-light dark:text-primary-dark">Settings</span></h2>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-10 font-medium">These details are displayed in your Contact section and the mobile menu footer.</p>
                                <form onSubmit={handleContactSubmit(onContactSubmit)} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary-light dark:text-text-secondary-dark px-1">Primary Email</label>
                                            <input {...registerContact('email')} placeholder="Email Address" className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary-light dark:text-text-secondary-dark px-1">Primary Phone</label>
                                            <input {...registerContact('phone')} placeholder="Phone Number" className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none" required />
                                        </div>
                                    </div>

                                    <div className="p-8 bg-primary-light/5 dark:bg-primary-dark/5 rounded-3xl border border-primary-light/20 dark:border-primary-dark/20 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-primary-light/10 dark:bg-primary-dark/10 rounded-2xl text-primary-light dark:text-primary-dark"><FileText size={28} /></div>
                                                <div>
                                                    <h3 className="font-bold text-lg">Resume Management</h3>
                                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium mt-0.5">Track and update your public resume</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-primary-light dark:text-primary-dark flex items-center justify-end gap-2">
                                                    <Download size={22} className="opacity-50" /> {contactInfo?.resumeDownloadCount || 0}
                                                </div>
                                                <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark uppercase font-bold tracking-widest mt-1">Total Downloads</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary-light dark:text-text-secondary-dark px-1">Resume Link (URL)</label>
                                            <input
                                                type="text"
                                                {...registerContact('resumeUrl')}
                                                placeholder="Direct link to your PDF (e.g. Cloudinary, Drive URL)"
                                                className="w-full p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-100 dark:border-white/10 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none"
                                            />
                                        </div>

                                        <div className="text-[11px] text-text-secondary-light dark:text-text-secondary-dark italic bg-white/50 dark:bg-white/5 p-3 rounded-lg border border-gray-100 dark:border-white/5 font-medium leading-relaxed">
                                            Tip: You can upload your PDF to the Projects section and copy the URL here.
                                        </div>
                                    </div>

                                    <button type="submit" className="w-full py-5 bg-primary-light dark:bg-primary-dark text-white dark:text-black rounded-2xl font-bold text-lg shadow-xl shadow-primary-light/20 dark:shadow-primary-dark/20 hover:-translate-y-1 transition-all">Update Information</button>
                                </form>
                            </div>
                        )}
                        {activeTab === 'hero-settings' && (
                            <div className="max-w-4xl mx-auto bg-card-light dark:bg-card-dark p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-primary-dark/10 shadow-2xl">
                                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8">Hero <span className="text-primary-light dark:text-primary-dark">Settings</span></h2>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-10 font-medium">Customize the main landing section of your portfolio.</p>

                                <form onSubmit={handleContactSubmit(onContactSubmit)} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary-light dark:text-text-secondary-dark px-1">Hero Title</label>
                                                <input {...registerContact('heroTitle')} placeholder="e.g. Welcome to my Portfolio" className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary-light dark:text-text-secondary-dark px-1">Hero Subtitle</label>
                                                <input {...registerContact('heroSubtitle')} placeholder="e.g. Full-Stack Engineer" className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none" required />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary-light dark:text-text-secondary-dark px-1">Professional Headshot</label>
                                            <div className="flex flex-col gap-4">
                                                {contactInfo?.heroImage && (
                                                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary-light/20 dark:border-primary-dark/20 bg-black/5">
                                                        <img src={contactInfo.heroImage} alt="Headshot Preview" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <label className="flex items-center justify-center p-8 bg-gray-50 dark:bg-black/20 rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10 hover:border-primary-light dark:hover:border-primary-dark transition-all cursor-pointer group">
                                                    <input type="file" {...registerContact('heroImageFile')} className="hidden" />
                                                    <div className="text-center">
                                                        <Plus className="mx-auto mb-2 text-text-secondary-light dark:text-text-secondary-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors" size={24} />
                                                        <span className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Change Headshot</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary-light dark:text-text-secondary-dark px-1">Hero Description</label>
                                        <textarea {...registerContact('heroDescription')} rows={5} placeholder="Write a short intro about yourself..." className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 focus:border-primary-light dark:focus:border-primary-dark transition-all outline-none resize-none" required />
                                    </div>

                                    <button type="submit" className="w-full py-5 bg-primary-light dark:bg-primary-dark text-white dark:text-black rounded-2xl font-bold text-lg shadow-xl shadow-primary-light/20 dark:shadow-primary-dark/20 hover:-translate-y-1 transition-all">Update Hero Content</button>
                                </form>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Admin;
