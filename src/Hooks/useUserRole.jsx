import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const {user, loading: authLoading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: role = 'user',
        isLoading: reLoading,
        refetch,
    } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data.role;
        }
    });

    return { role, reLoading: authLoading || reLoading, refetch }
};

export default useUserRole;