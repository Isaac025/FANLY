import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);

  const fetchDonations = async () => {
    try {
      const { data } = await axiosInstance.get("/donations");
      setDonations(data.data || []);
    } catch (error) {
      toast.error(error.message || "Could not fetch donations");
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const updateStatus = async (donationId, status) => {
    try {
      await axiosInstance.patch(`/donations/${donationId}/status`, { status });

      toast.success("Donation status updated");
      fetchDonations();
    } catch (error) {
      toast.error(error.message || "Failed to update donation status");
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
      <h1 className="text-2xl font-bold mb-6">Donations</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-237.5">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Celebrity</th>
              <th className="p-4">Donor</th>
              <th className="p-4">Email</th>
              <th className="p-4">Charity</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {donations.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-5 text-center text-gray-500">
                  No donations found.
                </td>
              </tr>
            ) : (
              donations.map((donation) => (
                <tr key={donation._id} className="border-t">
                  <td className="p-4">{donation.celebrityName}</td>
                  <td className="p-4">{donation.firstName}</td>
                  <td className="p-4">{donation.email}</td>
                  <td className="p-4">{donation.charity}</td>

                  <td className="p-4">
                    ${Number(donation.amount || 0).toLocaleString()}
                  </td>

                  <td className="p-4">
                    ${Number(donation.total || 0).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <select
                      value={donation.status}
                      onChange={(e) =>
                        updateStatus(donation._id, e.target.value)
                      }
                      className={`border rounded px-3 py-2 ${getStatusClass(
                        donation.status,
                      )}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="p-4">
                    {new Date(donation.createdAt).toLocaleDateString()}
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
