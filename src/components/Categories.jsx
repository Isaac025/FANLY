import React from "react";
import { motion } from "framer-motion";
import { FaCrown, FaMusic, FaFilm, FaMicrophone, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import category1 from "../assets/category1.png";
import category2 from "../assets/category2.png";
import category3 from "../assets/category3.png";
import category4 from "../assets/category4.png";

const categories = [
  {
    title: "Music Icons",
    subtitle: "Live reactions, shoutouts and private fan moments.",
    image: category1,
    icon: <FaMusic />,
  },
  {
    title: "Movie Stars",
    subtitle: "Premium access to faces fans already love.",
    image: category2,
    icon: <FaFilm />,
  },
  {
    title: "Influencers",
    subtitle: "Digital personalities with powerful fan communities.",
    image: category3,
    icon: <FaMicrophone />,
  },
  {
    title: "VIP Legends",
    subtitle: "Exclusive rooms, calls and unforgettable experiences.",
    image: category4,
    icon: <FaCrown />,
  },
];

const Categories = () => {
  const navgate = useNavigate();
  return (
    <section className="relative overflow-hidden px-5 py-24 text-white">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-[#D6B36A]/15 blur-[130px]" />
        <div className="absolute bottom-[-160px] right-[-120px] h-[460px] w-[460px] rounded-full bg-[#4C3F91]/25 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 35, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-xl">
              <FaStar className="text-[#F2D38A]" />
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                Categories
              </p>
            </div>

            <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">
              Browse celebrity worlds built for unforgettable access.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-md text-base leading-8 text-[#B9C2D0] md:text-lg"
          >
            Explore music, film, digital creators, icons and VIP personalities
            through a premium discovery experience designed to feel alive.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 60,
                scale: 0.92,
                rotateX: 18,
                filter: "blur(14px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.85,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -16,
                scale: 1.03,
                rotate: index % 2 === 0 ? -1.2 : 1.2,
              }}
              className="group relative min-h-[460px] overflow-hidden rounded-[38px] border border-white/10 bg-white/[0.06] shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070F] via-[#05070F]/55 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#D6B36A]/20 via-transparent to-[#4C3F91]/25 opacity-0 transition duration-700 group-hover:opacity-100" />

              {/* Floating shine */}
              <div className="absolute -left-24 top-0 h-full w-24 rotate-12 bg-white/20 blur-2xl transition duration-1000 group-hover:left-[120%]" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-xl text-[#05070F] shadow-[0_0_35px_rgba(214,179,106,0.45)]">
                  {item.icon}
                </div>

                <h3 className="text-3xl font-black tracking-[-0.03em]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#D8DEE9]">
                  {item.subtitle}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-xs font-black uppercase tracking-[0.25em] text-[#F2D38A]">
                    Explore
                  </span>

                  <div onClick={() => navgate("/book-celebrity")}>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition duration-300 group-hover:bg-[#F2D38A] group-hover:text-[#05070F]">
                      →
                    </span>
                  </div>
                </div>
              </div>

              {/* Top tag */}
              <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-xl">
                Premium
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom luxury strip instead of removed button */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm font-semibold text-[#B9C2D0] md:text-base">
              Curated celebrity experiences across entertainment, lifestyle,
              music, film and digital culture.
            </p>

            <div className="flex items-center gap-3 text-[#F2D38A]">
              <span className="h-2 w-2 rounded-full bg-[#F2D38A] shadow-[0_0_18px_#F2D38A]" />
              <span className="text-xs font-black uppercase tracking-[0.25em]">
                Live discovery
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
