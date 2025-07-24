import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaMapMarkerAlt, FaListAlt, FaPen, FaImage, FaMoneyBill } from 'react-icons/fa';
import { GiTennisCourt } from "react-icons/gi";

import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { Dialog } from '@headlessui/react';
import Swal from 'sweetalert2';
import Loader from '../../Loading/Loader';

const ManageCourts = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [newCourt, setNewCourt] = useState({ name: '', type: '', location: '', image: '', pricePerSession: '', slots: '', status: '' });
  const [editCourt, setEditCourt] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data: courts = [], refetch, isLoading, isPending } = useQuery({
    queryKey: ['courts', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courts?search=${search}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffe733',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/courts/${id}`);
        toast.success('Court deleted');
        refetch();
      }
    });
  };

  const handleAddCourt = async (e) => {
    e.preventDefault();
    if (!newCourt.name || !newCourt.type || !newCourt.location || !newCourt.pricePerSession || !newCourt.image || !newCourt.status) {
      return toast.error('Please fill in all required fields');
    }
    const courtData = {
      ...newCourt,
      pricePerSession: Number(newCourt.pricePerSession),
      slots: newCourt.slots ? newCourt.slots.split(',').map(s => s.trim()) : [],
    };
    await axiosSecure.post('/courts', courtData);
    toast.success('Court added');
    setNewCourt({ name: '', type: '', location: '', image: '', pricePerSession: '', slots: '', status: '' });
    setIsEditOpen(false)
    refetch();
  };

  const handleEdit = (court) => {
    setEditCourt({
      ...court,
      pricePerSession: court.pricePerSession?.toString() || '',
      slots: court.slots?.join(', ') || '',
    });
    setIsEditOpen(true);
  };

  const handleUpdateCourt = async (e) => {
    e.preventDefault();
    if (!editCourt.name || !editCourt.type || !editCourt.location || !editCourt.pricePerSession || !editCourt.image || !editCourt.status) {
      return toast.error('Please fill in all required fields');
    }
    const updatedData = {
      ...editCourt,
      pricePerSession: Number(editCourt.pricePerSession),
      slots: editCourt.slots ? editCourt.slots.split(',').map(s => s.trim()) : [],
    };
    delete updatedData._id;
    await axiosSecure.patch(`/courts/${editCourt._id}`, updatedData);
    toast.success('Court updated');
    setIsEditOpen(false);
    setEditCourt(null);
    refetch();
  };

  if (isPending || isLoading) {
    return <Loader></Loader>
  }

  return (
    <div className="px-6 py-8">
      <div className='border-b-4 border-yellow-400 flex items-center flex-col gap-6 lg:flex-row justify-between pb-3'>
        <h2 className="text-4xl font-extrabold text-black tracking-wide flex items-center">
          <GiTennisCourt className="inline-block mr-2 text-4xl" />
          Manage Courts</h2>
        <button
          onClick={() => { setEditCourt(null); setIsEditOpen(true); }}
          className="btn bg-[#ffe733] text-black font-semibold px-6 py-2 rounded-lg shadow hover:bg-yellow-400 transition"
        >
          <FaPlus className="mr-2" /> Add New Court
        </button>
      </div>

      <input
        type="text"
        placeholder="Search courts by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full md:w-1/3 my-6 shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
      />

      <div className="overflow-x-auto rounded-lg shadow-lg border border-black">
        <table className="min-w-full table-fixed border-collapse border border-black">
          <thead className="bg-black text-[#ffe733] text-lg uppercase">
            <tr>
              <th className="py-3 px-4 border border-[#ffe733] w-10">#</th>
              <th className="py-3 px-4 border border-[#ffe733] w-28">Image</th>
              <th className="py-3 px-4 border border-[#ffe733] w-48">Name</th>
              <th className="py-3 px-4 border border-[#ffe733] w-32">Type</th>
              <th className="py-3 px-4 border border-[#ffe733] w-48">Location</th>
              <th className="py-3 px-4 border border-[#ffe733] w-36">Price (৳)</th>
              <th className="py-3 px-4 border border-[#ffe733]">Slots</th>
              <th className="py-3 px-4 border border-[#ffe733] w-28">Status</th>
              <th className="py-3 px-4 border border-[#ffe733] w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courts.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500 italic">No courts found</td>
              </tr>
            ) : (
              courts.map((court, i) => (
                <tr key={court._id} className="even:bg-gray-100 hover:bg-yellow-50 transition duration-200">
                  <td className="py-3 px-4 border border-gray-300 text-center">{i + 1}</td>
                  <td className="py-3 px-4 border border-gray-300 text-center">
                    <img src={court.image} alt={court.name} className="w-20 h-12 object-cover rounded-md shadow-sm mx-auto" />
                  </td>
                  <td className="py-3 px-4 border border-gray-300 font-semibold">{court.name}</td>
                  <td className="py-3 px-4 border border-gray-300">{court.type}</td>
                  <td className="py-3 px-4 border border-gray-300">{court.location}</td>
                  <td className="py-3 px-4 border border-gray-300 text-center">৳ {court.pricePerSession}</td>
                  <td className="py-3 px-4 border border-gray-300 max-w-xs text-sm">
                    <ul className="list-disc list-inside text-gray-700 flex gap-3 shrink">
                      {court.slots?.map((slot, idx) => (<li key={idx}>{slot}</li>))}
                    </ul>
                  </td>
                  <td className={`py-3 px-4 border border-gray-300 font-semibold text-center ${
                    court.status === 'available' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {court.status.charAt(0).toUpperCase() + court.status.slice(1)}
                  </td>
                  <td className="py-3 px-4 border border-gray-300 flex justify-center gap-3 items-center">
                    <button onClick={() => handleEdit(court)} className="btn btn-sm bg-black text-white hover:bg-gray-700 transition" aria-label={`Edit ${court.name}`}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(court._id)} className="btn btn-sm bg-red-600 text-white hover:bg-red-700 transition" aria-label={`Delete ${court.name}`}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={isEditOpen} onClose={() => { setIsEditOpen(false); setEditCourt(null); }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000ef] bg-opacity-40">
        <Dialog.Panel className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8 relative max-h-[90vh] overflow-auto">
          <Dialog.Title className="text-2xl font-extrabold mb-6 text-black border-b border-yellow-400 pb-2">
            {editCourt ? 'Edit Court' : 'Add New Court'}
          </Dialog.Title>

          <form onSubmit={editCourt ? handleUpdateCourt : handleAddCourt} className="space-y-5">
            {[
              { icon: <FaPen />, placeholder: 'Court Name', field: 'name' },
              { icon: <FaListAlt />, placeholder: 'Court Type', field: 'type' },
              { icon: <FaMapMarkerAlt />, placeholder: 'Location', field: 'location' },
              { icon: <FaImage />, placeholder: 'Image URL', field: 'image', type: 'url' },
              { icon: <FaMoneyBill />, placeholder: 'Price per Session (৳)', field: 'pricePerSession', type: 'number', min: 0 },
              { icon: <FaListAlt />, placeholder: 'Slots (comma separated)', field: 'slots' },
            ].map(({ icon, placeholder, field, type = 'text', min }, idx) => (
              <div className="relative" key={idx}>
                <input
                  type={type}
                  placeholder={placeholder}
                  min={min}
                  value={editCourt ? editCourt[field] : newCourt[field]}
                  onChange={(e) => {
                    const value = e.target.value;
                    editCourt
                      ? setEditCourt({ ...editCourt, [field]: value })
                      : setNewCourt({ ...newCourt, [field]: value });
                  }}
                  className="input input-bordered w-full pl-10 focus:bg-transparent"
                  required={field !== 'slots'}
                />
                <div className="absolute left-3 top-3 text-gray-500">{icon}</div>
              </div>
            ))}

            {/* Status Select with Icon */}
            <div className="relative">
              <select
                value={editCourt ? editCourt.status : newCourt.status}
                onChange={(e) => {
                  const value = e.target.value;
                  editCourt
                    ? setEditCourt({ ...editCourt, status: value })
                    : setNewCourt({ ...newCourt, status: value });
                }}
                className="select select-bordered w-full pl-10 focus:bg-transparent"
                required
              >
                <option value="" disabled>Select Status</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
                <option value="maintenance">Maintenance</option>
              </select>
              <div className="absolute left-3 top-3 text-gray-500"><FaEdit /></div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsEditOpen(false);
                  setEditCourt(null);
                }}
                className="btn btn-outline px-6 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-[#ffe733] text-black font-semibold px-6 py-2 rounded-md hover:bg-yellow-400 transition"
              >
                {editCourt ? 'Update Court' : 'Add Court'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default ManageCourts;
