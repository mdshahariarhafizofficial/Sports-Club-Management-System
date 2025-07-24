import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../Loading/Loader';
import CountUp from 'react-countup';
import { FaCrown, FaUsers, FaUserShield, FaBuilding } from 'react-icons/fa';
import AuthContext from '../../../Context/AuthContext';
import { GiTennisCourt } from 'react-icons/gi';

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['admin-stats', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin-stats?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-8">
      {/* Profile Section */}
      <div className="bg-white rounded-3xl shadow-lg border border-yellow-300 p-8 flex flex-col md:flex-row items-center gap-8">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-36 h-36 rounded-full border-4 border-[#ffe733] object-cover shadow-lg"
        />
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center gap-3">
            {user?.displayName}
            <span className="flex items-center gap-1 bg-[#ffe733] text-black px-3 py-1 rounded-full text-sm font-bold shadow">
              <FaCrown className="text-lg" />
              ADMIN
            </span>
          </h1>
          <p className="text-lg text-gray-600">{user?.email}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Total Courts */}
        <div className="bg-gradient-to-br from-yellow-100 to-white rounded-2xl shadow-md p-6 border border-yellow-200 text-center hover:scale-105 transition-transform">
          <div className="flex justify-center items-center text-yellow-600 text-4xl mb-3">
            <GiTennisCourt />
          </div>
          <p className="text-xl font-medium text-gray-700">Total Courts</p>
          <h2 className="text-5xl font-bold text-yellow-600 mt-1">
            <CountUp end={stats?.totalCourts || 0} duration={1.5} />
          </h2>
        </div>

        {/* Total Users */}
        <div className="bg-gradient-to-br from-yellow-100 to-white rounded-2xl shadow-md p-6 border border-yellow-200 text-center hover:scale-105 transition-transform">
          <div className="flex justify-center items-center text-yellow-600 text-4xl mb-3">
            <FaUsers />
          </div>
          <p className="text-xl font-medium text-gray-700">Total Users</p>
          <h2 className="text-5xl font-bold text-yellow-600 mt-1">
            <CountUp end={stats?.totalUsers || 0} duration={1.5} />
          </h2>
        </div>

        {/* Total Members */}
        <div className="bg-gradient-to-br from-yellow-100 to-white rounded-2xl shadow-md p-6 border border-yellow-200 text-center hover:scale-105 transition-transform">
          <div className="flex justify-center items-center text-yellow-600 text-4xl mb-3">
            <FaUserShield />
          </div>
          <p className="text-xl font-medium text-gray-700">Total Members</p>
          <h2 className="text-5xl font-bold text-yellow-600 mt-1">
            <CountUp end={stats?.totalMembers || 0} duration={1.5} />
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
