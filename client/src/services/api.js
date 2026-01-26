import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const baseURL = rawBaseURL.endsWith('/api') ? rawBaseURL : `${rawBaseURL}/api`;

console.log('API Base URL:', baseURL);

const api = axios.create({
    baseURL,
    withCredentials: true,
});

// Add a request interceptor to add the admin key to headers if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers['x-admin-key'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Log errors for easier debugging
        console.error('[API Error]:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            message: error.response?.data?.message || error.message
        });
        
        // Handle 401 Unauthorized errors (e.g., redirect to login or logout)
        if (error.response && error.response.status === 401) {
            // Optional: dispatch logout or redirect
             localStorage.removeItem('isAdmin');
             localStorage.removeItem('adminToken');
             // window.location.href = '/login';
        }
        
        return Promise.reject(error);
    }
);

export default api;
