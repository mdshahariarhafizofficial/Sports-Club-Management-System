import React from 'react';
import { FaUser, FaEnvelope, FaCalendarAlt, FaCrown, FaUserClock } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../Loading/Loader';
import { format } from 'date-fns';

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // useQuery is always called
  const { data: userInfo = {}, isLoading, isPending } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });
  console.log(userInfo[0]);

  // Then handle loading after all hooks
  if (isLoading || isPending ) {
    return (
        <Loader></Loader>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-neutral text-white rounded-xl shadow-xl">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Profile Picture */}
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-lg">
          <img
            src={userInfo[0]?.image || 'https://i.ibb.co/tMbs9N8/default-user.png'}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Details */}
        <div className="flex-1 space-y-5">
          <h2 className="text-3xl font-bold text-primary flex items-center gap-2">
            <FaUser /> {userInfo[0]?.name || 'Anonymous User'}
          </h2>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-primary" />
            <span className="text-lg">{userInfo[0]?.email || 'Not provided'}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-primary" />
            <span className="text-lg">
              <span className='mr-2'>Joined on:</span>{}
              {userInfo[0]?.createdAt
                ? format(new Date(userInfo[0]?.createdAt), 'EEEE, MMMM d, yyyy') 
                : 'N/A'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaCrown className="text-primary" />
            <span className="text-lg">
              Role: <span className="font-semibold">{userInfo[0]?.role || 'User'}</span>
            </span>
          </div>

          {
            userInfo[0]?.role === 'member' &&
            <div className="flex items-center gap-3">
              <FaUserClock size={20} className="text-primary" />
              <span className="text-lg">
                <span className='mr-2'>Member Since:</span>{}
                {userInfo[0]?.createdAt
                  ? format(new Date(userInfo[0]?.memberSince), 'EEEE, MMMM d, yyyy') 
                  : 'N/A'}
              </span>
            </div>
          }


        </div>
      </div>
    </div>
  );
};

export default MyProfile;
