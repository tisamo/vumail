import axios from 'axios';

const ax = axios.create({
    baseURL: process.env.API || 'http://localhost:3002', //
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add a request interceptor
ax.interceptors.request.use(config => {
    // Do something before request is sent
    if(process.client){
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Add a response interceptor
ax.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

export default ax;