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

    // Contact Info Logic
    const onContactSubmit = async (data) => {
        try {
            await api.put(`/contact-info`, data);
            toast.success('Contact information updated!');
            dispatch(fetchContactInfo());
        } catch (error) { toast.error('Unauthorized or Failed'); }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0b] text-gray-900 dark:text-white">
            <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
                {/* Desktop Sidebar */}
                <aside className="hidden md:flex w-72 bg-white dark:bg-card border-r border-gray-100 dark:border-white/5 p-4 flex-col justify-between sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
                    <nav className="flex flex-col gap-1">
                        <div className="mb-4 px-2">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Management</h2>

                            <div className="space-y-1">
                                {/* Projects Group */}
                                <div className="p-1 rounded-xl bg-gray-50 dark:bg-white/5 mb-2">
                                    <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${activeTab === 'projects' ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300'}`}>
                                        <div className="flex items-center gap-2"><Briefcase size={18} /> <span className="text-sm font-medium">Projects</span></div>
                                        <span className="text-[10px] bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded-md">{projects.length}</span>
                                    </button>
                                    <button onClick={() => { setActiveTab('add-project'); setEditingProject(null); resetProject(); }} className={`w-full flex items-center gap-2 px-3 py-1.5 mt-1 rounded-lg text-xs transition-all ${activeTab === 'add-project' ? 'text-primary font-bold' : 'text-gray-400 hover:text-primary'}`}>
                                        <Plus size={14} /> Add New Project
                                    </button>
                                </div>

                                {/* Skills Group */}
                                <div className="p-1 rounded-xl bg-gray-50 dark:bg-white/5 mb-2">
                                    <button onClick={() => setActiveTab('manage-skills')} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${activeTab === 'manage-skills' ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300'}`}>
                                        <div className="flex items-center gap-2"><Zap size={18} /> <span className="text-sm font-medium">Skills</span></div>
                                        <span className="text-[10px] bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded-md">{skills.length}</span>
                                    </button>
                                    <button onClick={() => { setActiveTab('add-skill'); setEditingSkill(null); resetSkill(); }} className={`w-full flex items-center gap-2 px-3 py-1.5 mt-1 rounded-lg text-xs transition-all ${activeTab === 'add-skill' ? 'text-primary font-bold' : 'text-gray-400 hover:text-primary'}`}>
                                        <Plus size={14} /> Add New Skill
                                    </button>
                                </div>

                                {/* Experience Group */}
                                <div className="p-1 rounded-xl bg-gray-50 dark:bg-white/5 mb-2">
                                    <button onClick={() => setActiveTab('manage-experience')} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${activeTab === 'manage-experience' ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300'}`}>
                                        <div className="flex items-center gap-2"><Award size={18} /> <span className="text-sm font-medium">Experience</span></div>
                                        <span className="text-[10px] bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded-md">{experience.length}</span>
                                    </button>
                                    <button onClick={() => { setActiveTab('add-experience'); setEditingExp(null); resetExp(); }} className={`w-full flex items-center gap-2 px-3 py-1.5 mt-1 rounded-lg text-xs transition-all ${activeTab === 'add-experience' ? 'text-primary font-bold' : 'text-gray-400 hover:text-primary'}`}>
                                        <Plus size={14} /> Add New Exp
                                    </button>
                                </div>

                                {/* Socials Group */}
                                <div className="p-1 rounded-xl bg-gray-50 dark:bg-white/5 mb-2">
                                    <button onClick={() => setActiveTab('manage-socials')} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${activeTab === 'manage-socials' ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300'}`}>
                                        <div className="flex items-center gap-2"><Share2 size={18} /> <span className="text-sm font-medium">Socials</span></div>
                                        <span className="text-[10px] bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded-md">{socials.length}</span>
                                    </button>
                                    <button onClick={() => { setActiveTab('add-social'); setEditingSocial(null); resetSocial(); }} className={`w-full flex items-center gap-2 px-3 py-1.5 mt-1 rounded-lg text-xs transition-all ${activeTab === 'add-social' ? 'text-primary font-bold' : 'text-gray-400 hover:text-primary'}`}>
                                        <Plus size={14} /> Add New Social
                                    </button>
                                </div>

                                <button onClick={() => setActiveTab('contact-settings')} className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${activeTab === 'contact-settings' ? 'bg-primary text-white shadow-lg' : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300'}`}>
                                    <Settings size={20} /> <span className="font-semibold">Settings</span>
                                </button>
                            </div>
                        </div>
                    </nav>
                    <div className="px-2">
                        <button onClick={() => dispatch(logout())} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-semibold"><LogOut size={20} /> Logout</button>
                    </div>
                </aside>

                {/* Mobile Bottom Navigation */}
                <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-card/90 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-2xl px-3 py-1.5 flex items-center gap-1 shadow-2xl z-50">
                    <button onClick={() => setActiveTab('projects')} className={`p-2.5 rounded-xl transition-all ${activeTab === 'projects' || activeTab === 'add-project' ? 'bg-primary text-white' : 'text-gray-400'}`}><Briefcase size={20} /></button>
                    <button onClick={() => setActiveTab('manage-skills')} className={`p-2.5 rounded-xl transition-all ${activeTab === 'manage-skills' || activeTab === 'add-skill' ? 'bg-primary text-white' : 'text-gray-400'}`}><Zap size={20} /></button>
                    <button onClick={() => setActiveTab('manage-experience')} className={`p-2.5 rounded-xl transition-all ${activeTab === 'manage-experience' || activeTab === 'add-experience' ? 'bg-primary text-white' : 'text-gray-400'}`}><Award size={20} /></button>
                    <button onClick={() => setActiveTab('manage-socials')} className={`p-2.5 rounded-xl transition-all ${activeTab === 'manage-socials' || activeTab === 'add-social' ? 'bg-primary text-white' : 'text-gray-400'}`}><Share2 size={20} /></button>
                    <button onClick={() => setActiveTab('contact-settings')} className={`p-2.5 rounded-xl transition-all ${activeTab === 'contact-settings' ? 'bg-primary text-white' : 'text-gray-400'}`}><Settings size={20} /></button>
                    <div className="w-[1px] h-5 bg-gray-200 dark:bg-white/10 mx-0.5"></div>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {projects.map(p => (
                                    <div key={p._id} className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-100 dark:border-white/5 flex gap-4 group">
                                        <img src={p.image} className="w-16 h-16 rounded object-cover" alt="" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between">
                                                <h3 className="font-bold truncate">{p.title}</h3>
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleEditProject(p)} className="text-gray-400 hover:text-primary"><Edit size={16} /></button>
                                                    <button onClick={() => handleDeleteProject(p._id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 line-clamp-2">{p.description}</p>
                                        </div>
                                    </div>
                                ))}
                                {projects.length === 0 && <p className="text-center py-10 text-gray-500 col-span-full">No projects found.</p>}
                            </div>
                        )}

                        {activeTab === 'add-project' && (
                            <div className="w-full bg-white dark:bg-card p-6 md:p-10 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl">
                                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-6 md:mb-8">{editingProject ? 'Edit' : 'Add'} <span className="text-primary">Project</span></h2>
                                <form onSubmit={handleProjectSubmit(onProjectSubmit)} className="space-y-4">
                                    <input {...registerProject('title')} placeholder="Title" className="w-full p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5" required />
                                    <input {...registerProject('category')} placeholder="Category" className="w-full p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5" />
                                    <textarea {...registerProject('description')} placeholder="Description" rows={3} className="w-full p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5" required />
                                    <input type="file" {...registerProject('image')} className="w-full text-xs" />
                                    <input {...registerProject('tags')} placeholder="Tags (comma separated)" className="w-full p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5" />
                                    <div className="flex flex-col sm:flex-row gap-4"><input {...registerProject('links.demo')} placeholder="Demo URL" className="flex-1 p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5" /><input {...registerProject('links.code')} placeholder="Code URL" className="flex-1 p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5" /></div>
                                    <button type="submit" className="w-full py-4 bg-primary text-white rounded-2xl font-bold">{editingProject ? 'Update' : 'Create'}</button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'manage-skills' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {skills.map(s => (
                                    <div key={s._id} className="bg-white dark:bg-card p-4 rounded-xl border border-gray-100 dark:border-white/5 flex justify-between items-center">
                                        <div><div className="font-bold">{s.name}</div><div className="text-[10px] text-primary uppercase">{s.category}</div></div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEditSkill(s)} className="text-gray-400 hover:text-primary"><Edit size={14} /></button>
                                            <button onClick={() => handleDeleteSkill(s._id)} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'add-skill' && (
                            <div className="max-w-md w-full mx-auto bg-white dark:bg-card p-6 md:p-10 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl">
                                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-6 md:mb-8">{editingSkill ? 'Edit' : 'Add'} <span className="text-primary">Skill</span></h2>
                                <form onSubmit={handleSkillSubmit(onSkillSubmit)} className="space-y-4">
                                    <input {...registerSkill('name')} placeholder="Skill Name" className="w-full p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5" required />
                                    <select {...registerSkill('category')} className="w-full p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5">
                                        <option value="Frontend">Frontend</option><option value="Backend">Backend</option><option value="Database & API">Database & API</option><option value="Tools">Tools</option>
                                    </select>
                                    <button type="submit" className="w-full py-4 bg-primary text-white rounded-2xl font-bold">Save Skill</button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'manage-experience' && (
                            <div className="space-y-4">
                                {experience.map(e => (
                                    <div key={e._id} className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center group gap-4">
                                        <div><h3 className="font-bold">{e.title}</h3><p className="text-sm text-gray-500">{e.subtitle} • {e.date}</p></div>
                                        <div className="flex gap-3">
                                            <button onClick={() => handleEditExp(e)} className="p-2 text-gray-400 hover:text-primary transition-colors"><Edit size={18} /></button>
                                            <button onClick={() => handleDeleteExp(e._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'add-experience' && (
                            <div className="max-w-2xl w-full mx-auto bg-white dark:bg-card p-6 md:p-10 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl">
                                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-6 md:mb-8">{editingExp ? 'Edit' : 'Add'} <span className="text-primary">Experience</span></h2>
                                <form onSubmit={handleExpSubmit(onExpSubmit)} className="space-y-4">
                                    <select {...registerExp('type')} className="w-full p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5"><option value="Experience">Experience</option><option value="Education">Education</option></select>
                                    <input {...registerExp('title')} placeholder="Title" className="w-full p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5" required />
                                    <input {...registerExp('subtitle')} placeholder="Company/School" className="w-full p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5" required />
                                    <input {...registerExp('date')} placeholder="Date" className="w-full p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5" required />
                                    <textarea {...registerExp('description')} placeholder="Description (lines)" rows={4} className="w-full p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5" />
                                    <button type="submit" className="w-full py-4 bg-primary text-white rounded-2xl font-bold">Save Experience</button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'manage-socials' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {socials.map(s => (
                                    <div key={s._id} className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-100 dark:border-white/5 flex justify-between items-center group">
                                        <div><h3 className="font-bold">{s.platform}</h3><p className="text-xs text-gray-500 truncate max-w-[200px]">{s.url}</p></div>
                                        <div className="flex gap-3">
                                            <button onClick={() => handleEditSocial(s)} className="p-2 text-gray-400 hover:text-primary transition-colors"><Edit size={18} /></button>
                                            <button onClick={() => handleDeleteSocial(s._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                        </div>
                                    </div>
                                ))}
                                {socials.length === 0 && <p className="text-center py-10 text-gray-500 col-span-full">No social links added yet.</p>}
                            </div>
                        )}

                        {activeTab === 'add-social' && (
                            <div className="max-w-md w-full mx-auto bg-white dark:bg-card p-6 md:p-10 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl">
                                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-6 md:mb-8">{editingSocial ? 'Edit' : 'Add'} <span className="text-primary">Social</span></h2>
                                <form onSubmit={handleSocialSubmit(onSocialSubmit)} className="space-y-4">
                                    <input {...registerSocial('platform')} placeholder="Platform (e.g. GitHub)" className="w-full p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5" required />
                                    <input {...registerSocial('url')} placeholder="Profile URL" className="w-full p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5" required />
                                    <button type="submit" className="w-full py-4 bg-primary text-white rounded-2xl font-bold">Save Link</button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'contact-settings' && (
                            <div className="max-w-2xl w-full mx-auto bg-white dark:bg-card p-6 md:p-10 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl">
                                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-6 md:mb-8">Contact <span className="text-primary">Settings</span></h2>
                                <p className="text-sm text-gray-500 mb-6">These details are displayed in your Contact section and the mobile menu footer.</p>
                                <form onSubmit={handleContactSubmit(onContactSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Primary Email</label>
                                            <input {...registerContact('email')} placeholder="Email Address" className="w-full p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Primary Phone</label>
                                            <input {...registerContact('phone')} placeholder="Phone Number" className="w-full p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-gray-100 dark:border-white/5" required />
                                        </div>
                                    </div>

                                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-primary/10 rounded-lg text-primary"><FileText size={24} /></div>
                                                <div>
                                                    <h3 className="font-bold">Resume Management</h3>
                                                    <p className="text-xs text-gray-500">Track and update your public resume</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-primary flex items-center justify-end gap-2">
                                                    <Download size={20} /> {contactInfo?.resumeDownloadCount || 0}
                                                </div>
                                                <p className="text-[10px] text-gray-400 uppercase font-bold">Total Downloads</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Resume Link (URL)</label>
                                            <input
                                                type="text"
                                                {...registerContact('resumeUrl')}
                                                placeholder="Direct link to your PDF resume (e.g. Cloudinary/Drive URL)"
                                                className="w-full p-3 bg-white dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/10"
                                            />
                                        </div>

                                        <div className="text-[10px] text-gray-400 italic">
                                            Tip: You can upload your PDF to the Projects section and copy the URL here.
                                        </div>
                                    </div>

                                    <button type="submit" className="w-full py-4 bg-primary text-white rounded-2xl font-bold mt-4 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">Update Information</button>
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
