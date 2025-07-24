import React from "react";
import historyImg from '../../assets/History.jpg';
import missionImg from '../../assets/mission.jpg';
import { Slide } from "react-awesome-reveal";
const AboutClub = () => {
  return (
    <section id="about" className="w-full px-4 md:px-8 py-24 bg-white text-black">
      <div className="max-w-[1500px] mx-auto space-y-14">
        {/* Section Heading */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black uppercase tracking-wide">
            About Our Club
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
            Get to know our journey, purpose, and the values that drive us every single day.
          </p>
        </div>

        {/* History Section */}
        <Slide direction="left" duration={2500}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-black rounded-xl p-8 shadow-xl">
            <div>
                <h3 className="text-2xl font-semibold mb-2 text-white">
                Our <span className="text-[#ffe733]">History</span>
                </h3>
                <div className="w-16 h-1 bg-[#ffe733] mb-4 rounded"></div>
                <p className="text-gray-200 leading-relaxed text-justify">
                Established in <span className="font-semibold text-[#ffe733]">2010</span>, our sports club started as a small community initiative 
                to promote health and wellness through physical activity. Over the years, we have grown into a vibrant hub 
                for athletes, fitness enthusiasts, and families alike. From local tournaments to professional training, 
                our journey reflects a relentless commitment to excellence and community building.
                </p>
            </div>
            <div className="bg-[#ffe733] h-[250px] w-full rounded-xl shadow-inner shadow-yellow-300">
                <img
                src={historyImg}
                alt="Our Mission"
                className="rounded-xl w-full h-full object-cover shadow-lg"
                />
            </div>
            </div>
        </Slide>

        {/* Mission Section */}
        <Slide direction="right" duration={2500}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-black rounded-xl p-8 shadow-xl">
            <div className="md:order-2">
                <h3 className="text-2xl font-semibold mb-2 text-white">
                Our <span className="text-[#ffe733]">Mission</span>
                </h3>
                <div className="w-16 h-1 bg-[#ffe733] mb-4 rounded"></div>
                <p className="text-gray-200 leading-relaxed text-justify">
                Our mission is to create a safe, inclusive, and energizing space where everyone — regardless of age or skill level — 
                can enjoy the benefits of sports and physical activities. We believe in fostering <span className="font-medium text-[#ffe733]">team spirit</span>, 
                promoting <span className="font-medium text-[#ffe733]">healthy lifestyles</span>, and empowering individuals through sport to reach their full potential.
                </p>
            </div>
            <div className="bg-[#ffe733] h-[250px] w-full rounded-xl shadow-inner shadow-yellow-300">
                <img
                src={missionImg}
                alt="Our Mission"
                className="rounded-xl w-full h-full object-cover shadow-lg"
                />
            </div>
            </div>
        </Slide>
      </div>
    </section>
  );
};

export default AboutClub;
