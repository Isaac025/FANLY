import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 400);
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 30 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="
            fixed
            bottom-2
            right-6
            z-[9999]
            group
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            border
            border-[#D6B36A]/30
            bg-gradient-to-br
            from-[#D6B36A]
            via-[#F2D38A]
            to-[#C7A76C]
            text-[#05070F]
            shadow-[0_0_35px_rgba(214,179,106,0.35)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:scale-110
          "
        >
          {/* Glow Ring */}
          <span className="absolute inset-0 rounded-full bg-[#D6B36A]/30 blur-xl opacity-0 transition duration-300 group-hover:opacity-100" />

          {/* Arrow */}
          <FaChevronUp className="relative text-sm font-black" />

          {/* Rotating Border */}
          <span className="absolute inset-[-2px] rounded-full border border-[#F2D38A]/20 group-hover:animate-spin" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
