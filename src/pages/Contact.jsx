import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCrown,
  FaClock,
  FaExternalLinkAlt,
  FaStar,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FORM_ENDPOINT = "https://formspree.io/f/xzdqaqdw";

const EMAIL = "support@fanlycelebrity.com";
const PHONE_1 = "+13362552553";
const DISPLAY_PHONE = "+1 440 723 1413";
const ADDRESS = "1243 N Highland Ave, Hollywood, CA 90038";

const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=1243%20N%20Highland%20Ave%20Hollywood%20CA%2090038";

const MAP_EMBED =
  "https://www.google.com/maps?q=1243%20N%20Highland%20Ave%20Hollywood%20CA%2090038&output=embed";

const contactCards = [
  {
    icon: <FaEnvelope />,
    title: "Email Us",
    text: "Send us a mail anytime. We’ll get back within 24 hours.",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    action: "Open Mail",
    external: true,
  },
  {
    icon: <FaPhoneAlt />,
    title: "Call Us",
    text: "Speak directly with our support team during office hours.",
    value: DISPLAY_PHONE,
    href: `tel:${PHONE_1}`,
    action: "Call Now",
  },

  {
    icon: <FaClock />,
    title: "Office Hours",
    text: "We are available for fan support and booking inquiries.",
    value: "Mon - Fri, 9AM - 5PM",
    external: true,
  },
];

