import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: 'https://sports-club-management-system-serve-iota.vercel.app',
})
const useAxios = () => {
    return axiosInstance;
};

export default useAxios;