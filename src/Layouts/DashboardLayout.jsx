import React from "react";
import { NavLink, Outlet } from "react-router";
import logo from '../assets/logo.png';
import {
  MdPendingActions,
  MdOutlinePayment,
  MdCampaign,
  MdOutlineAssignmentTurnedIn
} from "react-icons/md";
import {
  HiOutlineUserCircle,
  HiOutlineUserGroup
} from "react-icons/hi2";
import {
  FaClipboardCheck,
  FaUserShield,
  FaUsers,
  FaTicketAlt,
  FaStar
} from "react-icons/fa";
import { GiTennisCourt } from "react-icons/gi";
import {
  BsFillCalendarCheckFill,
  BsCheck2Circle
} from "react-icons/bs";
import { BiNews } from "react-icons/bi";
import useUserRole from "../Hooks/useUserRole";



const DashboardLayout = () => {
  const {role, roleLoading} = useUserRole();
  console.log(role);
  
  return (
    <div>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-white flex flex-col">

        {/* Navbar */}
        <div className="navbar bg-black w-full  lg:hidden">
        <div className="flex-none">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current text-primary"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
                ></path>
            </svg>
            </label>
        </div>
        <div className="mx-2 flex-1 px-2 text-primary font-bold">Dashboard</div>
        </div>

           {/* Page content here  */}
           <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu gap-4 bg-black text-base-content min-h-full w-80 p-4">
            <a href="/">
              <img src={logo} className="w-40 mb-5" alt="" />
            </a>            
            {/* Sidebar content here */}
<>

   {/* ------------- User Routes --------------  */}
   {
    !roleLoading && role === 'user' &&
    <>
  <li className="mr-4">
    <NavLink
      to="/dashboard"
      end
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <HiOutlineUserCircle className="inline-block mr-2 text-lg" />
      My Profile
    </NavLink>
  </li>

  <li className="mr-4">
    <NavLink
      to="/dashboard/pending-bookings"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <MdPendingActions className="inline-block mr-2 text-lg" />
      Pending Bookings
    </NavLink>
  </li>

{/* Announcements */}
  <li className="mr-4">
    <NavLink
      to="/dashboard/announcements"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <BiNews className="inline-block mr-2 text-xl" />
      Announcements
    </NavLink>
  </li>     
    </>
   }


{/*  --------------- Member Route --------------- */}

  {
  !roleLoading && role === 'member' &&
    <>
  <li className="mr-4">
    <NavLink
      to="/dashboard"
      end
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <HiOutlineUserCircle className="inline-block mr-2 text-lg" />
      My Profile
    </NavLink>
  </li>

  <li className="mr-4">
    <NavLink
      to="/dashboard/pending-bookings"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <MdPendingActions className="inline-block mr-2 text-lg" />
      Pending Bookings
    </NavLink>
  </li>

  <li className="mr-4">
    <NavLink
      to="/dashboard/approved-bookings"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <BsCheck2Circle className="inline-block mr-2 text-lg" />
      Approved Bookings
    </NavLink>
  </li>

  <li className="mr-4">
    <NavLink
      to="/dashboard/confirmed-bookings"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <FaClipboardCheck className="inline-block mr-2 text-lg" />
      Confirmed Bookings
    </NavLink>
  </li>

  <li className="mr-4">
    <NavLink
      to="/dashboard/payment-history"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <MdOutlinePayment className="inline-block mr-2 text-lg" />
      Payment History
    </NavLink>
  </li>  

  <li className="mr-4">
    <NavLink
      to="/dashboard/my-ratings"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <FaStar className="inline-block mr-2 text-lg" />
      My Ratings
    </NavLink>
  </li>  

  {/* Announcements */}
  <li className="mr-4">
    <NavLink
      to="/dashboard/announcements"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <BiNews className="inline-block mr-2 text-xl" />
      Announcements
    </NavLink>
  </li>     

    </>
  }


{/* ----------------- ADMIN Route --------------- */}
  {
    !roleLoading && role === 'admin' &&
    <>
  <li className="mr-4">
    <NavLink
      to="/dashboard"
      end
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <FaUserShield className="inline-block mr-2 text-lg" />
      Admin Profile
    </NavLink>
  </li>

  <li className="mr-4">
    <NavLink
      to="/dashboard/manage-bookings-approval"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <MdOutlineAssignmentTurnedIn className="inline-block mr-2 text-xl" />
      Manage Bookings Approval
    </NavLink>
  </li>

  <li className="mr-4">
    <NavLink
      to="/dashboard/manage-members"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <HiOutlineUserGroup className="inline-block mr-2 text-xl" />
      Manage Members
    </NavLink>
  </li>

  <li className="mr-4">
    <NavLink
      to="/dashboard/all-users"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <FaUsers className="inline-block mr-2 text-xl" />
      All Users
    </NavLink>
  </li>

  <li className="mr-4">
    <NavLink
      to="/dashboard/manage-courts"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <GiTennisCourt className="inline-block mr-2 text-xl" />
      Manage Courts
    </NavLink>
  </li>

  <li className="mr-4">
    <NavLink
      to="/dashboard/manage-bookings"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <BsFillCalendarCheckFill className="inline-block mr-2 text-xl" />
      Manage Bookings
    </NavLink>
  </li>
    <li className="mr-4">
    <NavLink
      to="/dashboard/manage-ratings"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <FaStar className="inline-block mr-2 text-lg" />
      Manage Ratings
    </NavLink>
  </li>  

  <li className="mr-4">
    <NavLink
      to="/dashboard/manage-coupons"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <FaTicketAlt className="inline-block mr-2 text-xl" />
      Manage Coupons
    </NavLink>
  </li>

  <li className="mr-4">
    <NavLink
      to="/dashboard/make-announcement"
      className={({ isActive }) =>
        isActive ? "font-bold bg-primary" : "text-secondary font-medium"
      }
    >
      <MdCampaign className="inline-block mr-2 text-xl" />
      Make Announcement
    </NavLink>
  </li> 
    </>
  }

{/* --------------------------------- */}

</>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;