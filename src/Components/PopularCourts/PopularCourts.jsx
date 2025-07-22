import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../Pages/Loading/Loader";

const PopularCourts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: courts = [], isLoading } = useQuery({
    queryKey: ["popularCourts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popular-courts");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="bg-white py-10 px-4 md:px-10 lg:px-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Popular Courts
        </h2>
        <button className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
          All Courts
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courts.map((court) => (
          <div
            key={court._id}
            className="bg-gray-100 rounded-2xl shadow hover:shadow-lg transition"
          >
            <img
              src={court.image}
              alt={court.title}
              className="h-48 w-full object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {court.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{court.location}</p>
              <div className="flex items-center gap-2 text-yellow-500 font-medium">
                <FaStar className="text-lg" />
                <span>{court.averageRating?.toFixed(1)}</span>
                <span className="text-gray-500 text-sm">
                  ({court.totalRatings})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCourts;
