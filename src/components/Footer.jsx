import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaArrowRight,
  FaCrown,
  FaStar,
  FaBolt,
} from "react-icons/fa";

const companyLinks = ["Home", "About", "Contact", "Blog", "Careers", "News"];
const policyLinks = [
  "Terms of Use",
  "Privacy Policy",
  "Brand Guidelines",
  "Cookie Policy",
];

const socials = [
  { icon: <FaTwitter />, name: "Twitter" },
  { icon: <FaFacebookF />, name: "Facebook" },
  { icon: <FaYoutube />, name: "YouTube" },
  { icon: <FaInstagram />, name: "Instagram" },
  { icon: <FaLinkedinIn />, name: "LinkedIn" },
  { icon: <FaGithub />, name: "GitHub" },
];

const marquee = [
  "Celebrity Bookings",
  "VIP Access",
  "Fan Rooms",
  "Live Calls",
  "Premium Experiences",
  "Exclusive Drops",
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#05070F] px-5 pt-24 text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-160px] top-[-160px] h-[520px] w-[520px] rounded-full bg-[#D6B36A]/15 blur-[150px]" />
        <div className="absolute bottom-[-180px] right-[-160px] h-[560px] w-[560px] rounded-full bg-[#4C3F91]/25 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Top Final Scene CTA */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-[44px] border border-white/10 bg-white/[0.07] p-8 text-center shadow-[0_45px_140px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:p-14"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#D6B36A33,transparent_35%),radial-gradient(circle_at_bottom_right,#4C3F9144,transparent_40%)]" />

          <div className="relative">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-2xl text-[#05070F] shadow-[0_0_45px_rgba(214,179,106,0.45)]">
              <FaCrown />
            </div>

            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-[#F2D38A]">
              The Fanly Universe
            </p>

            <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight tracking-[-0.05em] md:text-7xl">
              The next unforgettable celebrity moment starts here.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#B9C2D0] md:text-lg">
              Join a premium fan experience built for live calls, VIP access,
              fan rooms, exclusive drops and celebrity moments worth sharing.
            </p>

            <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-full border border-white/10 bg-black/25 p-2 backdrop-blur-xl sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-4 text-white outline-none placeholder:text-[#8B95A5]"
              />

              <button className="flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-7 py-4 text-sm font-black uppercase tracking-widest text-[#05070F] transition hover:scale-105">
                Join
                <FaArrowRight />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Marquee */}
        <div className="relative my-12 overflow-hidden border-y border-white/10 py-5">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex min-w-max gap-8"
          >
            {[...marquee, ...marquee, ...marquee, ...marquee].map(
              (item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 text-sm font-black uppercase tracking-[0.35em] text-[#F2D38A]"
                >
                  <FaStar />
                  {item}
                </div>
              ),
            )}
          </motion.div>
        </div>

        {/* Main Footer */}
        <div className="grid gap-10 pb-14 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-1"
          >
            <h2 className="bg-gradient-to-r from-[#F2D38A] via-white to-[#9DB7FF] bg-clip-text text-5xl font-black tracking-[-0.06em] text-transparent">
              FANLY
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#B9C2D0]">
              Connect with your favorite celebrities. Book meet and greets,
              unlock VIP access, enter fan rooms and create unforgettable
              memories with the stars you love.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F2D38A] shadow-[0_0_18px_#F2D38A]" />
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#F2D38A]">
                Live Access
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h4 className="mb-5 text-sm font-black uppercase tracking-[0.25em] text-white">
              Company
            </h4>

            <ul className="space-y-3 text-sm text-[#B9C2D0]">
              {companyLinks.map((link) => (
                <li
                  key={link}
                  className="cursor-pointer transition hover:translate-x-2 hover:text-[#F2D38A]"
                >
                  {link}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h4 className="mb-5 text-sm font-black uppercase tracking-[0.25em] text-white">
              Socials
            </h4>

            <div className="grid grid-cols-2 gap-3">
              {socials.map((social) => (
                <div
                  key={social.name}
                  className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-[#B9C2D0] transition hover:border-[#D6B36A]/40 hover:bg-[#D6B36A]/10 hover:text-[#F2D38A]"
                >
                  <span className="transition group-hover:scale-125">
                    {social.icon}
                  </span>
                  {social.name}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h4 className="mb-5 text-sm font-black uppercase tracking-[0.25em] text-white">
              Legal
            </h4>

            <ul className="space-y-3 text-sm text-[#B9C2D0]">
              {policyLinks.map((link) => (
                <li
                  key={link}
                  className="cursor-pointer transition hover:translate-x-2 hover:text-[#F2D38A]"
                >
                  {link}
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6B36A] to-[#F2D38A] text-[#05070F]">
                <FaBolt />
              </div>
              <p className="text-sm leading-6 text-[#B9C2D0]">
                Built for premium celebrity access, fan trust and unforgettable
                experiences.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-center text-xs text-[#8B95A5] md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} FANLY. All rights reserved.</p>

          <p className="flex items-center gap-2">
            Designed for fans who want more than ordinary access.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
