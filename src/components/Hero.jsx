import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaStar,
  FaVideo,
  FaUsers,
  FaHeart,
  FaCrown,
  FaBolt,
} from "react-icons/fa";
import { useState } from "react";

 
import HeroPreviewModal from "./HeroPreviewModal";

const floatingCards = [
  {
    name: "Live Fan Room",
    text: "4.8K fans watching now",
    icon: <FaUsers />,
  },
  {
    name: "VIP Moment",
    text: "Private celebrity access",
    icon: <FaCrown />,
  },
  {
    name: "Live Call",
    text: "Starting in 02:15",
    icon: <FaVideo />,
  },
];

const Hero = () => {
  const navigate = useNavigate();
  
const [showPreview, setShowPreview] = useState(false);


  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05070F] px-5 pt-36 text-white md:pt-44">
      {/* Luxury Background */}
      <div className="absolute inset-0">
        <div className="absolute left-[-12%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[#1E3A5F]/50 blur-[140px]" />
        <div className="absolute right-[-12%] top-[12%] h-[500px] w-[500px] rounded-full bg-[#4C3F91]/30 blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[35%] h-[520px] w-[520px] rounded-full bg-[#C7A76C]/20 blur-[150px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#05070F_75%)]" />
      </div>

      {/* Premium Floating Particles */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(22)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#D6B36A]/70 shadow-[0_0_22px_#D6B36A]"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 29) % 100}%`,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.15, 1, 0.15],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 25, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-xl"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#D6B36A] shadow-[0_0_18px_#D6B36A]" />
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E7D7B1] sm:text-xs">
              Premium celebrity access platform
            </p>
          </motion.div>

          <div className="space-y-2">
            {["REAL FANS.", "REAL ACCESS.", "REAL CONNECTIONS."].map(
              (text, index) => (
                <motion.h1
                  key={text}
                  initial={{
                    opacity: 0,
                    y: 55,
                    scale: 0.96,
                    filter: "blur(18px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-[42px] font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-[64px] md:text-[82px] xl:text-[96px]"
                >
                  {text}
                </motion.h1>
              ),
            )}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#B9C2D0] md:text-xl lg:mx-0"
          >
            A new way to connect with celebrities through live calls, fan rooms,
            reactions, private moments, and exclusive experiences built to feel
            personal, premium, and unforgettable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <button
              onClick={() => navigate("/book-celebrity")}
              className="rounded-full bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-8 py-4 text-sm font-black uppercase tracking-widest text-[#05070F] shadow-[0_0_45px_rgba(214,179,106,0.35)] transition duration-300 hover:scale-105"
            >
              Book Your Experience
            </button>

            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-xl transition hover:bg-white/15"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#05070F]">
                <FaPlay className="text-xs" />
              </span>
              Watch Preview
            </button>
          </motion.div>
        </div>

        {/* Right Cinematic Visual */}
        <motion.div
          initial={{ opacity: 0, x: 70, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative mx-auto w-full max-w-[560px] pb-20 lg:pb-0"
        >
          <div className="absolute -inset-8 rounded-[50px] bg-gradient-to-br from-[#D6B36A]/25 via-[#4C3F91]/25 to-[#1E3A5F]/25 blur-3xl" />

          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.08] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          >
            <div className="relative h-[420px] overflow-hidden rounded-[32px] bg-gradient-to-br from-[#111827] via-[#172033] to-[#05070F] md:h-[520px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#D6B36A44,transparent_35%),radial-gradient(circle_at_bottom_right,#4C3F9144,transparent_40%)]" />

              <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#F2D38A] backdrop-blur-xl md:text-xs">
                Live now
              </div>

              <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-bold text-white backdrop-blur-xl md:text-xs">
                <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_15px_red]" />
                2.8K watching
              </div>

              <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-xl md:h-52 md:w-52">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#D6B36A] to-[#F2D38A] text-3xl text-[#05070F] shadow-[0_0_55px_rgba(214,179,106,0.55)] md:h-32 md:w-32">
                  <FaHeart />
                </div>
              </div>

              {floatingCards.map((card, index) => (
                <motion.div
                  key={card.name}
                  animate={{
                    x: [0, index % 2 === 0 ? 14 : -14, 0],
                    y: [0, index % 2 === 0 ? -18 : 18, 0],
                  }}
                  transition={{
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl ${
                    index === 0
                      ? "left-5 top-24"
                      : index === 1
                        ? "right-5 top-40"
                        : "left-5 bottom-28"
                  }`}
                >
                  <div className="mb-2 text-[#F2D38A]">{card.icon}</div>
                  <h4 className="text-sm font-black">{card.name}</h4>
                  <p className="mt-1 max-w-[150px] text-xs text-[#B9C2D0]">
                    {card.text}
                  </p>
                </motion.div>
              ))}

              <div className="absolute bottom-5 left-5 right-5 rounded-[30px] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black md:text-2xl">
                      A-list Experience
                    </h3>
                    <p className="mt-1 text-xs text-[#B9C2D0] md:text-sm">
                      Private calls, fan rooms, reactions and VIP access.
                    </p>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D6B36A] text-[#05070F] md:h-14 md:w-14">
                    <FaBolt />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-2 left-4 hidden rounded-[28px] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl md:block"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="Fan"
                className="h-11 w-11 rounded-full"
              />
              <div>
                <p className="text-sm font-black">Faith just booked</p>
                <p className="text-xs text-[#B9C2D0]">“This felt unreal.”</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-2 bottom-20 hidden rounded-[28px] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl md:block"
          >
            <div className="flex items-center gap-3">
              <FaStar className="text-[#F2D38A]" />
              <div>
                <p className="text-sm font-black">4.98 Rating</p>
                <p className="text-xs text-[#B9C2D0]">Premium experience</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <HeroPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </section>
  );
};

export default Hero;
