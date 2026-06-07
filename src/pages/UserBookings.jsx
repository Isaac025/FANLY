import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axiosInstance.get("/bookings");
      setBookings(data.data || []);
    } catch (error) {
      toast.error(error.message || "Could not fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
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
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-white shadow rounded-xl p-8 text-center">
            <p className="text-gray-500">You have no bookings yet.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white shadow rounded-xl p-6">
                <div className="flex justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      {booking.celebrityName}
                    </h2>
                    <p className="text-gray-500">{booking.eventType}</p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full h-fit capitalize ${getStatusClass(
                      booking.status,
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-5 text-sm">
                  <p>
                    <b>Date:</b> {booking.eventDate}
                  </p>
                  <p>
                    <b>Time:</b> {booking.eventTime}
                  </p>
                  <p>
                    <b>Duration:</b> {booking.duration}
                  </p>
                  <p>
                    <b>Location:</b> {booking.eventLocation}
                  </p>
                  <p>
                    <b>Payment:</b> {booking.paymentMethod}
                  </p>
                  <p>
                    <b>Total:</b> ${Number(booking.total || 0).toLocaleString()}
                  </p>
                </div>

                {booking.specialRequest && (
                  <p className="mt-4 text-gray-600">
                    <b>Request:</b> {booking.specialRequest}
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
