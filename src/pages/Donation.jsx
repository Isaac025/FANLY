import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaHeart,
  FaShieldAlt,
  FaUsers,
  FaHandHoldingHeart,
  FaCreditCard,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaStar,
  FaCrown,
  FaLock,
  FaGift,
  FaGlobe,
  FaBolt,
  FaQuoteLeft,
} from "react-icons/fa";

import {
  HeroBlock,
  FormHeader,
  Steps,
  HelpCTA,
  PageFooter,
} from "./BookingShared";

import { useAppContext } from "../context/AppContext";

const serviceFee = 5.56;

const quickAmounts = [1000, 2500, 5000, 10000, 25000];

const charities = [
  {
    name: "Children Education Foundation",
    icon: FaGift,
    text: "Helping children access quality education, books, mentorship and brighter opportunities.",
    stat: "12K+ children supported",
  },
  {
    name: "Health Support Initiative",
    icon: FaHeart,
    text: "Supporting health care, treatment access, wellness programs and emergency medical aid.",
    stat: "Emergency aid focused",
  },
  {
    name: "Community Development Fund",
    icon: FaGlobe,
    text: "Funding local projects, family support, empowerment programs and community growth.",
    stat: "Community-first impact",
  },
];

const floatingIcons = [FaHeart, FaStar, FaGift, FaCrown, FaBolt];

const fadeUp = {
  hidden: { opacity: 0, y: 35, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: { duration: 0.25 },
  },
};

