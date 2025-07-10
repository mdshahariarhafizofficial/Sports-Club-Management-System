import React from 'react';
// import { FcGoogle } from 'react-icons/fc';
import { Link, Outlet } from 'react-router';
import loginAnimation from '../assets/login.json';
import logo from '../assets/Logo.png'
import Lottie from "lottie-react";
const AuthLayout = () => {
    return (
    <div className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white py-20 md:py-0">

      {/* Left Image */}
      <div className="hidden md:flex items-center justify-center bg-black">
        {/* <img
          src={loginAnimation} // 🔁 Replace with your actual image path
          alt="Delivery Illustration"
          className=""
        /> */}
        <Lottie 
        style={{width: '600px'}}
        animationData={loginAnimation} 
        loop={true} />
      </div>

      {/* Left: Login Form */}
      <div className="flex flex-col justify-center lg:px-20">
        <Outlet></Outlet>
      </div>
        {/* Logo */}
        <div className="absolute top-10 left-6 md:left-10 mb-10">
          <Link to=''>
            <img className='w-60' src={logo} alt="" />
          </Link>
        </div>
</div>
    );
};

export default AuthLayout;