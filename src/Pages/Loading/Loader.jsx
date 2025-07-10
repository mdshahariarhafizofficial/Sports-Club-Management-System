import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral space-y-6">
      <div className="relative w-16 h-16">
        {/* Spinning Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-primary animate-spin"></div>
        {/* Inner Pulse */}
        <div className="absolute inset-3 rounded-full bg-primary/80 animate-pulse"></div>
      </div>
      <p className="text-primary font-medium tracking-wider text-lg animate-pulse">Loading<span className="dot-flash">...</span></p>

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