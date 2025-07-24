import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const TermsOfUse = () => {
  return (
    <section className="bg-white py-24 px-6 lg:px-12 max-w-[1500px] mx-auto">
      <h2 className="text-4xl font-bold text-[#111] mb-6 border-l-8 pl-4 border-[#ffe733]">
        Terms of Use
      </h2>
      <ul className="space-y-5 text-[#333] text-lg leading-relaxed">
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          Users must be at least 13 years old to register and use our services. Accounts created by individuals under this age may be terminated without notice.
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          All court bookings should be made at least 12 hours in advance. While we try to accommodate same-day requests, they are subject to availability and cannot be guaranteed.
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          Any misuse of courts—including intentional damage, unsportsmanlike conduct, or abusive behavior—may result in immediate suspension or permanent account termination.
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          Users are responsible for ensuring that all participants listed in a booking follow the club’s rules and etiquette guidelines during their session.
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          Our platform reserves the right to update, revise, or modify these terms at any time. Continued use of the service implies acceptance of such changes.
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          Any disputes regarding bookings, payments, or conduct must be raised via our support team within 7 days of the incident. After that, no claims will be entertained.
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-[#ffe733] mt-1" />
          The use of automated tools, bots, or scripts for booking or scraping data is strictly prohibited and may result in legal action.
        </li>
      </ul>
    </section>
  );
};

export default TermsOfUse;
