import { Users, Calendar, CreditCard, Star } from "lucide-react";
import CountUp from "react-countup";
import { MdContentPasteSearch } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import useUserRole from "../../../Hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loading/Loader";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";
import { PiCourtBasketballBold } from "react-icons/pi";


export default function OverviewPage() {
  const {role, roleLoading} = useUserRole();
  const axios = useAxios(); 
  const {user} = useAuth();

  // Total users count
  const { data: totalUsersCount, isLoading: usersCountLoading } = useQuery({
    queryKey: ["totalUsersCount"],
    queryFn: async () => {
      const { data } = await axios.get("/api/users/count");
      return data.totalUsers;
    },
  });

// Total Pending Bookings count
const { data: pendingCounts, isLoading: pendingCountLoading } = useQuery({
  queryKey: ["totalPendingCount", role, user.email],
  queryFn: async () => {
    const params = { role };
    if (role !== "admin") params.email = user.email;

    const { data } = await axios.get("/api/bookings/pending/total", { params });
    return data.totalPending;
  },
});

// Total Approved Bookings count
const { data: approvedCounts, isLoading: approvedCountLoading } = useQuery({
  queryKey: ["totalApprovedCount", role, user.email],
  queryFn: async () => {
    const params = { role };
    if (role !== "admin") params.email = user.email;

    const { data } = await axios.get("/api/bookings/approved/total", { params });
    return data.totalApproved;
  },
});


// Total Confirmed Bookings count
const { data: confirmedCounts, isLoading: confirmedCountLoading } = useQuery({
  queryKey: ["totalConfirmedCount", role, user.email],
  queryFn: async () => {
    const params = { role };
    if (role !== "admin") params.email = user.email;

    const { data } = await axios.get("/api/bookings/confirmed/total", { params });
    return data.totalConfirmed;
  },
});


// Total Payment Length
const { data: paymentsCount, isLoading: paymentsCountLoading } = useQuery({
  queryKey: ["totalPaymentsCount", role, user.email],
  queryFn: async () => {
    const params = { role };
    if (role !== "admin") params.email = user.email;

    const { data } = await axios.get("/api/payments/total", { params });
    return data.totalPayments;
  },
});



// Total Payment Length
const { data: paymentsLength, isLoading: paymentsLengthLoading } = useQuery({
  queryKey: ["totalPaymentsLength", role, user.email],
  queryFn: async () => {
    const params = { role };
    if (role !== "admin") params.email = user.email;

    const { data } = await axios.get("/api/payments/length", { params });
    return data.totalPaymentsLength;
  },
});

  console.log("payment = ", paymentsCount);
  

  // Total Courts count
  const { data: courtsCount, isLoading: courtsCountLoading } = useQuery({
    queryKey: ["totalCourtsCount"],
    queryFn: async () => {
      const { data } = await axios.get("/courtsCount");
      return data.totalCourtsCount;
    },
  });

  // Total Booking For Admin
  const { data: bookingsCount, isLoading } = useQuery({
    queryKey: ["totalBookingCount"],
    queryFn: async () => {
      const { data } = await axios.get("/api/bookings/count");
      return data.totalBookings;
    },
  });

  // Total Booking For user/member
  const { data: userBookingsCount, isLoading: loadingUserBookingCount } = useQuery({
    queryKey: ["userBookingCount"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/bookings/count/${user?.email}`);
      return data.totalBookings;
    },
  });

  const myBookingCount = bookingsCount;
  console.log("Admin =  ",myBookingCount);
  console.log("user =  ",userBookingsCount);
  

  // Dummy data (replace with API later)
  const bookingData = [
    { month: "Jan", bookings: 30 },
    { month: "Feb", bookings: 45 },
    { month: "Mar", bookings: 60 },
    { month: "Apr", bookings: 40 },
    { month: "May", bookings: 70 },
    { month: "Jun", bookings: 55 },
  ];

  const pieData = [
    { name: "Paid", value: paymentsLength },
    { name: "Pending", value: pendingCounts },
    { name: "Approved", value: approvedCounts },
    { name: "Confirmed", value: confirmedCounts },
  ];

  const COLORS = ["#ffe733", "#000000", "green", "red"];

  // ✅ Local Card component (Tailwind only)
  const Card = ({ children }) => (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200">
      {children}
    </div>
  );

  const CardContent = ({ children, className }) => (
    <div className={`p-6 ${className}`}>{children}</div>
  );

  if (isLoading || loadingUserBookingCount || usersCountLoading || courtsCountLoading || paymentsCountLoading || pendingCountLoading || approvedCountLoading || confirmedCountLoading || paymentsLengthLoading) {
    return <Loader></Loader>
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl flex items-center gap-2 font-extrabold">
        <MdContentPasteSearch size={30}></MdContentPasteSearch>
        Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center gap-4">
            <Users className="w-10 h-20 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h2 className="text-2xl font-bold">
                <CountUp end={totalUsersCount || 0}></CountUp>
            </h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4">
            <Calendar className="w-10 h-20 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <h2 className="text-2xl font-bold">
                <CountUp end={`${!roleLoading && role === 'admin' ? bookingsCount : userBookingsCount}` || 0}></CountUp>
              </h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4">
            <CreditCard className="w-10 h-20 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-500">Total Payments</p>
              <h2 className="text-2xl font-bold">
                $ 
                <CountUp end={paymentsCount}></CountUp>
              </h2>
            </div>
          </CardContent>
        </Card>

        {
          !roleLoading && role === 'admin' ?
        <Card>
          <CardContent className="flex items-center gap-4">
            <PiCourtBasketballBold className="w-10 h-20 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-500">Total Courts</p>
              <h2 className="text-2xl font-bold">
                <CountUp end={courtsCount}></CountUp>                
              </h2>
            </div>
          </CardContent>
        </Card>        
        :
        <Card>
          <CardContent className="flex items-center gap-4">
            <Star className="w-10 h-20 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-500">Ratings</p>
              <h2 className="text-2xl font-bold">4.8/5</h2>
            </div>
          </CardContent>
        </Card>
        }

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Monthly Bookings</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="bookings"
                  fill="#ffe733"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Booking Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
