import React from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  // existing questions
  {
    question: "How can I book a court?",
    answer: "Go to the Courts page, select your preferred court and slot, then confirm your booking.",
  },
  {
    question: "Can I cancel or reschedule a booking?",
    answer: "Cancellations are allowed up to 2 hours before the booked time. Rescheduling depends on slot availability.",
  },
  {
    question: "How do I apply a coupon code?",
    answer: "Enter your coupon code on the payment page and click 'Apply' to get a discount. Both percentage and fixed amount discounts are supported.",
  },
  {
    question: "Is online payment safe?",
    answer: "Yes, we use Stripe to handle all transactions securely with encryption and fraud protection.",
  },
  {
    question: "How do I become a member?",
    answer: "Once your booking is approved and payment is completed, you will become a member of the club.",
  },
  {
    question: "How does the admin approve bookings?",
    answer: "Admins approve or reject bookings from the Manage Bookings section in the admin dashboard.",
  },

  // new FAQs below
  {
    question: "What are the different membership types available?",
    answer: "We offer various membership plans including monthly, quarterly, and yearly options tailored to your needs.",
  },
  {
    question: "Can I book multiple slots at once?",
    answer: "Yes, you can select and book multiple slots for your preferred court in a single booking.",
  },
  {
    question: "Are there any discounts for group bookings?",
    answer: "Yes, we offer special discount coupons for group bookings and bulk sessions. Check the Promotions section for current offers.",
  },
  {
    question: "What should I do if I forget my password?",
    answer: "Click the 'Forgot Password' link on the login page to reset your password via your registered email.",
  },
  {
    question: "Can I view my payment history?",
    answer: "Yes, the Member Dashboard provides a Payment History section where you can view all your past payments.",
  },
  {
    question: "How do I contact support if I have an issue?",
    answer: "You can reach our support team via phone or email listed on the Support page, or through the contact form on our website.",
  },
  {
    question: "Is there a mobile app available?",
    answer: "Currently, we do not have a mobile app but our website is fully responsive and works well on all mobile devices.",
  },
];


const FAQPage = () => {
  return (
    <section className="bg-gradient-to-b from-white to-[#fffde6] py-24 px-4">
      <div className="max-w-[1500px] mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Find answers to the most common questions about booking, payments,
            memberships, and more.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="grid md:grid-cols-2 gap-10">
          {faqs.map(({ question, answer }, idx) => (
            <details
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md border border-yellow-100 hover:shadow-xl transition cursor-pointer"
            >
              <summary className="flex justify-between items-center font-semibold text-gray-900 text-lg list-none">
                {question}
                <FaChevronDown className="text-yellow-500 ml-4" />
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
