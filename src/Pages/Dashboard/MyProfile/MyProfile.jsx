import React from 'react';
import { FaUser, FaEnvelope, FaPhone,  FaBriefcase, FaCakeCandles } from 'react-icons/fa6';
import { FaEdit, FaMapMarkerAlt, FaUpload } from 'react-icons/fa';

const ProfessionalProfilePage = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-6 font-sans">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Left Column: Profile Picture */}
                <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center h-fit md:w-1/3 transition-transform duration-300 transform hover:scale-[1.02]">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 w-full text-center">Profile Picture</h2>
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-xl relative group">
                        <img
                            src=""
                            alt="Profile"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <FaUpload size={30} className="text-white" />
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-4">JPG or PNG no larger than 5 MB</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full mt-4 transition-colors duration-300 shadow-md flex items-center gap-2">
                        <FaUpload />
                        Upload new image
                    </button>
                </div>

                {/* Right Column: Account Details */}
                <div className="bg-white rounded-xl shadow-lg p-8 flex-1 transition-transform duration-300 transform hover:scale-[1.01]">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Account Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Username */}
                        <div className="md:col-span-2">
                            <label htmlFor="username" className="block text-gray-600 font-medium mb-2">
                                Username <span className="text-sm font-normal text-gray-400">(how your name will appear to others)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FaUser className="text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    id="username"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    defaultValue="username"
                                />
                            </div>
                        </div>

                        {/* First Name */}
                        <div>
                            <label htmlFor="firstName" className="block text-gray-600 font-medium mb-2">First name</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FaUser className="text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    defaultValue="Valerie"
                                />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor="lastName" className="block text-gray-600 font-medium mb-2">Last name</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FaUser className="text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    defaultValue="Luna"
                                />
                            </div>
                        </div>

                        {/* Organization Name */}
                        <div>
                            <label htmlFor="organizationName" className="block text-gray-600 font-medium mb-2">Organization name</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FaBriefcase className="text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    id="organizationName"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    defaultValue="Start Bootstrap"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="block text-gray-600 font-medium mb-2">Location</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FaMapMarkerAlt className="text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    id="location"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    defaultValue="San Francisco, CA"
                                />
                            </div>
                        </div>

                        {/* Email address */}
                        <div className="md:col-span-2">
                            <label htmlFor="emailAddress" className="block text-gray-600 font-medium mb-2">Email address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FaEnvelope className="text-gray-400" />
                                </span>
                                <input
                                    type="email"
                                    id="emailAddress"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    defaultValue="name@example.com"
                                />
                            </div>
                        </div>

                        {/* Phone number */}
                        <div>
                            <label htmlFor="phoneNumber" className="block text-gray-600 font-medium mb-2">Phone number</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FaPhone className="text-gray-400" />
                                </span>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    defaultValue="555-123-4567"
                                />
                            </div>
                        </div>

                        {/* Birthday */}
                        <div>
                            <label htmlFor="birthday" className="block text-gray-600 font-medium mb-2">Birthday</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FaCakeCandles className="text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    id="birthday"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    defaultValue="06/10/1988"
                                />
                            </div>
                        </div>

                    </div>
                    
                    {/* Save Changes Button */}
                    <div className="mt-8 text-right">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 shadow-lg flex items-center gap-2 ml-auto">
                            <FaEdit />
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalProfilePage;