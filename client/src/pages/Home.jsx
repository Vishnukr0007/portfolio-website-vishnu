import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, fetchSkills, fetchExperience, fetchCertificates, fetchSocials, fetchContactInfo } from '../redux/slices/portfolioSlice';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Certifications from '../components/Certifications';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import GithubStats from '../components/GithubStats';
import CosmicBackground from '../components/ui/CosmicBackground';

const Home = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.portfolio);

    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchSkills());
        dispatch(fetchExperience());
        dispatch(fetchCertificates());
        dispatch(fetchSocials());
        dispatch(fetchContactInfo());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#060913] text-slate-900 dark:text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    return (
        <div className="relative isolate overflow-hidden bg-slate-50 dark:bg-[#060913] transition-colors duration-500 min-h-screen">
            <CosmicBackground />
            <Hero />
            <Skills />
            <Certifications />
            <Projects />
            <GithubStats />
            <Experience />
            <Contact />
        </div>
    );
};

export default Home;
