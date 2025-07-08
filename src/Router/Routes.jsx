import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([

    // Main Routes
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
            }
        ]
    },

]);

export default router;