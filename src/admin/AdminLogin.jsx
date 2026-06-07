import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login, logout, loading, user, isLoggedIn } = useAppContext();

  if (isLoggedIn && user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const payload = {
      identifier: form.get("identifier"),
      password: form.get("password"),
    };

    const loggedUser = await login(payload);

    if (!loggedUser) return;

    if (loggedUser.role !== "admin") {
      toast.error("Admin access only");
      await logout();
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-[#1D4996]">
          FANLY Admin
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Login to manage celebrities, bookings, donations and VIP memberships
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Email or Username</label>
            <input
              name="identifier"
              required
              className="w-full border rounded-lg px-4 py-3 mt-1"
              placeholder="admin@email.com"
            />
          </div>

          <div>
            <label className="font-medium">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                required
                className="w-full border rounded-lg px-4 py-3 mt-1"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#1D4996] text-white py-3 rounded-lg font-semibold disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
