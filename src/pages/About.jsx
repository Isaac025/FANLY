import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import about from "../assets/about.png";
import team1 from "../assets/team1.png";
import team2 from "../assets/team2.png";
import team3 from "../assets/team3.png";
import {
  FaVideo,
  FaUsers,
  FaIdCard,
  FaCalendarAlt,
  FaCrown,
  FaStar,
  FaBolt,
  FaGlobe,
  FaShieldAlt,
  FaHeart,
} from "react-icons/fa";

const services = [
  {
    icon: <FaVideo />,
    title: "Video Messages",
    description:
      "Personalized celebrity video messages for birthdays, anniversaries, surprises, and unforgettable moments.",
  },
  {
    icon: <FaUsers />,
    title: "Meet & Greet",
    description:
      "Exclusive celebrity access through premium meet-and-greet packages and private fan experiences.",
  },
  {
    icon: <FaIdCard />,
    title: "Fan Membership Card",
    description:
      "Unlock VIP benefits, priority access, special drops, and exclusive fan-only opportunities.",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Online Celebrity Bookings",
    description:
      "Book celebrities online with a smooth, secure, premium, and transparent booking experience.",
  },
];

const teamMembers = [
  {
    name: "Brooklyn Simmons",
    role: "FOUNDER / CEO",
    image: team1,
  },
  {
    name: "Phillip Tony",
    role: "PERSONNEL EXPERT",
    image: team2,
  },
  {
    name: "David Jones",
    role: "HEAD OF MARKETING",
    image: team3,
  },
];

const values = [
  {
    icon: <FaHeart />,
    title: "Human Connection",
    text: "We make celebrity access feel real, emotional, personal, and memorable.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Trusted Access",
    text: "Every experience is designed with professionalism, safety, and confidence.",
  },
  {
    icon: <FaGlobe />,
    title: "Global Fan Culture",
    text: "Fanly connects fans, creators, celebrities, and brands across the world.",
  },
];

