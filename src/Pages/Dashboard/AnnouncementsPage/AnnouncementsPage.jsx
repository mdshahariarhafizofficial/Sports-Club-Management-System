import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../Loading/Loader';
import { FaBullhorn } from 'react-icons/fa';
import dayjs from 'dayjs';

const AnnouncementsPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    }
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3 text-yellow-400 justify-center">
        <FaBullhorn className="text-black" />
        All Announcements
      </h1>

      {announcements.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No announcements found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg border border-yellow-300">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-yellow-400 text-black">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Message</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Posted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {announcements.map((item, idx) => (
                <tr key={item._id} className="hover:bg-yellow-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{idx + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xl break-words">{item.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.postAt 
                      ? dayjs(item.postAt).format('ddd, MMM D, YYYY, h:mm A') 
                      : '—'}
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

export default AnnouncementsPage;