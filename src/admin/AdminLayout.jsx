import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAppContext();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-[#1D4996] text-white p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-10">FANLY Admin</h1>

        <nav className="space-y-4">
          <Link to="/admin" className="block hover:text-gray-200">
            Dashboard
          </Link>

          <Link to="/admin/celebrities" className="block hover:text-gray-200">
            Celebrities
          </Link>

          <Link to="/admin/bookings" className="block hover:text-gray-200">
            Bookings
          </Link>

          <Link to="/admin/donations" className="block hover:text-gray-200">
            Donations
          </Link>

          <Link
            to="/admin/vip-memberships"
            className="block hover:text-gray-200"
          >
            VIP Memberships
          </Link>
        </nav>
      </aside>

      <main className="flex-1">
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <h2 className="font-semibold">Admin Panel</h2>

          <div className="flex items-center gap-4">
            <span>{user?.fullName}</span>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
