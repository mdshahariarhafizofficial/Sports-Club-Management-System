import { useQuery } from "@tanstack/react-query";
import { FaArrowRight, FaStar } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../Pages/Loading/Loader";
import { Link } from "react-router";
import { Fade } from "react-awesome-reveal";

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
    <section>
      <div className="max-w-[1500px] mx-auto bg-white py-24 px-6 lg:px-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl md:text-5xl font-extrabold text-black uppercase tracking-wide">
            Popular Courts
          </h2>
          <Link to='/courts'>
            <button className="btn bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
              All Courts
              <FaArrowRight></FaArrowRight>
            </button>
          </Link>
        </div>
        <div className="divider"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courts.map((court, index) => (
            <Fade key={index} direction="up" triggerOnce cascade damping={0.1}>
              <div
                key={court._id}
                className="bg-black rounded-2xl shadow hover:shadow-lg transition"
              >
                <img
                  src={court.image}
                  alt={court.title}
                  className="h-56 w-full object-cover rounded-t-2xl"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {court.title}
                  </h3>
                  <p className="text-primary text-lg mb-2">{court.location}</p>
                  <div className="flex items-center gap-2 text-yellow-500 font-medium">
                    <FaStar className="text-lg" />
                    <span>{court.averageRating?.toFixed(1)}</span>
                    <span className="text-gray-300 text-sm">
                      ({court.totalRatings})
                    </span>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourts;
