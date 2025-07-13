import React, { useState } from 'react';
import { FaTableTennis, FaMapMarkerAlt, FaClock, FaDollarSign, FaCalendarCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import BookingModal from '../../Components/BookingModal/BookingModal'; 

const demoCourts = [
  {
    name: "Grand Tennis Court A",
    type: "Tennis",
    image: "https://i.postimg.cc/NGrFy3Jn/Grand-Tennis-Court-A.jpg",
    pricePerSession: 1200,
    slots: ["7:00 AM", "9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM"],
    location: "Sportiva Complex - Dhaka",
    status: "available"
  },
  {
    name: "Arena Badminton Hall",
    type: "Badminton",
    image: "https://i.postimg.cc/NFTjWX2t/Arena-Badminton-Hall.jpg",
    pricePerSession: 800,
    slots: ["8:00 AM", "10:00 AM", "1:00 PM", "4:00 PM", "6:00 PM"],
    location: "Elite Club - Chattogram",
    status: "available"
  },
  {
    name: "Squash Pro Room 1",
    type: "Squash",
    image: "https://i.postimg.cc/9F5MyLsQ/Squash-Pro-Room-1.jpg",
    pricePerSession: 1000,
    slots: ["7:30 AM", "9:30 AM", "12:00 PM", "2:30 PM", "6:00 PM"],
    location: "Fitness Plus - Sylhet",
    status: "available"
  },
  {
    name: "Power Squash Room 2",
    type: "Squash",
    image: "https://i.postimg.cc/Bnfq1tLL/Power-Squash-Room-2.jpg",
    pricePerSession: 950,
    slots: ["7:00 AM", "10:00 AM", "12:30 PM", "3:30 PM", "6:00 PM"],
    location: "Pro Sports Arena - Barishal",
    status: "available"
  },
];

const CourtsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBooking = (court) => {
    if (!user) {
      navigate('/login');
    } else {
      setSelectedCourt(court);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-black">Available Sports Courts</h1>
        <p className="text-gray-700 mt-2">
          Book your preferred court slot in a few clicks and elevate your game!
        </p>
      </div>

      {/* Filter / Sort Area (Optional) */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <select className="select select-bordered max-w-xs">
          <option disabled selected>Filter by Type</option>
          <option>Tennis</option>
          <option>Badminton</option>
          <option>Squash</option>
        </select>
        <select className="select select-bordered max-w-xs">
          <option disabled selected>Filter by Slot</option>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
        </select>
        <select className="select select-bordered max-w-xs">
          <option disabled selected>Sort by Price</option>
          <option>Low to High</option>
          <option>High to Low</option>
        </select>
      </div>

      {/* Court Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {demoCourts.map((court, index) => (
          <div key={index} className="bg-black rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="overflow-hidden h-48">
              <img
                src={court.image}
                alt={court.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5 space-y-3">
              <h2 className="text-xl font-semibold text-primary">{court.name}</h2>

              <p className="flex items-center gap-2 text-gray-300">
                <FaTableTennis /> {court.type}
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                <FaMapMarkerAlt /> {court.location}
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                <FaClock /> {court.slots.length} Slots
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                <FaDollarSign /> ৳{court.pricePerSession} / session
              </p>

              <button
                onClick={() => handleBooking(court)}
                className="btn btn-primary w-full flex items-center text-black justify-center gap-2"
              >
                <FaCalendarCheck /> Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {isModalOpen && selectedCourt && (
        <BookingModal
          court={selectedCourt}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CourtsPage;
