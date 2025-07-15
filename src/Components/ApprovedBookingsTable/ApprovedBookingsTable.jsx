import React from 'react';
import { FaClock, FaDollarSign, FaTrash, FaCreditCard } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const ApprovedBookingsTable = ({ approvedBookings = [] }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Cancel Booking
  const { mutate: cancelBooking, isPending: canceling } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Booking cancelled.');
      queryClient.invalidateQueries(['approvedBookings']);
    },
    onError: () => {
      toast.error('Failed to cancel booking.');
    }
  });

  const handleCancel = (bookingId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffe733',
      cancelButtonColor: '#d33',
      confirmButtonText: '<span style="color:black">Yes, Cancel it!</span>',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelBooking(bookingId);
      }
    });
  };

  const handlePayment = (booking) => {
    navigate(`/dashboard/payment/${booking._id}`);
  };

  return (
    <div className="px-4 mx-5 py-10 bg-black rounded-lg shadow-lg mt-5">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">✅ Approved Bookings</h2>

      {approvedBookings.length === 0 ? (
        <div className="text-center space-y-6 py-10">
          <p className="text-gray-400">No approved bookings available.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm rounded-lg overflow-hidden">
            <thead className="bg-primary text-black text-[15px]">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Court</th>
                <th className="px-4 py-3 text-left">Slots</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvedBookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className={`${index % 2 === 0 ? 'bg-white text-black' : 'bg-gray-900 text-white'} transition-colors duration-200`}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{booking.userEmail}</td>
                  <td className="px-4 py-3">{booking.courtTitle}</td>
                  <td className="px-4 py-3">
                    <ul className="list-disc list-inside">
                      {booking?.slots?.map((slot, i) => (
                        <li key={i}>
                          <FaClock className="inline-block mr-1" />
                          {slot}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3">{booking.date}</td>
                  <td className="px-4 py-3">
                    <FaDollarSign className="inline-block mr-1" />
                    {booking.price}
                  </td>
                  <td className="px-4 py-3">
                    <span className="badge bg-green-500 text-black capitalize px-3 py-1">
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handlePayment(booking)}
                      className="btn btn-xs bg-green-600 text-white hover:bg-green-700"
                    >
                      <FaCreditCard className="mr-1" /> Pay
                    </button>
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-xs bg-red-600 hover:bg-red-700 text-white"
                      disabled={canceling}
                    >
                      <FaTrash className="mr-1" /> Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApprovedBookingsTable;
