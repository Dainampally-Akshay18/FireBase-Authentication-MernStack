import axios from 'axios';
import { auth } from '../firebase/firebase';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000'
});

// Add a request interceptor to include Firebase ID token
api.interceptors.request.use(
    async (config) => {
        const user = auth.currentUser;
        if (user) {
            const idToken = await user.getIdToken();
            config.headers.Authorization = `Bearer ${idToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;