import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://mern-realtime-video-calling-app-bac.vercel.app/api',
    withCredentials: true, 
})