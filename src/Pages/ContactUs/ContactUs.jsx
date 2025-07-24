import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="bg-gradient-to-b from-white to-[#fffde6] py-24 px-4">
      <div className="max-w-[1500px] mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-14">
          {/* Left Side - Contact Info */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-snug">
              Get in Touch with Us
            </h2>
            <p className="text-gray-700 text-lg mb-10">
              We're always here to help with court bookings, membership inquiries, or general support. Reach out anytime!
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="bg-[#ffe733] text-black p-4 rounded-full shadow-lg">
                  <FaPhoneAlt className="text-xl" />
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-800">+880 1234 567890</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="bg-[#ffe733] text-black p-4 rounded-full shadow-lg">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-semibold text-gray-800">support@sportsclub.com</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="bg-[#ffe733] text-black p-4 rounded-full shadow-lg">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <p className="text-gray-600">Location</p>
                  <p className="font-semibold text-gray-800">Gulshan 1, Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-yellow-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#ffe733] focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#ffe733] focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700 font-medium">Message</label>
                <textarea
                  rows="5"
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#ffe733] focus:border-transparent"
                  placeholder="Write your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#ffe733] hover:bg-yellow-400 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 w-full shadow-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
