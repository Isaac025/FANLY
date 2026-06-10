import React, { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Featured from "../components/Featured";
import OurServices from "../components/OurServices";
import OurPartners from "../components/OurPartners";
import Gallery from "../components/Gallery";
import NewsLetter from "../components/NewsLetter";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: 50, suffix: "+", label: "Celebrity Events" },
  { value: 100, suffix: "K+", label: "Happy Fans" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 24, suffix: "/7", label: "Premium Support" },
];

const liveStats = [
  {
    value: 18.7,
    suffix: "K",
    title: "FANS ONLINE",
    detail: "ACTIVE USERS",
  },
  { value: 324, suffix: "+", title: "Live Calls", detail: "HAPPENING TODAY" },
  { value: 9.8, suffix: "K", title: "Bookings", detail: "THIS MONTH" },
  { value: 120, suffix: "+", title: "Trending Stars", detail: "AVAILABLE NOW" },
];

const journey = [
  "Discover your favorite celebrity",
  "Book a premium experience",
  "Connect live or privately",
  "Create a moment you will never forget",
];

const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const hasDecimal = value % 1 !== 0;
    return hasDecimal ? latest.toFixed(1) : Math.round(latest);
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2.2,
        ease: "easeOut",
      });

      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="relative overflow-hidden bg-[#05070F] text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-140px] top-[-180px] h-[560px] w-[560px] rounded-full bg-[#1E3A5F]/45 blur-[150px]" />
        <div className="absolute right-[-160px] top-[20%] h-[520px] w-[520px] rounded-full bg-[#4C3F91]/30 blur-[160px]" />
        <div className="absolute bottom-[-180px] left-[35%] h-[560px] w-[560px] rounded-full bg-[#C7A76C]/20 blur-[160px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />

        {/* Animated Stats */}
        <section className="relative px-5 py-24">
          <div className="mx-auto max-w-7xl rounded-[45px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_40px_130px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-10">
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.12 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0B1020]/80 p-6 text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D6B36A]/20 via-white/5 to-[#4C3F91]/20 opacity-0 transition duration-500 group-hover:opacity-100" />

                  <h2 className="relative bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-white bg-clip-text text-4xl font-black text-transparent md:text-6xl">
                    <Counter value={item.value} suffix={item.suffix} />
                  </h2>

                  <p className="relative mt-3 text-sm font-semibold text-[#B9C2D0] md:text-lg">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Discovery */}
        <section className="relative overflow-hidden bg-[#05070F] px-5 py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#D6B36A33,transparent_35%),radial-gradient(circle_at_bottom_right,#4C3F9144,transparent_40%)]" />

          <div className="relative mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-14 text-center"
            >
              <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-[#F2D38A]">
                Celebrity Discovery
              </p>

              <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight md:text-7xl">
                A cinematic world for unforgettable fan moments.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg text-[#B9C2D0]">
                Discover trending stars, live calls, fan rooms, exclusive
                reactions, and VIP celebrity experiences.
              </p>
            </motion.div>

            <Categories />
            <Featured />
          </div>
        </section>

        {/* Live Activity */}
        <section className="relative px-5 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                  Live Activity
                </p>

                <h2 className="max-w-3xl text-4xl font-black md:text-6xl">
                  Feel the platform breathing in real time.
                </h2>
              </div>

              <p className="max-w-md text-[#B9C2D0]">
                Pulse indicators, live counters, trending moments, and premium
                activity signals make the experience feel alive.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {liveStats.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 45, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, delay: index * 0.12 }}
                  whileHover={{ y: -10 }}
                  className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-2xl"
                >
                  <span className="absolute right-5 top-5 h-3 w-3 rounded-full bg-[#D6B36A] shadow-[0_0_25px_#D6B36A]" />

                  <p className="text-sm font-bold uppercase tracking-widest text-[#B9C2D0]">
                    {item.title}
                  </p>

                  <h3 className="mt-5 text-5xl font-black text-[#F2D38A]">
                    <Counter value={item.value} suffix={item.suffix} />
                  </h3>

                  <p className="mt-3 text-[#B9C2D0]">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fan Journey */}
        <section className="relative overflow-hidden bg-[#0B1020] px-5 py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D6B36A]/10 via-transparent to-[#4C3F91]/25" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-[#F2D38A]">
                Fan Journey
              </p>

              <h2 className="text-4xl font-black md:text-6xl">
                From discovery to unforgettable connection.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              {journey.map((text, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: 50, rotateX: 20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, delay: index * 0.15 }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  className="rounded-[34px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl"
                >
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-xl font-black text-[#05070F]">
                    {index + 1}
                  </div>

                  <h3 className="text-2xl font-black">{text}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative px-5 py-24">
          <div className="mx-auto max-w-7xl">
            <OurServices />
          </div>
        </section>

        <section className="relative bg-[#080C18] px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <OurPartners />
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-[#05070F] px-5 py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#D6B36A44,transparent_30%),radial-gradient(circle_at_80%_30%,#4C3F9155,transparent_35%),radial-gradient(circle_at_50%_90%,#1E3A5F55,transparent_35%)]" />

          <motion.div
            initial={{ opacity: 0, y: 45, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative mx-auto max-w-5xl rounded-[45px] border border-white/10 bg-white/[0.08] p-8 text-center shadow-[0_40px_130px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:p-16"
          >
            <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-[#F2D38A]">
              Premium Experience
            </p>

            <h2 className="text-4xl font-black leading-tight md:text-7xl">
              Your Favorite Celebrity Is One Click Away.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-[#B9C2D0] md:text-xl">
              Create bespoke celebrity experiences for private events, fan
              surprises, birthdays, live rooms, and once-in-a-lifetime moments.
            </p>

            <button
              onClick={() => {
                navigate("/book-celebrity");
                scrollTo(0, 0);
              }}
              className="mt-10 cursor-pointer rounded-full bg-linear-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-10 py-5 text-sm font-black uppercase tracking-widest text-[#05070F] shadow-[0_0_45px_rgba(214,179,106,0.45)] transition duration-300 hover:scale-105"
            >
              BOOK YOUR CELEBRITY NOW
            </button>
          </motion.div>
        </section>

        <Gallery />
        <NewsLetter />

        <section className="relative bg-[#05070F] px-5 py-20">
          <Testimonials />
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default Home;
