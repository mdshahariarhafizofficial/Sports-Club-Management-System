import React from "react";
import logo from "../../assets/Logo.png"; // update with your logo path

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md space-y-6">
      <img src={logo} alt="Sportiva Logo" className="h-16 animate-bounce" />
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-primary animate-spin"></div>
        <div className="absolute inset-3 rounded-full bg-primary/80 animate-pulse"></div>
      </div>
      <p className="text-primary font-semibold tracking-wider text-lg animate-pulse">
        Loading<span className="dot-flash">...</span>
      </p>

      <style>{`
        .dot-flash::after {
          content: '...';
          animation: dots 1.2s steps(3, end) infinite;
        }

        @keyframes dots {
          0%, 20% { content: ''; }
          40% { content: '.'; }
          60% { content: '..'; }
          80%, 100% { content: '...'; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
