import React from "react";
import { FaVideo, FaUsers, FaIdCard, FaCalendarAlt } from "react-icons/fa";

const services = [
  {
    icon: <FaVideo className="text-blue-600 text-3xl" />,
    title: "Video Messages",
    description:
      "Purchase personalized video messages from your favorite celebrities for birthdays, anniversaries, or any special occasion.",
  },
  {
    icon: <FaUsers className="text-blue-600 text-3xl" />,
    title: "Meet & Greet",
    description:
      "Meet your favorite celebrities in person with our exclusive meet & greet packages and VIP experiences.",
  },
  {
    icon: <FaIdCard className="text-blue-600 text-3xl" />,
    title: "Fan Membership Card",
    description:
      "Apply for a fan membership card to unlock exclusive benefits, discounts, and priority access to celebrity events.",
  },
  {
    icon: <FaCalendarAlt className="text-blue-600 text-3xl" />,
    title: "Online Celebrity Bookings",
    description:
      "Book celebrities online for your event with ease. Our platform provides a seamless and transparent booking experience.",
  },
];

const OurServices = () => {
  return (
    <section className="bg-linear-to-b from-white via-gray-150 to-blue-200">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-10">
          <div className="animate-fade-in">
            <h4 className="text-gray-500 font-medium text-center lg:text-left">
              Our Services
            </h4>
            <h2 className="text-[20px] md:text-3xl font-bold text-center lg:text-left">
              Special Features <span className="text-blue-600">For You</span>
            </h2>
          </div>
          <p className="text-gray-600 mt-4 md:mt-0 md:w-1/2 animate-fade-in">
            Discover our unique range of services designed to create
            unforgettable experiences with your favorite celebrities.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl shadow-purple-300 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
            >
              <div className="mb-3">{service.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
