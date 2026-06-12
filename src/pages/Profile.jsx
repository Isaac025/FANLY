import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaGlobe,
  FaCheckCircle,
  FaTicketAlt,
  FaHeart,
  FaCrown,
  FaSignOutAlt,
  FaArrowRight,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAppContext();

  const initials =
    user?.fullName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const infoCards = [
    {
      label: "Username",
      value: user?.username || "Not set",
      icon: <FaUser />,
    },
    {
      label: "Phone",
      value: user?.phone || "Not set",
      icon: <FaPhoneAlt />,
    },
    {
      label: "Country",
      value: user?.country || "Not set",
      icon: <FaGlobe />,
    },
    {
      label: "Account Status",
      value: "Active",
      icon: <FaCheckCircle />,
    },
  ];

  const actionCards = [
    {
      title: "My Bookings",
      text: "View your celebrity booking requests.",
      icon: <FaTicketAlt />,
      route: "/my-bookings",
    },
    {
      title: "My Donations",
      text: "Track your donation payment requests.",
      icon: <FaHeart />,
      route: "/my-donations",
    },
    {
      title: "My VIP Cards",
      text: "Manage your VIP fan memberships.",
      icon: <FaCrown />,
      route: "/my-vip-memberships",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#05070F] text-white">
      <Navbar />

      <main className="relative px-4 pb-20 pt-32 sm:px-6">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[-190px] top-[-150px] h-[560px] w-[560px] rounded-full bg-[#2563EB]/25 blur-[160px]"
          />

          <motion.div
            animate={{ x: [0, -80, 0], y: [0, -50, 0], scale: [1, 1.13, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[-240px] top-[12%] h-[650px] w-[650px] rounded-full bg-[#8B5CF6]/25 blur-[170px]"
          />

          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -45, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-250px] left-[25%] h-[540px] w-[540px] rounded-full bg-[#06B6D4]/15 blur-[160px]"
          />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)]" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#F2D38A] backdrop-blur-xl">
              <FaStar className="text-[#D6B36A]" />
              Fan Profile
            </div>

            <h1 className="mt-5 text-4xl font-black text-white sm:text-5xl">
              My Account
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#B9C2D0]">
              Manage your FANLY profile, bookings, donations, VIP cards and
              account access.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
            <motion.aside
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="relative overflow-hidden rounded-[38px] border border-white/10 bg-white/[0.07] p-6 shadow-[0_40px_130px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            >
              <div className="pointer-events-none absolute right-[-90px] top-[-90px] h-64 w-64 rounded-full bg-[#D6B36A]/15 blur-[80px]" />
              <div className="pointer-events-none absolute bottom-[-100px] left-[-100px] h-72 w-72 rounded-full bg-[#06B6D4]/10 blur-[90px]" />

              <div className="relative text-center">
                <div className="mx-auto mb-5 flex h-32 w-32 items-center justify-center rounded-[34px] border border-[#D6B36A]/30 bg-gradient-to-br from-[#2563EB] via-[#8B5CF6] to-[#D6B36A] p-1 shadow-[0_20px_60px_rgba(214,179,106,0.2)]">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[30px] bg-[#05070F] text-4xl font-black text-white">
                    {user?.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.fullName || "User profile"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>
                </div>

                <h2 className="text-3xl font-black text-white">
                  {user?.fullName || "User"}
                </h2>

                <div className="mt-3 flex items-center justify-center gap-2 text-sm text-[#B9C2D0]">
                  <FaEnvelope className="text-[#06B6D4]" />
                  <span className="break-all">{user?.email || "No email"}</span>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D6B36A]/30 bg-[#D6B36A]/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#F2D38A]">
                  <FaShieldAlt />
                  {user?.role || "user"}
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-sm font-black uppercase tracking-widest text-red-300 transition hover:bg-red-500 hover:text-white"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </motion.aside>

            <motion.section
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="space-y-8"
            >
              <div className="grid gap-5 md:grid-cols-2">
                {infoCards.map((card, index) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.06 }}
                    whileHover={{ y: -5 }}
                    className="rounded-[28px] border border-white/10 bg-white/[0.06] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#06B6D4]/15 text-[#06B6D4]">
                      {card.icon}
                    </div>

                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#B9C2D0]">
                      {card.label}
                    </p>

                    <h3 className="mt-2 break-words text-xl font-black text-white">
                      {card.value}
                    </h3>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-[38px] border border-white/10 bg-white/[0.07] p-5 shadow-[0_40px_130px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-6">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F2D38A]">
                      Activity Center
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-white">
                      Manage your requests
                    </h2>
                  </div>

                  <p className="max-w-md text-sm leading-6 text-[#B9C2D0]">
                    Jump straight into your bookings, donations, and VIP
                    membership history.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  {actionCards.map((card, index) => (
                    <motion.button
                      key={card.title}
                      type="button"
                      onClick={() => navigate(card.route)}
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28 + index * 0.06 }}
                      whileHover={{ y: -7, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="group rounded-[28px] border border-white/10 bg-black/25 p-5 text-left transition hover:border-[#D6B36A]/50 hover:bg-[#D6B36A]/10"
                    >
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB]/15 text-xl text-[#06B6D4] transition group-hover:bg-[#D6B36A] group-hover:text-[#05070F]">
                        {card.icon}
                      </div>

                      <h3 className="text-xl font-black text-white">
                        {card.title}
                      </h3>

                      <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#B9C2D0]">
                        {card.text}
                      </p>

                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#F2D38A]">
                        Open
                        <FaArrowRight className="transition group-hover:translate-x-1" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
