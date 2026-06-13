import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HelpCTA, PageFooter } from "./BookingShared";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
  FaCrown,
  FaEnvelope,
  FaGift,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaShieldAlt,
  FaStar,
  FaUser,
  FaVenusMars,
} from "react-icons/fa";

const serviceFee = 5.56;

const steps = ["Event Details", "Requirements", "Payment"];

export default function Booking() {
  const { state } = useLocation();
  const selectedCelebrity = state?.celebrity;

  const navigate = useNavigate();
  const { createBooking, loading } = useAppContext();

  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    eventDate: "",
    eventTime: "",
    gender: "",
    eventLocation: "",
    eventType: "",
    duration: "",
    specialRequest: "",
    paymentMethod: "",
  });

  const bookingFee = Number(selectedCelebrity?.bookingFee || 0);
  const total = bookingFee + serviceFee;

  const selectedSummary = useMemo(
    () => [
      { label: "Celebrity", value: selectedCelebrity?.name || "Celebrity" },
      {
        label: "Category",
        value: selectedCelebrity?.title || "Premium Talent",
      },
      { label: "Rating", value: "4.9 / 5.0" },
      { label: "Status", value: "Verified" },
    ],
    [selectedCelebrity],
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const nextStep = () => {
    if (step === 0) {
      const requiredFields = [
        "fullName",
        "phone",
        "email",
        "eventDate",
        "eventTime",
        "gender",
        "eventLocation",
        "eventType",
        "duration",
      ];

      const missingField = requiredFields.find((field) => !formData[field]);

      if (missingField) {
        toast.error("Please complete all event details");
        return;
      }
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

  const handlePayment = async () => {
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
      celebrityName: selectedCelebrity.name,

      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      gender: formData.gender,

      eventDate: formData.eventDate,
      eventTime: formData.eventTime,
      eventLocation: formData.eventLocation,
      eventType: formData.eventType,
      duration: formData.duration,
      specialRequest: formData.specialRequest,

      amount: bookingFee,
      serviceFee,
      total,
      paymentMethod: formData.paymentMethod,
    };

    const booking = await createBooking(payload);

    if (booking) {
      navigate("/payment", {
        state: {
          booking,
          celebrity: selectedCelebrity,
          type: "booking",
          amount: total,
        },
      });
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#05070F] text-white">
      <main className="relative">
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute left-[-180px] top-[-160px] h-[560px] w-[560px] rounded-full bg-[#D6B36A]/15 blur-[160px]" />
          <div className="absolute right-[-200px] top-[20%] h-[560px] w-[560px] rounded-full bg-[#4C3F91]/25 blur-[170px]" />
          <div className="absolute bottom-[-240px] left-[25%] h-[560px] w-[560px] rounded-full bg-[#1E3A5F]/30 blur-[170px]" />
        </div>

        <section className="relative z-10 px-5 pb-16 pt-28 md:pt-36">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 45, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9 }}
            >
              <button
                onClick={() => navigate("/book-celebrity")}
                className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-xs font-black uppercase tracking-widest text-white backdrop-blur-xl transition hover:border-[#D6B36A]/50 hover:text-[#F2D38A]"
              >
                <FaArrowLeft />
                Back to Celebrities
              </button>

              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-xl">
                <FaCrown className="text-[#F2D38A]" />
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                  Elite Booking Request
                </p>
              </div>

              <h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.06em] md:text-7xl">
                Book{" "}
                <span className="bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-white bg-clip-text text-transparent">
                  {selectedCelebrity?.name || "your celebrity"}
                </span>{" "}
                for your next event.
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-[#B9C2D0] md:text-lg">
                Submit your event details, add special requirements, and
                continue to secure payment through a polished booking flow.
              </p>

              <div className="mt-9 grid max-w-2xl grid-cols-3 gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
                  <FaStar className="text-[#F2D38A]" />
                  <h3 className="mt-3 text-2xl font-black text-[#F2D38A]">
                    4.9
                  </h3>
                  <p className="mt-1 text-xs text-[#B9C2D0]">Avg Rating</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
                  <FaShieldAlt className="text-[#F2D38A]" />
                  <h3 className="mt-3 text-2xl font-black text-[#F2D38A]">
                    VIP
                  </h3>
                  <p className="mt-1 text-xs text-[#B9C2D0]">Verified</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
                  <FaClock className="text-[#F2D38A]" />
                  <h3 className="mt-3 text-2xl font-black text-[#F2D38A]">
                    24h
                  </h3>
                  <p className="mt-1 text-xs text-[#B9C2D0]">Support</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-[54px] bg-[#D6B36A]/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[54px] border border-white/10 bg-white/[0.07] p-5 shadow-[0_45px_140px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                <div className="relative overflow-hidden rounded-[42px] border border-white/10 bg-black/25">
                  <img
                    src={selectedCelebrity?.image}
                    alt={selectedCelebrity?.name || "Celebrity"}
                    className="h-[460px] w-full object-cover opacity-90"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070F] via-[#05070F]/35 to-transparent" />

                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[#D6B36A] px-4 py-2 text-xs font-black uppercase tracking-widest text-[#05070F]">
                    <FaCheckCircle />
                    Verified Talent
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-4xl font-black tracking-[-0.04em]">
                      {selectedCelebrity?.name || "Celebrity"}
                    </h3>

                    <p className="mt-2 text-sm text-[#B9C2D0]">
                      {selectedCelebrity?.title || "Premium celebrity booking"}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      {selectedSummary.slice(2).map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-xl"
                        >
                          <p className="text-xs text-[#B9C2D0]">{item.label}</p>
                          <h4 className="mt-1 font-black text-[#F2D38A]">
                            {item.value}
                          </h4>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative z-10 px-5 pb-24">
          <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[0.72fr_0.28fr]">
            <motion.div
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden rounded-[44px] border border-white/10 bg-white/[0.07] p-6 shadow-[0_40px_130px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-8"
            >
              <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                    Booking Form
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] md:text-5xl">
                    Request details.
                  </h2>
                </div>

                <div className="flex gap-3">
                  {steps.map((item, index) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => index < step && setStep(index)}
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-black transition ${
                        step === index
                          ? "bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-[#05070F] shadow-[0_0_35px_rgba(214,179,106,0.35)]"
                          : index < step
                            ? "border border-[#D6B36A]/50 bg-[#D6B36A]/10 text-[#F2D38A]"
                            : "border border-white/10 bg-white/[0.05] text-white/50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8 grid gap-3 md:grid-cols-3">
                {steps.map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-3xl border p-4 ${
                      step === index
                        ? "border-[#D6B36A]/50 bg-[#D6B36A]/10"
                        : "border-white/10 bg-white/[0.04]"
                    }`}
                  >
                    <p className="text-xs font-black uppercase tracking-widest text-[#F2D38A]">
                      Step {index + 1}
                    </p>
                    <h4 className="mt-2 font-black">{item}</h4>
                  </div>
                ))}
              </div>

              {step === 0 && (
                <>
                  <div className="grid gap-5 md:grid-cols-2">
                    <InputField
                      icon={<FaUser />}
                      label="Full name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />

                    <InputField
                      icon={<FaPhoneAlt />}
                      label="Phone number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 70376000"
                    />

                    <InputField
                      icon={<FaEnvelope />}
                      label="Email address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />

                    <InputField
                      icon={
                        <FaCalendarCheck className="text-[#F2D38A] bg-transparent" />
                      }
                      label="Event date"
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                    />

                    <InputField
                      icon={
                        <FaClock className="text-[#F2D38A] bg-transparent" />
                      }
                      label="Event time"
                      type="time"
                      name="eventTime"
                      value={formData.eventTime}
                      onChange={handleChange}
                    />

                    <SelectField
                      icon={<FaVenusMars />}
                      label="Gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      options={["Male", "Female", "Other"]}
                    />

                    <InputField
                      icon={<FaMapMarkerAlt />}
                      label="Event location"
                      name="eventLocation"
                      value={formData.eventLocation}
                      onChange={handleChange}
                      placeholder="City, venue, or address"
                    />

                    <SelectField
                      icon={<FaGift />}
                      label="Event type"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      options={[
                        "Birthday",
                        "Private Party",
                        "Corporate Event",
                        "Meet and Greet",
                      ]}
                    />

                    <SelectField
                      icon={<FaClock />}
                      label="Duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      options={[
                        "1 hour",
                        "2 hours",
                        "3 hours",
                        "4 hours",
                        "5 hours",
                        "10 hours",
                        "12 hours",
                        "15 hours",
                        "Full day(24hours)",
                      ]}
                    />
                  </div>

                  <ActionButtons
                    step={step}
                    loading={loading}
                    prevStep={prevStep}
                    nextStep={nextStep}
                  />
                </>
              )}

              {step === 1 && (
                <>
                  <div className="rounded-[34px] border border-white/10 bg-black/25 p-5">
                    <label className="mb-3 block text-xs font-black uppercase tracking-widest text-[#F2D38A]">
                      Special Requests or Requirements
                    </label>

                    <textarea
                      name="specialRequest"
                      value={formData.specialRequest}
                      onChange={handleChange}
                      placeholder="Please specify any requirement, equipment need, green room request, security note, or special arrangement."
                      rows="8"
                      className=" w-full
  resize-none
  rounded-3xl
  border-2
  border-white/20
  bg-[#111827]
  px-5
  py-4
  text-white
  outline-none
  placeholder:text-gray-400
  focus:border-[#F2D38A]
  focus:bg-[#161F33]"
                    />
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {[
                      "Professional sound system required for performances",
                      "Private green room with refreshments",
                      "Security personnel must be provided",
                      "Transportation from local airport or hotel",
                      "Approval of any recording or photography",
                      "Final schedule must be confirmed before appearance",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                      >
                        <FaCheckCircle className="mt-1 shrink-0 text-[#F2D38A]" />
                        <p className="text-sm leading-7 text-[#B9C2D0]">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  <ActionButtons
                    step={step}
                    loading={loading}
                    prevStep={prevStep}
                    nextStep={nextStep}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                    <div className="rounded-[34px] border border-white/10 bg-black/25 p-6">
                      <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                        Booking Summary
                      </p>

                      <h3 className="mt-3 text-3xl font-black">
                        Confirm payment.
                      </h3>

                      <div className="mt-6 space-y-4">
                        <SummaryRow
                          label="Celebrity"
                          value={selectedCelebrity?.name || "Celebrity"}
                        />
                        <SummaryRow
                          label="Base Booking Fee"
                          value={`$${bookingFee.toLocaleString()}`}
                        />
                        <SummaryRow
                          label="Service Fee"
                          value={`$${serviceFee.toFixed(2)}`}
                        />

                        <div className="h-px bg-white/10" />

                        <SummaryRow
                          label="Total"
                          value={`$${total.toLocaleString()}`}
                          total
                        />
                      </div>
                    </div>

                    <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-6">
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] text-[#05070F]">
                        <FaMoneyBillWave />
                      </div>

                      <h3 className="text-2xl font-black">Payment Method</h3>

                      <p className="mt-3 text-sm leading-7 text-[#B9C2D0]">
                        Select your payment option to continue to checkout.
                      </p>

                      <div className="relative mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-[#0A1020] transition-all duration-300 focus-within:border-[#F2D38A] focus-within:shadow-[0_0_35px_rgba(242,211,138,0.15)]">
                        <select
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleChange}
                          className="relative z-10 w-full appearance-none bg-transparent px-5 py-5 pr-14 text-sm font-semibold text-white outline-none cursor-pointer"
                        >
                          <option value="" className="bg-[#0A1020] text-white">
                            Choose a payment method
                          </option>
                          <option
                            value="crypto"
                            className="bg-[#0A1020] text-white"
                          >
                            Crypto Payment
                          </option>
                        </select>

                        <div className="pointer-events-none absolute right-5 top-1/2 z-20 -translate-y-1/2 text-[#F2D38A] drop-shadow-[0_0_12px_rgba(242,211,138,0.8)]">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[30px] border border-[#D6B36A]/30 bg-[#D6B36A]/10 p-5">
                    <div className="flex gap-3">
                      <FaShieldAlt className="mt-1 shrink-0 text-[#F2D38A]" />
                      <p className="text-sm leading-7 text-[#B9C2D0]">
                        Your booking is not finalized until payment is
                        completed. After payment, your request will move to
                        confirmation.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <button
                      className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:border-[#D6B36A]/50 hover:text-[#F2D38A]"
                      type="button"
                      onClick={prevStep}
                    >
                      <FaArrowLeft />
                      Back
                    </button>

                    <button
                      className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-8 py-4 text-sm font-black uppercase tracking-widest text-[#05070F] shadow-[0_0_45px_rgba(214,179,106,0.4)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                      type="button"
                      onClick={handlePayment}
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Continue to Payment"}
                      <FaArrowRight />
                    </button>
                  </div>
                </>
              )}
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="sticky top-8 hidden rounded-[44px] border border-white/10 bg-white/[0.07] p-6 shadow-[0_40px_130px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:block"
            >
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D38A]">
                Booking Panel
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Elite request.
              </h3>

              <div className="mt-6 overflow-hidden rounded-[30px]">
                <img
                  src={selectedCelebrity?.image}
                  alt={selectedCelebrity?.name || "Celebrity"}
                  className="h-64 w-full object-cover"
                />
              </div>

              <div className="mt-6 space-y-4">
                {selectedSummary.map((item) => (
                  <SummaryRow
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>

              <div className="mt-6 rounded-[28px] border border-[#D6B36A]/30 bg-[#D6B36A]/10 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-[#F2D38A]">
                  Estimated Total
                </p>

                <h4 className="mt-2 text-4xl font-black">
                  ${total.toLocaleString()}
                </h4>

                <p className="mt-3 text-sm leading-7 text-[#B9C2D0]">
                  Includes booking fee and service fee.
                </p>
              </div>
            </motion.aside>
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
function InputField({
  icon,
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  min,
}) {
  const inputId = `${name}-input`;
  const isDateOrTime = type === "date" || type === "time";

  const openPicker = () => {
    const input = document.getElementById(inputId);

    if (input?.showPicker) {
      input.showPicker();
      return;
    }

    input?.focus();
  };

  return (
    <div className="group">
      <label className="mb-3 block text-xs font-black uppercase tracking-[0.22em] text-[#F2D38A]">
        {label}
      </label>

      <div
        className="relative
  overflow-hidden
  rounded-[26px]
  border-2
  border-white/20
  bg-[#111827]
  shadow-[0_0_0_1px_rgba(255,255,255,0.05)]
  transition-all
  duration-300
  hover:border-[#D6B36A]/60
  focus-within:border-[#F2D38A]
  focus-within:bg-[#161F33]
  focus-within:shadow-[0_0_25px_rgba(242,211,138,0.25)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#D6B36A]/5 via-transparent to-[#4C3F91]/10" />

        <span className="pointer-events-none absolute left-5 top-1/2 z-10 -translate-y-1/2 text-[#F2D38A]">
          {icon}
        </span>
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || label}
          min={min}
          className="
            relative z-10
            w-full
            bg-transparent
            py-5
            pl-14
            pr-14
            text-base
            font-medium
          text-white
            outline-none
            ring-1 ring-white/10
            placeholder:text-gray-400
            [color-scheme:dark]
            [&::-webkit-calendar-picker-indicator]:absolute
            [&::-webkit-calendar-picker-indicator]:right-0
            [&::-webkit-calendar-picker-indicator]:h-40%
            [&::-webkit-calendar-picker-indicator]:w-40%
            [&::-webkit-calendar-picker-indicator]:cursor-pointer
            [&::-webkit-calendar-picker-indicator]:opacity-0
          "
        />

        {isDateOrTime && (
          <button
            type="button"
            aria-label={`Open ${label} picker`}
            onClick={openPicker}
            className="absolute right-5 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center text-[#F2D38A]  transition hover:scale-110 hover:text-white"
          >
            {type === "date" ? (
              <FaCalendarCheck size={22} />
            ) : (
              <FaClock size={22} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function SelectField({ icon, label, name, value, onChange, options }) {
  return (
    <div className="group">
      <label className="mb-3 block text-xs font-black uppercase tracking-[0.22em] text-[#F2D38A]">
        {label}
      </label>

      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0A1020] transition-all duration-300 hover:border-[#D6B36A]/40 focus-within:border-[#F2D38A] focus-within:shadow-[0_0_35px_rgba(242,211,138,0.15)]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D6B36A]/5 via-transparent to-[#4C3F91]/10" />

        <span className="absolute left-5 top-1/2 z-10 -translate-y-1/2 text-xl text-[#F2D38A] ">
          {icon}
        </span>

        <select
          name={name}
          value={value}
          onChange={onChange}
          className="
            relative z-10
            w-full
            appearance-none
            bg-transparent
            py-5
            pl-14
            pr-14
            text-white
            font-medium
            outline-none
            cursor-pointer
          "
        >
          <option value="" className="bg-[#0A1020] text-white">
            Select {label}
          </option>

          {options.map((item) => (
            <option key={item} value={item} className="bg-[#0A1020] text-white">
              {item}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D6B36A]/15 text-[#F2D38A]">
            ▼
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButtons({ step, prevStep, nextStep }) {
  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
      <button
        className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:border-[#D6B36A]/50 hover:text-[#F2D38A] disabled:cursor-not-allowed disabled:opacity-40"
        type="button"
        onClick={prevStep}
        disabled={step === 0}
      >
        <FaArrowLeft />
        Back
      </button>

      <button
        className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-8 py-4 text-sm font-black uppercase tracking-widest text-[#05070F] shadow-[0_0_45px_rgba(214,179,106,0.4)] transition hover:scale-[1.02]"
        type="button"
        onClick={nextStep}
      >
        {step === 0 ? "Requirements" : "Payment"}
        <FaArrowRight />
      </button>
    </div>
  );
}

function SummaryRow({ label, value, total }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className={`text-sm ${
          total ? "font-black text-white" : "text-[#B9C2D0]"
        }`}
      >
        {label}
      </span>

      <strong
        className={`text-right ${
          total ? "text-2xl text-[#F2D38A]" : "text-white"
        }`}
      >
        {value}
      </strong>
    </div>
  );
}
