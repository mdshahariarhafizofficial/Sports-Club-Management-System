// import { useContext } from 'react';
import { NavLink } from 'react-router';
import logo from '../../assets/Logo.png';
import AuthContext from '../../Context/AuthContext';

const Footer = () => {
  // const { user } = useContext(AuthContext);

  return (
    <div className="bg-neutral text-white">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-0 py-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {/* Brand Description & Social Media */}
        <aside className="space-y-5">
          <img src={logo} className="w-40" alt="Sportiva Logo" />
          <p className="text-sm leading-6 text-gray-300">
            <strong>Sportiva</strong> is a smart sports club management system
            built for modern clubs. Handle registrations, court bookings,
            events, and payments all in one place — Play Smarter, Manage Better.
          </p>
          <div className="mt-6">
            <h3 className="text-primary text-lg font-semibold mb-2">Social Media</h3>
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black py-2 px-3 rounded hover:text-primary transition"
              >
                <i className="fa-brands fa-x-twitter text-xl"></i>
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black py-2 px-3 rounded hover:text-primary transition"
              >
                <i className="fa-brands fa-youtube text-xl"></i>
              </a>
              <a
                href="https://www.facebook.com/mdshahariarhafizofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black py-2 px-3 rounded hover:text-primary transition"
              >
                <i className="fa-brands fa-facebook text-xl"></i>
              </a>
            </div>
          </div>
        </aside>

        {/* Quick Links */}
        <div>
          <h2 className="text-primary text-xl font-semibold mb-4">Quick Links</h2>
          <ul className='space-y-4'>
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
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-primary text-xl font-semibold mb-4">Resources</h2>
          <ul className="space-y-3">
            <li><a href="/dashboard" className="hover:text-primary transition">Dashboard</a></li>
            <li><a href="/blog" className="hover:text-primary transition">Blog</a></li>
            <li><a href="/support" className="hover:text-primary transition">Support</a></li>
            <li><a href="/contact" className="hover:text-primary transition">Contact</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h2 className="text-primary text-xl font-semibold mb-4">Legal</h2>
          <ul className="space-y-3">
            <li><a href="/terms-of-use" className="hover:text-primary transition">Terms of Use</a></li>
            <li><a href="/privacy-policy" className="hover:text-primary transition">Privacy Policy</a></li>
            <li><a href="/cookie-policy" className="hover:text-primary transition">Cookie Policy</a></li>
          </ul>
        </div>

            {/* Contact Info */}
        <div>
          <div>
            <h2 className="text-primary text-xl font-semibold mb-4">Contact</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: <a href="mailto:support@sportiva.com" className="hover:text-primary">support@sportiva.com</a></li>
              <li>Phone: <a href="tel:+880123456789" className="hover:text-primary">+880 123 456 789</a></li>
              <li>Address: Gulshan 1, Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

      </div>
      

      {/* Bottom Footer */}
      <div className="bg-black py-5">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row items-center justify-between px-6 lg:px-0 text-sm text-gray-400">
          <p><span className="text-primary font-bold text-lg">Sportiva</span> — Manage. Play. Excel.</p>
          <p>© 2025 Sportiva. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
