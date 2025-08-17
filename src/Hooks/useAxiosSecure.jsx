import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { auth } from '../Firebase/firebase.config';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'https://sports-club-management-system-serve-swart.vercel.app',
})
const useAxiosSecure = () => {
    const {user, handleSingOut} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if(!user) return;
        const interceptor = axiosSecure.interceptors.request.use(async (config) => {
            const token = await auth.currentUser.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },  (error) => {
        return Promise.reject(error);
    });

     return () => axiosSecure.interceptors.request.eject(interceptor);
    }, [user]);


    // ----- Response ------
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
        const status = error.status;
        if (status === 403) {
            navigate('/forbidden');
        }
        else if (status === 401) {
            handleSingOut()
        }

    return Promise.reject(error);
  });

    return axiosSecure;
};

export default useAxiosSecure;