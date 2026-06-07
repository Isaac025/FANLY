import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logohome from "../assets/logohome.png"; // Replace with your actual logo path
import { useAppContext } from "../context/AppContext";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAppContext();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const initials =
    user?.fullName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "U";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className=" w-full bg-white  shadow-sm fixed top-0 left-0 z-50">
      <div className="flex items-center max-md:justify-between lg:gap-100 px-6 py-4 lg:px-12">
        {/* Logo */}
        <img
          src={logohome}
          alt="Logo"
          className="h-15 w-15 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-30 font-medium text-[#3D3D3D] text-[18px]">
          <ul className="lg:flex items-center space-x-4">
            <li
              className="hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              HOME
            </li>
            <li
              className="hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/about")}
            >
              ABOUT
            </li>

            <li
              className="hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              CONTACT
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/book-celebrity")}
              className="cursor-pointer border border-blue-600 text-blue-600 px-4 py-1 rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              Book Now
            </button>

            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  LOGIN
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  REGISTER
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-11 h-11 rounded-full bg-[#1D4996] text-white flex items-center justify-center font-semibold overflow-hidden"
                >
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl w-56 p-3 border">
                    <div className="border-b pb-2 mb-2">
                      <h4 className="font-semibold">{user?.fullName}</h4>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>

                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full text-left py-2 hover:text-blue-600"
                    >
                      My Profile
                    </button>

                    <button
                      onClick={() => navigate("/my-bookings")}
                      className="w-full text-left py-2 hover:text-blue-600"
                    >
                      My Bookings
                    </button>

                    <button
                      onClick={() => navigate("/my-donations")}
                      className="w-full text-left py-2 hover:text-blue-600"
                    >
                      My Donations
                    </button>

                    <button
                      onClick={() => navigate("/my-vip-memberships")}
                      className="w-full text-left py-2 hover:text-blue-600"
                    >
                      My VIP Memberships
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="lg:hidden text-2xl text-gray-700 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Dropdown Menu with animation */}
      <div
        className={`lg:hidden bg-white shadow-md border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-4 py-6 px-6 text-gray-700 font-medium">
          {!isLoggedIn ? (
            <>
              <li
                className="hover:text-blue-600 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                LOGIN
              </li>

              <li
                className="hover:text-blue-600 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                REGISTER
              </li>
            </>
          ) : (
            <>
              <li className="font-semibold text-[#1D4996]">{user?.fullName}</li>

              <li
                className="hover:text-blue-600 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                My Profile
              </li>

              <li
                className="hover:text-blue-600 cursor-pointer"
                onClick={() => navigate("/my-bookings")}
              >
                My Bookings
              </li>

              <li
                onClick={() => navigate("/my-donations")}
                className="w-full text-left py-2 hover:text-blue-600"
              >
                My Donations
              </li>

              <li
                onClick={() => navigate("/my-vip-memberships")}
                className="w-full text-left py-2 hover:text-blue-600"
              >
                My VIP Memberships
              </li>

              <li
                className="text-red-500 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </>
          )}
          <li
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            HOME
          </li>
          <li
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => navigate("/about")}
          >
            ABOUT
          </li>

          <li
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            CONTACT
          </li>
          <button
            onClick={() => {
              navigate("/book-celebrity");
              setIsOpen(false);
            }}
            className="border border-blue-600 text-blue-600 px-4 py-1 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            Book Now
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
