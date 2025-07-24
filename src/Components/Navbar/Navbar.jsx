import React from "react";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { TiThMenu, TiThMenuOutline } from "react-icons/ti";
import { Link, NavLink } from "react-router";
import logo from "../../assets/Logo.png";
import { TbLogout } from "react-icons/tb";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const {handleSingOut, user} = useAuth();
  const menu = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary border-b-2 rounded-none font-bold"
              : "font-medium text-white hover:text-primary"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/courts"
          className={({ isActive }) =>
            isActive
              ? "text-primary border-b-2 rounded-none font-bold"
              : "font-medium text-white hover:text-primary"
          }
        >
          Courts
        </NavLink>
      </li>
      {
        !user &&
        <Link to="login" className="lg:hidden">
            <button className="w-full btn btn-primary text-black text-base font-normal py-4 tracking-wider hover:bg-secondary hover:text-black">
              <FaUserCircle size={20}></FaUserCircle>
              Login
            </button>
          </Link>
      }
      <li>
        <NavLink
          to="/faq"
          className={({ isActive }) =>
            isActive
              ? "text-primary border-b-2 rounded-none font-bold"
              : "font-medium text-white hover:text-primary"
          }
        >
           FAQ
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            isActive
              ? "text-primary border-b-2 rounded-none font-bold"
              : "font-medium text-white hover:text-primary"
          }
        >
           Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/support"
          className={({ isActive }) =>
            isActive
              ? "text-primary border-b-2 rounded-none font-bold"
              : "font-medium text-white hover:text-primary"
          }
        >
           Support
        </NavLink>
      </li>

    </>
  );

  return (
    <nav className="md:max-w-[1500px] mx-auto navbar lg:px-0 py-4">
      <div className="navbar-start">
        <a href="/">
          <img className="w-40" src={logo} alt="logo" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-5">{menu}</ul>
      </div>
      <div className="navbar-end gap-1">
        <Tooltip id='my-tooltip'></Tooltip>
        {user ? (
          <div className="flex items-center gap-4">
            <h2 className="hidden md:block text-gray-300">{user?.email}</h2>
            {/* Profile Dropdown with Dashboard Link */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={`${user && user.displayName}`}
                data-tooltip-place="bottom"
                role="button"
                className="avatar"
              >
                <div className="ring-primary ring-offset-black w-12 rounded-full ring-2 ring-offset-2">
                  <img
                    className="cursor-pointer"
                    src={user?.photoURL ? user?.photoURL : "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"}
                    referrerPolicy="no-referrer"
                    alt="user"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 space-y-3"
              >
                <div className="cursor-default">
                  <span className="font-semibold text-black flex items-center gap-1">
                    <FaRegUserCircle className="text-primary" size={30} /> {user? user?.displayName : 'user name'}
                  </span>
                </div>
                <li>
                  <Link to="/dashboard">
                    <MdOutlineDashboard size={20} /> Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => handleSingOut()}
                    className="btn btn-sm bg-primary text-black py-3 mt-1"
                  >
                    <MdLogout size={22}></MdLogout>
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link to="login" className="hidden md:flex">
            <button className="btn btn-primary text-black text-base font-normal py-6 px-6 tracking-wider hover:bg-secondary hover:text-black">
              <FaUserCircle size={30}></FaUserCircle>
              Login
            </button>
          </Link>
        )}

        {/* Drawer */}
        <div className="w-15 drawer lg:hidden flex">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className=" drawer-button bg-black btn border-0 shadow-none"
            >
              <TiThMenu className="text-primary" size={30} />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-black text-base-content min-h-full w-80 p-4 space-y-4">
              {/* Sidebar content here */}
              {menu}
                <li className={`${!user && 'hidden'}`}>
                  <button
                    onClick={() => handleSingOut()}
                    className="btn btn-sm bg-primary text text-black py-5 mt-1"
                  >
                    <MdLogout size={22}></MdLogout>
                    Log Out
                  </button>
                </li>              
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
