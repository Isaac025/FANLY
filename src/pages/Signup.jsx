import React, { useState } from "react";
import { Country } from "country-state-city";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SignupImage from "../assets/SignupImage.png";
import { useAppContext } from "../context/AppContext";
import {
  FaEye,
  FaEyeSlash,
  FaUserAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaGlobe,
  FaLock,
  FaCrown,
  FaStar,
  FaShieldAlt,
  FaArrowRight,
  FaCheckCircle,
  FaUserPlus,
} from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const countries = Country.getAllCountries().map((country) => ({
  name: country.name,
  code: `+${country.phonecode}`,
  isoCode: country.isoCode,
}));

// const countries = [
//   { name: "United States", code: "+1" },
//   { name: "United Kingdom", code: "+44" },
//   { name: "Nigeria", code: "+234" },
//   { name: "Canada", code: "+1" },
//   { name: "Australia", code: "+61" },
//   { name: "Germany", code: "+49" },
//   { name: "France", code: "+33" },
//   { name: "Italy", code: "+39" },
//   { name: "Spain", code: "+34" },
//   { name: "Netherlands", code: "+31" },
//   { name: "Portugal", code: "+351" },
//   { name: "Belgium", code: "+32" },
//   { name: "Switzerland", code: "+41" },
//   { name: "Ireland", code: "+353" },
//   { name: "South Africa", code: "+27" },
//   { name: "Ghana", code: "+233" },
//   { name: "Kenya", code: "+254" },
//   { name: "India", code: "+91" },
//   { name: "China", code: "+86" },
//   { name: "Japan", code: "+81" },
//   { name: "Brazil", code: "+55" },
//   { name: "Mexico", code: "+52" },
//   { name: "United Arab Emirates", code: "+971" },
//   { name: "Saudi Arabia", code: "+966" },
// ];

const signupSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  countryCode: yup.string().required("Country code is required"),
  phone: yup.string().required("Phone number is required"),
  country: yup.string().required("Country is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

const Signup = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading, googleLogin } = useAppContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      countryCode: "+1",
      country: "",
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      fullName: data.fullName,
      username: data.username,
      email: data.email,
      phone: `${data.countryCode}${data.phone}`,
      country: data.country,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    const success = await registerUser(payload);

    if (success) {
      navigate("/login");
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = countries.find(
      (country) => country.name === e.target.value,
    );

    setValue("country", e.target.value);

    if (selectedCountry) {
      setValue("countryCode", selectedCountry.code);
    }
  };

  const handleGoogleSuccess = async (response) => {
    const loggedUser = await googleLogin(response.credential);

    if (loggedUser) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#05070F] text-white">
      <div className="relative min-h-screen">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 90, 0], y: [0, 70, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[-220px] top-[-180px] h-[620px] w-[620px] rounded-full bg-[#2563EB]/25 blur-[170px]"
          />

          <motion.div
            animate={{ x: [0, -80, 0], y: [0, -50, 0], scale: [1, 1.14, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[-260px] top-[12%] h-[700px] w-[700px] rounded-full bg-[#8B5CF6]/25 blur-[180px]"
          />

          <motion.div
            animate={{ x: [0, 50, 0], y: [0, -55, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-260px] left-[25%] h-[560px] w-[560px] rounded-full bg-[#06B6D4]/15 blur-[160px]"
          />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px]" />
        </div>

        <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.section
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75 }}
            className="relative overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.07] p-6 shadow-[0_45px_160px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-8"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F2D38A]/70 to-transparent" />

            <div className="relative">
              <div className="mb-8">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#F2D38A] backdrop-blur-xl">
                  <FaCrown className="text-[#D6B36A]" />
                  FANLY Access Portal
                </div>

                <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
                  Create your VIP fan identity.
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#B9C2D0] sm:text-base">
                  Join FANLY to book celebrities, manage VIP cards, support
                  causes, and unlock premium fan experiences.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <InputField
                    icon={<FaUserAlt />}
                    label="Full Name"
                    register={register("fullName")}
                    placeholder="John Doe"
                    error={errors.fullName?.message}
                  />

                  <InputField
                    icon={<FaStar />}
                    label="Username"
                    register={register("username")}
                    placeholder="johndoe"
                    error={errors.username?.message}
                  />

                  <InputField
                    icon={<FaEnvelope />}
                    label="Email"
                    type="email"
                    register={register("email")}
                    placeholder="Johndoe@gmail.com"
                    error={errors.email?.message}
                  />

                  <PhoneField
                    register={register}
                    errors={errors}
                    countries={countries}
                  />

                  <CountryField
                    register={register}
                    errors={errors}
                    countries={countries}
                    onCountryChange={handleCountryChange}
                  />

                  <PasswordField
                    icon={<FaLock />}
                    label="Password"
                    register={register("password")}
                    placeholder="Enter password"
                    show={showPassword}
                    setShow={setShowPassword}
                    error={errors.password?.message}
                  />

                  <div className="md:col-span-2">
                    <PasswordField
                      icon={<FaLock />}
                      label="Confirm Password"
                      register={register("confirmPassword")}
                      placeholder="Confirm password"
                      show={showConfirmPassword}
                      setShow={setShowConfirmPassword}
                      error={errors.confirmPassword?.message}
                    />
                  </div>
                </div>

                <div>
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-[#B9C2D0]">
                    <input
                      type="checkbox"
                      {...register("terms")}
                      className="mt-1 h-4 w-4 rounded accent-[#D6B36A]"
                    />

                    <span>
                      I agree to the{" "}
                      <span className="font-bold text-[#F2D38A]">
                        terms of service
                      </span>{" "}
                      and{" "}
                      <span className="font-bold text-[#F2D38A]">
                        privacy policy
                      </span>
                    </span>
                  </label>

                  {errors.terms && (
                    <p className="mt-2 text-sm font-medium text-red-400">
                      {errors.terms.message}
                    </p>
                  )}
                </div>

                <motion.button
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-6 py-4 text-sm font-black uppercase tracking-widest text-[#05070F] shadow-[0_0_40px_rgba(214,179,106,0.35)] transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                  {!loading && (
                    <FaArrowRight className="transition group-hover:translate-x-1" />
                  )}
                </motion.button>

                <div className="flex items-center gap-4 py-2">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#B9C2D0]">
                    Or
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="google-login-wrap">
                  <GoogleLogin
                    theme="outline"
                    size="large"
                    text="continue_with"
                    shape="pill"
                    width="100%"
                    onSuccess={handleGoogleSuccess}
                    onError={() => toast.error("Google login failed")}
                  />
                </div>

                <p className="text-center text-sm text-[#B9C2D0]">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-black text-[#F2D38A] transition hover:text-white"
                  >
                    Log in
                  </Link>
                </p>
              </form>
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, x: 45, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="relative hidden min-h-[780px] overflow-hidden rounded-[46px] border border-white/10 bg-white/[0.06] p-5 shadow-[0_45px_160px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:block"
          >
            <img
              src={SignupImage}
              alt="Fanly signup"
              className="absolute inset-0 h-full w-full object-cover opacity-55"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-[#05070F]/95 via-[#05070F]/55 to-[#05070F]/95" />

            <div className="relative flex h-full flex-col justify-between rounded-[36px] border border-white/10 p-8">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#F2D38A] backdrop-blur-xl">
                  <FaUserPlus />
                  Join The Network
                </div>

                <h2 className="max-w-lg text-5xl font-black leading-tight text-white">
                  Step into the celebrity access layer.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-[#B9C2D0]">
                  Create one account for bookings, fan cards, donations, premium
                  access and unforgettable celebrity experiences.
                </p>
              </div>

              <div className="grid gap-4">
                <SignupFeature
                  icon={<FaShieldAlt />}
                  title="Secure profile"
                  text="Your account keeps your requests, payments and access organized."
                />

                <SignupFeature
                  icon={<FaCrown />}
                  title="VIP fan cards"
                  text="Unlock exclusive fan tiers and premium celebrity benefits."
                />

                <SignupFeature
                  icon={<FaCheckCircle />}
                  title="Clear request flow"
                  text="Track bookings, donations and memberships from your profile."
                />
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

function InputField({
  icon,
  label,
  register,
  placeholder,
  error,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-3 block text-xs font-black uppercase tracking-[0.22em] text-[#F2D38A]">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#06B6D4]">
          {icon}
        </span>

        <input
          type={type}
          {...register}
          placeholder={placeholder}
          className={`w-full rounded-2xl border bg-black/25 px-12 py-4 text-white outline-none placeholder:text-[#8B95A5] ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-white/10 focus:border-[#D6B36A]/60"
          }`}
        />
      </div>

      {error && (
        <p className="mt-2 text-sm font-medium text-red-400">{error}</p>
      )}
    </div>
  );
}

function PhoneField({ register, errors, countries }) {
  return (
    <div>
      <label className="mb-3 block text-xs font-black uppercase tracking-[0.22em] text-[#F2D38A]">
        Phone Number
      </label>

      <div className="grid grid-cols-[120px_1fr] gap-3">
        <select
          {...register("countryCode")}
          className="w-full rounded-2xl border border-white/10 bg-black/25 px-3 py-4 text-white outline-none focus:border-[#D6B36A]/60"
        >
          {countries.map((country) => (
            <option
              key={country.isoCode}
              value={country.code}
              className="bg-[#05070F] text-white"
            >
              {country.name} ({country.code})
            </option>
          ))}
        </select>

        <div className="relative">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#06B6D4]">
            <FaPhoneAlt />
          </span>

          <input
            {...register("phone")}
            placeholder="Phone number"
            className={`w-full rounded-2xl border bg-black/25 px-12 py-4 text-white outline-none placeholder:text-[#8B95A5] ${
              errors.phone
                ? "border-red-500 focus:border-red-500"
                : "border-white/10 focus:border-[#D6B36A]/60"
            }`}
          />
        </div>
      </div>

      {errors.phone && (
        <p className="mt-2 text-sm font-medium text-red-400">
          {errors.phone.message}
        </p>
      )}
    </div>
  );
}

function CountryField({ register, errors, countries, onCountryChange }) {
  return (
    <div>
      <label className="mb-3 block text-xs font-black uppercase tracking-[0.22em] text-[#F2D38A]">
        Country
      </label>

      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#06B6D4]">
          <FaGlobe />
        </span>

        <select
          {...register("country")}
          onChange={onCountryChange}
          className={`w-full rounded-2xl border bg-black/25 px-12 py-4 text-white outline-none ${
            errors.country
              ? "border-red-500 focus:border-red-500"
              : "border-white/10 focus:border-[#D6B36A]/60"
          }`}
        >
          <option value="" className="bg-[#05070F] text-white">
            Select your country
          </option>

          {countries.map((country) => (
            <option
              key={country.isoCode}
              value={country.name}
              className="bg-[#05070F] text-white"
            >
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {errors.country && (
        <p className="mt-2 text-sm font-medium text-red-400">
          {errors.country.message}
        </p>
      )}
    </div>
  );
}

function PasswordField({
  icon,
  label,
  register,
  placeholder,
  show,
  setShow,
  error,
}) {
  return (
    <div>
      <label className="mb-3 block text-xs font-black uppercase tracking-[0.22em] text-[#F2D38A]">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#06B6D4]">
          {icon}
        </span>

        <input
          type={show ? "text" : "password"}
          {...register}
          placeholder={placeholder}
          className={`w-full rounded-2xl border bg-black/25 px-12 py-4 pr-14 text-white outline-none placeholder:text-[#8B95A5] ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-white/10 focus:border-[#D6B36A]/60"
          }`}
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-[#B9C2D0] transition hover:text-[#F2D38A]"
        >
          {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm font-medium text-red-400">{error}</p>
      )}
    </div>
  );
}

function SignupFeature({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-[26px] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-2xl"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D6B36A]/15 text-[#F2D38A]">
        {icon}
      </div>

      <h3 className="font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#B9C2D0]">{text}</p>
    </motion.div>
  );
}

export default Signup;
