import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { Rating } from 'react-simple-star-rating';
import Swal from 'sweetalert2';
import Loader from '../../Loading/Loader';
import { FaTrash, FaEdit, FaStar } from 'react-icons/fa';

const ManageRatings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingRating, setEditingRating] = useState(null);

  const {
    data: ratings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['myRatings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/ratings`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this rating?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/ratings/${id}`);
      Swal.fire('Deleted!', 'Rating has been deleted.', 'success');
      refetch();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedRating = {
      rating: parseFloat(form.rating.value),
      comment: form.comment.value,
    };

    await axiosSecure.patch(`/ratings/${editingRating._id}`, updatedRating);
    Swal.fire('Updated!', 'Your rating has been updated.', 'success');
    setEditingRating(null);
    refetch();
  };

  if (isLoading) return <Loader />;

  return (
    <div className="px-4 py-10">
      <h2 className="flex items-center gap-1 text-3xl font-bold text-center mb-6">
        <FaStar size={40} color='#FFBC0B'></FaStar>
        Manage Ratings
      </h2>
      <div className='divider'></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ratings.map((rating) => (
          <div key={rating._id} className="bg-white rounded-xl border border-primary shadow-md p-5 space-y-3">
              <div className="avatar">
                    <div className="w-14 rounded-full">
                    <img src={rating.userImage} />
                    </div>
                </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
               <span className='text-black'>Name : </span> {rating.userName || 'user name'}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingRating(rating)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(rating._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
              <h3 className="text-lg font-semibold text-gray-600"><span className='text-black'>Court Name : </span> {rating.courtTitle || 'Court'}</h3>
            <span className='text-black font-semibold'>Rating : </span>            
            <Rating initialValue={rating.rating} size={20} SVGstyle={{ display: "inline" }} readonly />
            <p className="text-sm text-gray-700">
             <span className='text-black font-semibold'>Comment : </span> {rating.comment}</p>
            <p className="text-xs text-gray-400">Submitted: {new Date(rating.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {editingRating && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md space-y-4"
          >
            <h3 className="text-xl font-bold">Update Rating</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Rating (1-5):</label>
              <input
                name="rating"
                type="number"
                min="1"
                max="5"
                step="0.5"
                defaultValue={editingRating.rating}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Comment:</label>
              <textarea
                name="comment"
                rows="3"
                defaultValue={editingRating.comment}
                className="w-full border px-3 py-2 rounded"
              ></textarea>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingRating(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageRatings;
