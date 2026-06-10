import React from "react";
import { motion } from "framer-motion";
import { FaHandshake, FaCrown, FaGlobe, FaShieldAlt } from "react-icons/fa";

import partner1 from "../assets/partner1.png";
import partner2 from "../assets/partner2.png";
import partner3 from "../assets/partner3.png";
import partner4 from "../assets/partner4.png";
import partner5 from "../assets/partner5.png";
import partner6 from "../assets/partner6.png";

const logos = [partner1, partner2, partner3, partner4, partner5, partner6];

const trustItems = [
  {
    icon: <FaCrown />,
    title: "Premium Access",
    text: "Entertainment-grade celebrity experiences.",
  },
  {
    icon: <FaGlobe />,
    title: "Global Reach",
    text: "Built for fans, creators and brands worldwide.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Verified Network",
    text: "Trusted partnerships and secure bookings.",
  },
];

const OurPartners = () => {
  return (
    <section className="relative overflow-hidden bg-[#05070F] px-5 py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-140px] top-[-120px] h-[460px] w-[460px] rounded-full bg-[#D6B36A]/10 blur-[140px]" />
        <div className="absolute bottom-[-160px] right-[-120px] h-[520px] w-[520px] rounded-full bg-[#4C3F91]/25 blur-[150px]" />
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
              <FaHandshake className="text-[#F2D38A]" />
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                Our Partners
              </p>
            </div>

            <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">
              Trusted by entertainment brands shaping global fan culture.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-md text-base leading-8 text-[#B9C2D0] md:text-lg"
          >
            We collaborate with leading entertainment brands, studios and media
            networks to bring premium celebrity access closer to fans.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.06] py-8 shadow-[0_40px_120px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
        >
          <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#05070F] to-transparent md:w-40" />
          <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#05070F] to-transparent md:w-40" />

          <div className="mb-8 flex items-center justify-center gap-3 text-center">
            <span className="h-2 w-2 rounded-full bg-[#F2D38A] shadow-[0_0_18px_#F2D38A]" />
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
              Moving partner network
            </p>
          </div>

          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 55,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex min-w-max items-center gap-8 px-4"
            >
              {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="group flex h-24 w-52 shrink-0 items-center justify-center rounded-[28px] border border-[#D6B36A]/20 bg-white px-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition duration-500 hover:-translate-y-2 hover:border-[#D6B36A]/50 md:h-28 md:w-60"
                >
                  <img
                    src={logo}
                    alt="partner logo"
                    className="max-h-16 w-full object-contain opacity-100 brightness-110 contrast-125 transition duration-500 group-hover:scale-110 md:max-h-20"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 45, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: index * 0.12 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group rounded-[34px] border border-white/10 bg-white/[0.06] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-xl text-[#05070F] shadow-[0_0_35px_rgba(214,179,106,0.35)]">
                {item.icon}
              </div>

              <h3 className="text-2xl font-black tracking-[-0.03em]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#B9C2D0]">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.30 }}
          className="mt-8 overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-r from-[#D6B36A]/10 via-white/[0.06] to-[#4C3F91]/20 p-6 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="max-w-3xl text-sm leading-7 text-[#B9C2D0] md:text-base">
              From major studios to global entertainment networks, Fanly is
              designed to make celebrity access feel polished, trusted and
              unforgettable.
            </p>

            <div className="flex items-center gap-3 text-[#F2D38A]">
              <span className="h-2 w-2 rounded-full bg-[#F2D38A] shadow-[0_0_18px_#F2D38A]" />
              <span className="text-xs font-black uppercase tracking-[0.25em]">
                Premium Network
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurPartners;
