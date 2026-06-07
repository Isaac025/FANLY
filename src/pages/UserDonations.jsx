import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UserDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data } = await axiosInstance.get("/donations");
        setDonations(data.data || []);
      } catch (error) {
        toast.error(error.message || "Could not fetch donations");
      }
    };

    fetchDonations();
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
        <h1 className="text-3xl font-bold mb-6">My Donations</h1>

        {donations.length === 0 ? (
          <div className="bg-white shadow rounded-xl p-8 text-center">
            <p className="text-gray-500">You have no donations yet.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white shadow rounded-xl p-6"
              >
                <div className="flex justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      {donation.celebrityName}
                    </h2>
                    <p className="text-gray-500">{donation.charity}</p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full h-fit capitalize ${getStatusClass(
                      donation.status,
                    )}`}
                  >
                    {donation.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-5 text-sm">
                  <p>
                    <b>Amount:</b> $
                    {Number(donation.amount || 0).toLocaleString()}
                  </p>
                  <p>
                    <b>Total:</b> $
                    {Number(donation.total || 0).toLocaleString()}
                  </p>
                  <p>
                    <b>Payment:</b> {donation.paymentMethod}
                  </p>
                </div>

                {donation.message && (
                  <p className="mt-4 text-gray-600">
                    <b>Message:</b> {donation.message}
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
