import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
// import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
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
import ManageMembers from "../Pages/Dashboard/ManageMembers/ManageMembers";
import ManageCourts from "../Pages/Dashboard/ManageCourts/ManageCourts";
import MakeAnnouncement from "../Pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import AnnouncementsPage from "../Pages/Dashboard/AnnouncementsPage/AnnouncementsPage";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import ForbiddenPage from "../Pages/ForbiddenPage/ForbiddenPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AdminRoutes from "../Routes/AdminRoutes";
import PrivateRoutes from "../Routes/PrivateRoutes";
import MemberRoutes from "../Routes/MemberRoutes";
import MyRatings from "../Pages/Dashboard/MyRatings/MyRatings";
import ManageRatings from "../Pages/Dashboard/ManageRatings/ManageRatings";
import Loader from "../Pages/Loading/Loader";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Support from "../Pages/Support/Support";
import FAQPage from "../Pages/FAQPage/FAQPage";
import TermsOfUse from "../Pages/TermsOfUse/TermsOfUse";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import CookiePolicy from "../Pages/CookiePolicy/CookiePolicy";
import { lazy } from "react";
import OverviewPage from "../Pages/Dashboard/OverviewPage/OverviewPage";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";

const Home =lazy( () => import('../Pages/Home/Home') ); 

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
              loader: () => fetch('https://sports-club-management-system-serve-swart.vercel.app/courtsCount'),
              hydrateFallbackElement: <Loader></Loader>,
            },
            {
              path: 'contact-us',
              Component: ContactUs,
            },
            {
              path: 'support',
              Component: Support,
            },{
              path: 'faq',
              Component: FAQPage
            },
            {
              path: 'terms-Of-use',
              Component: TermsOfUse,
            },
            {
              path: 'privacy-policy',
              Component: PrivacyPolicy
            },
            {
              path: 'cookie-policy',
              Component: CookiePolicy,
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
      element: <PrivateRoutes><OverviewPage></OverviewPage></PrivateRoutes>
    },
    {
      path: 'my-profile',
      element: <PrivateRoutes><MyProfile></MyProfile></PrivateRoutes>
    },
    {
      path: 'pending-bookings',
      element: <PrivateRoutes><PendingBookings></PendingBookings></PrivateRoutes>
    },
    {
      path: 'approved-bookings',
      element: <MemberRoutes><ApprovedBookings></ApprovedBookings></MemberRoutes>
    },
    {
      path: 'confirmed-bookings',
      element: <MemberRoutes><ConfirmedBookings></ConfirmedBookings></MemberRoutes>
    },
    {
      path: 'payment-history',
      element: <MemberRoutes><PaymentHistory></PaymentHistory></MemberRoutes>
    },
    {
      path: 'my-ratings',
      element: <MemberRoutes><MyRatings></MyRatings></MemberRoutes>
    },
    {
      path: 'payment/:id',
      element: <MemberRoutes><Payment></Payment></MemberRoutes>
    },
    // {
    //   path: 'admin-profile',
    //   Component: AdminProfile,
    // },
    {
      path: 'manage-bookings-approval',
      element: <AdminRoutes><ManageBookingsApproval></ManageBookingsApproval></AdminRoutes>      
    },
    {
      path: 'manage-members',
      element: <AdminRoutes><ManageMembers></ManageMembers></AdminRoutes>      
    },
    {
      path: 'all-users',
      element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>      
    },
    {
      path: 'manage-courts',
      element: <AdminRoutes><ManageCourts></ManageCourts></AdminRoutes>
    },
    {
      path: 'manage-bookings',
      element: <AdminRoutes><ManageBookings></ManageBookings></AdminRoutes>
    },
    {
      path: 'manage-coupons',
      element: <AdminRoutes><ManageCoupons></ManageCoupons></AdminRoutes>
    },
    {
      path: 'make-announcement',
      element: <AdminRoutes><MakeAnnouncement></MakeAnnouncement></AdminRoutes>
    },
    {
      path: 'announcements',
      element: <PrivateRoutes><AnnouncementsPage></AnnouncementsPage></PrivateRoutes>
    },
    {
      path: 'manage-ratings',
      element: <AdminRoutes><ManageRatings></ManageRatings></AdminRoutes>
    },
  ],
},
{
  path: '/forbidden',
  element: <ForbiddenPage></ForbiddenPage>
},
{
  path: '/*',
  Component: ErrorPage,
}


]);

export default router;