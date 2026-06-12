import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { HelpCTA, PageFooter } from "./BookingShared";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import featured from "../assets/featured.png";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FaCalendarCheck,
  FaChevronLeft,
  FaChevronRight,
  FaCrown,
  FaGift,
  FaHeart,
  FaSearch,
  FaShieldAlt,
  FaStar,
  FaUsers,
  FaVideo,
} from "react-icons/fa";

const Navbar = lazy(() => import("../components/Navbar"));

const PER_PAGE = 8;

export default function BookCelebrity() {
  const navigate = useNavigate();
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
        const { data } = await axiosInstance.get("/celebrities");
        setCelebrities(data.data || []);
      } catch (error) {
        toast.error(error.message || "Could not load celebrities");
      } finally {
        setLoading(false);
      }
    };

    fetchCelebrities();
  }, []);

  const filteredCelebrities = useMemo(() => {
    return celebrities.filter((celebrity) => {
      const name = celebrity.name?.toLowerCase() || "";
      const title = celebrity.title?.toLowerCase() || "";
      const category = celebrity.category?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      return (
        name.includes(search) ||
        title.includes(search) ||
        category.includes(search)
      );
    });
  }, [celebrities, searchTerm]);

  const totalPages = Math.ceil(filteredCelebrities.length / PER_PAGE) || 1;

  const paginatedCelebrities = filteredCelebrities.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const goToPage = (path, celebrity) => {
    navigate(path, {
      state: { celebrity },
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#05070F] text-white">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <main className="relative">
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute left-[-180px] top-[-160px] h-[560px] w-[560px] rounded-full bg-[#D6B36A]/15 blur-[160px]" />
          <div className="absolute right-[-200px] top-[20%] h-[560px] w-[560px] rounded-full bg-[#4C3F91]/25 blur-[170px]" />
          <div className="absolute bottom-[-240px] left-[25%] h-[560px] w-[560px] rounded-full bg-[#1E3A5F]/30 blur-[170px]" />
        </div>

        <section className="relative z-10 px-5 pb-16 pt-36 md:pt-44">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 45, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9 }}
            >
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-xl">
                <FaCrown className="text-[#F2D38A]" />
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                  Celebrity Booking
                </p>
              </div>

              <h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.06em] md:text-7xl xl:text-8xl">
                Book the face that makes your{" "}
                <span className="bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-white bg-clip-text text-transparent">
                  event unforgettable.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-[#B9C2D0] md:text-lg">
                Discover premium celebrities for private events, brand
                campaigns, fan experiences, video calls, VIP memberships, and
                unforgettable appearances.
              </p>

              <div className="mt-9 grid max-w-2xl grid-cols-3 gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
                  <h3 className="text-2xl font-black text-[#F2D38A]">4.9</h3>
                  <p className="mt-1 text-xs text-[#B9C2D0]">Avg Rating</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
                  <h3 className="text-2xl font-black text-[#F2D38A]">VIP</h3>
                  <p className="mt-1 text-xs text-[#B9C2D0]">Access</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
                  <h3 className="text-2xl font-black text-[#F2D38A]">24h</h3>
                  <p className="mt-1 text-xs text-[#B9C2D0]">Support</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 rounded-[54px] bg-[#D6B36A]/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[54px] border border-white/10 bg-white/[0.07] p-6 shadow-[0_45px_140px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                <div className="relative overflow-hidden rounded-[42px] border border-white/10 bg-black/25">
                  <img
                    src={featured}
                    alt="Featured celebrity"
                    className="h-[520px] w-full object-cover opacity-90"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070F] via-[#05070F]/35 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#D6B36A] px-4 py-2 text-xs font-black uppercase tracking-widest text-[#05070F]">
                      <FaStar />
                      Featured Talent
                    </div>

                    <h3 className="text-4xl font-black tracking-[-0.04em]">
                      Premium roster.
                    </h3>

                    <p className="mt-3 max-w-sm text-sm leading-7 text-[#B9C2D0]">
                      Select your celebrity, choose your experience, and start
                      the booking process instantly.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative z-10 px-5 pb-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[40px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl md:p-6">
              <div className="relative">
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#F2D38A]" />
                <input
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search celebrity, actor, musician, creator..."
                  className="w-full rounded-full border border-white/10 bg-black/25 py-4 pl-12 pr-5 text-sm text-white outline-none placeholder:text-[#8B95A5] focus:border-[#D6B36A]/60"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 px-5 pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                  Featured Celebrities
                </p>

                <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] md:text-6xl">
                  Choose your star.
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-[#B9C2D0]">
                Showing {paginatedCelebrities.length} of{" "}
                {filteredCelebrities.length} available celebrities.
              </p>
            </div>

            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.06] p-4"
                  >
                    <div className="h-72 rounded-[26px] bg-white/10" />
                    <div className="mt-5 h-5 w-32 rounded bg-white/10" />
                    <div className="mt-3 h-4 w-24 rounded bg-white/10" />
                    <div className="mt-5 h-11 rounded-full bg-white/10" />
                  </div>
                ))}
              </div>
            ) : paginatedCelebrities.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {paginatedCelebrities.map((celebrity, index) => (
                  <motion.div
                    key={celebrity._id}
                    initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.06 }}
                    whileHover={{ y: -10 }}
                    className="group relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.06] p-4 shadow-[0_35px_110px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition hover:border-[#D6B36A]/50"
                  >
                    <div className="relative overflow-hidden rounded-[26px]">
                      <img
                        src={celebrity.image || featured}
                        alt={celebrity.name}
                        className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#05070F] via-transparent to-transparent" />

                      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[#D6B36A] px-3 py-2 text-[10px] font-black uppercase tracking-widest text-[#05070F]">
                        <FaCrown />
                        {celebrity.isFeatured ? "Featured" : "Verified"}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h3 className="text-2xl font-black tracking-[-0.03em]">
                              {celebrity.name}
                            </h3>
                            <p className="text-sm text-[#B9C2D0]">
                              {celebrity.title || "Celebrity"}
                            </p>
                          </div>

                          <div className="rounded-full bg-black/45 px-3 py-2 text-xs font-black text-[#F2D38A] backdrop-blur-xl">
                            ⭐ 4.9
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
                        <FaVideo className="mx-auto text-[#F2D38A]" />
                        <p className="mt-2 text-[10px] text-[#B9C2D0]">Video</p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
                        <FaUsers className="mx-auto text-[#F2D38A]" />
                        <p className="mt-2 text-[10px] text-[#B9C2D0]">Event</p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
                        <FaShieldAlt className="mx-auto text-[#F2D38A]" />
                        <p className="mt-2 text-[10px] text-[#B9C2D0]">
                          Secure
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <button
                        className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-4 py-3 text-xs font-black uppercase tracking-widest text-[#05070F] transition hover:scale-[1.03]"
                        onClick={() => goToPage("/booking", celebrity)}
                      >
                        <FaCalendarCheck />
                        Book
                      </button>

                      <button
                        onClick={() => goToPage("/donation", celebrity)}
                        className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:border-[#D6B36A]/50 hover:text-[#F2D38A]"
                      >
                        <FaHeart />
                        Donate
                      </button>
                    </div>

                    <button
                      onClick={() => goToPage("/vip-membership", celebrity)}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#D6B36A]/40 bg-[#D6B36A]/10 px-4 py-3 text-xs font-black uppercase tracking-widest text-[#F2D38A] transition hover:bg-[#D6B36A] hover:text-[#05070F]"
                    >
                      <FaGift />
                      Fan Card
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="rounded-[34px] border border-white/10 bg-white/[0.06] p-10 text-center backdrop-blur-2xl">
                <h3 className="text-3xl font-black">No celebrity found</h3>
                <p className="mt-3 text-[#B9C2D0]">
                  Try another search keyword.
                </p>
              </div>
            )}

            {!loading && filteredCelebrities.length > PER_PAGE && (
              <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[#F2D38A] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-[#D6B36A]/60 hover:bg-[#D6B36A] hover:text-[#05070F] disabled:cursor-not-allowed disabled:opacity-25"
                >
                  <FaChevronLeft />
                </button>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative flex h-12 w-12 items-center justify-center rounded-full text-sm font-black transition ${
                        currentPage === page
                          ? "border-4 border-[#D6B36A]/30 bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-[#05070F] shadow-[0_0_35px_rgba(214,179,106,0.4)]"
                          : "border border-white/10 bg-white/[0.06] text-white hover:border-[#D6B36A]/60 hover:text-[#F2D38A]"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[#F2D38A] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-[#D6B36A]/60 hover:bg-[#D6B36A] hover:text-[#05070F] disabled:cursor-not-allowed disabled:opacity-25"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="relative z-10 px-5 pb-24">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            <div className="rounded-[34px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-2xl">
              <FaCalendarCheck className="text-3xl text-[#F2D38A]" />
              <h3 className="mt-5 text-2xl font-black">Book in minutes</h3>
              <p className="mt-3 text-sm leading-7 text-[#B9C2D0]">
                Pick a celebrity, submit your event details, and continue to the
                booking flow.
              </p>
            </div>

            <div className="rounded-[34px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-2xl">
              <FaShieldAlt className="text-3xl text-[#F2D38A]" />
              <h3 className="mt-5 text-2xl font-black">Secure experience</h3>
              <p className="mt-3 text-sm leading-7 text-[#B9C2D0]">
                Your booking, fan card, and donation requests are handled with a
                polished process.
              </p>
            </div>

            <div className="rounded-[34px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-2xl">
              <FaCrown className="text-3xl text-[#F2D38A]" />
              <h3 className="mt-5 text-2xl font-black">VIP ready</h3>
              <p className="mt-3 text-sm leading-7 text-[#B9C2D0]">
                Upgrade the experience with premium fan access and exclusive
                membership options.
              </p>
            </div>
          </div>
        </section>

        <div className="relative z-10">
          <HelpCTA booking />
          <PageFooter />
        </div>
      </main>
    </div>
  );
}
