import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SignupImage from "../assets/SignupImage.png";
import { useAppContext } from "../context/AppContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const signupSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
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
});

const Signup = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    const payload = {
      fullName: data.fullName,
      username: data.username,
      email: data.email,
      phone: data.phone,
      country: data.country,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    const success = await registerUser(payload);

    if (success) {
      navigate("/login");
    }
  };
  return (
    <div className="container lg:flex min-h-screen bg-white">
      <div className="max-w-125 w-full flex flex-col justify-center sm:px-6 md:px-8 lg:px-16">
        <h1 className="text-3xl font-bold mb-2 text-center lg:text-left text-[#1F1F1F]">
          FANLY
        </h1>

        <h2 className="text-2xl font-semibold mb-4 hidden lg:block">
          Create an Account
        </h2>

        <h2 className="lg:hidden text-2xl text-[#535252] font-semibold mb-4 text-center">
          Join Our Network
        </h2>

        <p className="text-gray-600 mb-6 hidden lg:block">
          Create your account to explore events, grab tickets, and never miss
          out on the moments that matter.
        </p>

        <p className="lg:hidden text-[#535252] mb-3 text-[15px] text-center">
          Connect with your favorite celebrities and unlock exclusive
          experiences
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="text-[#000000] font-medium">Full Name</label>
          <input
            {...register("fullName")}
            placeholder="John Doe"
            className="w-full border rounded px-3 py-2 bg-[#ECECEC] lg:bg-white"
          />
          <p className="text-red-500 text-sm">{errors.fullName?.message}</p>

          <label className="text-[#000000] font-medium">Username</label>
          <input
            {...register("username")}
            placeholder="johndoe"
            className="w-full border rounded px-3 py-2 bg-[#ECECEC] lg:bg-white"
          />
          <p className="text-red-500 text-sm">{errors.username?.message}</p>

          <label className="text-[#000000] font-medium">Email</label>
          <input
            {...register("email")}
            placeholder="Johndoe@gmail.com"
            className="w-full border rounded px-3 py-2 bg-[#ECECEC] lg:bg-white"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          <label className="text-[#000000] font-medium">Phone Number</label>
          <input
            {...register("phone")}
            placeholder="+2347000000000"
            className="w-full border rounded px-3 py-2 bg-[#ECECEC] lg:bg-white"
          />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>

          <label className="text-[#000000] font-medium">Country</label>
          <input
            {...register("country")}
            placeholder="Nigeria"
            className="w-full border rounded px-3 py-2 bg-[#ECECEC] lg:bg-white"
          />
          <p className="text-red-500 text-sm">{errors.country?.message}</p>

          <label className="text-[#000000] font-medium">Password</label>

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

          <p className="text-red-500 text-sm">{errors.password?.message}</p>

          <label className="text-[#000000] font-medium">Confirm Password</label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="***********"
              className="w-full border rounded px-3 py-2 pr-12 bg-[#ECECEC] lg:bg-white"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showConfirmPassword ? (
                <FaEyeSlash size={18} />
              ) : (
                <FaEye size={18} />
              )}
            </button>
          </div>

          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>

          <label className="text-[#000000] font-medium">
            Terms and Conditions
          </label>

          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register("terms")} />
            <span>I agree to terms of service and privacy policies</span>
          </label>
          <p className="text-red-500 text-sm">{errors.terms?.message}</p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1D4996] text-white py-2 rounded cursor-pointer disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Create Account"}
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
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Log in
            </Link>
          </p>
        </form>
      </div>

      <div
        className="w-1/2 bg-cover bg-center hidden lg:block"
        style={{ backgroundImage: `url(${SignupImage})` }}
      ></div>
    </div>
  );
};

export default Signup;
