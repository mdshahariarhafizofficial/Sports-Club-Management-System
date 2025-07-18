import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const NotFoundPage = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('https://assets6.lottiefiles.com/packages/lf20_j1adxtyb.json') // 404 animation JSON URL
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(() => {
        // fallback or error handling if needed
        setAnimationData(null);
      });
  }, []);

  if (!animationData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4 bg-gray-50">
      <div className="w-full max-w-lg">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <h1 className="mt-6 text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-600 max-w-md text-center">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <a
        href="/"
        className="mt-6 inline-block px-6 py-3 bg-yellow-400 text-black font-semibold rounded shadow hover:bg-yellow-300 transition"
      >
        Go to Home
      </a>
    </div>
  );
};

export default NotFoundPage;
