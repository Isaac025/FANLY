import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoginImage from "../assets/LoginImage.png"; // Replace with your actual image path
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Email or username is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { login, loading } = useAppContext();

  const onSubmit = async (data) => {
    const success = await login(data);

    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="container lg:flex min-h-screen bg-white">
      {/* Left Form Section */}
      <div className="max-w-125 w-full flex flex-col justify-center sm:px-6 md:px-8 lg:px-16">
        <h1 className="text-3xl font-bold mb-2 text-center lg:text-left text-[#1F1F1F]">
          FANLY
        </h1>
        <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">
          Welcome Back!
        </h2>
        <p className="text-gray-600 mb-6 hidden md:block">
          Continue with email address you used to create account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label htmlFor="email" className="text-[#000000] font-medium mb-3">
            Email or Username
          </label>

          <input
            {...register("identifier")}
            placeholder="Email or Username"
            className="w-full border rounded px-3 py-2 bg-[#ECECEC] lg:bg-white"
          />
          <p className="text-red-500 text-sm">{errors.identifier?.message}</p>

          <label htmlFor="password" className="text-[#000000] font-medium mb-3">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="*********"
              className="w-full border rounded px-3 py-2 pr-12 bg-[#ECECEC] lg:bg-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-red-500 text-sm">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1D4996] text-white py-2 rounded cursor-pointer disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <div className="flex items-center justify-center my-4">
            <span className="text-gray-500">Or</span>
          </div>

          <button
            type="button"
            className="w-full border py-2 rounded flex justify-center items-center space-x-2 cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </button>

          <p className="text-center text-gray-600 mt-4">
            New user?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </form>
      </div>

      {/* Right Image Section */}
      <div
        className="w-1/2 bg-cover bg-center hidden lg:block"
        style={{ backgroundImage: `url(${LoginImage})` }}
      ></div>
    </div>
  );
};

export default Login;
