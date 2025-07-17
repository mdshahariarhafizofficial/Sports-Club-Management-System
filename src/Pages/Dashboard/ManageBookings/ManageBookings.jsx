import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../Loading/Loader';
import { MdSearch } from 'react-icons/md';

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: bookings = [], isLoading, isError, error } = useQuery({
    queryKey: ['manageBookings', searchQuery],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?status=confirmed&search=${searchQuery}`);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
  };

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500 text-center">Error: {error.message}</p>;

  return (
    <div className="lg:px-10 px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Manage Bookings</h2>

      {/* Search Form */}
<form onSubmit={handleSearch} className="mb-6 max-w-md mx-auto">
  <div className="flex items-center gap-2">
    <label className="input input-bordered flex items-center gap-2 grow">
      <MdSearch />
      <input
        type="text"
        className="grow"
        placeholder="Search by court title"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </label>
    <button
      type="submit"
      className="btn bg-blue-500 text-white hover:bg-blue-600"
    >
      Search
    </button>
  </div>
</form>


      {/* Table */}
      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table table-zebra">
          <thead className="bg-blue-200 text-black text-base">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>User Email</th>
              <th>Date</th>
              <th>Slots</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
            bookings.length !== 0 ?
            (bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.courtTitle}</td>
                <td>{booking.userEmail}</td>
                <td>{new Date(booking.date).toDateString()}</td>
                <td>{booking.slots.join(', ')}</td>
                <td>৳{booking.price}</td>
                <td>
                  <span className="badge badge-success text-white font-semibold capitalize">
                    {booking.status}
                  </span>
                </td>
              </tr>)
            ))
            :
                        (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No Bookings found
                </td>
              </tr>
            )

          }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
