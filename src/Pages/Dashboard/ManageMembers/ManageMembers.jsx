import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageMembers = () => {
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data: members = [], refetch } = useQuery({
    queryKey: ["members", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/members?search=${search}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this member!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffe733",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/members/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Member has been deleted.", "success");
        }
      }
    });
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Manage Members</h2>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn bg-[#ffe733] text-black hover:bg-yellow-400">
          <FaSearch />
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
        <table className="table text-center">
          <thead className="bg-black text-white text-[15px]">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Member Since</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            {members.map((member, index) => (
              <tr key={member._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{member.name}</td>
                <td>{member.email}</td>
                <td>{new Date(member.memberSince).toDateString()}</td>
                <td>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-gray-500">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;
