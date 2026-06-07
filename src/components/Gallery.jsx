import React from "react";
import gallery1 from "../assets/gallery1.png";
import gallery2 from "../assets/gallery2.png";
import gallery3 from "../assets/gallery3.png";
import gallery4 from "../assets/gallery4.png";
import gallery5 from "../assets/gallery5.png";
import gallery6 from "../assets/gallery6.png";
import gallery7 from "../assets/gallery7.png";
import gallery8 from "../assets/gallery8.png";

const categories = ["All", "Events", "Meet and greet", "Shows"];

const images = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
];

const Gallery = () => {
  return (
    <section className="container bg-linear-to-b from-white via-gray-50 to-blue-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-10 animate-fade-in">
        <div>
          <h4 className="text-gray-500 font-medium text-center lg:text-left">
            Gallery
          </h4>
          <h2 className="text-3xl font-bold text-center lg:text-left ">
            Fanly <span className="text-blue-600">Gallery</span>
          </h2>
        </div>
        <p className="text-gray-600 mt-4 md:mt-0 md:w-1/2">
          We curate a diverse selection of celebrities from various fields,
          including movies, music, sports, fashion, and more. Explore their
          profiles, discover their upcoming projects, and stay updated with
          their latest news.
        </p>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in">
        {categories.map((category, index) => (
          <button
            key={index}
            className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-300"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
        {images.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <img
              src={img}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* View Full Gallery Button */}
      <div className="mt-10 text-center animate-fade-in">
        <button className="bg-blue-600 cursor-pointer text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300">
          View full gallery
        </button>
      </div>
    </section>
  );
};

export default Gallery;
