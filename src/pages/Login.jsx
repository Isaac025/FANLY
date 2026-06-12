import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoginImage from "../assets/LoginImage.png";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUserAlt,
  FaCrown,
  FaStar,
  FaShieldAlt,
  FaArrowRight,
  FaBolt,
  FaCheckCircle,
} from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Email or username is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login, loading, googleLogin } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const success = await login(data);

    if (success) {
      navigate("/");
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

        <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.section
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75 }}
            className="relative overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.07] p-6 shadow-[0_45px_160px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-8"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F2D38A]/70 to-transparent" />
            <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full bg-[#D6B36A]/10 blur-[90px]" />

            <div className="relative">
              <div className="mb-8">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#F2D38A] backdrop-blur-xl">
                  <FaCrown className="text-[#D6B36A]" />
                  FANLY Access Portal
                </div>

                <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
                  Welcome back to the spotlight.
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-7 text-[#B9C2D0] sm:text-base">
                  Sign in to manage bookings, VIP cards, donations and your
                  premium celebrity experiences.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="mb-3 block text-xs font-black uppercase tracking-[0.22em] text-[#F2D38A]">
                    Email or Username
                  </label>

                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#06B6D4]">
                      <FaUserAlt />
                    </span>

                    <input
                      {...register("identifier")}
                      placeholder="Email or Username"
                      className={`w-full rounded-2xl border bg-black/25 px-12 py-4 text-white outline-none placeholder:text-[#8B95A5] ${
                        errors.identifier
                          ? "border-red-500 focus:border-red-500"
                          : "border-white/10 focus:border-[#D6B36A]/60"
                      }`}
                    />
                  </div>

                  {errors.identifier && (
                    <p className="mt-2 text-sm font-medium text-red-400">
                      {errors.identifier.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-xs font-black uppercase tracking-[0.22em] text-[#F2D38A]">
                    Password
                  </label>

                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#06B6D4]">
                      <FaLock />
                    </span>

                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      placeholder="Enter your password"
                      className={`w-full rounded-2xl border bg-black/25 px-12 py-4 pr-14 text-white outline-none placeholder:text-[#8B95A5] ${
                        errors.password
                          ? "border-red-500 focus:border-red-500"
                          : "border-white/10 focus:border-[#D6B36A]/60"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-[#B9C2D0] transition hover:text-[#F2D38A]"
                    >
                      {showPassword ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-2 text-sm font-medium text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-[#B9C2D0]">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded accent-[#D6B36A]"
                    />
                    Remember me
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-bold text-[#F2D38A] transition hover:text-white"
                  >
                    Forgot password?
                  </Link>
                </div>

                <motion.button
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#D6B36A] via-[#F2D38A] to-[#C7A76C] px-6 py-4 text-sm font-black uppercase tracking-widest text-[#05070F] shadow-[0_0_40px_rgba(214,179,106,0.35)] transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Logging in..." : "Log in"}
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
                  New user?{" "}
                  <Link
                    to="/signup"
                    className="font-black text-[#F2D38A] transition hover:text-white"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, x: 45, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="relative hidden min-h-[720px] overflow-hidden rounded-[46px] border border-white/10 bg-white/[0.06] p-5 shadow-[0_45px_160px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:block"
          >
            <img
              src={LoginImage}
              alt="Fanly login"
              className="absolute inset-0 h-full w-full object-cover opacity-55"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-[#05070F]/95 via-[#05070F]/55 to-[#05070F]/95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(214,179,106,0.30),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.25),transparent_35%)]" />

            <div className="relative flex h-full flex-col justify-between rounded-[36px] border border-white/10 p-8">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#F2D38A] backdrop-blur-xl">
                  <FaBolt />
                  Elite Access
                </div>

                <h2 className="max-w-lg text-5xl font-black leading-tight text-white">
                  Your celebrity world starts here.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-[#B9C2D0]">
                  Book appearances, unlock VIP fan cards, support causes and
                  manage every premium experience from one account.
                </p>
              </div>

              <div className="grid gap-4">
                <LoginFeature
                  icon={<FaShieldAlt />}
                  title="Secure account access"
                  text="Protected login experience for your bookings and payments."
                />

                <LoginFeature
                  icon={<FaStar />}
                  title="Premium celebrity experiences"
                  text="Your profile keeps your requests organized in one place."
                />

                <LoginFeature
                  icon={<FaCheckCircle />}
                  title="Verified request flow"
                  text="Bookings, donations and VIP cards move through clear status steps."
                />
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

function LoginFeature({ icon, title, text }) {
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

export default Login;
