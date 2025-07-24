import React from "react";
import { FaQuestionCircle, FaUserShield, FaCreditCard, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Support = () => {
  return (
    <section className="bg-gradient-to-b from-white to-[#fffde6] py-24 px-4">
      <div className="max-w-[1500px] mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Need Help or Support?</h2>
          <p className="text-gray-700 text-lg">
            We're here to assist you with any issues related to booking, payments, or memberships.
          </p>
        </div>

        {/* Support Categories */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-yellow-100 hover:shadow-xl transition">
                <div className="bg-[#ffe733] w-14 h-14 flex items-center justify-center text-black rounded-full shadow-lg">
                <FaQuestionCircle className="text-2xl" />
                </div>            
            <h4 className="font-bold text-lg mb-2">Booking Issues</h4>
            <p className="text-gray-600">
              Facing trouble booking a court? We're here to help resolve it quickly.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md border border-yellow-100 hover:shadow-xl transition">
                <div className="bg-[#ffe733] w-14 h-14 flex items-center justify-center text-black rounded-full shadow-lg">
                <FaCreditCard className="text-2xl" />
                </div>
            <h4 className="font-bold text-lg mb-2">Payment Support</h4>
            <p className="text-gray-600">
              Payment not going through or coupon not working? Let us take care of it.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md border border-yellow-100 hover:shadow-xl transition">
                <div className="bg-[#ffe733] w-14 h-14 flex items-center justify-center text-black rounded-full shadow-lg">
                <FaUserShield className="text-2xl" />
                </div>
            <h4 className="font-bold text-lg mb-2">Membership Help</h4>
            <p className="text-gray-600">
              Questions about membership status, approval, or benefits? Reach out here.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">How do I book a court?</h4>
              <p className="text-gray-600">
                Navigate to the Courts page, select your preferred slot and court type, then confirm your booking.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Can I cancel or reschedule a booking?</h4>
              <p className="text-gray-600">
                Cancellations are allowed up to 2 hours before the booked time. Rescheduling depends on slot availability.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Is online payment safe?</h4>
              <p className="text-gray-600">
                Yes. We use Stripe to handle all transactions securely with encryption and fraud protection.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white border border-yellow-100 p-10 rounded-2xl shadow-xl text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Still Need Help?</h3>
          <p className="text-gray-600 mb-6">Reach out to our support team directly.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <div className="flex items-center gap-4">
                <div className="bg-[#ffe733] text-black p-4 rounded-full shadow-lg">
                <FaPhoneAlt className="text-xl" />
                </div>    
              <span className="text-gray-800 font-medium">+880 1234 567890</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="bg-[#ffe733] text-black p-4 rounded-full shadow-lg">
                <FaEnvelope className="text-xl" />
                </div>              
              <span className="text-gray-800 font-medium">support@sportsclub.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
