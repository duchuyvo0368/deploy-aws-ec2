import axios from 'axios';
import { toast } from 'react-hot-toast';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    },
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
            console.error('Connection timeout or network error:', error);
            toast.error('Connection timeout. Please check your internet connection and try again.');
            return Promise.reject({
                errCode: -1,
                errMessage: 'Connection timeout or network error',
            });
        }

        if (error.response) {
            // Server responded with error status
            console.error('Response error:', error.response.data);

            // Handle specific error cases
            if (error.response.status === 401) {
                toast.error('Session expired. Please login again.');
                // Optionally redirect to login page
            } else if (error.response.status === 403) {
                toast.error('You do not have permission to perform this action.');
            } else if (error.response.status === 404) {
                toast.error('Resource not found.');
            } else if (error.response.status >= 500) {
                toast.error('Server error. Please try again later.');
            }

            return Promise.reject(error.response.data);
        }

        // No response received
        console.error('No response received:', error);
        toast.error('Unable to connect to the server. Please try again later.');
        return Promise.reject({
            errCode: -1,
            errMessage: 'No response from server',
        });
    },
);

export default axiosInstance;
