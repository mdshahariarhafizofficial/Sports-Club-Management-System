import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ImProfile } from "react-icons/im";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

export default function MyProfile() {
  const { user, updateUser, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch current user data from backend
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["currentUser", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?email=${user.email}`);
      return data[0]; // API returns array
    },
    enabled: !!user.email,
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Reset form when currentUser loads
  useEffect(() => {
    if (currentUser) {
      reset(currentUser);
    }
  }, [currentUser, reset]);

  // Mutation for updating user
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const { data } = await axiosSecure.patch(
        `/users/${user.email}`,
        updatedData
      );
      return data;
    },
    onSuccess: (data) => {
      
      // Update FB User Profile
      const updateUserProfile = {
        displayName: data.name,
        photoURL: data.image,
      }
      updateUser(updateUserProfile)
          .then(() => {
           setLoading(false);              
          })
          .catch( (error) => {
            console.log(error);
          } )
               
      toast.success("Profile updated successfully!");
      queryClient.setQueryData(["currentUser", user.email], data);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Update failed");
    },
  });

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-8 w-full">
      <h1 className="text-2xl flex items-center gap-2 font-extrabold">
        <ImProfile size={30} /> My Profile
      </h1>

      {/* Profile Info Section */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
        <img
          src={currentUser?.image || "https://i.pravatar.cc/150"}
          alt="User"
          className="w-32 h-32 rounded-full border-4 border-yellow-400 object-cover"
        />
        <div className="space-y-2 w-full">
          <h2 className="text-xl font-semibold">{currentUser?.name}</h2>
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {currentUser?.email}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Phone:</span> {currentUser?.phone || "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Address:</span> {currentUser?.address || "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Role:</span> {currentUser?.role}
          </p>
        </div>
      </div>

      {/* Update Form Section */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 w-full">
        <h2 className="text-lg font-semibold mb-4">Update Profile</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              {...register("email")}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              {...register("phone")}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <input
              {...register("address")}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <input
              {...register("role")}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-100"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Profile Image URL
            </label>
            <input
              {...register("image")}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold py-3 px-6 rounded-xl shadow hover:bg-yellow-300 transition"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
