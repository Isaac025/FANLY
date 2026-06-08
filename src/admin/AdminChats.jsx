import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function AdminChats() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const { data } = await axiosInstance.get("/chats");
      setChats(data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Customer Chats</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Last Message</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {chats.map((chat) => (
              <tr
                key={chat._id}
                className="border-b cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(`/admin/chats/${chat._id}`)}
              >
                <td className="p-4">{chat.name}</td>

                <td className="p-4">{chat.email}</td>

                <td className="p-4">{chat.lastMessage}</td>

                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {chat.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
