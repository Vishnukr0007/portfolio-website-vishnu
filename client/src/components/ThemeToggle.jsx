import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const { darkMode } = useSelector((state) => state.theme);

    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
            aria-label="Toggle Theme"
        >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
};

export default ThemeToggle;
