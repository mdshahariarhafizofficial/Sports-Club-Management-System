import React, { useState } from 'react';
import { FaTableTennis, FaMapMarkerAlt, FaClock, FaDollarSign, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import BookingModal from '../../Components/BookingModal/BookingModal'; 
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loader from '../Loading/Loader';

// const demoCourts = [
//   {
//     name: "Grand Tennis Court A",
//     type: "Tennis",
//     image: "https://i.postimg.cc/NGrFy3Jn/Grand-Tennis-Court-A.jpg",
//     pricePerSession: 1200,
//     slots: ["7:00 AM", "9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM"],
//     location: "Sportiva Complex - Dhaka",
//     status: "available"
//   },
//   {
//     name: "Arena Badminton Hall",
//     type: "Badminton",
//     image: "https://i.postimg.cc/NFTjWX2t/Arena-Badminton-Hall.jpg",
//     pricePerSession: 800,
//     slots: ["8:00 AM", "10:00 AM", "1:00 PM", "4:00 PM", "6:00 PM"],
//     location: "Elite Club - Chattogram",
//     status: "available"
//   },
//   {
//     name: "Squash Pro Room 1",
//     type: "Squash",
//     image: "https://i.postimg.cc/9F5MyLsQ/Squash-Pro-Room-1.jpg",
//     pricePerSession: 1000,
//     slots: ["7:30 AM", "9:30 AM", "12:00 PM", "2:30 PM", "6:00 PM"],
//     location: "Fitness Plus - Sylhet",
//     status: "available"
//   },
//   {
//     name: "Power Squash Room 2",
//     type: "Squash",
//     image: "https://i.postimg.cc/Bnfq1tLL/Power-Squash-Room-2.jpg",
//     pricePerSession: 950,
//     slots: ["7:00 AM", "10:00 AM", "12:30 PM", "3:30 PM", "6:00 PM"],
//     location: "Pro Sports Arena - Barishal",
//     status: "available"
//   },
// ];

const CourtsPage = () => {
  const { user } = useAuth();
  // const {totalCourtsCount} = useLoaderData();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState({});
  const totalCourtsCount = 50;
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);

  // Pagination
  const numberOfPages = Math.ceil(totalCourtsCount / itemsPerPage);

  const pages = [...Array(numberOfPages).keys()];
  console.log(pages);

  const handleItemPerPage = (e) => {
    console.log(parseInt(e.target.value));
    setItemsPerPage(parseInt(e.target.value))
    setCurrentPage(0)
  }
    
 


  

  // Load Courts
  const { data: courts = [], isPending, isLoading } = useQuery({
    queryKey: ['courts'],
    queryFn: async()=> {
      const res = await axiosSecure.get('/courts');
      return res.data;
    }
  });

  if (isLoading || isPending) {
    return <Loader></Loader>
  }

  // Slot select handle (multi-select)
  const handleSlotChange = (courtName, slot) => {
    setSelectedSlots(prev => {
      const currentSlots = prev[courtName] || [];
      if (currentSlots.includes(slot)) {
        // remove
        return {
          ...prev,
          [courtName]: currentSlots.filter(s => s !== slot)
        };
      } else {
        // add
        return {
          ...prev,
          [courtName]: [...currentSlots, slot]
        };
      }
    });
  };

  const handleBooking = (court) => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!selectedSlots[court.name] || selectedSlots[court.name].length === 0) {
      toast('Please select at least one slot.', {
        icon: '⚠️',
      });
      return;
    }
    setSelectedCourt({ ...court, selectedSlots: selectedSlots[court.name] });
    setIsModalOpen(true);
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
        <select className="select select-bordered max-w-xs" defaultValue="">
          <option disabled value="">Filter by Type</option>
          <option value="Tennis">Tennis</option>
          <option value="Badminton">Badminton</option>
          <option value="Squash">Squash</option>
        </select>
        <select className="select select-bordered max-w-xs" defaultValue="">
          <option disabled value="">Filter by Slot</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
        <select className="select select-bordered max-w-xs" defaultValue="">
          <option disabled value="">Sort by Price</option>
          <option value="LowToHigh">Low to High</option>
          <option value="HighToLow">High to Low</option>
        </select>
      </div>

      {/* Court Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courts.map((court, index) => (
          <div key={index} className="bg-black rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="overflow-hidden h-56">
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
              
              {/* Slot time dropdown (multi-select) */}
              <div className="text-gray-300 font-medium">
                <label>Available Slots: </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {court.slots.map((slot, i) => {
                    const isSelected = selectedSlots[court.name]?.includes(slot);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSlotChange(court.name, slot)}
                        className={`px-3 py-1 rounded-full border ${
                          isSelected ? 'bg-primary text-black border-primary' : 'border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white'
                        } transition-colors duration-200`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

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

      <div className='text-center mt-10 space-x-1'>
        {
          <p>currentPage{currentPage}</p>
        }
        {
          pages.map(page => 
            <button 
            onClick={() => setCurrentPage(page)}
            key={page} 
            className={`btn btn-square bg-black ${currentPage === page ? 'bg-primary text-[#000000d8]' : 'text-primary'}`}
            >{page}</button>
          )
        }
        <select value={itemsPerPage} onChange={handleItemPerPage} name="" id="" className='border bg-black text-white h-10 px-2 rounded-sm'>
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
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
