import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

export default function AdminChatDetails() {
  const { id } = useParams();

  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchChat();
  }, [id]);

  const fetchChat = async () => {
    try {
      const { data } = await axiosInstance.get(`/chats/${id}`);
      setChat(data.data);
    } catch (error) {
      toast.error(error.message || "Could not load chat");
    }
  };

  const sendReply = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    setSending(true);

    try {
      const { data } = await axiosInstance.post(`/chats/${id}/reply`, {
        text: message,
      });

      setChat(data.data);
      setMessage("");
      toast.success("Reply sent");
    } catch (error) {
      toast.error(error.message || "Reply failed");
    } finally {
      setSending(false);
    }
  };

  if (!chat) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{chat.name}</h1>
      <p className="text-gray-500 mb-6">{chat.email}</p>

      <div className="bg-white rounded-xl shadow p-6 h-125 overflow-y-auto">
        {chat.messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-4 flex ${
              msg.sender === "admin" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-md px-4 py-2 rounded-lg ${
                msg.sender === "admin"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your reply..."
        className="w-full border rounded-lg p-3 mt-6"
      />

      <button
        onClick={sendReply}
        disabled={sending}
        className="bg-[#1D4996] text-white px-6 py-3 rounded-lg mt-3 disabled:opacity-70"
      >
        {sending ? "Sending..." : "Send Reply"}
      </button>
    </div>
  );
}
