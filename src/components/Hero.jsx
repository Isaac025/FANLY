import React from "react";
import { FaThumbsUp, FaHeart, FaMousePointer } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-white to-blue-200 overflow-hidden text-center px-6">
      {/* Floating Icons */}
      <div className="absolute top-10 left-10 text-blue-500 animate-bounce">
        <FaThumbsUp size={40} />
      </div>
      <div className="absolute top-20 right-16 text-purple-500 animate-pulse">
        <FaHeart size={40} />
      </div>
      <div className="absolute bottom-20 left-16 text-purple-400 animate-bounce">
        <FaHeart size={30} />
      </div>
      <div className="absolute bottom-10 right-10 text-blue-400 animate-pulse">
        <FaMousePointer size={35} />
      </div>

      <div className="absolute top-50 left-16 text-blue-500 animate-bounce">
        <FaThumbsUp size={40} />
      </div>
      <div className="absolute top-80 right-30 text-purple-500 animate-pulse">
        <FaHeart size={40} />
      </div>
      <div className="absolute bottom-50 left-20 text-purple-400 animate-bounce">
        <FaHeart size={30} />
      </div>
      <div className="absolute bottom-30 right-30 text-blue-400 animate-pulse">
        <FaMousePointer size={35} />
      </div>

      {/* Hero Content */}
      <div className="z-10 max-w-3xl">
        <div className="bg-blue-100 text-blue-700 font-semibold px-4 py-1 rounded-full inline-block mb-6">
          1441 Hug × 88 Hug
        </div>

        <h1 className="text-[23px] md:text-4xl lg:text-5xl font-extrabold text-[#535252] mb-4 leading-tight">
          REAL FANS. REAL ACCESS.{" "}
          <span className="text-blue-900">REAL CONNECTS.</span>
        </h1>

        <p className="text-[#6C6A69] text-[19px] lg:text-[29.28px] md:text-xl mb-8 font-medium">
          A new way to connect with celebrities through live calls, fan rooms,
          reactions, and exclusive experiences.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          {/* <button className="bg-[#1D4996] text-white w-50 rounded-[15px] h-12.5  font-medium hover:bg-blue-800 transition">
           
          </button> */}
          <button
            onClick={() => navigate("/book-celebrity")}
            className="border border-blue-700 w-70 cursor-pointer rounded-[15px] h-12.5 text-blue-700  font-medium hover:bg-blue-700 hover:text-white transition"
          >
            Book Now or Browse categories
          </button>
        </div>

        {/* Floating Cards */}
        <div className="hidden md:flex flex-col sm:flex-row justify-center gap-6">
          <div className="bg-[#D3D3D333] shadow-lg rounded-xl px-4 py-3 flex items-center space-x-3 animate-float-up">
            <img
              src="https://randomuser.me/api/portraits/women/1.jpg"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800">4.0K</p>
              <p className="text-gray-500 text-sm">People watching right now</p>
            </div>
          </div>

          <div className="bg-[#D3D3D333] shadow-lg rounded-xl px-4 py-3 flex items-center space-x-3 animate-float-down">
            <img
              src="https://randomuser.me/api/portraits/women/2.jpg"
              alt="Faith"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800">Faith</p>
              <p className="text-gray-500 text-sm">
                Definitely doing this again so much fun 🎉
              </p>
            </div>
          </div>

          <div className="bg-[#D3D3D333] shadow-lg rounded-xl px-4 py-3 flex items-center space-x-3 animate-float-down">
            <img
              src="https://randomuser.me/api/portraits/women/3.jpg"
              alt="Faith"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800">Faith</p>
              <p className="text-gray-500 text-sm">
                Definitely doing this again so much fun 🎉
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
