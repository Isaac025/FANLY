import React from "react";
import { motion } from "framer-motion";
import {
  FaVideo,
  FaUsers,
  FaIdCard,
  FaCalendarAlt,
  FaCrown,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

const services = [
  {
    icon: <FaVideo />,
    title: "Video Messages",
    tag: "Personalized",
    description:
      "Purchase personalized video messages from your favorite celebrities for birthdays, anniversaries, surprises, and unforgettable special moments.",
  },
  {
    icon: <FaUsers />,
    title: "Meet & Greet",
    tag: "VIP Access",
    description:
      "Meet your favorite celebrities through exclusive meet-and-greet packages, fan rooms, private access, and premium live experiences.",
  },
  {
    icon: <FaIdCard />,
    title: "Fan Membership Card",
    tag: "Exclusive",
    description:
      "Unlock exclusive benefits, discounts, priority access, special updates, and premium fan-only celebrity opportunities.",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Online Celebrity Bookings",
    tag: "Seamless",
    description:
      "Book celebrities online for events with a smooth, secure, transparent, and premium booking experience from start to finish.",
  },
];

const OurServices = () => {
  return (
    <section className="relative overflow-hidden px-5 py-24 text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-140px] top-[-100px] h-[440px] w-[440px] rounded-full bg-[#D6B36A]/10 blur-[140px]" />
        <div className="absolute bottom-[-160px] right-[-120px] h-[500px] w-[500px] rounded-full bg-[#4C3F91]/25 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
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
                Our Services
              </p>
            </div>

            <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">
              Premium features designed for unforgettable fan access.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-md text-base leading-8 text-[#B9C2D0] md:text-lg"
          >
            Every service is built to feel personal, secure, cinematic, and
            exclusive, giving fans a more meaningful way to connect with the
            people they admire.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{
                opacity: 0,
                y: 55,
                scale: 0.94,
                filter: "blur(14px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -12,
                scale: 1.02,
              }}
              className="group relative overflow-hidden rounded-[38px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_35px_110px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D6B36A]/15 via-transparent to-[#4C3F91]/25 opacity-0 transition duration-700 group-hover:opacity-100" />

              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#D6B36A]/10 blur-3xl transition duration-700 group-hover:bg-[#D6B36A]/20" />

              <div className="relative flex flex-col gap-8 md:flex-row md:items-start">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-3xl text-[#05070F] shadow-[0_0_45px_rgba(214,179,106,0.35)]">
                  {service.icon}
                </div>

                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#F2D38A] backdrop-blur-xl">
                    <FaStar />
                    {service.tag}
                  </div>

                  <h3 className="text-3xl font-black tracking-[-0.03em]">
                    {service.title}
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[#B9C2D0] md:text-base">
                    {service.description}
                  </p>

                 
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom premium strip */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10 rounded-[34px] border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur-xl"
        >
          <p className="mx-auto max-w-4xl text-sm leading-7 text-[#B9C2D0] md:text-base">
            From personalized videos to live VIP access, every interaction is
            crafted to feel smooth, emotional, premium, and worth remembering.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices;
