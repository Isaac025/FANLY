import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const closeSidebar = () => setSidebarOpen(false);

  const navLinks = [
    ["Dashboard", "/admin"],
    ["Celebrities", "/admin/celebrities"],
    ["Bookings", "/admin/bookings"],
    ["Donations", "/admin/donations"],
    ["VIP Memberships", "/admin/vip-memberships"],
    ["Chats", "/admin/chats"],
  ];

  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-50 min-h-screen w-64 bg-[#1D4996] text-white p-6 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold">FANLY Admin</h1>

          <button className="md:hidden text-xl" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>

        <nav className="space-y-4">
          {navLinks.map(([label, path]) => (
            <Link
              key={path}
              to={path}
              onClick={closeSidebar}
              className="block hover:text-gray-200"
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="bg-white shadow-sm px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-2xl text-gray-700"
            >
              <FaBars />
            </button>

            <h2 className="font-semibold text-sm md:text-base">Admin Panel</h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm md:text-base">
              {user?.fullName}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 md:px-4 py-2 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="p-4 md:p-6 overflow-x-hidden">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
