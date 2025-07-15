import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle } from 'react-icons/fa';
import {
  MdEmail,
  MdEventAvailable,
  MdAccessTime,
  MdAttachMoney,
  MdSports,
} from 'react-icons/md';
import useAuth from '../../../Hooks/useAuth';
import Loader from '../../Loading/Loader';

const ConfirmedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const {user, loading} = useAuth();  
  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: ['confirmedBookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user?.email}&status=confirmed`);
      return res.data;
    },
  });

  if (isLoading || isPending) {
    return (
        <Loader></Loader>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-400 py-10">
        Error loading bookings: {error.message}
      </p>
    );
  }

  return (
    <div className="px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-4">
        <FaCheckCircle className="inline mr-2" /> Confirmed Bookings
      </h2>
      <p className="text-center text-black mb-8">
        These bookings are confirmed after successful payment.
      </p>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table table-zebra">
          <thead className="bg-primary text-black text-base">
            <tr>
              <th>#</th>
              <th><MdEmail className="inline" /> Email</th>
              <th><MdEventAvailable className="inline" /> Date</th>
              <th><MdAccessTime className="inline" /> Slots</th>
              <th><MdSports className="inline" /> Court</th>
              <th><MdAttachMoney className="inline" /> Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.userEmail}</td>
                <td>{booking.date}</td>
                <td>{booking.slots.join(', ')}</td>
                <td>{booking.courtTitle}</td>
                <td>৳{booking.price}</td>
                <td>
                  <span className="badge badge-success font-semibold text-white">
                    Confirmed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfirmedBookings;
