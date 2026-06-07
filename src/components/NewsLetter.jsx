import React from "react";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "FOLA JACOB",
    role: "student",
    text: "I've used this platform multiple times, and it never disappoints! The user interface is easy to navigate",
  },
  {
    name: "FOLA JACOB",
    role: "student",
    text: "I've used this platform multiple times, and it never disappoints! The user interface is easy to navigate",
  },
  {
    name: "FOLA JACOB",
    role: "student",
    text: "I've used this platform multiple times, and it never disappoints! The user interface is easy to navigate",
  },
  {
    name: "FOLA JACOB",
    role: "student",
    text: "I've used this platform multiple times, and it never disappoints! The user interface is easy to navigate",
  },
];

const NewsLetter = () => {
  return (
    <section className="bg-[#1D4996] text-white  ">
      <div className="container flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Left Section */}
        <div className="md:w-1/2 mb-8 md:mb-0 animate-fade-in">
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-xl mr-1" />
            ))}
          </div>
          <p className="text-gray-200 mb-4 font-medium">
            Become a Part of Success
          </p>
          <h2 className="text-3xl font-bold leading-snug">
            Unlock exclusive access to your favorite celebrities
          </h2>
        </div>

        {/* Right Section - Form */}
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 md:w-1/2 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Subscribe to our newsletter
          </h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First name
              </label>
              <input
                type="text"
                placeholder="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last name
              </label>
              <input
                type="text"
                placeholder="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-800 text-white font-semibold py-2 rounded-md hover:bg-blue-900 transition-colors duration-300"
            >
              Subscribe now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
