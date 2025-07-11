import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import PendingBookings from "../Pages/Dashboard/PendingBookings/PendingBookings";

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
        ]
    },
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
    // {
    //   path: 'approved-bookings',
    //   Component: ApprovedBookings,
    // },
    // {
    //   path: 'confirmed-bookings',
    //   Component: ConfirmedBookings,
    // },
    // {
    //   path: 'payment-history',
    //   Component: PaymentHistory,
    // },
    // {
    //   path: 'admin-profile',
    //   Component: AdminProfile,
    // },
    // {
    //   path: 'manage-bookings-approval',
    //   Component: ManageBookingsApproval,
    // },
    // {
    //   path: 'manage-members',
    //   Component: ManageMembers,
    // },
    // {
    //   path: 'all-users',
    //   Component: AllUsers,
    // },
    // {
    //   path: 'manage-courts',
    //   Component: ManageCourts,
    // },
    // {
    //   path: 'manage-bookings',
    //   Component: ManageBookings,
    // },
    // {
    //   path: 'manage-coupons',
    //   Component: ManageCoupons,
    // },
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