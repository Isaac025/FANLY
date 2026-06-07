import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PaymentConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const type = state?.type || "booking";
  const celebrityName =
    state?.celebrity?.name ||
    state?.booking?.celebrityName ||
    state?.donation?.celebrityName ||
    state?.membership?.celebrityName ||
    "Selected Celebrity";

  const total = Number(state?.total || state?.amount || 0);
  const cryptoAddress =
    state?.cryptoAddress || "0xA7B9cD12Ef34567890aBCdEf1234567890ABcDEF";

  const title =
    type === "booking"
      ? "Booking Payment Request Created"
      : type === "donation"
        ? "Donation Payment Request Created"
        : "VIP Membership Payment Request Created";

  const myPage =
    type === "booking"
      ? "/my-bookings"
      : type === "donation"
        ? "/my-donations"
        : "/my-vip-memberships";

  return (
    <div className="page-shell">
      <Navbar />

      <main className="pt-28 px-6 max-w-4xl mx-auto min-h-screen">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl mb-5">
            ✓
          </div>

          <h1 className="text-3xl font-bold mb-3">{title}</h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Your request has been created successfully. Please send the crypto
            payment to the wallet address below. Your request will remain
            pending until admin confirms the payment.
          </p>

          <div className="bg-gray-50 rounded-xl p-5 mt-8 text-left">
            <div className="flex justify-between border-b py-3">
              <span>Celebrity</span>
              <b>{celebrityName}</b>
            </div>

            <div className="flex justify-between border-b py-3">
              <span>Payment Type</span>
              <b className="capitalize">{type}</b>
            </div>

            <div className="flex justify-between border-b py-3">
              <span>Total Amount</span>
              <b>${total.toLocaleString()}</b>
            </div>

            <div className="py-3">
              <span className="block mb-2">Wallet Address</span>
              <div className="break-all bg-white border rounded-lg p-3 font-medium">
                {cryptoAddress}
              </div>
            </div>

            <div className="flex justify-between border-t py-3">
              <span>Status</span>
              <b className="text-yellow-600">Pending Admin Confirmation</b>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate(myPage)}
              className="bg-[#1D4996] text-white px-6 py-3 rounded-lg"
            >
              View My Request
            </button>

            <button
              onClick={() => navigate("/book-celebrity")}
              className="border border-[#1D4996] text-[#1D4996] px-6 py-3 rounded-lg"
            >
              Book Another Celebrity
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
