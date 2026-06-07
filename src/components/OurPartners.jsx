import React from "react";
import partner1 from "../assets/partner1.png"; // Replace with your actual image paths
import partner2 from "../assets/partner2.png";
import partner3 from "../assets/partner3.png";
import partner4 from "../assets/partner4.png";
import partner5 from "../assets/partner5.png";
import partner6 from "../assets/partner6.png";

const logos = [partner1, partner2, partner3, partner4, partner5, partner6];

const OurPartners = () => {
  return (
    <div className="container">
      <h1 className="text-[#535252] text-center lg:text-left text-[17px] md:text-[32px] font-medium mb-5">
        Our Partners
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 mb-5">
        <h1 className="text-[25px] lg:text-[40px] text-[#535252] font-bold  lg:w-125 text-center lg:text-left">
          Fanly
          <br />
          <span className="text-blue-700 font-bold text-center lg:text-left">
            Partners
          </span>
        </h1>
        <p className="text-[#6C6A69] text-[16px] font-medium md:text-[20px]  text-center lg:text-left lg:w-100">
          We collaborate with leading entertainment brands and studios to bring
          you access to the best celebrity talent across industries.
        </p>
      </div>
      <section className="w-full overflow-hidden">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between ">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="partner logo"
              className="h-12 w-full object-contain"
            />
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden overflow-hidden">
          <div className="flex animate-scroll w-max">
            {[...logos, ...logos].map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="partner logo"
                className="h-10 object-contain mx-6 shrink-0"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurPartners;
