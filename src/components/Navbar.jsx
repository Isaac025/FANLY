import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logohome from "../assets/logohome.png";
import { useAppContext } from "../context/AppContext";
import { FaBars, FaTimes, FaCrown, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAppContext();

  const initials =
    user?.fullName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "U";

  const goTo = (path) => {
    navigate(path);
    setIsOpen(false);
    setShowProfileMenu(false);
  };

  const handleLogout = async () => {
    await logout();
    goTo("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed left-0 top-0 z-50 w-full px-4 py-4">
      <motion.div
        initial={{ y: -40, opacity: 0, filter: "blur(12px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8 }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#05070F]/75 px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:px-6"
      >
        <button onClick={() => goTo("/")} className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#D6B36A]/40 blur-xl" />
            <img
              src={logohome}
              alt="Logo"
              className="relative h-12 w-12 rounded-full object-contain"
            />
          </div>

          <span className="hidden bg-linear-to-r from-[#F2D38A] via-white to-[#9DB7FF] bg-clip-text text-lg font-black tracking-tight text-transparent sm:block">
            celebrity bookings
          </span>
        </button>

        <ul className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/6 px-2 py-2 lg:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => goTo(link.path)}
                className="group relative rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wide text-[#B9C2D0] transition hover:text-[#F2D38A]"
              >
                {link.name}
                <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-linear-to-r from-[#D6B36A] to-[#F2D38A] transition-all duration-300 group-hover:w-8" />
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => goTo("/book-celebrity")}
            className="rounded-full bg-linear-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-6 py-3 text-sm font-black uppercase tracking-wide text-[#05070F] shadow-[0_0_35px_rgba(214,179,106,0.35)] transition hover:scale-105"
          >
            Book Now
          </button>

          {!isLoggedIn ? (
            <>
              <button
                onClick={() => goTo("/login")}
                className="rounded-full px-4 py-2 text-sm font-bold text-[#B9C2D0] transition hover:text-[#F2D38A]"
              >
                Login
              </button>

              <button
                onClick={() => goTo("/signup")}
                className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-bold text-white transition hover:border-[#D6B36A]/60 hover:text-[#F2D38A]"
              >
                Register
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-[#D6B36A] to-[#4C3F91] font-black text-white shadow-lg"
              >
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 18, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 18, scale: 0.96 }}
                    className="absolute right-0 mt-4 w-72 overflow-hidden rounded-[28px] border border-white/10 bg-[#05070F]/95 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
                  >
                    <div className="mb-3 border-b border-white/10 pb-3">
                      <h4 className="font-black text-white">
                        {user?.fullName}
                      </h4>
                      <p className="truncate text-xs text-[#B9C2D0]">
                        {user?.email}
                      </p>
                    </div>

                    {[
                      ["My Profile", "/profile"],
                      ["My Bookings", "/my-bookings"],
                      ["My Donations", "/my-donations"],
                      ["My VIP Memberships", "/my-vip-memberships"],
                    ].map(([name, path]) => (
                      <button
                        key={name}
                        onClick={() => goTo(path)}
                        className="w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[#B9C2D0] transition hover:bg-white/10 hover:text-[#F2D38A]"
                      >
                        {name}
                      </button>
                    ))}

                    <button
                      onClick={handleLogout}
                      className="mt-2 w-full rounded-2xl px-4 py-3 text-left text-sm font-bold text-red-400 transition hover:bg-red-500/10"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/8 text-xl text-white shadow-sm lg:hidden"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="mobile-menu-scroll mx-auto mt-3
    max-w-7xl rounded-4xl border border-white/10 bg-[#05070F]/95 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:hidden max-h-[calc(100vh-100px)] overflow-y-auto overflow-x-hidden"
          >
            <div className="space-y-2 px-5 py-6">
              {isLoggedIn && (
                <div className="mb-4 flex items-center gap-3 rounded-3xl border border-white/10 bg-white/6 p-4">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-[#D6B36A] to-[#4C3F91] font-black text-white">
                    {user?.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.fullName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>

                  <div className="min-w-0">
                    <h4 className="truncate font-black text-white">
                      {user?.fullName}
                    </h4>
                    <p className="truncate text-xs text-[#B9C2D0]">
                      {user?.email}
                    </p>
                  </div>
                </div>
              )}

              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => goTo(link.path)}
                  className="w-full rounded-2xl px-4 py-4 text-left text-sm font-black uppercase tracking-wide text-[#B9C2D0] transition hover:bg-white/10 hover:text-[#F2D38A]"
                >
                  {link.name}
                </button>
              ))}

              <button
                onClick={() => {
                  goTo("/book-celebrity");
                  scrollTo(0, 0);
                }}
                className="mt-3 cursor-pointer flex w-full items-center justify-center gap-3 rounded-full bg-linear-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-6 py-4 text-sm font-black uppercase tracking-widest text-[#05070F] shadow-[0_0_35px_rgba(214,179,106,0.35)]"
              >
                <FaCrown />
                Book Now
              </button>

              {!isLoggedIn ? (
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <button
                    onClick={() => goTo("/login")}
                    className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-white"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => goTo("/signup")}
                    className="rounded-full bg-white px-5 py-3 text-sm font-black text-[#05070F]"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-3">
                  {[
                    ["My Profile", "/profile"],
                    ["My Bookings", "/my-bookings"],
                    ["My Donations", "/my-donations"],
                    ["My VIP Memberships", "/my-vip-memberships"],
                  ].map(([name, path]) => (
                    <button
                      key={name}
                      onClick={() => goTo(path)}
                      className="w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[#B9C2D0] transition hover:bg-white/10 hover:text-[#F2D38A]"
                    >
                      {name}
                    </button>
                  ))}

                  <button
                    onClick={handleLogout}
                    className="w-full rounded-2xl px-4 py-3 text-left text-sm font-bold text-red-400 transition hover:bg-red-500/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
