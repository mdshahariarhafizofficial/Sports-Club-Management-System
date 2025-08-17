import { useForm } from "react-hook-form";
import { useState } from "react";
import { ImProfile } from "react-icons/im";

export default function MyProfile() {
  // Dummy user data (later replace with API call)
  const [user] = useState({
    image: "https://i.pravatar.cc/150?img=32",
    name: "Md. Shahariar Hafiz",
    email: "shahariar@example.com",
    phone: "+880 1234-567890",
    address: "Barishal, Bangladesh",
    role: "Admin",
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user,
  });

  const onSubmit = (data) => {
    console.log("Updated Profile Data:", data);
    // 👉 এখানে তুমি API call করে DB তে update করতে পারবে
  };

  return (
    <div className="p-6 space-y-8 w-full">
      {/* Page Title */}
      <h1 className="text-2xl flex items-center gap-2 font-extrabold">
        <ImProfile size={30} />
        My Profile</h1>

      {/* Profile Info Section */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
        <img
          src={user.image}
          alt="User"
          className="w-32 h-32 rounded-full border-4 border-yellow-400 object-cover"
        />
        <div className="space-y-2 w-full">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Address:</span> {user.address}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Role:</span> {user.role}
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-100"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              {...register("phone", { required: "Phone is required" })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <input
              {...register("address", { required: "Address is required" })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
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
              {...register("image", { required: "Image URL is required" })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
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
