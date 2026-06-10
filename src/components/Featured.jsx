import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import featured from "../assets/featured.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import {
  FaCrown,
  FaGift,
  FaStar,
  FaVideo,
  FaIdCard,
  FaBolt,
} from "react-icons/fa";

const Featured = () => {
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
        const { data } = await axiosInstance.get("/celebrities");
        const celebrities = data.data || [];

        setStars(celebrities.filter((item) => item.isFeatured).slice(0, 6));
      } catch (error) {
        toast.error(error.message || "Could not load celebrities");
      } finally {
        setLoading(false);
      }
    };

    fetchCelebrities();
  }, []);

  const goToPage = (path, celebrity) => {
    navigate(path, {
      state: { celebrity },
    });
  };

  return (
    <section className="relative overflow-hidden px-5 py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-150px] top-[10%] h-[420px] w-[420px] rounded-full bg-[#D6B36A]/10 blur-[130px]" />
        <div className="absolute right-[-160px] bottom-[-120px] h-[480px] w-[480px] rounded-full bg-[#4C3F91]/25 blur-[150px]" />
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
              <FaCrown className="text-[#F2D38A]" />
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                Featured Stars
              </p>
            </div>

            <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">
              Meet the stars everyone wants access to.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-md text-base leading-8 text-[#B9C2D0] md:text-lg"
          >
            Discover highly requested celebrities, book unforgettable moments,
            send support, or unlock premium fan membership experiences.
          </motion.p>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="min-h-[520px] animate-pulse rounded-[38px] border border-white/10 bg-white/[0.06] p-4"
              >
                <div className="mb-4 h-[350px] rounded-[30px] bg-white/10" />
                <div className="mb-3 h-6 w-40 rounded-full bg-white/10" />
                <div className="h-4 w-28 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stars.map((star, index) => (
                <motion.div
                  key={star._id}
                  initial={{
                    opacity: 0,
                    y: 60,
                    scale: 0.92,
                    rotateX: 16,
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
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    y: -14,
                    scale: 1.025,
                  }}
                  className="group relative overflow-hidden rounded-[38px] border border-white/10 bg-white/[0.06] p-4 shadow-[0_35px_110px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
                >
                  <div className="relative h-[360px] overflow-hidden rounded-[30px]">
                    <img
                      src={star.image || featured}
                      alt={star.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070F] via-[#05070F]/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D6B36A]/20 via-transparent to-[#4C3F91]/25 opacity-0 transition duration-700 group-hover:opacity-100" />

                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#F2D38A] backdrop-blur-xl">
                      <FaBolt />
                      Featured
                    </div>

                    <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-black text-white backdrop-blur-xl">
                      ⭐ 4.9
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-3xl font-black tracking-[-0.03em] text-white">
                        {star.name}
                      </h3>

                      <p className="mt-2 text-sm font-semibold text-[#D8DEE9]">
                        ● {star.title || star.category || "Celebrity"}
                      </p>
                    </div>
                  </div>

                  {/* Floating info row */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center">
                      <FaVideo className="mx-auto mb-2 text-[#F2D38A]" />
                      <p className="text-[11px] font-bold text-[#B9C2D0]">
                        Live Call
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center">
                      <FaGift className="mx-auto mb-2 text-[#F2D38A]" />
                      <p className="text-[11px] font-bold text-[#B9C2D0]">
                        Donate
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center">
                      <FaIdCard className="mx-auto mb-2 text-[#F2D38A]" />
                      <p className="text-[11px] font-bold text-[#B9C2D0]">
                        Fancard
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => goToPage("/booking", star)}
                      className="w-1/2 rounded-full bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-4 py-3 text-xs font-black uppercase tracking-widest text-[#05070F] shadow-[0_0_30px_rgba(214,179,106,0.3)] transition hover:scale-105"
                    >
                      Book
                    </button>

                    <button
                      onClick={() => goToPage("/donation", star)}
                      className="w-1/2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white/15"
                    >
                      Donate
                    </button>
                  </div>

                  <button
                    onClick={() => goToPage("/vip-membership", star)}
                    className="mt-3 flex w-full items-center justify-center gap-3 rounded-full border border-[#D6B36A]/30 bg-[#D6B36A]/10 px-4 py-3 text-xs font-black uppercase tracking-widest text-[#F2D38A] transition hover:bg-[#D6B36A] hover:text-[#05070F]"
                  >
                    <FaCrown />
                    Unlock Fancard
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12 flex justify-center"
            >
              <button
                onClick={() => navigate("/book-celebrity")}
                className="rounded-full bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-10 py-5 text-sm font-black uppercase tracking-widest text-[#05070F] shadow-[0_0_45px_rgba(214,179,106,0.45)] transition duration-300 hover:scale-105"
              >
                Explore All Stars
              </button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Featured;
