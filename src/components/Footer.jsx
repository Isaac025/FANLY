import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1D4996] text-white ">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-15">
          {/* Left Section */}
          <div>
            <h2 className="text-3xl font-bold mb-3">FANLY</h2>
            <p className="text-gray-200 mb-6 text-sm leading-relaxed">
              Connect with your favorite celebrities. Book meet & greets, get
              VIP access, and create unforgettable memories with the stars you
              love.
            </p>

            <h4 className="font-semibold mb-2">Subscribe to stay updated</h4>
            <div className="flex items-center md:hidden bg-white rounded-full overflow-hidden w-full max-w-xs">
              <input
                type="email"
                placeholder="Enter your Email"
                className="grow px-4 py-2 text-gray-700 focus:outline-none"
              />
              <button className="bg-gray-800 p-3 rounded-full hover:bg-gray-900 transition-colors duration-300">
                <FaArrowRight className="text-white" />
              </button>
            </div>

            <div className="flex items-center space-x-4 mt-4 text-xl text-gray-200">
              <FaTwitter className="hover:text-white transition-colors duration-300" />
              <FaFacebookF className="hover:text-white transition-colors duration-300" />
              <FaYoutube className="hover:text-white transition-colors duration-300" />
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li className="hover:text-white">About</li>
              <li className="hover:text-white">News</li>
              <li className="hover:text-white">Home</li>
              <li className="hover:text-white">Contact</li>
              <li className="hover:text-white">Blog</li>
              <li className="hover:text-white">Career</li>
            </ul>
          </div>

          {/* Socials Section */}
          <div>
            <h4 className="font-semibold mb-3">socials</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li className="flex items-center space-x-2 hover:text-white">
                <FaFacebookF /> <span>Facebook</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-white">
                <FaLinkedinIn /> <span>LinkedIn</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-white">
                <FaGithub /> <span>GitHub</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-white">
                <FaInstagram /> <span>Instagram</span>
              </li>
            </ul>
          </div>

          {/* Terms & Policy Section */}
          <div>
            <h4 className="font-semibold mb-3">Terms & policy</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li className="hover:text-white">Terms of use</li>
              <li className="hover:text-white">Privacy policy</li>
              <li className="hover:text-white">Brand guideline</li>
              <li className="hover:text-white">Other policies</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
