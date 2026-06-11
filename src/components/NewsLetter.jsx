import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaCrown, FaEnvelope, FaBolt } from "react-icons/fa";
import { toast } from "react-toastify";

const FORM_ENDPOINT = "https://formspree.io/f/xzdqaqdw";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          subject: "New VIP Access Subscriber",
          formType: "VIP Access List",
          email,
          message: `New user joined the FANLY VIP access list: ${email}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      toast.success(
        "VIP access unlocked. Check your inbox for future updates.",
      );
      setEmail("");
    } catch (error) {
      toast.error("Could not subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#05070F] px-5 py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-150px] top-[-120px] h-[460px] w-[460px] rounded-full bg-[#D6B36A]/15 blur-[140px]" />
        <div className="absolute bottom-[-170px] right-[-140px] h-[520px] w-[520px] rounded-full bg-[#4C3F91]/25 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
        >
          <div className="mb-6 flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-xl text-[#F2D38A]" />
            ))}
          </div>

          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-xl">
            <FaCrown className="text-[#F2D38A]" />
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
              VIP Access List
            </p>
          </div>

          <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">
            Never miss a celebrity moment.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#B9C2D0] md:text-lg">
            Be the first to discover exclusive celebrity bookings, VIP fan
            drops, live experiences, premium memberships, and limited-access
            moments before everyone else.
          </p>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {[
              ["52K+", "VIP Members"],
              ["4.9", "Fan Rating"],
              ["24/7", "Access"],
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 text-center backdrop-blur-xl"
              >
                <h3 className="text-2xl font-black text-[#F2D38A]">{value}</h3>
                <p className="mt-1 text-[11px] font-semibold text-[#B9C2D0]">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.15 }}
          className="relative overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.07] p-6 shadow-[0_40px_130px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-8"
        >
          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#D6B36A]/15 blur-3xl" />

          <div className="relative">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-2xl text-[#05070F] shadow-[0_0_40px_rgba(214,179,106,0.4)]">
              <FaEnvelope />
            </div>

            <h3 className="text-3xl font-black tracking-[-0.03em]">
              Join the inner circle.
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#B9C2D0]">
              Get premium fan updates, private experience alerts, and exclusive
              celebrity access opportunities delivered directly to you.
            </p>

            <form onSubmit={handleSubscribe} className="mt-8 space-y-4">
              <div className="rounded-full border border-white/10 bg-black/25 p-2 backdrop-blur-xl">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full bg-transparent px-5 py-4 text-white outline-none placeholder:text-[#8B95A5]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-8 py-4 text-sm font-black uppercase tracking-widest text-[#05070F] shadow-[0_0_45px_rgba(214,179,106,0.4)] transition duration-300 hover:scale-[1.02] disabled:opacity-70"
              >
                <FaBolt />
                {loading ? "Submitting..." : "Unlock VIP Access"}
              </button>
            </form>

            <p className="mt-5 text-center text-xs leading-6 text-[#8B95A5]">
              No spam. Just exclusive celebrity drops, VIP moments and premium
              fan opportunities.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsLetter;
