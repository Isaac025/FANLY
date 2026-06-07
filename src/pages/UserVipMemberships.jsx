import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UserVipMemberships() {
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const { data } = await axiosInstance.get("/vip-memberships");
        setMemberships(data.data || []);
      } catch (error) {
        toast.error(error.message || "Could not fetch VIP memberships");
      }
    };

    fetchMemberships();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="page-shell">
      <Navbar />

      <main className="pt-28 px-6 max-w-6xl mx-auto min-h-screen">
        <h1 className="text-3xl font-bold mb-6">My VIP Memberships</h1>

        {memberships.length === 0 ? (
          <div className="bg-white shadow rounded-xl p-8 text-center">
            <p className="text-gray-500">You have no VIP memberships yet.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {memberships.map((item) => (
              <div key={item._id} className="bg-white shadow rounded-xl p-6">
                <div className="flex justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-xl font-bold">{item.celebrityName}</h2>
                    <p className="text-gray-500 capitalize">
                      {item.tier} Membership
                    </p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full h-fit capitalize ${getStatusClass(
                      item.status,
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-5 text-sm">
                  <p>
                    <b>Annual Fee:</b> $
                    {Number(item.annualFee || 0).toLocaleString()}
                  </p>
                  <p>
                    <b>Total:</b> ${Number(item.total || 0).toLocaleString()}
                  </p>
                  <p>
                    <b>Payment:</b> {item.paymentMethod}
                  </p>
                  <p>
                    <b>Phone:</b> {item.phone}
                  </p>
                  <p>
                    <b>Email:</b> {item.email}
                  </p>
                  <p>
                    <b>Date:</b> {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {item.shippingAddress && (
                  <p className="mt-4 text-gray-600">
                    <b>Shipping Address:</b> {item.shippingAddress}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
