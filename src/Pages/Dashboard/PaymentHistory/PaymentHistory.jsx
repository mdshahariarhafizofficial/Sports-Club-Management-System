import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Loader from '../../Loading/Loader';
import {
  MdPayment,
  MdAttachMoney,
  MdDateRange,
  MdReceipt,
} from 'react-icons/md';

// format date function
const formatDateTime = (isoDate) => {
  const date = new Date(isoDate);
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const day = date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `${time} ${day}`;
};

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: payments = [], isLoading, isError, error } = useQuery({
    queryKey: ['paymentHistory', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  if (loading || isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load payment history: {error.message}
      </div>
    );
  }

  return (
    <div className="px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-purple-600 mb-4">
        <MdPayment className="inline mr-2" /> Payment History
      </h2>
      <p className="text-center text-gray-600 mb-8">
        All your successful payments are listed below.
      </p>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table table-zebra">
          <thead className="bg-purple-200 text-black text-base">
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Booking ID</th>
              <th><MdReceipt className="inline" /> Txn ID</th>
              <th className='text-center'><MdAttachMoney className="inline" /> Amount</th>
              <th><MdDateRange className="inline" /> Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, index) => (
              <tr key={pay._id}>
                <td>{index + 1}</td>
                <td>{pay.email}</td>
                <td className="text-xs break-all">{pay.bookingId}</td>
                <td className="text-xs break-all">{pay.transactionId}</td>
                <td className='text-center'>৳{pay.price}</td>
                <td>{formatDateTime(pay.date)}</td>
                <td>
                  <span className="badge badge-success text-white font-semibold">
                    {pay.status || 'paid'}
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

export default PaymentHistory;
