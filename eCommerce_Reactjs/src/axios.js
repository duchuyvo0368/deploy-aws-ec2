import axios from 'axios';
import _ from 'lodash';
require('dotenv').config();

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'https://localhost:443',
    timeout: 30000, // timeout after 30 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

if (localStorage.getItem('token')) {
    instance.interceptors.request.use(
        (config) => {
            config.headers.authorization =
                'Bearer ' + localStorage.getItem('token').replaceAll('"', '');
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );
}

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.log('Request timed out');
        }
        return Promise.reject(error);
    },
);

export default instance;
