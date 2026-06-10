import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaCrown,
  FaQuoteLeft,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";
import { FiUser } from "react-icons/fi";

const testimonials = [
  {
    name: "Emily Johnson",
    role: "VIP Fan",
    amount: "$2,500 Experience",
    text: "I booked a private video moment for my sister’s birthday, and the reaction was priceless. It felt personal, premium, and beautifully handled.",
  },
  {
    name: "Michael Smith",
    role: "Event Host",
    amount: "$8,000 Booking",
    text: "The process felt smooth from start to finish. Fanly made celebrity access feel organized, trusted, and genuinely exciting.",
  },
  {
    name: "Jessica Brown",
    role: "Premium Member",
    amount: "Fancard Holder",
    text: "The VIP membership made me feel closer to the stars I follow. The design, updates, and access all feel first class.",
  },
  {
    name: "David Miller",
    role: "Corporate Client",
    amount: "$12,000 Event",
    text: "We needed something unforgettable for our brand event, and Fanly delivered a celebrity experience that everyone talked about.",
  },
];

const Testimonials = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#05070F] px-5 py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-140px] top-[-120px] h-[460px] w-[460px] rounded-full bg-[#D6B36A]/10 blur-[140px]" />
        <div className="absolute bottom-[-170px] right-[-140px] h-[520px] w-[520px] rounded-full bg-[#4C3F91]/25 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 35, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-xl">
              <FaCrown className="text-[#F2D38A]" />
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                Fan Stories
              </p>
            </div>

            <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">
              Real moments from fans who experienced the magic.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-md text-base leading-8 text-[#B9C2D0] md:text-lg"
          >
            From private video messages to VIP bookings and unforgettable live
            events, these stories show how Fanly turns celebrity access into
            lasting memories.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 55, scale: 0.94, filter: "blur(14px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.12 }}
              whileHover={{ y: -12, scale: 1.025 }}
              className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_35px_110px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            >
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#D6B36A]/10 blur-3xl transition group-hover:bg-[#D6B36A]/20" />

              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D6B36A]/40 bg-[#D6B36A]/10 text-[#F2D38A]">
                    <FiUser size={20} />
                  </div>

                  <FaQuoteLeft className="text-3xl text-[#F2D38A]/50" />
                </div>

                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-sm text-[#F2D38A]" />
                  ))}
                </div>

                <p className="min-h-[150px] text-sm leading-7 text-[#B9C2D0]">
                  “{item.text}”
                </p>

                <div className="mt-7 border-t border-white/10 pt-5">
                  <h3 className="font-black uppercase tracking-wide text-white">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#B9C2D0]">{item.role}</p>

                  <div className="mt-4 inline-flex rounded-full border border-[#D6B36A]/30 bg-[#D6B36A]/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#F2D38A]">
                    {item.amount}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 rounded-[36px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
            <div>
              <h3 className="text-2xl font-black">Have a Fanly story?</h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#B9C2D0]">
                Share your celebrity experience, VIP moment, booking story, or
                fan memory with us.
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="rounded-full bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-8 py-4 text-sm font-black uppercase tracking-widest text-[#05070F] shadow-[0_0_40px_rgba(214,179,106,0.35)] transition hover:scale-105"
            >
              Share Your Story
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 z-[9998] bg-black/85 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-xl rounded-[38px] border border-white/10 bg-[#05070F] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.85)] md:p-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white"
                >
                  <FaTimes />
                </button>

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-2xl text-[#05070F]">
                  <FaPaperPlane />
                </div>

                <h3 className="text-3xl font-black">Share your experience</h3>
                <p className="mt-3 text-sm leading-7 text-[#B9C2D0]">
                  This form is ready for frontend use. Later, you can connect it
                  to your backend or email service.
                </p>

                <form className="mt-7 space-y-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-white outline-none placeholder:text-[#8B95A5]"
                  />

                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-white outline-none placeholder:text-[#8B95A5]"
                  />

                  <textarea
                    rows="5"
                    placeholder="Tell us about your Fanly experience..."
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-white outline-none placeholder:text-[#8B95A5]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-8 py-4 text-sm font-black uppercase tracking-widest text-[#05070F]"
                  >
                    <FaPaperPlane />
                    Submit Story
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
