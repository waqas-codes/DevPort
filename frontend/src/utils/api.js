import axios from 'axios';

const api = axios.create({
    // Dynamically set based on environment
    baseURL: import.meta.env.VITE_API_URL || 
             (import.meta.env.MODE === 'development' 
                ? 'http://localhost:5000/api' 
                : 'https://devport-mzh7.onrender.com/api'), // Replace with actual production URL if different
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
