import React from 'react';
import { FaClock, FaDollarSign, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const PendingBookingsTable = ({ userBookings = [] }) => {

  const handleCancelBooking = (bookingId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to cancel this booking?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffe733',
      cancelButtonColor: '#d33',
      confirmButtonText: '<span style="color:black">Yes, Cancel it!</span>',
    }).then((result) => {
      if (result.isConfirmed) {
        // এখানে আপনি DELETE রিকোয়েস্ট করবেন API-তে
        console.log('Cancel booking ID:', bookingId);

        Swal.fire({
          icon: 'success',
          title: 'Cancelled!',
          text: 'Your booking has been cancelled.',
          confirmButtonColor: '#ffe733',
          confirmButtonText: '<span style="color:black">OK</span>'
        });
      }
    });
  };

  return (
    <div className="px-4 mx-5 py-10 bg-black rounded-lg shadow-lg mt-5">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">📋 My Pending Bookings</h2>

      {userBookings.length === 0 ? (
        <div className='text-center space-y-6 py-10'>
            <p className="text-center text-gray-400">No pending bookings found.</p>
            <a href="/courts">
                <button className='btn btn-primary text-black'>Go To Booking Page</button>
            </a>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm rounded-lg overflow-hidden">
            <thead className="bg-primary text-black text-[15px]">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Court</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Slots</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Total Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {userBookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'
                  } transition-colors duration-200`}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{booking?.courtTitle}</td>
                  <td className="px-4 py-3">{booking?.location}</td>
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
                    <span className="badge bg-yellow-500 text-black capitalize px-3 py-1">
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
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

export default PendingBookingsTable;