const About = () => {
  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden bg-[#05070F] text-white">
        {/* Global background */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute left-[-160px] top-[-180px] h-[560px] w-[560px] rounded-full bg-[#D6B36A]/15 blur-[160px]" />
          <div className="absolute right-[-180px] top-[25%] h-[560px] w-[560px] rounded-full bg-[#4C3F91]/25 blur-[170px]" />
          <div className="absolute bottom-[-220px] left-[30%] h-[560px] w-[560px] rounded-full bg-[#1E3A5F]/30 blur-[170px]" />
        </div>

        <div className="relative z-10">
          {/* Hero */}
          <section className="relative min-h-screen px-5 pb-20 pt-36 md:pt-44">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 45, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9 }}
                className="text-center lg:text-left"
              >
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-xl">
                  <FaCrown className="text-[#F2D38A]" />
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                    About Fanly
                  </p>
                </div>

                <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl xl:text-8xl">
                  Real access.
                  <br />
                  Real emotions.
                  <br />
                  <span className="bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-white bg-clip-text text-transparent">
                    Real memories.
                  </span>
                </h1>

                <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#B9C2D0] md:text-lg lg:mx-0">
                  Fanly was built to close the distance between fans and the
                  celebrities they admire through live calls, fan rooms, VIP
                  memberships, personalized moments, and premium experiences.
                </p>

                <div className="mt-10 grid grid-cols-3 gap-3">
                  {[
                    ["100K+", "Fans"],
                    ["500+", "Stars"],
                    ["24/7", "Access"],
                  ].map(([num, label]) => (
                    <div
                      key={label}
                      className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 text-center backdrop-blur-xl"
                    >
                      <h3 className="text-2xl font-black text-[#F2D38A]">
                        {num}
                      </h3>
                      <p className="mt-1 text-xs text-[#B9C2D0]">{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 70, rotate: 4 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative mx-auto w-full max-w-[560px]"
              >
                <div className="absolute -inset-8 rounded-[50px] bg-gradient-to-br from-[#D6B36A]/25 via-[#4C3F91]/25 to-[#1E3A5F]/25 blur-3xl" />

                <motion.div
                  animate={{ y: [0, -16, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative overflow-hidden rounded-[44px] border border-white/10 bg-white/[0.08] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
                >
                  <img
                    src={about}
                    alt="About Fanly"
                    className="h-[520px] w-full rounded-[34px] object-cover"
                  />

                  <div className="absolute inset-4 rounded-[34px] bg-gradient-to-t from-[#05070F] via-transparent to-transparent" />

                  <div className="absolute bottom-8 left-8 right-8 rounded-[30px] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                      Our Mission
                    </p>
                    <h3 className="mt-2 text-2xl font-black">
                      Make celebrity access feel personal again.
                    </h3>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Story */}
          <section className="px-5 py-24">
            <div className="mx-auto max-w-7xl rounded-[44px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl md:p-14">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mx-auto max-w-4xl text-center"
              >
                <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-[#F2D38A]">
                  Why We Exist
                </p>

                <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">
                  We believe fans deserve more than likes, comments, and distant
                  screens.
                </h2>

                <p className="mt-6 text-base leading-8 text-[#B9C2D0] md:text-lg">
                  Fanly creates meaningful experiences that turn admiration into
                  real connection. Whether it is a birthday message, a private
                  fan room, a live call, or a premium celebrity booking, we make
                  every moment feel polished, trusted, and unforgettable.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Values */}
          <section className="px-5 py-20">
            <div className="mx-auto max-w-7xl">
              <div className="mb-12 text-center">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-[#F2D38A]">
                  Our Values
                </p>
                <h2 className="text-4xl font-black md:text-6xl">
                  Built on trust, emotion, and access.
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {values.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: index * 0.12 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="rounded-[36px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-2xl"
                  >
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-2xl text-[#05070F]">
                      {item.icon}
                    </div>

                    <h3 className="text-2xl font-black">{item.title}</h3>

                    <p className="mt-4 text-sm leading-7 text-[#B9C2D0]">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="px-5 py-24">
            <div className="mx-auto max-w-7xl">
              <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <div>
                  <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-[#F2D38A]">
                    What We Offer
                  </p>
                  <h2 className="max-w-3xl text-4xl font-black md:text-6xl">
                    Premium features for unforgettable fan access.
                  </h2>
                </div>

                <p className="max-w-md text-base leading-8 text-[#B9C2D0]">
                  Designed for fans, brands, event hosts, and anyone who wants
                  celebrity access to feel smooth, emotional, and professional.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 55, scale: 0.94 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: index * 0.12 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="group rounded-[38px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-2xl"
                  >
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-2xl text-[#05070F]">
                      {service.icon}
                    </div>

                    <h3 className="text-3xl font-black">{service.title}</h3>

                    <p className="mt-4 text-sm leading-7 text-[#B9C2D0]">
                      {service.description}
                    </p>

                    <div className="mt-6 flex items-center gap-3 text-xs font-black uppercase tracking-[0.25em] text-[#F2D38A]">
                      <span>Experience</span>
                      <FaBolt className="transition group-hover:translate-x-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="px-5 py-24">
            <div className="mx-auto max-w-7xl">
              <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <div>
                  <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-[#F2D38A]">
                    The Team
                  </p>

                  <h2 className="max-w-3xl text-4xl font-black md:text-6xl">
                    The people building the future of fan connection.
                  </h2>
                </div>

                <p className="max-w-md text-base leading-8 text-[#B9C2D0]">
                  A team focused on entertainment, access, trust, experience
                  design, and premium celebrity engagement.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 55, scale: 0.94 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: index * 0.12 }}
                    whileHover={{ y: -14, scale: 1.025 }}
                    className="group overflow-hidden rounded-[38px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-2xl"
                  >
                    <div className="relative h-[420px] overflow-hidden rounded-[30px]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#05070F] via-transparent to-transparent" />

                      <div className="absolute bottom-5 left-5 right-5">
                        <h3 className="text-2xl font-black">{member.name}</h3>

                        <p className="mt-2 text-xs font-black uppercase tracking-[0.25em] text-[#F2D38A]">
                          {member.role}
                        </p>
                      </div>

                      <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs font-black uppercase tracking-widest text-white backdrop-blur-xl">
                        Leadership
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-5 py-24">
            <motion.div
              initial={{ opacity: 0, y: 45, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="mx-auto max-w-6xl rounded-[46px] border border-white/10 bg-white/[0.07] p-8 text-center shadow-[0_45px_140px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:p-16"
            >
              <FaStar className="mx-auto mb-6 text-4xl text-[#F2D38A]" />

              <h2 className="text-4xl font-black leading-tight md:text-7xl">
                Celebrity access should feel extraordinary.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#B9C2D0]">
                Fanly exists to make every connection feel premium, emotional,
                secure, and impossible to forget.
              </p>
            </motion.div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default About;
