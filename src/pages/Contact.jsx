import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <section className=" bg-linear-to-b mt-20 from-white via-gray-150 to-blue-250">
        {/* Header */}
        <div className="relative overflow-hidden bg-gray-50 h-80 flex items-center justify-center">
          {/* Left gradient */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-40 bg-blue-500/30 blur-2xl" />

          {/* Right gradient */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-40 bg-blue-500/30 blur-2xl" />

          {/* Optional subtle vertical pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, transparent, transparent 20px, rgba(0,0,0,0.05) 21px)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-4 animate-fade-in">
            <h2 className="md:text-6xl text-[30px] font-bold md:font-semibold text-[#535252] mb-4">
              Contact us
            </h2>

            <p className="text-[#6C6A69] text-[16px] md:text-xl max-w-2xl mx-auto leading-relaxed">
              Let's build something great together. Have a project in mind, a
              question about our services, or need assistance? Reach out to us.
            </p>
          </div>
        </div>

        {/* Contact Form and Info */}
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Form Section */}
          <div className="bg-white shadow-md rounded-lg p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-2">Send a Message</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Fill out the form and we’ll get back to you.
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Comment or message
                </label>
                <textarea
                  placeholder="Leave a message"
                  rows="4"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer bg-blue-800 text-white font-semibold py-2 rounded-md hover:bg-blue-900 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="flex flex-col justify-center space-y-8 animate-fade-in">
            {/* Email */}
            <div className="flex items-start space-x-3">
              <FaEnvelope className="text-blue-600 text-xl mt-1" />
              <div>
                <h4 className="font-semibold">Email Us</h4>
                <p className="text-gray-600 text-sm">
                  Send us a mail anytime, we’ll get back within 24 hours.
                </p>
                <p className="text-blue-600 font-medium mt-1">
                  info@yourorg.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-3">
              <FaPhoneAlt className="text-blue-600 text-xl mt-1" />
              <div>
                <h4 className="font-semibold">Call Us</h4>
                <p className="text-gray-600 text-sm">
                  Prefer to talk directly? Reach out during our office hours
                  (Mon–Fri, 9AM–5PM).
                </p>
                <p className="text-blue-600 font-medium mt-1">
                  +234 XX XXX XXXX
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt className="text-blue-600 text-xl mt-1" />
              <div>
                <h4 className="font-semibold">Visit Us</h4>
                <p className="text-gray-600 text-sm">
                  Stop by our office for in-person inquiries, we’d love to meet
                  you!
                </p>
                <p className="text-blue-600 font-medium mt-1">
                  5th Street, Lagos, Nigeria
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-md animate-fade-in">
          <iframe
            title="Lagos Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.234567890!2d3.3792!3d6.4580!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4b2b2b2b2b2%3A0x123456789abcdef!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1680000000000!5m2!1sen!2sng"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
