import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ManageBookingsApprovalTable from '../../../Components/ManageBookingsApprovalTable/ManageBookingsApprovalTable';
import Loader from '../../Loading/Loader';

const ManageBookingsApproval = () => {
    const axiosSecure = useAxiosSecure();
    const {data: bookingRequests = [], isPending, isLoading} = useQuery({
        queryKey: ['bookingRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings?status=pending');
            return res.data;
        }
    });
    if (isPending || isLoading) {
        return <Loader></Loader>
    }
    return (
        <>
         <ManageBookingsApprovalTable bookingRequests={bookingRequests}></ManageBookingsApprovalTable>   
        </>
    );
};

export default ManageBookingsApproval;