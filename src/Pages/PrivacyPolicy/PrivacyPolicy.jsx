import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <section className="bg-white py-24 px-6 lg:px-12 max-w-[1500px] mx-auto">
      <h2 className="text-4xl font-bold text-[#111] mb-6 border-l-8 pl-4 border-[#ffe733]">
        Privacy Policy
      </h2>
      <ul className="space-y-5 text-[#333] text-lg leading-relaxed">
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          We are committed to protecting your personal data. All information you provide during registration and use of the platform is securely stored and handled with care.
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          Your information is used solely for booking management, notifications, customer support, and service improvement. We do not sell or rent your data to third parties.
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          We implement industry-standard security measures such as data encryption and secure servers to safeguard your information from unauthorized access.
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          You have the right to access, update, or delete your personal data at any time. Simply contact our support team to request any changes.
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          This privacy policy may be updated occasionally. Continued use of our platform implies acceptance of any revised terms.
        </li>
      </ul>
    </section>
  );
};

export default PrivacyPolicy;
