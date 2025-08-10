// Import React library
import React from "react";
// Import Material Design icons
import { MdEmail } from "react-icons/md"; // Email icon
import { MdOutlineSmartphone } from "react-icons/md"; // Phone icon
import { MdKeyboardArrowDown } from "react-icons/md"; // Dropdown arrow icon
// Import Font Awesome icons
import { FaFacebookF } from "react-icons/fa"; // Facebook icon
import { FaTwitter } from "react-icons/fa"; // Twitter icon
import { FaLinkedinIn } from "react-icons/fa"; // LinkedIn icon
import { FaGithub } from "react-icons/fa6"; // GitHub icon
import { FaUserAlt } from "react-icons/fa"; // User icon
import { FaLock } from "react-icons/fa"; // Lock icon
// Import Link component from React Router for navigation
import { Link } from "react-router-dom";

/**
 * Header Component - Website top navigation bar
 * Contains contact information, social media links, language selector and user login status
 */
const Header = () => {
  // Mock user login status (should be retrieved from state manager or API in actual project)
  const user = true;

  return (
    // Main header container with full width and white background
    <div className="w-full bg-white">
      {/* Top bar - hidden on mobile, visible on medium+ screens */}
      <div className="bg-[#caddff] hidden md:block">
        {/* Container with responsive width */}
        <div className="w-[90%] lg:w-[95%] mx-auto">
          {/* Main content row with flex layout */}
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
            {/* Left section: Contact information */}
            <ul className="flex justify-start items-center gap-8 font-semibold text-black ">
              {/* Email contact item with separator line */}
              <li className="flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                <span>
                  <MdEmail />
                </span>
                <span>support@gmail.com</span>
              </li>
              {/* Phone contact item */}
              <li className="flex relative justify-center items-center gap-2 text-sm ">
                <span>
                  <MdOutlineSmartphone />
                </span>
                <span>+(61) 0499 567 480</span>
              </li>
            </ul>

            {/* Right section: Social media, language selector, and user section */}
            <div className="flex justify-center items-center gap-10">
              {/* Social media links */}
              <div className="flex justify-center items-center gap-4 text-black">
                <a href="#">
                  <FaFacebookF />
                </a>
                <a href="#">
                  <FaTwitter />
                </a>
                <a href="#">
                  <FaLinkedinIn />
                </a>
                <a href="#">
                  <FaGithub />
                </a>
              </div>

              {/* Language selector with dropdown */}
              <div className="flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:w-[1px] before:bg-[#afafaf] before:-left-[20px]">
                <img src="/images/language.png" />
                <span>
                  <MdKeyboardArrowDown />
                </span>

                {/* Dropdown menu for language options */}
                <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10">
                  <li>English</li>
                  <li>Japanese</li>
                </ul>
              </div>

              {/* Conditional rendering based on user login status */}
              {user ? (
                /* Logged in user display */
                <Link
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black "
                  to="/dashboard"
                >
                  <span>
                    <FaUserAlt />
                  </span>
                  <span>George Li</span>
                </Link>
              ) : (
                /* Login link for non-logged in users */
                <Link
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black "
                  to="/dashboard"
                >
                  <span>
                    <FaLock />
                  </span>
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
