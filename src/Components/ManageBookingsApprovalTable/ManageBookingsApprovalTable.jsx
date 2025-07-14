import React from 'react';
import { FaClock, FaDollarSign, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const ManageBookingsApprovalTable = ({ bookingRequests = [] }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/bookings/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Booking status updated!');
      queryClient.invalidateQueries(['bookingRequests']);
    },
    onError: () => {
      toast.error('Failed to update booking');
    }
  });

  const handleAction = (id, status) => {
    Swal.fire({
      title: `Are you sure to ${status} this booking?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ffe733',
      cancelButtonColor: '#d33',
      confirmButtonText: `<span style="color:black">Yes, ${status} it!</span>`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus({ id, status });
      }
    });
  };

  return (
    <div className="px-4 mx-5 py-10 bg-black rounded-lg shadow-lg mt-5">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">🛠️ Manage Bookings Approval</h2>

      {bookingRequests.length === 0 ? (
        <div className='text-center space-y-6 py-10'>
          <p className="text-gray-400">No booking requests available.</p>
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
              {bookingRequests.map((booking, index) => (
                <tr
                  key={booking._id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'
                  } transition-colors duration-200`}
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
                  <td className="px-4 py-3 capitalize">{booking.status}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleAction(booking._id, 'approved')}
                      className="btn btn-xs bg-green-600 hover:bg-green-700 text-white"
                      disabled={isPending}
                    >
                      <FaCheckCircle className="mr-1" /> Approve
                    </button>
                    <button
                      onClick={() => handleAction(booking._id, 'rejected')}
                      className="btn btn-xs bg-red-600 hover:bg-red-700 text-white"
                      disabled={isPending}
                    >
                      <FaTimesCircle className="mr-1" /> Reject
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

export default ManageBookingsApprovalTable;
