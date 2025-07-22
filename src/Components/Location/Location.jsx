import React from "react";
import { MdLocationOn, MdAccessTime } from "react-icons/md";
import { FiPhone, FiMail } from "react-icons/fi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { BiSolidMapPin } from "react-icons/bi";
import MyMap from "../MyMap/MyMap";

const Location = () => {
  return (
    <section className="w-full bg-black px-4 md:px-8 py-24 text-white">
      <div className="max-w-[1500px] mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide text-white inline-flex items-center gap-3 justify-center">
            <FaMapMarkedAlt className="text-[#ffe733]" /> Our Location
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Visit our center or contact us — we’re always ready to assist you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-8">
          {/* Address Box */}
          <div className="bg-[#1a1a1a] border border-[#ffe733] rounded-2xl shadow-lg p-8 h-[450px] flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <BiSolidMapPin className="text-[#ffe733] text-3xl" />
              Address Details
            </h3>
            <ul className="space-y-5 text-gray-200 text-lg md:text-xl leading-relaxed">
              <li className="flex items-center gap-4">
                <MdLocationOn className="text-[#ffe733] text-2xl" />
                Gulshan 1, Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-4">
                <FiPhone className="text-[#ffe733] text-2xl" />
                +880 123 456 789
              </li>
              <li className="flex items-center gap-4">
                <FiMail className="text-[#ffe733] text-2xl" />
                support@sportiva.com
              </li>
              <li className="flex items-center gap-4">
                <MdAccessTime className="text-[#ffe733] text-2xl" />
                Sat – Thu: 9:00 AM – 6:00 PM
              </li>
            </ul>
          </div>

          {/* Map Box - wider */}
          <div className="bg-[#1a1a1a] border border-[#ffe733] rounded-2xl shadow-lg h-[450px] flex items-center justify-center text-gray-400 text-lg font-semibold">
            <MyMap />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