export default function Donation() {
  const [step, setStep] = useState(0);
  const [emailError, setEmailError] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const selectedCelebrity = state?.celebrity;
  const { createDonation, loading } = useAppContext();

  const [formData, setFormData] = useState({
    amount: selectedCelebrity?.donationDefaultAmount || 5000,
    message: "",
    firstName: "",
    email: "",
    charity: "Children Education Foundation",
    paymentMethod: "",
  });

  const celebrityName = selectedCelebrity?.name || "Selected Celebrity";
  const celebrityImage = selectedCelebrity?.image || selectedCelebrity?.img;

  const amount = Number(formData.amount || 0);
  const total = amount + serviceFee;

  const progressPercent = useMemo(() => {
    return Math.min((amount / 25000) * 100, 100);
  }, [amount]);

  const selectedCharity = useMemo(() => {
    return charities.find((item) => item.name === formData.charity);
  }, [formData.charity]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (value && !emailRegex.test(value.trim())) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
  };

  const setAmount = (value) => {
    setFormData((prev) => ({
      ...prev,
      amount: value,
    }));
  };

  const nextStep = () => {
    if (step === 0) {
      if (!formData.amount || !formData.firstName || !formData.email) {
        toast.error("Please complete donation amount, name and email");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email.trim())) {
        toast.error("Please enter a valid email address");
        return;
      }

      if (Number(formData.amount) <= 0) {
        toast.error("Please enter a valid donation amount");
        return;
      }
    }

    if (step === 1 && !formData.charity) {
      toast.error("Please select a charity");
      return;
    }

    if (step < 2) {
      setStep((prev) => prev + 1);

      setTimeout(() => {
        const firstField = document.querySelector("input, textarea, select");

        firstField?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      setTimeout(() => {
        const firstField = document.querySelector("input, textarea, select");

        firstField?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  };

  const handleDonation = async () => {
    if (!selectedCelebrity?._id) {
      toast.error("Please select a celebrity first");
      navigate("/book-celebrity");
      return;
    }

    if (!formData.paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    const payload = {
      celebrity: selectedCelebrity._id,
      celebrityId: selectedCelebrity._id,
      celebrityName,
      firstName: formData.firstName,
      email: formData.email,
      amount,
      serviceFee,
      total,
      message: formData.message,
      charity: formData.charity,
      paymentMethod: formData.paymentMethod,
    };

    const donation = await createDonation(payload);

    if (donation) {
      navigate("/payment", {
        state: {
          donation,
          celebrity: selectedCelebrity,
          type: "donation",
          amount: total,
        },
      });
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#05070F] text-white">
      <HeroBlock celebrity={selectedCelebrity} />

      <main className="relative px-4 py-20 sm:px-5 lg:py-24">
        {/* Animated background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 80, 0],
              y: [0, 60, 0],
              scale: [1, 1.12, 1],
            }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[-180px] top-[-160px] h-[560px] w-[560px] rounded-full bg-[#2563EB]/20 blur-[160px]"
          />

          <motion.div
            animate={{
              x: [0, -70, 0],
              y: [0, -60, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[-220px] top-[180px] h-[620px] w-[620px] rounded-full bg-[#8B5CF6]/25 blur-[170px]"
          />

          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-220px] left-[30%] h-[520px] w-[520px] rounded-full bg-[#06B6D4]/15 blur-[160px]"
          />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)]" />

          {floatingIcons.map((Icon, index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -28, 0],
                rotate: [0, 12, -8, 0],
                opacity: [0.18, 0.45, 0.18],
              }}
              transition={{
                duration: 5 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
              className="absolute hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-[#F2D38A] backdrop-blur-xl md:block"
              style={{
                left: `${10 + index * 18}%`,
                top: `${12 + (index % 2) * 60}%`,
              }}
            >
              <Icon />
            </motion.div>
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl">
          <FormHeader
            title={`Make a Donation with ${celebrityName}`}
            subtitle={`Support ${celebrityName}'s chosen charity or cause with a secure premium donation experience.`}
            button="Elite Donation"
          />

          <Steps active={step} donation />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
            {/* Main form */}
            <motion.div
              initial={{ opacity: 0, y: 45, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75 }}
              className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.075] p-5 shadow-[0_45px_160px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:rounded-[44px] md:p-8"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F2D38A]/70 to-transparent" />
              <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-[#F2D38A]/10 blur-[80px]" />

              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step-0"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="mb-8 overflow-hidden rounded-[30px] border border-[#D6B36A]/20 bg-gradient-to-br from-[#D6B36A]/15 via-white/[0.04] to-[#8B5CF6]/10 p-6 sm:rounded-[34px]">
                      <div className="mb-5 flex flex-wrap items-center gap-4">
                        <motion.div
                          animate={{
                            rotate: [0, 8, -8, 0],
                            scale: [1, 1.06, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-2xl text-[#05070F] shadow-[0_0_35px_rgba(242,211,138,0.35)]"
                        >
                          <FaHandHoldingHeart />
                        </motion.div>

                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#F2D38A]">
                            Step 01
                          </p>
                          <h3 className="mt-1 text-2xl font-black sm:text-3xl">
                            Make a meaningful impact.
                          </h3>
                        </div>
                      </div>

                      <p className="max-w-2xl text-sm leading-7 text-[#B9C2D0]">
                        Your donation supports real causes connected to{" "}
                        <span className="font-bold text-white">
                          {celebrityName}
                        </span>
                        . Every contribution helps create change, hope and
                        opportunity.
                      </p>
                    </div>

                    <div className="mb-7">
                      <label className="mb-3 block text-xs font-black uppercase tracking-[0.24em] text-[#F2D38A]">
                        Choose donation amount *
                      </label>

                      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                        {quickAmounts.map((item, index) => (
                          <motion.button
                            key={item}
                            type="button"
                            onClick={() => setAmount(item)}
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.96 }}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.06 }}
                            className={`relative overflow-hidden rounded-2xl border px-4 py-4 text-sm font-black transition ${
                              Number(formData.amount) === item
                                ? "border-[#D6B36A] bg-[#D6B36A] text-[#05070F] shadow-[0_0_35px_rgba(214,179,106,0.35)]"
                                : "border-white/10 bg-white/[0.06] text-white hover:border-[#D6B36A]/50 hover:text-[#F2D38A]"
                            }`}
                          >
                            <span className="relative z-10">
                              ${item.toLocaleString()}
                            </span>

                            {Number(formData.amount) === item && (
                              <motion.span
                                layoutId="amountGlow"
                                className="absolute inset-0 bg-gradient-to-r from-[#F2D38A] to-[#D6B36A]"
                              />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="mb-3 block text-xs font-black uppercase tracking-[0.24em] text-[#F2D38A]">
                        Custom amount
                      </label>

                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg font-black text-[#F2D38A]">
                          $
                        </span>
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          min="1"
                          className="w-full rounded-2xl border-2 border-white bg-[#111827] px-10 py-4 text-base font-medium text-white outline-none placeholder:text-gray-400 focus:border-[#F2D38A] focus:bg-[#161F33] focus:shadow-[0_0_25px_rgba(242,211,138,0.22)]"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="mb-3 block text-xs font-black uppercase tracking-[0.24em] text-[#F2D38A]">
                        Personal message
                      </label>

                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write a kind message or dedication..."
                        rows="5"
                        className="w-full resize-none rounded-2xl border-2 border-white bg-[#111827] px-5 py-4 text-base font-medium text-white outline-none placeholder:text-gray-400 focus:border-[#F2D38A] focus:bg-[#161F33] focus:shadow-[0_0_25px_rgba(242,211,138,0.22)]"
                      />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-3 block text-xs font-black uppercase tracking-[0.24em] text-[#F2D38A]">
                          First name *
                        </label>

                        <input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Your first name"
                          className="w-full rounded-2xl border-2 border-white bg-[#111827] px-5 py-4 text-base font-medium text-white outline-none placeholder:text-gray-400 focus:border-[#F2D38A] focus:bg-[#161F33] focus:shadow-[0_0_25px_rgba(242,211,138,0.22)]"
                        />
                      </div>

                      <div>
                        <label className="mb-3 block text-xs font-black uppercase tracking-[0.24em] text-[#F2D38A]">
                          Email address *
                        </label>

                        <>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your email address"
                            autoComplete="email"
                            className={`w-full rounded-2xl border-2 bg-[#111827] px-5 py-4 text-base font-medium text-white outline-none placeholder:text-gray-400 focus:bg-[#161F33] focus:shadow-[0_0_25px_rgba(242,211,138,0.22)]
${
  emailError
    ? "border-red-500 focus:border-red-500"
    : "border-white focus:border-[#F2D38A]"
}`}
                          />

                          {emailError && (
                            <p className="mt-2 text-sm font-medium text-red-400">
                              {emailError}
                            </p>
                          )}
                        </>
                      </div>
                    </div>

                    <NavButtons
                      onBack={prevStep}
                      onNext={nextStep}
                      backDisabled
                      nextLabel="Charity Info"
                    />
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step-1"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="mb-8 rounded-[30px] border border-[#06B6D4]/20 bg-gradient-to-br from-[#06B6D4]/10 via-white/[0.04] to-[#8B5CF6]/10 p-6 sm:rounded-[34px]">
                      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[24px] border border-white/10 bg-white/[0.08] text-3xl text-[#06B6D4]">
                        <FaHeart />
                      </div>

                      <p className="text-xs font-black uppercase tracking-[0.25em] text-[#F2D38A]">
                        Step 02
                      </p>

                      <h3 className="mt-2 text-2xl font-black sm:text-3xl">
                        Choose where your support goes.
                      </h3>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#B9C2D0]">
                        Pick the cause that feels most meaningful to you. Each
                        donation is attached to a purpose, not just a payment.
                      </p>
                    </div>

                    <div className="grid gap-4">
                      {charities.map((charity, index) => {
                        const Icon = charity.icon;
                        const active = formData.charity === charity.name;

                        return (
                          <motion.label
                            key={charity.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.08 }}
                            whileHover={{ y: -4 }}
                            className={`group cursor-pointer overflow-hidden rounded-[28px] border p-5 transition ${
                              active
                                ? "border-[#D6B36A] bg-[#D6B36A]/15 shadow-[0_0_45px_rgba(214,179,106,0.12)]"
                                : "border-white/10 bg-white/[0.055] hover:border-[#06B6D4]/40"
                            }`}
                          >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                              <div
                                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl transition ${
                                  active
                                    ? "bg-[#D6B36A] text-[#05070F]"
                                    : "bg-black/25 text-[#06B6D4] group-hover:text-[#F2D38A]"
                                }`}
                              >
                                <Icon />
                              </div>

                              <div className="flex-1">
                                <div className="flex items-start gap-3">
                                  <input
                                    type="radio"
                                    name="charity"
                                    value={charity.name}
                                    checked={active}
                                    onChange={handleChange}
                                    className="mt-2 accent-[#D6B36A]"
                                  />

                                  <div>
                                    <b className="block text-lg text-white">
                                      {charity.name}
                                    </b>

                                    <small className="mt-2 block leading-6 text-[#B9C2D0]">
                                      {charity.text}
                                    </small>

                                    <span className="mt-4 inline-flex rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-bold text-[#F2D38A]">
                                      {charity.stat}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.label>
                        );
                      })}
                    </div>

                    <NavButtons
                      onBack={prevStep}
                      onNext={nextStep}
                      nextLabel="Complete Donation"
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-2"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="mb-8 rounded-[30px] border border-[#D6B36A]/20 bg-gradient-to-br from-[#D6B36A]/15 via-white/[0.04] to-[#2563EB]/10 p-6 sm:rounded-[34px]">
                      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-3xl text-[#05070F]">
                        <FaCheckCircle />
                      </div>

                      <p className="text-xs font-black uppercase tracking-[0.25em] text-[#F2D38A]">
                        Step 03
                      </p>

                      <h3 className="mt-2 text-2xl font-black sm:text-3xl">
                        Review your donation.
                      </h3>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#B9C2D0]">
                        Confirm the details below before moving to the secure
                        payment page.
                      </p>
                    </div>

                    <div className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
                      <div className="rounded-[30px] border border-white/10 bg-black/25 p-5 sm:p-6">
                        <SummaryRow label="Celebrity" value={celebrityName} />
                        <SummaryRow label="Charity" value={formData.charity} />
                        <SummaryRow
                          label="Donation Amount"
                          value={`$${amount.toLocaleString()}`}
                        />
                        <SummaryRow
                          label="Service Fee"
                          value={`$${serviceFee.toFixed(2)}`}
                        />

                        <div className="flex justify-between gap-4 pt-6 text-lg">
                          <span className="font-black text-[#F2D38A]">
                            Total
                          </span>
                          <b className="text-2xl text-[#F2D38A]">
                            ${total.toLocaleString()}
                          </b>
                        </div>
                      </div>

                      <div className="rounded-[30px] border border-white/10 bg-white/[0.055] p-5 sm:p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#06B6D4]/15 text-[#06B6D4]">
                            <FaLock />
                          </div>
                          <div>
                            <h4 className="font-black">Secure checkout</h4>
                            <p className="text-xs text-[#B9C2D0]">
                              Encrypted payment flow
                            </p>
                          </div>
                        </div>

                        <label className="mb-3 block text-xs font-black uppercase tracking-[0.24em] text-[#F2D38A]">
                          Select payment method
                        </label>

                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              paymentMethod: "crypto",
                            }))
                          }
                          className={`w-full rounded-[24px] border p-5 text-left transition ${
                            formData.paymentMethod === "crypto"
                              ? "border-[#D6B36A] bg-[#D6B36A]/15"
                              : "border-white/10 bg-black/20 hover:border-[#D6B36A]/50"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/30 text-[#F2D38A]">
                                <FaCreditCard />
                              </div>

                              <div>
                                <b className="block">Crypto Payment</b>
                                <small className="text-[#B9C2D0]">
                                  Proceed to crypto checkout
                                </small>
                              </div>
                            </div>

                            <span
                              className={`h-5 w-5 rounded-full border ${
                                formData.paymentMethod === "crypto"
                                  ? "border-[#D6B36A] bg-[#D6B36A]"
                                  : "border-white/30"
                              }`}
                            />
                          </div>
                        </button>

                        <p className="mt-4 text-xs leading-6 text-[#B9C2D0]">
                          You will be redirected to the payment page after your
                          donation request is created.
                        </p>
                      </div>
                    </div>

                    <NavButtons
                      onBack={prevStep}
                      onNext={handleDonation}
                      nextLabel={
                        loading ? "Submitting..." : "Proceed to Payment"
                      }
                      loading={loading}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Premium sidebar */}
            <aside className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: 45 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="sticky top-28 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.075] p-5 shadow-[0_35px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:rounded-[38px] sm:p-6"
              >
                <div className="pointer-events-none absolute right-[-90px] top-[-90px] h-60 w-60 rounded-full bg-[#D6B36A]/15 blur-[80px]" />
                <div className="pointer-events-none absolute bottom-[-100px] left-[-100px] h-72 w-72 rounded-full bg-[#06B6D4]/10 blur-[90px]" />

                <div className="relative">
                  <div className="mb-5 flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-xl text-[#05070F]"
                    >
                      <FaCrown />
                    </motion.div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F2D38A]">
                        Elite Impact
                      </p>
                      <h3 className="text-2xl font-black">Impact meter</h3>
                    </div>
                  </div>

                  {celebrityImage && (
                    <div className="mb-5 overflow-hidden rounded-[28px] border border-white/10 bg-black/20 p-3">
                      <img
                        src={celebrityImage}
                        alt={celebrityName}
                        className="h-52 w-full rounded-[22px] object-cover"
                      />
                      <div className="mt-4 flex items-center justify-between gap-4 px-1">
                        <div>
                          <p className="text-xs text-[#B9C2D0]">
                            Donation hosted by
                          </p>
                          <h4 className="font-black">{celebrityName}</h4>
                        </div>
                        <FaCheckCircle className="text-[#06B6D4]" />
                      </div>
                    </div>
                  )}

                  <p className="text-sm leading-7 text-[#B9C2D0]">
                    Your gift joins other supporters helping create meaningful
                    change through verified causes.
                  </p>

                  <div className="mt-6">
                    <div className="mb-3 flex justify-between text-sm">
                      <span className="text-[#B9C2D0]">Donation strength</span>
                      <b className="text-[#F2D38A]">
                        {Math.round(progressPercent)}%
                      </b>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#F2D38A]"
                      />
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <ImpactBox
                      icon={<FaUsers />}
                      title="2.8K"
                      text="Supporters"
                    />
                    <ImpactBox
                      icon={<FaShieldAlt />}
                      title="Secure"
                      text="Payment"
                    />
                  </div>

                  <div className="mt-5 rounded-[24px] border border-[#D6B36A]/20 bg-[#D6B36A]/10 p-4">
                    <div className="mb-3 flex items-center gap-2 text-[#F2D38A]">
                      <FaQuoteLeft />
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm leading-6 text-[#B9C2D0]">
                      “Every contribution helps make something meaningful
                      happen.”
                    </p>
                  </div>

                  {selectedCharity && (
                    <div className="mt-5 rounded-[24px] border border-white/10 bg-black/20 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#06B6D4]">
                        Selected Cause
                      </p>
                      <h4 className="mt-2 font-black">
                        {selectedCharity.name}
                      </h4>
                      <p className="mt-2 text-xs leading-6 text-[#B9C2D0]">
                        {selectedCharity.text}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </main>

      <HelpCTA booking />
      <PageFooter />
    </div>
  );
}

function NavButtons({
  onBack,
  onNext,
  nextLabel,
  backDisabled = false,
  loading = false,
}) {
  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
      <button
        className={`rounded-full border border-white/10 bg-white/[0.06] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition ${
          backDisabled
            ? "cursor-not-allowed opacity-40"
            : "hover:border-[#D6B36A]/50 hover:text-[#F2D38A]"
        }`}
        type="button"
        onClick={onBack}
        disabled={backDisabled}
      >
        <FaArrowLeft className="mr-2 inline" />
        Back
      </button>

      <motion.button
        whileHover={{ y: -3, scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        className="rounded-full bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-8 py-4 text-sm font-black uppercase tracking-widest text-[#05070F] shadow-[0_0_40px_rgba(214,179,106,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
        type="button"
        onClick={onNext}
        disabled={loading}
      >
        {nextLabel}
        <FaArrowRight className="ml-2 inline" />
      </motion.button>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/10 py-4 text-sm">
      <span className="text-[#B9C2D0]">{label}</span>
      <b className="text-right text-white">{value}</b>
    </div>
  );
}

function ImpactBox({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/10 bg-black/20 p-4"
    >
      <div className="mb-3 text-[#F2D38A]">{icon}</div>
      <h4 className="text-xl font-black">{title}</h4>
      <p className="text-xs text-[#B9C2D0]">{text}</p>
    </motion.div>
  );
}
