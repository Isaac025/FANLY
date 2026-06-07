import React from "react";
import category1 from "../assets/category1.png"; // Replace with your actual image paths
import category2 from "../assets/category2.png";
import category3 from "../assets/category3.png";
import category4 from "../assets/category4.png";

const Categories = () => {
  return (
    <div className="container">
      <h1 className="text-[#535252] text-center lg:text-left text-[17px] md:text-[32px] font-medium mb-5">
        Categories
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 mb-5">
        <h1 className="text-[25px] lg:text-[50px] text-[#535252] font-bold  lg:w-125">
          Browse <span className="text-blue-700 font-bold">Celebrity</span>{" "}
          <br /> <span className="text-center lg:text-left">Categories</span>
        </h1>
        <p className="text-[#6C6A69] text-[16px] font-medium md:text-[20px]  text-center lg:text-left lg:w-100">
          Explore our diverse range of celebrities from different industries and
          backgrounds. Find the perfect match for your event or experience.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-5">
        <img src={category1} alt="Category 1" className="w-full md:w-1/4" />
        <img src={category2} alt="Category 2" className="w-full md:w-1/4" />
        <img src={category3} alt="Category 3" className="w-full md:w-1/4" />
        <img src={category4} alt="Category 4" className="w-full md:w-1/4" />
      </div>
      <button className="bg-[#1D4996] text-[#F9F7ED] py-2 px-8 text-[20px] cursor-pointer rounded-lg hover:bg-blue-800 mx-auto block mt-8 transition">
        View All Categories
      </button>
    </div>
  );
};

export default Categories;
