import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Featured from "../components/Featured";
import OurServices from "../components/OurServices";
import OurPartners from "../components/OurPartners";
import Gallery from "../components/Gallery";
import NewsLetter from "../components/NewsLetter";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="container mx-auto px-6 py-12 flex flex-wrap lg:flex-nowrap items-center justify-center gap-15">
        <div className="flex flex-col items-center">
          <h1 className="text-[#737272] text-[33px] lg:text-[60px] font-extrabold">
            50+
          </h1>
          <p className="text-[#A3A3A3] font-medium text-[17px] lg:text-[25px]">
            Celebrity Events
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-[#737272] text-[33px] lg:text-[60px] font-extrabold">
            100K+
          </h1>
          <p className="text-[#A3A3A3] font-medium text-[17px] lg:text-[25px]">
            Happy Clients
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-[#737272] text-[33px] lg:text-[60px] font-extrabold">
            10+
          </h1>
          <p className="text-[#A3A3A3] font-medium text-[17px] lg:text-[25px]">
            Years Experience
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-[#737272] text-[33px] lg:text-[60px] font-extrabold">
            24/7
          </h1>
          <p className="text-[#A3A3A3] font-medium text-[17px] lg:text-[25px]">
            Support
          </p>
        </div>
      </div>
      <Categories />
      <Featured />
      <OurServices />
      <OurPartners />
      <div className="bg-[#EAF1FD]">
        <div className="container">
          <div className="flex flex-col items-center text-center">
            <h2 className="md:text-[#3D3D3D] text-[#2F2F2F] text-[23px] md:text-[49px] font-semibold">
              Need a Custom Celebrity Experience?
            </h2>
            <p className="font-medium md:text-[27px] md:text-[#8F8A8A] text-[#555454] text-[15px] my-5 lg:my-10">
              Our team specializes in creating bespoke celebrity experiences
              tailored to your specific needs. Whether you're planning a
              corporate event, private party, or special occasion, we can help
              you create unforgettable memories.
            </p>
            <button className="bg-[#1D4996] text-[#F9F7ED] py-2 px-8 text-[20px] cursor-pointer rounded-lg hover:bg-blue-800 mx-auto block mt-8 transition">
              Schedule a consultation
            </button>
          </div>
        </div>
      </div>
      <Gallery />
      <NewsLetter />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
