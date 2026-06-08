import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="
        fixed
        bottom-24
        right-6
        z-50
        w-12
        h-12
        rounded-full
        bg-[#1D4996]
        text-white
        shadow-lg
        hover:bg-blue-700
        transition-all
        duration-300
        cursor-pointer
        flex
        items-center
        justify-center
      "
    >
      <FaArrowUp />
    </button>
  );
}
