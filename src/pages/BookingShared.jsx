import React from "react";
import {
  FaCalendarAlt,
  FaStar,
  FaUser,
  FaCreditCard,
  FaMapMarkerAlt,
  FaCrown,
  FaArrowRight,
  FaPhoneAlt,
  FaComments,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import featured from "../assets/featured.png";
import "./BookingPages.css";
import { useNavigate } from "react-router-dom";

export const defaultCelebrity = {
  name: "May Rice",
  title: "Actor",
  location: "Austin Texas",
  image: featured,
  bookingFee: 10000,
  fanCardFee: 50,
};

export function HeroBlock({ mode = "vip", celebrity = defaultCelebrity }) {
  const isBooking = mode === "booking";

  const name = celebrity?.name || defaultCelebrity.name;
  const title = celebrity?.title || defaultCelebrity.title;
  const location = celebrity?.location || defaultCelebrity.location;
  const image = celebrity?.image || celebrity?.img || defaultCelebrity.image;
  const bookingFee = celebrity?.bookingFee || defaultCelebrity.bookingFee;
  const fanCardFee = celebrity?.fanCardFee || defaultCelebrity.fanCardFee;

  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden bg-[#05070F] px-4 pb-16 pt-28 text-white sm:px-6 lg:pt-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-180px] top-[-120px] h-[520px] w-[520px] rounded-full bg-[#2563EB]/25 blur-[150px]" />
          <div className="absolute right-[-220px] top-[20%] h-[580px] w-[580px] rounded-full bg-[#8B5CF6]/25 blur-[160px]" />
          <div className="absolute bottom-[-240px] left-[30%] h-[520px] w-[520px] rounded-full bg-[#06B6D4]/15 blur-[150px]" />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[420px_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[42px] bg-gradient-to-br from-[#2563EB]/30 via-[#06B6D4]/15 to-[#D6B36A]/25 blur-2xl" />

            <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-white/[0.06] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
              <img
                className="h-[420px] w-full rounded-[30px] object-cover"
                src={image}
                alt={name}
              />

              <div className="absolute left-8 top-8 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur-xl">
                {isBooking ? "Booking Profile" : "VIP Profile"}
              </div>

              {celebrity?.isFeatured && (
                <div className="absolute bottom-8 left-8 inline-flex items-center gap-2 rounded-full bg-[#D6B36A] px-5 py-3 text-sm font-black text-[#05070F] shadow-[0_15px_35px_rgba(214,179,106,0.35)]">
                  <FaStar />
                  Featured
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#F2D38A] shadow-[0_15px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <FaCrown className="text-[#D6B36A]" />
              FANLY Premium Experience
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              {isBooking ? `Book ${name}` : `VIP Fan Card - ${name}`}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[#B9C2D0] sm:text-lg">
              {isBooking
                ? `Book ${name} for your event, appearance, or professional engagement. Our team will coordinate every detail for a smooth premium experience.`
                : `Join ${name}'s exclusive fan club and enjoy priority booking, discounted rates, special content, and personalized messages.`}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white shadow-sm backdrop-blur-xl">
                <FaMapMarkerAlt className="text-[#2563EB]" />
                {location}
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white shadow-sm backdrop-blur-xl">
                <FaUser className="text-[#06B6D4]" />
                {title}
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white shadow-sm backdrop-blur-xl">
                <FaCheckCircle className="text-[#16A34A]" />
                Verified profile
              </span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[26px] border border-[#D6B36A]/20 bg-[#D6B36A]/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F2D38A]">
                  {isBooking ? "Booking Fee" : "Fan Card Fee"}
                </p>

                <h3 className="mt-2 text-3xl font-black text-white">
                  $
                  {Number(isBooking ? bookingFee : fanCardFee).toLocaleString()}
                </h3>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#06B6D4]">
                  Secure Process
                </p>

                <p className="mt-2 text-sm font-bold leading-6 text-[#B9C2D0]">
                  Request created first. Payment and admin confirmation follow.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export function HelpCTA({ booking = false }) {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#05070F] px-4 py-20 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-180px] top-[-180px] h-[460px] w-[460px] rounded-full bg-[#2563EB]/20 blur-[140px]" />
        <div className="absolute bottom-[-200px] right-[-180px] h-[500px] w-[500px] rounded-full bg-[#D6B36A]/15 blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.06] p-8 text-center shadow-[0_35px_110px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-12"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563EB]/15 text-2xl text-[#06B6D4]">
          <FaComments />
        </div>

        <h2 className="text-3xl font-black text-white sm:text-4xl">
          {booking
            ? "Need help with your booking?"
            : "Need help with your request?"}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#B9C2D0] sm:text-base">
          Get in touch with our support team for personalized assistance,
          celebrity booking guidance, and exclusive packages.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#2563EB] px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_20px_45px_rgba(37,99,235,0.25)] transition hover:-translate-y-1"
            onClick={() => navigate("/contact")}
          >
            <FaComments />
            Contact Us
          </button>

          <button
            className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:border-[#D6B36A]/50 hover:text-[#F2D38A]"
            onClick={() => navigate("/contact")}
          >
            <FaPhoneAlt />
            Call Us
          </button>
        </div>
      </motion.div>
    </section>
  );
}

export function PageFooter() {
  return <Footer />;
}

export function FormHeader({
  title = "Get VIP Fan Card",
  subtitle = "Become a VIP fan with exclusive benefits and perks",
  button = "VIP Membership",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8 flex flex-col gap-5 rounded-[30px] border border-white/10 bg-white/[0.06] p-5 text-white shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between sm:p-6"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB]/15 text-xl text-[#06B6D4]">
          <FaCalendarAlt />
        </div>

        <div>
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-[#B9C2D0]">{subtitle}</p>
        </div>
      </div>

      <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D6B36A] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#05070F] shadow-[0_16px_35px_rgba(214,179,106,0.25)]">
        <FaCrown />
        {button}
      </button>
    </motion.div>
  );
}

export function Steps({ active = 1, booking = false, donation = false }) {
  const steps = donation
    ? ["Donation Info", "Charity", "Payment"]
    : booking
      ? ["Event Details", "Requirement", "Payment"]
      : ["Membership Details", "VIP Benefit", "Purchase Card"];

  const icons = [FaUser, FaStar, FaCreditCard];

  return (
    <div className="mb-8 grid gap-3 sm:grid-cols-3">
      {steps.map((s, i) => {
        const Icon = icons[i];
        const isActive = i === active;
        const isDone = i < active;

        return (
          <motion.div
            key={s}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`relative overflow-hidden rounded-2xl border p-4 transition ${
              isActive
                ? "border-[#D6B36A]/60 bg-[#D6B36A]/15 shadow-[0_18px_45px_rgba(214,179,106,0.12)]"
                : isDone
                  ? "border-[#16A34A]/50 bg-[#16A34A]/10"
                  : "border-white/10 bg-white/[0.05]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  isActive
                    ? "bg-[#D6B36A] text-[#05070F]"
                    : isDone
                      ? "bg-[#16A34A] text-white"
                      : "bg-white/10 text-[#B9C2D0]"
                }`}
              >
                {isDone ? <FaCheckCircle /> : <Icon />}
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#B9C2D0]">
                  Step {i + 1}
                </p>
                <h4 className="mt-1 font-black text-white">{s}</h4>
              </div>
            </div>

            {isActive && (
              <motion.div
                layoutId="activeStepLine"
                className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#D6B36A]"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export function Actions({ pay = false }) {
  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
      <button className="rounded-2xl border border-white/10 bg-white/[0.06] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:border-[#D6B36A]/50 hover:text-[#F2D38A]">
        ← Back
      </button>

      <button className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-8 py-4 text-sm font-black uppercase tracking-widest text-[#05070F] shadow-[0_20px_45px_rgba(214,179,106,0.25)] transition hover:-translate-y-1">
        {pay ? "Payment" : "Purchase Card"}
        <FaArrowRight />
      </button>
    </div>
  );
}
