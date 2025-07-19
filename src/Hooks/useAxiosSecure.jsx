import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { auth } from '../Firebase/firebase.config';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
})
const useAxiosSecure = () => {
    const {user} = useAuth();

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


    //----- Response ------
// axios.interceptors.response.use(function (response) {
//     return response;
//   }, function (error) {

//     return Promise.reject(error);
//   });

    return axiosSecure;
};

export default useAxiosSecure;