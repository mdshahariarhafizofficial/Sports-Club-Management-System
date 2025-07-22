import React from "react";
import { FaDumbbell, FaSwimmingPool, FaShower, FaWifi, FaUserShield, FaUtensils } from "react-icons/fa";

const facilities = [
  {
    title: "Modern Gym",
    icon: <FaDumbbell className="text-4xl text-[#ffe733]" />,
    desc: "Fully-equipped gym with modern equipment and personal trainers."
  },
  {
    title: "Swimming Pool",
    icon: <FaSwimmingPool className="text-4xl text-[#ffe733]" />,
    desc: "Clean, temperature-controlled pool for all ages and levels."
  },
  {
    title: "Shower & Locker",
    icon: <FaShower className="text-4xl text-[#ffe733]" />,
    desc: "Spacious changing rooms with secure lockers and clean showers."
  },
  {
    title: "Free Wi-Fi",
    icon: <FaWifi className="text-4xl text-[#ffe733]" />,
    desc: "Enjoy high-speed internet throughout the facility."
  },
  {
    title: "24/7 Security",
    icon: <FaUserShield className="text-4xl text-[#ffe733]" />,
    desc: "CCTV and professional guards ensure complete safety."
  },
  {
    title: "Cafeteria",
    icon: <FaUtensils className="text-4xl text-[#ffe733]" />,
    desc: "Healthy food and drinks available after your workout."
  }
];

const Facilities = () => {
  return (
    <section className="w-full bg-black text-white py-24 px-4 md:px-8">
      <div className="max-w-[1500px] mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide inline-block border-b-4 border-[#ffe733] pb-2">
            Our Facilities
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Explore the top-notch facilities that make our club stand out from the rest.
          </p>
        </div>

        {/* Facility Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((item, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] border border-[#ffe733] rounded-2xl p-6 hover:shadow-lg hover:scale-105 duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-black p-4 rounded-full border border-[#ffe733]">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
              <p className="text-gray-300 text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
