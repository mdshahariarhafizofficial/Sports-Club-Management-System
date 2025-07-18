import { Link } from 'react-router';
import { FaLock, FaHome } from 'react-icons/fa';

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#ffe733] p-6 rounded-full shadow-lg">
            <FaLock size={50} className="text-black" />
          </div>
        </div>

        {/* Headings */}
        <h1 className="text-6xl font-extrabold text-black mb-2">403</h1>
        <h2 className="text-2xl font-bold text-red-500 mb-4 uppercase tracking-wider">
          Access Forbidden
        </h2>
        <p className="text-gray-600 font-medium mb-6 leading-relaxed">
          Sorry, you don’t have permission to view this page. <br />
          Please contact an administrator or return to the homepage.
        </p>

        {/* Go Home Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#ffe733] hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded shadow transition-all duration-200"
        >
          <FaHome /> Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
