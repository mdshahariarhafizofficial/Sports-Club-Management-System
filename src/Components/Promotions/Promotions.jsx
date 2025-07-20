import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const coupons = [
  {
    id: "687620cbd881a28bb81d85eb",
    code: "WELCOME100",
    discountAmount: 100,
    title: "Welcome Offer",
    description: "Enjoy ৳100 off on your first booking!"
  },
  {
    id: "687620cbd881a28bb81d85ec",
    code: "ABC50",
    discountAmount: 50,
    title: "Limited Time Deal",
    description: "Grab ৳50 off on your weekend slot booking!"
  },
  {
    id: "687620cbd881a28bb81d85ed",
    code: "SAVE30",
    discountAmount: 30,
    title: "Summer Saver",
    description: "Cool off with ৳30 discount this summer!"
  },
  {
    id: "687620cbd881a28bb81d85ed",
    code: "SAVE30",
    discountAmount: 30,
    title: "Summer Saver",
    description: "Cool off with ৳30 discount this summer!"
  },
  {
    id: "687620cbd881a28bb81d85ed",
    code: "SAVE30",
    discountAmount: 30,
    title: "Summer Saver",
    description: "Cool off with ৳30 discount this summer!"
  },
  {
    id: "687620cbd881a28bb81d85ed",
    code: "SAVE30",
    discountAmount: 30,
    title: "Summer Saver",
    description: "Cool off with ৳30 discount this summer!"
  },
];

const Promotions = () => {
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <section className="w-full bg-[#fffbea] py-20 px-4 md:px-8 text-black">
      <div className="max-w-[1500px] mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black uppercase tracking-wide">
            <span className="not-italic">🎁</span> Exclusive Promotions
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Use these coupon codes while booking and save big on your next game!
          </p>
        </div>

        {/* Coupon Cards */}
    <div className="slider-container">
      <Slider {...settings}>
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white border-2 border-[#ffe733] rounded-2xl shadow-xl p-6 flex flex-col justify-between transition-transform hover:scale-[1.03]"
            >
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">{coupon.title}</h3>
                <p className="text-gray-700 mb-4">{coupon.description}</p>
              </div>

              <div className="mt-auto">
                <div className="text-lg font-bold text-red-500 mb-1">
                  Use Code:
                  <span className="ml-2 px-3 py-1 bg-[#ffe733] text-black font-bold rounded-full">
                    {coupon.code}
                  </span>
                </div>
                <div className="text-sm text-green-700 font-semibold">
                  Discount: ৳{coupon.discountAmount}
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>



        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white border-2 border-[#ffe733] rounded-2xl shadow-xl p-6 flex flex-col justify-between transition-transform hover:scale-[1.03]"
            >
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">{coupon.title}</h3>
                <p className="text-gray-700 mb-4">{coupon.description}</p>
              </div>

              <div className="mt-auto">
                <div className="text-lg font-bold text-red-500 mb-1">
                  Use Code:
                  <span className="ml-2 px-3 py-1 bg-[#ffe733] text-black font-bold rounded-full">
                    {coupon.code}
                  </span>
                </div>
                <div className="text-sm text-green-700 font-semibold">
                  Discount: ৳{coupon.discountAmount}
                </div>
              </div>
            </div>
          ))}
        </div> */}
        

      </div>
    </section>
  );
};

export default Promotions;
