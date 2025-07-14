import React, { useState, useEffect } from 'react';
import {
  FaCalendarAlt,
  FaTimes,
  FaMapMarkerAlt,
  FaDollarSign,
  FaRunning,
  FaClock,
  FaEquals,
  FaTableTennis
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const BookingModal = ({ court, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // এখানে useEffect দিয়ে ইনিশিয়াল সিলেকশন দিচ্ছি
  const [selectedSlots, setSelectedSlots] = useState([]);

  useEffect(() => {
    if (court.selectedSlots && Array.isArray(court.selectedSlots)) {
      setSelectedSlots(court.selectedSlots);
    } else {
      setSelectedSlots([]);
    }
  }, [court]);

  const handleSlotToggle = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const totalPrice = selectedSlots.length * court.pricePerSession;

  const onSubmit = (data) => {
    if (selectedSlots.length === 0) return;

    const bookingInfo = {
      court,
      date: data.selectedDate,
      selectedSlots,
      totalPrice,
    };

    console.log(bookingInfo);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-[#030303e3] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black rounded-lg shadow-lg p-10 w-full max-w-xl relative">
        <button
          className="absolute top-2 right-2 cursor-pointer text-gray-200 hover:text-red-500"
          onClick={closeModal}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-primary mb-4">Book {court.name}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label font-semibold text-gray-400 flex items-center gap-2">
              <FaRunning /> Court Name
            </label>
            <input
              type="text"
              defaultValue={court.name}
              readOnly
              className="input input-bordered bg-primary text-black w-full"
            />
          </div>

          <div>
            <label className="label font-semibold text-gray-400 flex items-center gap-2">
              <FaTableTennis /> Court Type
            </label>
            <input
              type="text"
              defaultValue={court.type}
              readOnly
              className="input input-bordered bg-primary text-black w-full"
            />
          </div>

          <div>
            <label className="label font-semibold text-gray-400 flex items-center gap-2">
              <FaMapMarkerAlt /> Location
            </label>
            <input
              type="text"
              defaultValue={court.location}
              readOnly
              className="input input-bordered bg-primary text-black w-full"
            />
          </div>

          <div>
            <label className="label font-semibold text-gray-400 flex items-center gap-2">
              <FaDollarSign /> Price Per Session
            </label>
            <input
              type="text"
              defaultValue={`৳${court.pricePerSession}`}
              readOnly
              className="input input-bordered bg-primary text-black w-full"
            />
          </div>

          <div>
            <label className="label font-semibold text-gray-400 flex items-center gap-2">
              <FaCalendarAlt /> Select Date
            </label>
            <input
              type="date"
              {...register('selectedDate', { required: true })}
              className="input input-bordered w-full"
            />
            {errors.selectedDate && (
              <p className="text-red-400 text-sm mt-1">Please select a date</p>
            )}
          </div>

          <div>
            <label className="label font-semibold text-gray-400 flex items-center gap-2">
              <FaClock /> Select Session Slots
            </label>
            <div className="flex flex-wrap gap-2">
              {court.slots.map((slot, index) => (
                <label
                  key={index}
                  className={`cursor-pointer px-4 py-2 rounded border text-sm font-medium transition-all duration-200 ${
                    selectedSlots.includes(slot)
                      ? 'bg-primary text-black'
                      : 'bg-gray-700 text-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    value={slot}
                    className="hidden"
                    checked={selectedSlots.includes(slot)}
                    onChange={() => handleSlotToggle(slot)}
                  />
                  {slot}
                </label>
              ))}
            </div>
            {selectedSlots.length === 0 && (
              <p className="text-red-400 text-sm mt-1">Select at least one slot</p>
            )}
          </div>

          <div>
            <label className="label font-semibold text-gray-400 flex items-center gap-2">
              <FaEquals /> Total Price
            </label>
            <input
              type="text"
              value={`৳${totalPrice}`}
              readOnly
              className="input input-bordered bg-primary text-black w-full"
            />
          </div>

          <button
            type="submit"
            disabled={selectedSlots.length === 0}
            className="btn bg-primary text-black w-full"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
