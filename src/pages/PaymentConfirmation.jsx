import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaCheckCircle,
  FaClock,
  FaCopy,
  FaReceipt,
  FaShieldAlt,
  FaArrowRight,
  FaUserCheck,
  FaBitcoin,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function PaymentConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const type = state?.type || "booking";

  const celebrityName =
    state?.celebrity?.name ||
    state?.booking?.celebrityName ||
    state?.donation?.celebrityName ||
    state?.membership?.celebrityName ||
    "Selected Celebrity";

  const total = Number(state?.total || state?.amount || 0);

  const cryptoAddress =
    state?.cryptoAddress || "bc1qv4xu0kag0n5eczry2sjce3mvdxjqx7z0l3qxte";

  const cryptoNetwork = state?.cryptoNetwork || "Bitcoin (BTC)";
  const cryptoAmount = Number(state?.cryptoAmount || 0);
  const cryptoSymbol = state?.cryptoSymbol || "BTC";

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

  const paymentType =
    type === "booking"
      ? "Booking Payment"
      : type === "donation"
        ? "Donation Payment"
        : "VIP Membership Payment";

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(cryptoAddress);
      setCopied(true);
      toast.success("Wallet address copied");

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Could not copy wallet address");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] text-[#0B1220]">
      <Navbar />

      <main className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-200px] top-[-160px] h-[520px] w-[520px] rounded-full bg-[#2563EB]/10 blur-[150px]" />
          <div className="absolute right-[-220px] top-[20%] h-[560px] w-[560px] rounded-full bg-[#06B6D4]/10 blur-[160px]" />
          <div className="absolute bottom-[-240px] left-[30%] h-[520px] w-[520px] rounded-full bg-[#D6B36A]/15 blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mb-8 text-center"
          >
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#DCFCE7] text-4xl text-[#16A34A] shadow-[0_20px_50px_rgba(22,163,74,0.18)]">
              <FaCheckCircle />
            </div>

            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#2563EB]">
              Request Submitted
            </p>

            <h1 className="mt-3 text-3xl font-black text-[#0B1220] sm:text-5xl">
              {title}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#64748B] sm:text-base">
              Your request has been created successfully. It will remain pending
              until the payment is confirmed by admin.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <motion.section
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="rounded-[34px] border border-[#DDE3EE] bg-white p-5 shadow-[0_30px_100px_rgba(15,23,42,0.08)] sm:p-8"
            >
              <div className="mb-7 flex flex-col gap-5 rounded-[28px] border border-[#DDE3EE] bg-[#F8FAFC] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7931A]/15 text-2xl text-[#F7931A]">
                    <FaBitcoin />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#64748B]">
                      Crypto Payment
                    </p>
                    <h2 className="text-2xl font-black">Payment Details</h2>
                  </div>
                </div>

                <div className="rounded-full border border-[#FACC15]/40 bg-[#FFFBEB] px-5 py-3 text-sm font-black text-[#B45309]">
                  Pending Admin Confirmation
                </div>
              </div>

              <div className="rounded-[28px] border border-[#DDE3EE] bg-white p-5">
                <SummaryRow label="Celebrity" value={celebrityName} />
                <SummaryRow label="Payment Type" value={paymentType} />
                <SummaryRow label="Network" value={cryptoNetwork} />
                <SummaryRow
                  label="Total USD"
                  value={`$${total.toLocaleString()}`}
                  strong
                />
                <SummaryRow
                  label={`${cryptoSymbol} Amount`}
                  value={
                    cryptoAmount
                      ? `${cryptoAmount.toFixed(6)} ${cryptoSymbol}`
                      : "Pending rate"
                  }
                  strong
                />
              </div>

              <div className="mt-6 rounded-[28px] border border-[#DDE3EE] bg-[#F8FAFC] p-5">
                <label className="mb-3 block text-xs font-black uppercase tracking-[0.22em] text-[#64748B]">
                  Wallet Address
                </label>

                <div className="flex flex-col gap-3 rounded-2xl border border-[#DDE3EE] bg-white p-4 sm:flex-row sm:items-center">
                  <span className="flex-1 break-all text-sm font-bold text-[#0B1220]">
                    {cryptoAddress}
                  </span>

                  <button
                    type="button"
                    onClick={copyAddress}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-black text-white transition hover:bg-[#1D4ED8]"
                  >
                    {copied ? <FaCheckCircle /> : <FaCopy />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-[#FACC15]/40 bg-[#FFFBEB] p-5">
                <div className="flex gap-3">
                  <FaExclamationTriangle className="mt-1 shrink-0 text-[#D97706]" />
                  <div>
                    <h4 className="font-black text-[#92400E]">
                      Keep your payment proof
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-[#92400E]">
                      Keep your transaction hash, receipt, or wallet screenshot.
                      Admin may need it to verify your payment faster.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => navigate(myPage)}
                  className="inline-flex flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#2563EB] px-6 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_20px_45px_rgba(37,99,235,0.25)] transition hover:-translate-y-1"
                >
                  View My Request
                  <FaArrowRight />
                </button>

                <button
                  onClick={() => navigate("/book-celebrity")}
                  className="flex-1 rounded-2xl border border-[#2563EB] bg-white px-6 py-4 text-sm font-black uppercase tracking-widest text-[#2563EB] transition hover:bg-[#EFF6FF]"
                >
                  Book Another Celebrity
                </button>
              </div>
            </motion.section>

            <motion.aside
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="space-y-5"
            >
              <div className="rounded-[34px] border border-[#DDE3EE] bg-white p-6 shadow-[0_30px_100px_rgba(15,23,42,0.08)]">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB]/10 text-xl text-[#2563EB]">
                    <FaReceipt />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#64748B]">
                      Status Timeline
                    </p>
                    <h3 className="text-2xl font-black">What happens next?</h3>
                  </div>
                </div>

                <TimelineItem
                  active
                  icon={<FaCheckCircle />}
                  title="Request Created"
                  text="Your payment request has been submitted successfully."
                />

                <TimelineItem
                  active
                  icon={<FaClock />}
                  title="Awaiting Verification"
                  text="Admin will confirm the crypto payment after review."
                />

                <TimelineItem
                  icon={<FaUserCheck />}
                  title="Request Approved"
                  text="Your booking, donation, or membership will be updated after confirmation."
                />
              </div>

              <div className="rounded-[30px] border border-[#DDE3EE] bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
                <h3 className="mb-4 text-xl font-black">Security reminder</h3>

                <TrustItem
                  icon={<FaShieldAlt />}
                  text="Only send BTC through the Bitcoin network."
                />

                <TrustItem
                  icon={<FaCopy />}
                  text="Double-check the wallet address before sending."
                />

                <TrustItem
                  icon={<FaReceipt />}
                  text="Keep proof of payment until admin confirms it."
                />
              </div>
            </motion.aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function SummaryRow({ label, value, strong }) {
  return (
    <div className="flex justify-between gap-5 border-b border-[#EEF2F7] py-4 text-sm last:border-b-0">
      <span className={strong ? "font-black text-[#0B1220]" : "text-[#64748B]"}>
        {label}
      </span>

      <b
        className={
          strong
            ? "text-right text-lg font-black text-[#2563EB]"
            : "text-right font-black text-[#0B1220]"
        }
      >
        {value}
      </b>
    </div>
  );
}

function TimelineItem({ icon, title, text, active }) {
  return (
    <div className="relative mb-5 flex gap-4 last:mb-0">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
          active ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#F1F5F9] text-[#94A3B8]"
        }`}
      >
        {icon}
      </div>

      <div>
        <h4 className="font-black text-[#0B1220]">{title}</h4>
        <p className="mt-1 text-sm leading-6 text-[#64748B]">{text}</p>
      </div>
    </div>
  );
}

function TrustItem({ icon, text }) {
  return (
    <div className="mb-3 flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 last:mb-0">
      <div className="text-[#2563EB]">{icon}</div>
      <p className="text-sm font-bold leading-6 text-[#334155]">{text}</p>
    </div>
  );
}
