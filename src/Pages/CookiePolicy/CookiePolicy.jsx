import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const CookiePolicy = () => {
  return (
    <section className="bg-white py-24 px-6 lg:px-12 max-w-[1500px] mx-auto">
      <h2 className="text-4xl font-bold text-[#111] mb-6 border-l-8 pl-4 border-[#ffe733]">
        Cookie Policy
      </h2>
      <ul className="space-y-5 text-[#333] text-lg leading-relaxed">
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          We use cookies to enhance your browsing experience by remembering preferences, login sessions, and providing relevant content and features.
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          Cookies help us analyze site traffic, identify popular pages, and optimize our services based on user behavior and interaction patterns.
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          You can control or delete cookies through your browser settings at any time. However, disabling cookies may affect your experience on the platform.
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          We do not use cookies to collect sensitive personal information without your explicit consent.
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          By using our website, you agree to our use of cookies as described in this policy.
        </li>
      </ul>
    </section>
  );
};

export default CookiePolicy;
