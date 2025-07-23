import React, { useEffect, useState } from 'react';
import { FaTableTennis, FaMapMarkerAlt, FaClock, FaDollarSign, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import BookingModal from '../../Components/BookingModal/BookingModal'; 
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loader from '../Loading/Loader';
import Select from 'react-select';
import chroma from 'chroma-js';

const CourtsPage = () => {
  const { user } = useAuth();
  const {totalCourtsCount} = useLoaderData();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [selectedType, setSelectedType] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 6;
  const numberOfPages = Math.ceil(totalCourtsCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage-1)
    }
  };
  const handleNext = () => {
    if (currentPage < pages?.length-1) {
      setCurrentPage(currentPage+1)
    }
  };

  const { data: courts = [], isPending, isLoading } = useQuery({
    queryKey: ['courts', currentPage, itemsPerPage, selectedType, selectedSlot, sortOption],
    queryFn: async()=> {
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('size', itemsPerPage);
      if (selectedType) params.append('type', selectedType);
      if (selectedSlot) params.append('slot', selectedSlot);
      if (sortOption) params.append('sort', sortOption);

      const res = await axiosSecure.get(`/courts?${params.toString()}`);
      return res.data;
    }
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedType, selectedSlot, sortOption]);

  if (isLoading || isPending) {
    return <Loader />
  }

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

  const getColorOptions = (slots) => {
    const colors = ['#00B8D9', '#FF5630', '#FFC400', '#36B37E', '#0052CC', '#8E44AD', '#E67E22'];
    return slots.map((slot, index) => ({
      value: slot,
      label: slot,
      color: colors[index % colors.length],
    }));
  };

  const handleBookingSuccess = () => {
  setSelectedSlots({}); // reset all selected slots
  setIsModalOpen(false); // close modal
  };


  const customStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'black', borderColor: '#ffe733' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-black">Available Sports Courts</h1>
        <p className="text-gray-700 mt-2">
          Book your preferred court slot in a few clicks and elevate your game!
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <select className="select select-bordered max-w-xs" defaultValue=""
          onChange={(e) => setSelectedType(e.target.value)}>
          <option disabled value="">Filter by Type</option>
          <option value="Tennis">Tennis</option>
          <option value="Badminton">Badminton</option>
          <option value="Squash">Squash</option>
        </select>

        <select className="select select-bordered max-w-xs" defaultValue=""
          onChange={(e) => setSelectedSlot(e.target.value)}>
          <option disabled value="">Filter by Slot</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>

        <select className="select select-bordered max-w-xs" defaultValue=""
          onChange={(e) => setSortOption(e.target.value)}>
          <option disabled value="">Sort by Price</option>
          <option value="LowToHigh">Low to High</option>
          <option value="HighToLow">High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courts.map((court, index) => (
          <div key={index} className="bg-black rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
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

              <div className="text-gray-300 font-medium">
                <label className="block mb-1 text-white">Available Slots: </label>
                <Select
                  isMulti
                  className="text-black"
                  options={getColorOptions(court.slots)}
                  value={(selectedSlots[court.name] || []).map((slot) => {
                    const color = getColorOptions(court.slots).find(opt => opt.value === slot)?.color;
                    return {
                      value: slot,
                      label: slot,
                      color: color || '#ccc'
                    };
                  })}
                  onChange={(selected) => {
                    const selectedValues = selected.map((s) => s.value);
                    setSelectedSlots((prev) => ({
                      ...prev,
                      [court.name]: selectedValues,
                    }));
                  }}
                  styles={customStyles}
                />
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

      {!isLoading && courts.length === 0 && (
        <div className="flex flex-col items-center justify-center mb-16 mt-10 text-center">
          <h2 className="text-2xl font-semibold mt-4 text-gray-600">No Courts Found</h2>
          <p className="text-gray-500 mt-1">Try changing your filter or come back later.</p>
        </div>
      )}

      <div className='text-center mt-10 space-x-3'>
        <button
          onClick={handlePrev}
          className='btn bg-black text-primary'>Prev</button>
        {
          pages.map(page => 
            <button 
              onClick={() => setCurrentPage(page)}
              key={page} 
              className={`btn btn-square bg-black ${currentPage === page ? 'bg-primary text-[#000000d8]' : 'text-primary'}`}
            >{page+1}</button>
          )
        }
        <button 
          onClick={handleNext}
          className='btn bg-black text-primary'>Next</button>
      </div>

      {isModalOpen && selectedCourt && (
        <BookingModal
          court={selectedCourt}
          closeModal={() => setIsModalOpen(false)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default CourtsPage;
