import React from "react";
import { FaStar } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

const testimonials = [
  {
    name: "Emily Johnson",
    role: "student",
    text: "This platform has been a lifesaver during my studies. Everything is organized and easy to find!",
  },
  {
    name: "Michael Smith",
    role: "teacher",
    text: "I recommend this platform to my students all the time. It’s reliable and user-friendly.",
  },
  {
    name: "Jessica Brown",
    role: "freelancer",
    text: "I love how intuitive the design is. It saves me so much time when I’m working on projects.",
  },
  {
    name: "David Miller",
    role: "professional",
    text: "The support team is fantastic! Anytime I had a question, they responded quickly and helped me out.",
  },
];

const Testimonials = () => {
  return (
    <div className="container">
      <h1 className="text-[#535252] text-center lg:text-left text-[17px] md:text-[32px] font-medium mb-5">
        Testimonials
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 mb-5">
        <h1 className="text-[25px] lg:text-[40px] text-[#535252] font-bold  lg:w-100 text-center lg:text-left">
          What Our Clients <br /> Say
        </h1>
        <p className="text-[#6C6A69] text-[16px] font-medium md:text-[20px]  text-center lg:text-left lg:w-100">
          Satisfied clients who have created memorable experiences with
          celebrities through our platform.
        </p>
      </div>
      {/* Testimonial Cards */}
      <div className="flex flex-col md:flex-row gap-6 mb-14">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-5 flex-1 hover:shadow-lg transition"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-full border border-[#1D4996] flex items-center justify-center text-[#1D4996]">
                <FiUser size={18} />
              </div>

              <div>
                <h3 className="font-bold text-[#1D4996] uppercase">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm">{item.role}</p>
              </div>
            </div>

            <p className="text-gray-500 leading-relaxed mb-4">{item.text}</p>

            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500 text-sm" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <button className="border border-[#1D4996] text-[#1D4996] px-10 py-4 rounded-xl font-medium hover:bg-[#1D4996] hover:text-white transition duration-300">
          Share your experience
        </button>

        <p className="mt-8 text-gray-600 text-lg">
          Have you worked with us? We'd love to hear your story!
        </p>
      </div>
    </div>
  );
};

export default Testimonials;
