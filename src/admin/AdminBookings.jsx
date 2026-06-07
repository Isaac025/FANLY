import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

export default function AdminBookings() {
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

  const updateStatus = async (bookingId, status) => {
    try {
      await axiosInstance.patch(`/bookings/${bookingId}/status`, { status });

      toast.success("Status updated successfully");

      fetchBookings();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

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
    <div>
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-250">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Celebrity</th>
              <th className="p-4">Client</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Event</th>
              <th className="p-4">Date</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-5 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking._id} className="border-t">
                  <td className="p-4">{booking.celebrityName}</td>
                  <td className="p-4">{booking.fullName}</td>
                  <td className="p-4">{booking.email}</td>
                  <td className="p-4">{booking.phone}</td>
                  <td className="p-4">{booking.eventType}</td>
                  <td className="p-4">
                    {booking.eventDate} {booking.eventTime}
                  </td>
                  <td className="p-4">
                    ${Number(booking.total || 0).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        updateStatus(booking._id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full  text-sm ${getStatusClass(
                        booking.status,
                      )}`}
                    >
                      <option value="pending">Pending</option>

                      <option value="paid">Paid</option>

                      <option value="completed">Completed</option>

                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
