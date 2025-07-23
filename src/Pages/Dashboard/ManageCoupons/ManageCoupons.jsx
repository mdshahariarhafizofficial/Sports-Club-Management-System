import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Loader from '../../Loading/Loader';

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingCoupon, setEditingCoupon] = useState(null);

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/coupons');
      return res.data;
    },
  });

  const { mutate: saveCoupon } = useMutation({
    mutationFn: async ({ id, code, discountAmount, title, description }) => {
      if (id) {
        return await axiosSecure.patch(`/coupons/${id}`, { code, discountAmount, title, description });
      } else {
        return await axiosSecure.post('/coupons', { code, discountAmount, title, description });
      }
    },
    onSuccess: () => {
      toast.success(editingCoupon ? 'Coupon updated successfully' : 'Coupon added successfully');
      queryClient.invalidateQueries(['coupons']);
      setNewCode('');
      setNewDiscount('');
      setNewTitle('');
      setNewDescription('');
      setEditingCoupon(null);
    },
    onError: () => toast.error('Something went wrong'),
  });

  const { mutate: deleteCoupon } = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/coupons/${id}`);
    },
    onSuccess: () => {
      toast.success('Coupon deleted');
      queryClient.invalidateQueries(['coupons']);
    },
  });

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setNewCode(coupon.code);
    setNewDiscount(coupon.discountAmount);
    setNewTitle(coupon.title || '');
    setNewDescription(coupon.description || '');
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete this coupon?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffe733',
      cancelButtonColor: '#d33',
      confirmButtonText: '<span style="color:black">Yes, Delete it!</span>',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCoupon(id);
      }
    });
  };
  if (isLoading) {
    return <Loader></Loader>
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCode || !newDiscount) return;
    saveCoupon({
      id: editingCoupon?._id,
      code: newCode,
      discountAmount: parseFloat(newDiscount),
      title: newTitle,
      description: newDescription,
    });
  };

  return (
    <div className="md:m-6 m-3 px-6 py-10 bg-black rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">🎁 Manage Coupons</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 items-start">
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-primary mb-6 flex items-center gap-2">
            {
                editingCoupon ? <FaEdit /> :
                <FaPlus className="ml-2" />
              }
            {
                editingCoupon ? "Update Coupon" :
                "Add Coupon" 
            }
            
            </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-gray-300">Coupon Code</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                />
              </div>
              <div>
                <label className="label text-gray-300">Discount Amount (%)</label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="label text-gray-300">Title</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="label text-gray-300">Description</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <button type="submit" className="btn bg-primary text-black w-full">
              {editingCoupon ? 'Update Coupon' : 'Add Coupon'} 
              {
                editingCoupon ? <FaEdit /> :
                <FaPlus className="ml-2" />
              }
            </button>
          </form>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="table table-zebra w-full text-white">
            <thead className="bg-primary text-black">
              <tr>
                <th>#</th>
                <th>Coupon Code</th>
                <th>Discount (%)</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => (
                <tr key={coupon._id} className="hover:bg-gray-800 even:text-black hover:text-primary">
                  <td>{index + 1}</td>
                  <td>{coupon.code}</td>
                  <td>{coupon.discountAmount}</td>
                  <td>{coupon.title || '-'}</td>
                  <td>{coupon.description || '-'}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleEdit(coupon)}
                      className="btn btn-sm bg-yellow-500 text-black"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(coupon._id)}
                      className="btn btn-sm bg-red-600 text-white"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-400">
                    No coupons found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCoupons;
