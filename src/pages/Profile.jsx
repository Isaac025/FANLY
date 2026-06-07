import React from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="page-shell">
      <Navbar />

      <main className="pt-28 px-6 max-w-5xl mx-auto min-h-screen">
        <div className="bg-white shadow rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-[#1D4996] text-white flex items-center justify-center text-3xl font-bold">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.fullName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{user?.fullName}</h1>
              <p className="text-gray-500">{user?.email}</p>
              <span className="inline-block mt-2 px-4 py-1 rounded-full bg-blue-100 text-blue-700 capitalize">
                {user?.role || "user"}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-8">
            <div className="border rounded-xl p-5">
              <p className="text-gray-500">Username</p>
              <h3 className="font-semibold">{user?.username || "Not set"}</h3>
            </div>

            <div className="border rounded-xl p-5">
              <p className="text-gray-500">Phone</p>
              <h3 className="font-semibold">{user?.phone || "Not set"}</h3>
            </div>

            <div className="border rounded-xl p-5">
              <p className="text-gray-500">Country</p>
              <h3 className="font-semibold">{user?.country || "Not set"}</h3>
            </div>

            <div className="border rounded-xl p-5">
              <p className="text-gray-500">Account Status</p>
              <h3 className="font-semibold">Active</h3>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-8">
            <button
              onClick={() => navigate("/my-bookings")}
              className="bg-blue-50 text-blue-700 rounded-xl p-5 font-semibold hover:bg-blue-100"
            >
              My Bookings
            </button>

            <button
              onClick={() => navigate("/my-donations")}
              className="bg-blue-50 text-blue-700 rounded-xl p-5 font-semibold hover:bg-blue-100"
            >
              My Donations
            </button>

            <button
              onClick={() => navigate("/my-vip-memberships")}
              className="bg-blue-50 text-blue-700 rounded-xl p-5 font-semibold hover:bg-blue-100"
            >
              My VIP Cards
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 bg-red-500 text-white px-6 py-3 rounded-lg"
          >
            Logout
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
