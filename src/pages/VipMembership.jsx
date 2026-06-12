import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaCrown,
  FaGem,
  FaMedal,
  FaStar,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCreditCard,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaGift,
  FaLock,
  FaShieldAlt,
  FaBolt,
  FaTruck,
  FaTicketAlt,
  FaHeart,
  FaFire,
} from "react-icons/fa";

import {
  HeroBlock,
  FormHeader,
  Steps,
  HelpCTA,
  PageFooter,
} from "./BookingShared";

import { useAppContext } from "../context/AppContext";

const processingFee = 5.56;

const tierMeta = {
  standard: {
    label: "Standard",
    icon: FaMedal,
    tag: "Starter Access",
    text: "Perfect for loyal fans who want official VIP recognition.",
    gradient: "from-[#2563EB] via-[#06B6D4] to-[#2563EB]",
  },
  premium: {
    label: "Premium",
    icon: FaCrown,
    tag: "Most Popular",
    text: "The best balance of access, priority and exclusive fan benefits.",
    gradient: "from-[#D6B36A] via-[#F2D38A] to-[#C7A76C]",
  },
  platinum: {
    label: "Platinum",
    icon: FaGem,
    tag: "Elite Access",
    text: "The highest fan-card tier with the strongest VIP experience.",
    gradient: "from-[#8B5CF6] via-[#06B6D4] to-[#D6B36A]",
  },
};

const benefits = [
  {
    icon: FaTicketAlt,
    title: "Priority booking access",
    text: "Get earlier access before regular fans when booking opens.",
  },
  {
    icon: FaBolt,
    title: "15% discount on bookings",
    text: "Enjoy better pricing when booking your celebrity experience.",
  },
  {
    icon: FaGift,
    title: "Exclusive content & updates",
    text: "Receive VIP-only drops, posts, updates and special announcements.",
  },
  {
    icon: FaHeart,
    title: "Birthday messages",
    text: "Get special recognition and personalized fan moments.",
  },
];

const fadeStep = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
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

