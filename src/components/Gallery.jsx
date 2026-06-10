import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCamera, FaTimes, FaStar } from "react-icons/fa";

import gallery1 from "../assets/gallery1.png";
import gallery2 from "../assets/gallery2.png";
import gallery3 from "../assets/gallery3.png";
import gallery4 from "../assets/gallery4.png";
import gallery5 from "../assets/gallery5.png";
import gallery6 from "../assets/gallery6.png";
import gallery7 from "../assets/gallery7.png";
import gallery8 from "../assets/gallery8.png";

const categories = ["All", "Events", "Meet and greet", "Shows"];

const images = [
  {
    img: gallery1,
    category: "Events",
    title: "Premium Stage Moment",
    text: "Live celebrity experience with fans.",
  },
  {
    img: gallery2,
    category: "Meet and greet",
    title: "Private Fan Access",
    text: "A closer connection beyond the crowd.",
  },
  {
    img: gallery3,
    category: "Shows",
    title: "Spotlight Performance",
    text: "Energy, lights and unforgettable reactions.",
  },
  {
    img: gallery4,
    category: "Events",
    title: "Red Carpet Energy",
    text: "Luxury entertainment moments captured live.",
  },
  {
    img: gallery5,
    category: "Meet and greet",
    title: "Fan Room Connection",
    text: "Personal access designed to feel special.",
  },
  {
    img: gallery6,
    category: "Shows",
    title: "Live Crowd Moment",
    text: "Fans experiencing the magic in real time.",
  },
  {
    img: gallery7,
    category: "Events",
    title: "Exclusive Arrival",
    text: "Premium access from the first moment.",
  },
  {
    img: gallery8,
    category: "Shows",
    title: "Behind The Lights",
    text: "Cinematic celebrity moments fans remember.",
  },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((item) => item.category === activeCategory);

  return (
    <section className="relative overflow-hidden bg-[#05070F] px-5 py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-140px] top-[-120px] h-[460px] w-[460px] rounded-full bg-[#D6B36A]/10 blur-[140px]" />
        <div className="absolute bottom-[-160px] right-[-120px] h-[520px] w-[520px] rounded-full bg-[#4C3F91]/25 blur-[150px]" />
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
              <FaCamera className="text-[#F2D38A]" />
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                Gallery
              </p>
            </div>

            <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">
              A cinematic wall of fan moments, lights and celebrity energy.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-md text-base leading-8 text-[#B9C2D0] md:text-lg"
          >
            Explore curated moments from events, shows and meet-and-greet
            experiences without needing a backend gallery system.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex flex-wrap justify-center gap-3 lg:justify-start"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-5 py-3 text-xs font-black uppercase tracking-[0.2em] transition duration-300 ${
                activeCategory === category
                  ? "border-[#D6B36A] bg-[#D6B36A] text-[#05070F] shadow-[0_0_35px_rgba(214,179,106,0.35)]"
                  : "border-white/10 bg-white/[0.06] text-[#B9C2D0] hover:border-[#D6B36A]/50 hover:text-[#F2D38A]"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence>
            {filteredImages.map((item, index) => (
              <motion.div
                layout
                key={item.title}
                initial={{ opacity: 0, y: 45, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -12, scale: 1.03 }}
                onClick={() => setSelectedImage(item)}
                className={`group relative cursor-pointer overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.06] shadow-[0_35px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl ${
                  index === 0 || index === 5 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="relative h-[360px] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070F] via-[#05070F]/25 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D6B36A]/20 via-transparent to-[#4C3F91]/25 opacity-0 transition duration-700 group-hover:opacity-100" />

                  <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-[#F2D38A] backdrop-blur-xl">
                    {item.category}
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-2xl font-black tracking-[-0.03em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#D8DEE9]">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom strip instead of View Full Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 rounded-[34px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="max-w-3xl text-sm leading-7 text-[#B9C2D0] md:text-base">
              Every image tells a story of connection, excitement, and
              unforgettable moments. Explore exclusive experiences, celebrity
              encounters, live events, and behind-the-scenes memories shared by
              fans around the world.
            </p>

            <div className="flex items-center gap-3 text-[#F2D38A]">
              <span className="h-2 w-2 rounded-full bg-[#F2D38A] shadow-[0_0_18px_#F2D38A]" />
              <span className="text-xs font-black uppercase tracking-[0.25em]">
                Curated Moments
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[9998] bg-black/85 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-5xl overflow-hidden rounded-[38px] border border-white/10 bg-[#05070F] shadow-[0_40px_140px_rgba(0,0,0,0.85)]">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-xl"
                >
                  <FaTimes />
                </button>

                <img
                  src={selectedImage.img}
                  alt={selectedImage.title}
                  className="max-h-[80vh] w-full object-cover"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#05070F] to-transparent p-8">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#F2D38A] backdrop-blur-xl">
                    <FaStar />
                    {selectedImage.category}
                  </div>

                  <h3 className="text-3xl font-black md:text-5xl">
                    {selectedImage.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm text-[#B9C2D0] md:text-base">
                    {selectedImage.text}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;