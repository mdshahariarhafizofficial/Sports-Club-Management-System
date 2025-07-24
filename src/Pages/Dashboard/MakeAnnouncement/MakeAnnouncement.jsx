import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaBullhorn, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../Loading/Loader';

const MakeAnnouncement = () => {
const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  // Fetch all announcements
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    }
  });

  // Add or update announcement mutation
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      if (editingAnnouncement) {
        const res = await axiosSecure.patch(`/announcements/${editingAnnouncement._id}`, data);
        return res.data;
      } else {
        const res = await axiosSecure.post('/announcements', data);
        return res.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['announcements']);
      reset();
      setEditingAnnouncement(null);
      Swal.fire('Success', 'Announcement saved!', 'success');
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/announcements/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['announcements']);
      Swal.fire('Deleted!', 'Announcement removed.', 'success');
    }
  });

  const onSubmit = (data) => {
    const postAt = new Date().toISOString();
    mutate({...data, postAt});
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setValue('title', announcement.title);
    setValue('message', announcement.message);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return <Loader></Loader>
  }

  return (
    <div className="px-4 lg:px-8 py-10">
      <h2 className="text-4xl font-bold text-center mb-10 flex items-center justify-center gap-2">
        <FaBullhorn className="text-black" /> Make Announcement
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-span-1 bg-white shadow-lg p-6 rounded-lg border border-yellow-200"
        >
        <h2 className="text-2xl font-bold text-center mb-10 flex items-center justify-center gap-2">
            <FaBullhorn className="text-black" /> 
            {editingAnnouncement ? 'Update Announcement' : 'Post Announcement'}
        </h2>        
          <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
          <input
            {...register('title', { required: true })}
            type="text"
            className="input input-bordered w-full mb-4"
            placeholder="Announcement Title"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
          <textarea
            {...register('message', { required: true })}
            rows={4}
            className="textarea textarea-bordered w-full mb-4"
            placeholder="Announcement message..."
          />

          <button
            type="submit"
            className="btn w-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300"
          >
            {editingAnnouncement ? 'Update Announcement' : 'Post Announcement'}
          </button>
        </form>

        {/* Table */}
        <div className="col-span-2 overflow-x-auto">
          <table className="table w-full table-zebra text-sm md:text-base shadow-md">
            <thead className="bg-yellow-400 text-black">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Message</th>
                <th>Posted Date</th> 
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((a, i) => (
                <tr key={a._id}>
                  <td>{i + 1}</td>
                  <td>{a.title}</td>
                  <td>{a.message}</td>
                        <td>
                            {a.postAt 
                            ? new Date(a.postAt).toLocaleString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                }) 
                            : 'N/A'}
                        </td>
                  <td className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(a)}
                      className="btn btn-sm bg-black text-white"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(a._id)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