export default function VipMembership() {
  const [step, setStep] = useState(0);
  const [emailError, setEmailError] = useState("");

  const { state } = useLocation();
  const navigate = useNavigate();

  const selectedCelebrity = state?.celebrity;

  const tiers = selectedCelebrity?.vipTierFees || {
    standard: 50,
    premium: 75,
    platinum: 100,
  };

  const { createVipMembership, loading } = useAppContext();

  const [formData, setFormData] = useState({
    tier: "standard",
    fullName: "",
    phone: "",
    email: "",
    streetAddress: "",
    shippingAddress: "",
    paymentMethod: "",
  });

  const celebrityName = selectedCelebrity?.name || "Selected Celebrity";
  const celebrityImage = selectedCelebrity?.image || selectedCelebrity?.img;

  const annualFee = Number(tiers[formData.tier] || 50);
  const total = annualFee + processingFee;
  const activeTier = tierMeta[formData.tier];

  const completion = useMemo(() => {
    const fields = [
      formData.tier,
      formData.fullName,
      formData.phone,
      formData.email,
      formData.streetAddress,
      formData.shippingAddress,
      formData.paymentMethod,
    ];

    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  }, [formData]);

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

  const selectTier = (tier) => {
    setFormData((prev) => ({
      ...prev,
      tier,
    }));
  };

  const nextStep = () => {
    if (step === 0) {
      if (
        !formData.fullName ||
        !formData.phone ||
        !formData.email ||
        !formData.streetAddress
      ) {
        toast.error("Please complete all membership details");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email.trim())) {
        toast.error("Please enter a valid email address");
        return;
      }
    }

    if (step === 1 && !formData.shippingAddress) {
      toast.error("Please enter your shipping address");
      return;
    }

    if (step < 2) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePurchase = async () => {
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
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      streetAddress: formData.streetAddress,
      shippingAddress: formData.shippingAddress,
      tier: formData.tier,
      annualFee,
      processingFee,
      total,
      paymentMethod: formData.paymentMethod,
    };

    const membership = await createVipMembership(payload);

    if (membership) {
      navigate("/payment", {
        state: {
          membership,
          celebrity: selectedCelebrity,
          type: "vip",
          amount: total,
        },
      });
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#05070F] text-white">
      <HeroBlock mode="vip" celebrity={selectedCelebrity} />

      <main className="relative px-4 py-20 sm:px-5 lg:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[-190px] top-[-150px] h-[560px] w-[560px] rounded-full bg-[#2563EB]/25 blur-[160px]"
          />

          <motion.div
            animate={{ x: [0, -80, 0], y: [0, -50, 0], scale: [1, 1.13, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[-240px] top-[12%] h-[650px] w-[650px] rounded-full bg-[#8B5CF6]/25 blur-[170px]"
          />

          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -45, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-250px] left-[25%] h-[540px] w-[540px] rounded-full bg-[#06B6D4]/15 blur-[160px]"
          />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <FormHeader
            title={`Get ${celebrityName} VIP Fan Card`}
            subtitle="Become a VIP fan with exclusive access, priority booking and premium fan benefits."
            button="VIP Membership"
          />

          <Steps active={step} />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_390px]">
            <motion.section
              initial={{ opacity: 0, y: 45, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75 }}
              className="relative overflow-hidden rounded-[38px] border border-white/10 bg-white/[0.07] p-5 shadow-[0_45px_160px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:rounded-[46px] md:p-8"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F2D38A]/70 to-transparent" />
              <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full bg-[#D6B36A]/10 blur-[90px]" />

              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step-0"
                    variants={fadeStep}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <IntroPanel
                      icon={<FaCrown />}
                      step="Step 01"
                      title="Choose your VIP identity."
                      text="Select your membership tier and enter your fan card details. This is the first step to unlocking your exclusive FANLY access."
                    />

                    <div className="mb-8 grid gap-4 lg:grid-cols-3">
                      {Object.keys(tierMeta).map((tier, index) => {
                        const meta = tierMeta[tier];
                        const Icon = meta.icon;
                        const active = formData.tier === tier;
                        const price = Number(tiers[tier] || 0);

                        return (
                          <motion.button
                            key={tier}
                            type="button"
                            onClick={() => selectTier(tier)}
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className={`group relative overflow-hidden rounded-[30px] border p-5 text-left transition ${
                              active
                                ? "border-[#D6B36A] bg-[#D6B36A]/15 shadow-[0_0_55px_rgba(214,179,106,0.16)]"
                                : "border-white/10 bg-white/[0.055] hover:border-[#06B6D4]/50"
                            }`}
                          >
                            <div
                              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${meta.gradient}`}
                            />

                            <div
                              className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} text-xl ${
                                tier === "premium"
                                  ? "text-[#05070F]"
                                  : "text-white"
                              }`}
                            >
                              <Icon />
                            </div>

                            <div className="mb-3 inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#F2D38A]">
                              {meta.tag}
                            </div>

                            <h3 className="text-2xl font-black text-white">
                              {meta.label}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-[#B9C2D0]">
                              {meta.text}
                            </p>

                            <div className="mt-5 flex items-end justify-between gap-4">
                              <div>
                                <p className="text-xs uppercase tracking-widest text-[#B9C2D0]">
                                  Annual Fee
                                </p>
                                <h4 className="mt-1 text-3xl font-black text-[#F2D38A]">
                                  ${price.toLocaleString()}
                                </h4>
                              </div>

                              <span
                                className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                                  active
                                    ? "border-[#D6B36A] bg-[#D6B36A] text-[#05070F]"
                                    : "border-white/20"
                                }`}
                              >
                                {active && (
                                  <FaCheckCircle className="text-xs" />
                                )}
                              </span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <InputField
                        icon={<FaUser />}
                        label="Full name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />

                      <InputField
                        icon={<FaPhoneAlt />}
                        label="Phone number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 703 4060"
                      />

                      <div>
                        <InputField
                          icon={<FaEnvelope />}
                          label="Email address"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          error={emailError}
                        />

                        {emailError && (
                          <p className="mt-2 text-sm font-medium text-red-400">
                            {emailError}
                          </p>
                        )}
                      </div>

                      <InputField
                        icon={<FaMapMarkerAlt />}
                        label="Street address"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleChange}
                        placeholder="Enter your street address"
                      />
                    </div>

                    <NavButtons
                      onBack={prevStep}
                      onNext={nextStep}
                      backDisabled
                      nextLabel="VIP Benefits"
                    />
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step-1"
                    variants={fadeStep}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <IntroPanel
                      icon={<FaGem />}
                      step="Step 02"
                      title="Your fan card benefits."
                      text="Your VIP card gives you access to a premium fan experience designed around priority, exclusivity and closer celebrity connection."
                    />

                    <div className="mb-8 grid gap-4 md:grid-cols-2">
                      {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;

                        return (
                          <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            whileHover={{ y: -6 }}
                            className="group rounded-[28px] border border-white/10 bg-white/[0.055] p-5 transition hover:border-[#D6B36A]/50 hover:bg-[#D6B36A]/10"
                          >
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#06B6D4]/15 text-xl text-[#06B6D4] transition group-hover:bg-[#D6B36A] group-hover:text-[#05070F]">
                              <Icon />
                            </div>

                            <h3 className="text-xl font-black text-white">
                              {benefit.title}
                            </h3>

                            <p className="mt-2 text-sm leading-7 text-[#B9C2D0]">
                              {benefit.text}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div>
                      <label className="mb-3 block text-xs font-black uppercase tracking-[0.24em] text-[#F2D38A]">
                        Shipping Address for Physical Fan Card
                      </label>

                      <textarea
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleChange}
                        placeholder="Enter your full shipping address"
                        rows="5"
                        className="w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-[#8B95A5] focus:border-[#D6B36A]/60"
                      />
                    </div>

                    <NavButtons
                      onBack={prevStep}
                      onNext={nextStep}
                      nextLabel="Purchase Card"
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-2"
                    variants={fadeStep}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <IntroPanel
                      icon={<FaCreditCard />}
                      step="Step 03"
                      title="Complete your VIP card purchase."
                      text="Review your membership details and select your payment method before moving to secure checkout."
                    />

                    <div className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
                      <div className="rounded-[30px] border border-white/10 bg-black/25 p-5 sm:p-6">
                        <SummaryRow label="Celebrity" value={celebrityName} />
                        <SummaryRow
                          label="Membership Tier"
                          value={activeTier.label}
                        />
                        <SummaryRow
                          label="Annual Fee"
                          value={`$${annualFee.toFixed(2)}`}
                        />
                        <SummaryRow
                          label="Processing Fee"
                          value={`$${processingFee.toFixed(2)}`}
                        />

                        <div className="flex justify-between gap-4 pt-6 text-lg">
                          <span className="font-black text-[#F2D38A]">
                            Total
                          </span>
                          <b className="text-2xl text-[#F2D38A]">
                            ${total.toFixed(2)}
                          </b>
                        </div>
                      </div>

                      <div className="rounded-[30px] border border-white/10 bg-white/[0.055] p-5 sm:p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#06B6D4]/15 text-[#06B6D4]">
                            <FaLock />
                          </div>

                          <div>
                            <h4 className="font-black text-white">
                              Secure checkout
                            </h4>
                            <p className="text-xs text-[#B9C2D0]">
                              Payment request will be created first
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
                                <b className="block text-white">
                                  Crypto Payment
                                </b>
                                <small className="text-[#B9C2D0]">
                                  Proceed to Bitcoin checkout
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
                          Your membership will remain pending until payment is
                          confirmed by admin.
                        </p>
                      </div>
                    </div>

                    <NavButtons
                      onBack={prevStep}
                      onNext={handlePurchase}
                      nextLabel={loading ? "Submitting..." : "Purchase Card"}
                      loading={loading}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            <motion.aside
              initial={{ opacity: 0, x: 45 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-5"
            >
              <div className="sticky top-28 overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.07] p-5 shadow-[0_35px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-6">
                <div className="pointer-events-none absolute right-[-90px] top-[-90px] h-60 w-60 rounded-full bg-[#D6B36A]/15 blur-[80px]" />
                <div className="pointer-events-none absolute bottom-[-100px] left-[-100px] h-72 w-72 rounded-full bg-[#06B6D4]/10 blur-[90px]" />

                <div className="relative">
                  <div className="mb-5 flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
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
                        VIP Card
                      </p>
                      <h3 className="text-2xl font-black text-white">
                        Live Preview
                      </h3>
                    </div>
                  </div>

                  <div className="relative mb-6 overflow-hidden rounded-[30px] border border-[#D6B36A]/30 bg-gradient-to-br from-[#12182A] via-[#0B1220] to-[#05070F] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                    <div className="absolute right-[-60px] top-[-60px] h-44 w-44 rounded-full bg-[#D6B36A]/20 blur-[60px]" />
                    <div className="absolute bottom-[-80px] left-[-80px] h-52 w-52 rounded-full bg-[#06B6D4]/15 blur-[70px]" />

                    <div className="relative">
                      <div className="mb-10 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[#F2D38A]">
                          <FaCrown />
                          <b className="text-sm tracking-[0.2em]">FANLY</b>
                        </div>

                        <FaFire className="text-[#D6B36A]" />
                      </div>

                      <p className="text-xs uppercase tracking-[0.28em] text-[#B9C2D0]">
                        VIP Fan Card
                      </p>

                      <h4 className="mt-2 text-2xl font-black text-white">
                        {formData.fullName || "Your Name"}
                      </h4>

                      <div className="mt-5 flex items-center gap-3">
                        {celebrityImage && (
                          <img
                            src={celebrityImage}
                            alt={celebrityName}
                            className="h-12 w-12 rounded-2xl object-cover"
                          />
                        )}

                        <div>
                          <p className="text-xs text-[#B9C2D0]">Celebrity</p>
                          <b className="text-white">{celebrityName}</b>
                        </div>
                      </div>

                      <div className="mt-8 flex items-end justify-between">
                        <div>
                          <p className="text-xs text-[#B9C2D0]">Tier</p>
                          <b className="text-[#F2D38A]">{activeTier.label}</b>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-[#B9C2D0]">Total</p>
                          <b className="text-[#F2D38A]">${total.toFixed(2)}</b>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="mb-3 flex justify-between text-sm">
                      <span className="text-[#B9C2D0]">Completion</span>
                      <b className="text-[#F2D38A]">{completion}%</b>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${completion}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#D6B36A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <MiniStat
                      icon={<FaShieldAlt />}
                      title="Secure"
                      text="Checkout"
                    />
                    <MiniStat icon={<FaTruck />} title="Card" text="Delivery" />
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </main>

      <HelpCTA />
      <PageFooter />
    </div>
  );
}

function IntroPanel({ icon, step, title, text }) {
  return (
    <div className="mb-8 rounded-[34px] border border-[#D6B36A]/20 bg-gradient-to-br from-[#D6B36A]/15 via-white/[0.04] to-[#8B5CF6]/10 p-6">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-2xl text-[#05070F]">
        {icon}
      </div>

      <p className="text-xs font-black uppercase tracking-[0.25em] text-[#F2D38A]">
        {step}
      </p>

      <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
        {title}
      </h3>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#B9C2D0]">{text}</p>
    </div>
  );
}

function InputField({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}) {
  return (
    <div>
      <label className="mb-3 block text-xs font-black uppercase tracking-[0.24em] text-[#F2D38A]">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#06B6D4]">
          {icon}
        </span>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={name === "email" ? "email" : "off"}
          className={`w-full rounded-2xl border bg-black/25 px-12 py-4 text-white outline-none placeholder:text-[#8B95A5] ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-white/10 focus:border-[#D6B36A]/60"
          }`}
        />
      </div>
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
      <b className="text-right capitalize text-white">{value}</b>
    </div>
  );
}

function MiniStat({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/10 bg-black/20 p-4"
    >
      <div className="mb-3 text-[#F2D38A]">{icon}</div>
      <h4 className="text-lg font-black text-white">{title}</h4>
      <p className="text-xs text-[#B9C2D0]">{text}</p>
    </motion.div>
  );
}
