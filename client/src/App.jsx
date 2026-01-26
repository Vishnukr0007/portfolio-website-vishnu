import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { setTheme } from './redux/slices/themeSlice';
import { fetchSocials, fetchContactInfo } from './redux/slices/portfolioSlice';

function App() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);

  useEffect(() => {
    // Initial data fetch
    dispatch(fetchSocials());
    dispatch(fetchContactInfo());
    
    // Initial theme set
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, dispatch]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
