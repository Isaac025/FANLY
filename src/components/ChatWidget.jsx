import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FaComment, FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const socket = io(import.meta.env.VITE_BACKEND_URL.replace("/api", ""), {
  withCredentials: true,
});

export default function ChatWidget() {
  const { user } = useAppContext();

  const [open, setOpen] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let guestId = localStorage.getItem("fanly_guest_id");

    if (!guestId) {
      guestId = `guest_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      localStorage.setItem("fanly_guest_id", guestId);
    }

    socket.emit("join_chat", {
      userId: user?._id || null,
      guestId,
      name: user?.fullName || "Guest User",
      email: user?.email || "",
    });

    socket.on("chat_joined", (chat) => {
      setChatId(chat._id);
      setMessages(chat.messages || []);
    });

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("chat_error", (error) => {
      console.error(error);
    });

    return () => {
      socket.off("chat_joined");
      socket.off("receive_message");
      socket.off("chat_error");
    };
  }, [user]);

  const sendMessage = () => {
    if (!message.trim()) return;

    if (!chatId) {
      console.error("Chat not ready yet");
      return;
    }

    socket.emit("send_message", {
      chatId,
      sender: "user",
      text: message,
    });

    setMessage("");
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-4 rounded-full shadow-xl flex items-center gap-3 z-50"
        >
          Chat <FaComment />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-87.5 max-w-[92vw] h-130 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col">
          <div className="bg-blue-600 text-white p-5 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Send us a message</h3>
              <p className="text-sm text-blue-100">Happy to answer you later</p>
            </div>

            <button onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
            {messages.map((msg, index) => (
              <div
                key={msg._id || index}
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex items-center gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message here"
              className="flex-1 bg-gray-100 rounded-full px-4 py-3 outline-none"
            />

            <button
              onClick={sendMessage}
              disabled={!chatId}
              className="bg-blue-600 text-white px-4 py-3 rounded-full disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
