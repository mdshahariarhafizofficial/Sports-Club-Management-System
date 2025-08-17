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

export default function OverviewPage() {
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
    { name: "Paid", value: 400 },
    { name: "Pending", value: 200 },
    { name: "Cancelled", value: 100 },
  ];

  const COLORS = ["#ffe733", "#000000", "#8884d8"];

  // ✅ Local Card component (Tailwind only)
  const Card = ({ children }) => (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200">
      {children}
    </div>
  );

  const CardContent = ({ children, className }) => (
    <div className={`p-6 ${className}`}>{children}</div>
  );

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
                <CountUp end={1250}></CountUp>
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
                <CountUp end={550}></CountUp>
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
                <CountUp end={12400}></CountUp>
              </h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4">
            <Star className="w-10 h-20 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-500">Ratings</p>
              <h2 className="text-2xl font-bold">4.8/5</h2>
            </div>
          </CardContent>
        </Card>
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
