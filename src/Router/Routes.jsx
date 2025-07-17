import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import PendingBookings from "../Pages/Dashboard/PendingBookings/PendingBookings";
import CourtsPage from "../Pages/CourtsPage/CourtsPage";
import ManageBookingsApproval from "../Pages/Dashboard/ManageBookingsApproval/ManageBookingsApproval";
import ApprovedBookings from "../Pages/Dashboard/ApprovedBookings/ApprovedBookings";
import Payment from "../Pages/Dashboard/Payment/Payment";
import ManageCoupons from "../Pages/Dashboard/ManageCoupons/ManageCoupons";
import ConfirmedBookings from "../Pages/Dashboard/ConfirmedBookings/ConfirmedBookings";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ManageBookings from "../Pages/Dashboard/ManageBookings/ManageBookings";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";

const router = createBrowserRouter([

    // Main Routes
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
              path: 'courts',
              Component: CourtsPage,
            }
        ]
    },
    // Auth Routes
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register,
            }
        ]
    },
    // Dashboard Routes
{
  path: 'dashboard',
  Component: DashboardLayout,
  children: [
    {
      index: true,
      Component: MyProfile, // /dashboard
    },
    {
      path: 'pending-bookings',
      Component: PendingBookings,
    },
    {
      path: 'approved-bookings',
      Component: ApprovedBookings,
    },
    {
      path: 'confirmed-bookings',
      Component: ConfirmedBookings,
    },
    {
      path: 'payment-history',
      Component: PaymentHistory,
    },
    {
      path: 'payment/:id',
      Component: Payment,
    },
    {
      path: 'admin-profile',
      Component: AdminProfile,
    },
    {
      path: 'manage-bookings-approval',
      Component: ManageBookingsApproval,
    },
    // {
    //   path: 'manage-members',
    //   Component: ManageMembers,
    // },
    {
      path: 'all-users',
      Component: AllUsers,
    },
    // {
    //   path: 'manage-courts',
    //   Component: ManageCourts,
    // },
    {
      path: 'manage-bookings',
      Component: ManageBookings,
    },
    {
      path: 'manage-coupons',
      Component: ManageCoupons,
    },
    // {
    //   path: 'make-announcement',
    //   Component: MakeAnnouncement,
    // },
    // {
    //   path: 'announcements',
    //   Component: Announcements,
    // },
  ],
}


]);

export default router;