import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    celebrities: 0,
    bookings: 0,
    donations: 0,
    vipMemberships: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/dashboard");
        setStats(data.data);
      } catch (error) {
        toast.error(error.message || "Failed to load dashboard stats");
      }
    };

    fetchStats();
  }, []);

  const cards = [
    ["Celebrities", stats.celebrities],
    ["Bookings", stats.bookings],
    ["Donations", stats.donations],
    ["VIP Memberships", stats.vipMemberships],
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid md:grid-cols-4 gap-5">
        {cards.map(([title, value]) => (
          <div key={title} className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">{title}</p>
            <h2 className="text-3xl font-bold mt-2">{value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
