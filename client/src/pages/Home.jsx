import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, fetchSkills, fetchExperience } from '../redux/slices/portfolioSlice';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

const Home = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.portfolio);

    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchSkills());
        dispatch(fetchExperience());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="dark:bg-dark transition-colors duration-300">
            <Hero />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
        </div>
    );
};

export default Home;
