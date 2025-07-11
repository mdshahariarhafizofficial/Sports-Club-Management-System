import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import Loader from "../Pages/Loading/Loader";
import Login from "../Pages/Login/Login";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout";

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
    }

]);

export default router;