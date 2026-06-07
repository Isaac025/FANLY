import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import about from "../assets/about.png";
import team1 from "../assets/team1.png";
import team2 from "../assets/team2.png";
import team3 from "../assets/team3.png";
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

const teamMembers = [
  {
    name: "Brooklyn Simmons",
    role: "FOUNDER / CEO",
    image: team1,
  },
  {
    name: "Phillip Tony",
    role: "PERSONNEL EXPERT",
    image: team2,
  },
  {
    name: "David Jones",
    role: "HEAD OF MARKETING",
    image: team3,
  },
];

const About = () => {
  return (
    <>
      <Navbar />
      <section className="bg-linear-to-b mt-20 from-white via-gray-150 to-blue-250">
        {/* Header */}
        <div className="relative overflow-hidden bg-gray-50 h-80 flex items-center justify-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-40 bg-blue-500/30 blur-2xl" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-40 bg-blue-500/30 blur-2xl" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, transparent, transparent 20px, rgba(0,0,0,0.05) 21px)",
            }}
          />
          <div className="relative z-10 text-center px-4 animate-fade-in">
            <h2 className="md:text-6xl text-[30px] font-bold md:font-semibold text-[#535252] mb-4">
              About us
            </h2>
            <p className="text-[#6C6A69] text-[16px] md:text-xl max-w-2xl mx-auto leading-relaxed">
              Lets build something great together, have a project in mind, a
              question about our services — reach out to us.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="container">
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-start gap-10 md:gap-0 mb-10 animate-fade-in">
            <img
              src={about}
              alt="About Us"
              className="max-w-105 w-full lg:h-120"
            />
            <div className="max-w-125 w-full">
              <h2 className="text-[#535252] text-[16px] md:text-[32px] text-center md:text-left font-medium">
                About Us
              </h2>
              <h1 className="text-[#535252] hidden md:block text-[46px] font-semibold">
                REAL CONNECTIONS START HERE
              </h1>
              <h1 className="text-[#535252] md:hidden text-[23px] font-semibold text-center mb-1">
                REAL CONNECTIONS
              </h1>
              <h1 className="md:hidden text-[23px] font-semibold text-center text-blue-800">
                START HERE
              </h1>
              <p className="text-[#6C6A69] text-[16px] md:text-[23px] text-center md:text-left">
                We believe meeting the people who inspire you should feel
                personal, exciting, and unforgettable — not impossible. Our
                platform was built to break the distance between fans and
                celebrities by creating meaningful experiences that go beyond
                likes, comments, and social media feeds.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section className="bg-linear-to-b from-white via-gray-150 to-blue-200">
          <div className="container">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-10">
              <div className="animate-fade-in">
                <h4 className="text-gray-500 font-medium text-center lg:text-left">
                  Our Services
                </h4>
                <h2 className="text-[20px] md:text-3xl font-bold text-center lg:text-left">
                  Special Features{" "}
                  <span className="text-blue-600">For You</span>
                </h2>
              </div>
              <p className="text-gray-600 mt-4 md:mt-0 md:w-1/2 animate-fade-in">
                Discover our unique range of services designed to create
                unforgettable experiences with your favorite celebrities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl shadow-purple-300 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                >
                  <div className="mb-3">{service.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-10">
              <div>
                <h4 className="text-gray-500 font-medium">The Team</h4>
                <h2 className="text-3xl font-bold">
                  MEET THE <span className="text-blue-600">TEAM</span>
                </h2>
              </div>
              <p className="text-gray-600 mt-4 md:mt-0 md:w-1/2">
                We collaborate with leading entertainment brands and studios to
                bring you access to the best celebrity talent across industries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
};

export default About;
