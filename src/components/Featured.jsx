import React, { useEffect, useState } from "react";
import featured from "../assets/featured.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

const Featured = () => {
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
        const { data } = await axiosInstance.get("/celebrities");

        const celebrities = data.data || [];

        setStars(celebrities.filter((item) => item.isFeatured).slice(0, 6));
      } catch (error) {
        toast.error(error.message || "Could not load celebrities");
      }
    };

    fetchCelebrities();
  }, []);

  const goToPage = (path, celebrity) => {
    navigate(path, {
      state: { celebrity },
    });
  };

  return (
    <section className="container">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
        <div>
          <h4 className="text-gray-500 font-medium text-center lg:text-left">
            Featured
          </h4>
          <h2 className="text-3xl font-bold text-center lg:text-left">
            Meet our <span className="text-blue-600">stars</span>
          </h2>
        </div>

        <p className="text-gray-600 mt-4 md:mt-0 md:w-1/2 text-center lg:text-left">
          Discover our most popular and highly requested celebrities. Book
          directly from here or explore more options in our full catalog.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stars.map((star) => (
          <div
            key={star._id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col relative"
          >
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded mb-2 self-start">
              Featured
            </span>

            <img
              src={star.image || featured}
              alt={star.name}
              className="rounded-md w-full mb-3 h-72 object-cover"
            />

            <h3 className="font-semibold text-lg">{star.name}</h3>

            <p className="text-gray-500 text-sm">
              ● {star.title || star.category || "Celebrity"}
            </p>

            <p className="text-yellow-500 font-medium absolute bottom-30 right-4">
              ⭐ 4.9
            </p>

            <div className="flex justify-between w-full mt-3 space-x-2">
              <button
                onClick={() => goToPage("/booking", star)}
                className="bg-blue-600 text-white text-sm px-3 py-1 rounded w-1/2 cursor-pointer hover:bg-blue-700"
              >
                Book now
              </button>

              <button
                onClick={() => goToPage("/donation", star)}
                className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded w-1/2 cursor-pointer hover:bg-gray-300"
              >
                Donate
              </button>
            </div>

            <button
              onClick={() => goToPage("/vip-membership", star)}
              className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded w-full mt-2 cursor-pointer hover:bg-gray-200"
            >
              Fancard
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={() => navigate("/book-celebrity")}
          className="bg-[#1D4996] text-[#F9F7ED] py-2 px-10 text-[20px] cursor-pointer rounded-lg hover:bg-blue-800 mx-auto block mt-8 transition"
        >
          Book Now
        </button>
      </div>
    </section>
  );
};

export default Featured;
