import { useState } from 'react';
import { FaUserCircle, FaArrowLeft, FaArrowRight, FaQuoteRight } from 'react-icons/fa';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import Loader from '../../Pages/Loading/Loader';
// const reviews = [
//   { name: 'Awlad Hossin', title: 'Senior Product Designer', text: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.' },
//   { name: 'Rasel Ahamed', title: 'CTO', text: 'This courier service is reliable and fast. I can always count on them to get my packages delivered on time.' },
//   { name: 'Nasir Uddin', title: 'CEO', text: 'Excellent tracking system and support. I love how I can monitor everything live with complete peace of mind.' },
//   { name: 'Shamim Hossain', title: 'Logistics Manager', text: 'The 24/7 call center has been a lifesaver. They really take customer service seriously.' },
//   { name: 'Jannatul Ferdous', title: 'Online Seller', text: 'Affordable delivery charges with excellent reliability. My customers are always satisfied.' },
//   { name: 'Tanvir Rahman', title: 'Entrepreneur', text: 'The delivery process is seamless. Their team is always professional and on time.' },
//   { name: 'Sadia Karim', title: 'Retail Business Owner', text: 'Damage-free delivery every time. That’s why I always choose this courier service.' },
//   { name: 'Kamrul Islam', title: 'Customer', text: 'Super friendly staff and easy parcel tracking. Highly recommend to everyone.' },
//   { name: 'Farhana Haque', title: 'Wholesaler', text: 'Perfect courier for businesses. Everything from pickup to delivery is well-handled.' },
//   { name: 'Raihan Kabir', title: 'E-commerce Manager', text: 'The most reliable courier partner I’ve worked with. Live updates are amazing.' }
// ];

export default function Testimonials() {
    
  const [activeIndex, setActiveIndex] = useState(0)
  
    const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["user-ratings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/ratings");
      return res.data;
    },
  });

useEffect(() => {
  const interval = setInterval(() => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  }, 2000); // autoplay every 4 seconds

  return () => clearInterval(interval); // cleanup on unmount
}, [reviews]);

if (isLoading) {
    return <Loader></Loader>
}


  const next = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="max-w-[1500px] mx-auto py-24 px-4 overflow-hidden">
      <div className="text-center mb-16">
        {/* <img src={illustration} className='mx-auto mb-5' alt="" /> */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-black uppercase tracking-wide">WHAT ARE PEOPLE SAY</h2>
        
        <p className="mt-4 text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
          Hear from our members about their experiences and the difference we make.
        </p>
      </div>

      <div className="relative w-full mx-auto">
        <div className="flex justify-center items-center overflow-hidden relative h-[320px]">
          {reviews.map((review, idx) => {
            const offset = idx - activeIndex;
            const isActive = idx === activeIndex;
            const isAdjacent = Math.abs(offset) === 1;
            const isFar = Math.abs(offset) > 1;

            let opacity = 1;
            if (isAdjacent) opacity = 0.65;
            else if (isFar) opacity = 0.5;

            return (
              <div
                key={idx}
                className={classNames(
                  'absolute transition-all duration-500 ease-in-out w-[320px] md:w-[360px]',
                  {
                    'scale-100 blur-none z-20': isActive,
                    'scale-95 blur-[1px] z-10': isAdjacent,
                    'scale-90 blur-[1px] z-0 hidden sm:block': isFar
                  }
                )}
                style={{
                  left: '50%',
                  transform: `translateX(calc(-50% + ${offset * 400}px) ) translateY(${isActive ? '-25px' : '0'})` ,
                  opacity
                }}
              >
                <div className="bg-white rounded-xl shadow p-6 text-left h-full flex flex-col justify-between">
                <div className="flex mb-4  text-2xl">
                <FaQuoteRight color='#C3DFE2' size={50} />
                </div>
                  <p className="text-sm text-gray-600 mb-4">{review.comment}</p>
                  <div className="flex items-center gap-3 mt-4 border-t border-dashed pt-4">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                    <img src={review.userImage} />
                    </div>
                </div>
                    <div className="text-left">
                      <div
                        className="flex items-center space-x-2"
                        bis_skin_checked="1"
                      >
                      <Rating
                          style={{maxWidth: '80px'}}
                          value={review.rating}
                          readOnly
                      ></Rating>
                        <span className="text-sm font-bold">{review.rating}</span>
                      </div>


  
                      <h4 className="text-sm font-bold ">{review.userName}</h4>
                      <p className="text-xs text-gray-500 capitalize">{review.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots & Arrows */}
        <div className="flex z-50 -mt-4 items-center justify-center gap-4">
          <button
            onClick={prev}
            className="text-lg cursor-pointer bg-primary rounded-full p-2 shadow hover:bg-black hover:text-primary"
          >
            <FaArrowLeft />
          </button>

          <div className="flex items-center gap-1">
            {reviews.map((_, idx) => (
              <span
                key={idx}
                className={classNames(
                  'w-2 h-2 rounded-full transition-colors duration-300',
                  idx === activeIndex ? 'bg-primary' : 'bg-gray-300'
                )}
              ></span>
            ))}
          </div>

          <button
            onClick={next}
            className="text-lg bg-primary rounded-full p-2 shadow hover:bg-black hover:text-primary"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}