import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import PendingBookingsTable from '../../../Components/PendingBookingsTable/PendingBookingsTable';
import Loader from '../../Loading/Loader';

const PendingBookings = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    // Get Data
    const {data: userBookings = [], isPending, isLoading } = useQuery({
        queryKey: ['userBookings', user?.email, 'pending'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/bookings?email=${user?.email}&status=pending`);
            return res.data;
        }
    });
    if (isPending || isLoading) {
        return <Loader></Loader>
    }
    console.log(userBookings);
    
    return (
        <>
            <PendingBookingsTable userBookings={userBookings}></PendingBookingsTable>
        </>
    );
};

export default PendingBookings;