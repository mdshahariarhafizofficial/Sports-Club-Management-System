import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../Loading/Loader';
import {
  MdSearch,
  MdEmail,
  MdPerson,
  MdCalendarToday,
} from 'react-icons/md';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [searchText, setSearchText] = useState('');

  const { data: users = [], isLoading, isError, error } = useQuery({
    queryKey: ['allUsers', searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${searchText}`);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(search.trim().toLowerCase());
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toDateString(); // Thu Jul 17 2025
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'admin':
        return 'badge badge-error text-white';
      case 'member':
        return 'badge badge-success text-white';
      case 'rider':
        return 'badge badge-warning text-white';
      default:
        return 'badge badge-neutral';
    }
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-red-500 text-center py-6">
        Error: {error.message}
      </div>
    );

  return (
    <div className="p-6">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-purple-700 text-center mb-8 flex justify-center items-center gap-2">
        <MdPerson className="text-5xl" />
        All Users
      </h2>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6 max-w-xl mx-auto">
        <div className="flex items-center gap-2">
          <label className="input input-bordered flex items-center gap-2 grow">
            <MdSearch />
            <input
              type="text"
              className="grow"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="btn bg-purple-500 text-white hover:bg-purple-600"
          >
            Search
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 shadow-2xl rounded-xl">
        <table className="table table-zebra table-md">
          <thead className="bg-purple-300 text-black text-base">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>
                <MdEmail className="inline" /> Email
              </th>
              <th>Role</th>
              <th>Registered</th>
              <th>Member Since</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id} className="hover">
                  <td>{index + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full ring ring-purple-400 ring-offset-base-100 ring-offset-2">
                        <img
                          src={user.image || 'https://cdn-icons-png.flaticon.com/128/3033/3033143.png'}
                          alt="user"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold">{user.name || 'N/A'}</td>
                  <td className="text-xs break-all">{user.email}</td>
                  <td>
                    <span className={getRoleBadgeClass(user.role)}>
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td className="text-sm">
                    {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
                  </td>
                  <td className="text-sm">
                    {user.memberSince ? formatDate(user.memberSince) : '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