const highlights = [
  {
    icon: <FaStar />,
    title: "Premium Fan Support",
    text: "Fast help for VIP access, fan rooms, bookings, and special requests.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Requests",
    text: "Every message is handled carefully by our support team.",
  },
  {
    icon: <FaHeadset />,
    title: "Booking Assistance",
    text: "Need help choosing the right experience? Reach out anytime.",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please complete all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          subject: "New Contact Form Message",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          source: "FANLY Contact Page",
        }),
      });

      if (!response.ok) throw new Error();

      toast.success("Message sent successfully");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      toast.error("Could not send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden bg-[#05070F] text-white">
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute left-[-180px] top-[-180px] h-[560px] w-[560px] rounded-full bg-[#D6B36A]/15 blur-[160px]" />
          <div className="absolute right-[-180px] top-[18%] h-[560px] w-[560px] rounded-full bg-[#4C3F91]/25 blur-[170px]" />
          <div className="absolute bottom-[-240px] left-[22%] h-[560px] w-[560px] rounded-full bg-[#1E3A5F]/30 blur-[170px]" />
        </div>

        <div className="relative z-10">
          <section className="relative px-5 pb-16 pt-36 md:pt-44">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
              <motion.div
                initial={{ opacity: 0, y: 45, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9 }}
              >
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-xl">
                  <FaCrown className="text-[#F2D38A]" />
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                    Contact Fanly
                  </p>
                </div>

                <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl xl:text-8xl">
                  Let’s make your next{" "}
                  <span className="bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-white bg-clip-text text-transparent">
                    fan moment iconic.
                  </span>
                </h1>

                <p className="mt-8 max-w-2xl text-base leading-8 text-[#B9C2D0] md:text-lg">
                  Contact us for celebrity bookings, VIP access, fan rooms,
                  donations, memberships, and premium experiences.
                </p>

                <div className="mt-9 flex flex-wrap gap-4">
                  <a
                    href={`mailto:${EMAIL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-7 py-4 text-sm font-black uppercase tracking-widest text-[#05070F] shadow-[0_0_45px_rgba(214,179,106,0.35)] transition hover:scale-105"
                  >
                    <FaEnvelope />
                    Email Us
                  </a>

                  <a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-7 py-4 text-sm font-black uppercase tracking-widest text-white backdrop-blur-xl transition hover:border-[#D6B36A]/50 hover:text-[#F2D38A]"
                  >
                    <FaMapMarkerAlt />
                    Locate Us
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="relative hidden lg:block"
              >
                <div className="absolute inset-0 rounded-[48px] bg-[#D6B36A]/20 blur-3xl" />

                <div className="relative overflow-hidden rounded-[48px] border border-white/10 bg-white/[0.07] p-6 shadow-[0_40px_130px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                  <div className="rounded-[36px] border border-white/10 bg-black/25 p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                          Live Support
                        </p>
                        <h3 className="mt-2 text-3xl font-black">
                          We’re here.
                        </h3>
                      </div>

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-[#05070F]">
                        <FaHeadset />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {highlights.map((item, index) => (
                        <div
                          key={index}
                          className="rounded-3xl border border-white/10 bg-white/[0.05] p-5"
                        >
                          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#D6B36A]/15 text-[#F2D38A]">
                            {item.icon}
                          </div>
                          <h4 className="font-black">{item.title}</h4>
                          <p className="mt-2 text-sm leading-6 text-[#B9C2D0]">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="px-5 pb-24">
            <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                initial={{ opacity: 0, y: 55, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-fit overflow-hidden rounded-[44px] border border-white/10 bg-white/[0.07] p-6 shadow-[0_40px_130px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-8"
              >
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#D6B36A]/15 blur-3xl" />

                <div className="relative">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-2xl text-[#05070F] shadow-[0_0_40px_rgba(214,179,106,0.4)]">
                    <FaPaperPlane />
                  </div>

                  <h2 className="text-3xl font-black tracking-[-0.03em] md:text-5xl">
                    Send us a message.
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-[#B9C2D0] md:text-base">
                    Fill out the form and our team will respond as soon as
                    possible.
                  </p>

                  <form
                    onSubmit={handleContactSubmit}
                    className="mt-8 space-y-5"
                  >
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-[#8B95A5] focus:border-[#D6B36A]/60"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email address"
                      className="w-full rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-[#8B95A5] focus:border-[#D6B36A]/60"
                    />

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us how we can help..."
                      rows="5"
                      className="w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-[#8B95A5] focus:border-[#D6B36A]/60"
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-8 py-4 text-sm font-black uppercase tracking-widest text-[#05070F] shadow-[0_0_45px_rgba(214,179,106,0.4)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <FaPaperPlane />
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>

                  <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                      <h4 className="text-2xl font-black text-[#F2D38A]">
                        24h
                      </h4>
                      <p className="mt-1 text-xs text-[#B9C2D0]">Response</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                      <h4 className="text-2xl font-black text-[#F2D38A]">
                        VIP
                      </h4>
                      <p className="mt-1 text-xs text-[#B9C2D0]">Support</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                      <h4 className="text-2xl font-black text-[#F2D38A]">
                        100%
                      </h4>
                      <p className="mt-1 text-xs text-[#B9C2D0]">Secure</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="grid gap-5">
                {contactCards.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, x: 45, filter: "blur(12px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group block rounded-[34px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl transition hover:border-[#D6B36A]/50 hover:bg-white/[0.09]"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-xl text-[#05070F] shadow-[0_0_35px_rgba(214,179,106,0.35)]">
                      {item.icon}
                    </div>

                    <h3 className="text-2xl font-black">{item.title}</h3>

                    <p className="mt-2 text-sm leading-7 text-[#B9C2D0]">
                      {item.text}
                    </p>

                    <p className="mt-4 break-words text-sm font-black text-[#F2D38A] md:text-base">
                      {item.value}
                    </p>

                    <div className="mt-5 flex items-center gap-3 text-xs font-black uppercase tracking-[0.25em] text-white/70 transition group-hover:text-[#F2D38A]">
                      {item.action}
                      {item.title !== "Office Hours" && (
                        <FaExternalLinkAlt className="text-[10px]" />
                      )}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>

          <section className="px-5 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 55 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mx-auto grid max-w-7xl overflow-hidden rounded-[44px] border border-white/10 bg-white/[0.06] shadow-[0_40px_130px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:grid-cols-[0.85fr_1.15fr]"
            >
              <div className="p-6 md:p-8 lg:p-10">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                  Find Us
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] md:text-5xl">
                  Visit our Hollywood office.
                </h2>

                <p className="mt-5 text-sm leading-7 text-[#B9C2D0] md:text-base">
                  Tap the map or use the button below to open directions
                  instantly.
                </p>

                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-7 py-4 text-sm font-black uppercase tracking-widest text-[#05070F] transition hover:scale-105"
                >
                  <FaMapMarkerAlt />
                  Open Google Map
                </a>
              </div>

              <iframe
                title="Fanly Office Location"
                src={MAP_EMBED}
                loading="lazy"
                className="h-[360px] w-full border-0 grayscale invert-[0.9] lg:h-full"
              />
            </motion.div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
