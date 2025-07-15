import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Loading/Loader';
import ApprovedBookingsTable from '../../../Components/ApprovedBookingsTable/ApprovedBookingsTable';
import useAuth from '../../../Hooks/useAuth';
const ApprovedBookings = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: approvedBookings = [], isPending, isLoading} = useQuery({
        queryKey: ['approvedBookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user?.email}&status=approved`);
            return res.data;
        }
    });
    if (isPending || isLoading) {
        return <Loader></Loader>
    }
    return (
        <>
        <ApprovedBookingsTable approvedBookings={approvedBookings}></ApprovedBookingsTable>
        </>
    );
};

export default ApprovedBookings;