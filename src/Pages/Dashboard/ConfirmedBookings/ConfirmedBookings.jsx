import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle, FaStar } from 'react-icons/fa';
import {
  MdEmail,
  MdEventAvailable,
  MdAccessTime,
  MdAttachMoney,
  MdSports,
  MdRateReview,
} from 'react-icons/md';
import useAuth from '../../../Hooks/useAuth';
import Loader from '../../Loading/Loader';
import toast from 'react-hot-toast';

const ConfirmedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

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

  const handleRatingSubmit = async () => {
    if (!rating || !comment) {
      return toast.error("Please provide both rating and comment");
    }

    const ratingData = {
      courtId: selectedBooking.courtId,
      courtTitle: selectedBooking.courtTitle,
      createdAt: new Date().toISOString(),
      userEmail: user.email,
      userName: user.displayName,
      userImage: user.photoURL,
      rating,
      comment,
    };

    try {
      const res = await axiosSecure.post('/ratings', ratingData);
      if (res.data.insertedId) {
        toast.success("Rating submitted!");
        setSelectedBooking(null);
        setRating(0);
        setComment('');
      }
    } catch (err) {
      toast.error("Failed to submit rating");
    }
  };

  if (isLoading || isPending) return <Loader />;
  if (isError) return <p className="text-center text-red-400 py-10">Error loading bookings: {error.message}</p>;

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
              <th><MdRateReview className="inline" /> Rating</th>
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
                  <span className="badge badge-success font-semibold text-white">Confirmed</span>
                </td>
                <td>
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="btn btn-xs md:btn-sm bg-yellow-400 hover:bg-yellow-500 text-black flex items-center gap-1 whitespace-nowrap"
                  >
                    <FaStar className="text-sm" />
                    <span>Give Rating</span>
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rating Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-[#000000ad] bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-xl relative">
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => setSelectedBooking(null)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-2 text-center">Rate This Court</h3>
            <p className="text-center text-sm text-gray-500 mb-4">{selectedBooking.courtTitle}</p>

            {/* Star Rating */}
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl cursor-pointer ${
                    rating >= star ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Comment */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="textarea textarea-bordered w-full mb-4"
              placeholder="Write your feedback..."
              rows={4}
            ></textarea>

            <button
              onClick={handleRatingSubmit}
              className="btn bg-[#ffe733] hover:bg-[#e6d100] w-full text-black font-semibold"
            >
              Submit Rating
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmedBookings;
