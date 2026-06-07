import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

export default function AdminVipMemberships() {
  const [memberships, setMemberships] = useState([]);

  const fetchMemberships = async () => {
    try {
      const { data } = await axiosInstance.get("/vip-memberships");
      setMemberships(data.data || []);
    } catch (error) {
      toast.error(error.message || "Could not fetch VIP memberships");
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.patch(`/vip-memberships/${id}/status`, { status });
      toast.success("VIP membership status updated");
      fetchMemberships();
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">VIP Memberships</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-262.5">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Celebrity</th>
              <th className="p-4">Member</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Tier</th>
              <th className="p-4">Annual Fee</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {memberships.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-5 text-center text-gray-500">
                  No VIP memberships found.
                </td>
              </tr>
            ) : (
              memberships.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-4">{item.celebrityName}</td>
                  <td className="p-4">{item.fullName}</td>
                  <td className="p-4">{item.email}</td>
                  <td className="p-4">{item.phone}</td>

                  <td className="p-4 capitalize">{item.tier}</td>

                  <td className="p-4">
                    ${Number(item.annualFee || 0).toLocaleString()}
                  </td>

                  <td className="p-4">
                    ${Number(item.total || 0).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <select
                      value={item.status}
                      onChange={(e) => updateStatus(item._id, e.target.value)}
                      className="border rounded px-3 py-2"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="p-4">
                    {new Date(item.createdAt).toLocaleDateString()}
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
