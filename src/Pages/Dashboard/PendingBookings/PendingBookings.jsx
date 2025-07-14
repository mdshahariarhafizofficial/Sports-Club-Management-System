import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PendingBookings = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    // Get Data
    const {data: userBookings = [] } = useQuery({
        queryKey: ['userBookings', user?.email, 'pending'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/bookings?email=${user?.email}&status=pending`);
            return res.data;
        }
    });
    console.log(userBookings);
    
    return (
        <div>
            <h1>Pending Bookings</h1>
        </div>
    );
};

export default PendingBookings;