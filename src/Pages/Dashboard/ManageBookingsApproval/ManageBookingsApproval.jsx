import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ManageBookingsApprovalTable from '../../../Components/ManageBookingsApprovalTable/ManageBookingsApprovalTable';

const ManageBookingsApproval = () => {
    const axiosSecure = useAxiosSecure();
    const {data: bookingRequests = []} = useQuery({
        queryKey: ['bookingRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings');
            return res.data;
        }
    });
    return (
        <>
         <ManageBookingsApprovalTable bookingRequests={bookingRequests}></ManageBookingsApprovalTable>   
        </>
    );
};

export default ManageBookingsApproval;