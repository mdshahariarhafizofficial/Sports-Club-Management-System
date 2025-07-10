import { useContext } from 'react';
import { NavLink } from 'react-router';
import logo from '../../assets/Logo.png';
import AuthContext from '../../Context/AuthContext';

const Footer = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-neutral text-white">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-0 py-16 grid grid-cols-1 md:grid-cols-4 lg:gap-25 gap-10">
        {/* Brand Description & Social Media */}
        <aside className="space-y-5">
          <img src={logo} className="w-36" alt="Sportiva Logo" />
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
          <ul className="space-y-3">
            <li>
              <NavLink to="/" className="hover:text-primary transition">Home</NavLink>
            </li>
            <li>
              <NavLink to="/fridge" className="hover:text-primary transition">Fridge</NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/add-food" className="hover:text-primary transition">Add Food</NavLink>
                </li>
                <li>
                  <NavLink to="/my-items" className="hover:text-primary transition">My Items</NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/about" className="hover:text-primary transition">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/faq" className="hover:text-primary transition">FAQ</NavLink>
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
