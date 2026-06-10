import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPlay } from "react-icons/fa";

const HeroPreviewModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/85 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 50, filter: "blur(18px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.88, y: 50, filter: "blur(18px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-6xl overflow-hidden rounded-[35px] border border-white/10 bg-[#05070F] shadow-[0_40px_140px_rgba(0,0,0,0.85)]">
              <div className="absolute -inset-20 bg-[radial-gradient(circle_at_top,#D6B36A55,transparent_35%),radial-gradient(circle_at_bottom_right,#4C3F9155,transparent_40%)] blur-3xl" />

              <button
                onClick={onClose}
                className="absolute right-5 top-5 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-xl transition hover:bg-white/10"
              >
                <FaTimes />
              </button>

              <div className="relative aspect-video w-full overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="h-full w-full object-cover"
                  poster="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg"
                >
                  <source
                    src="https://videos.pexels.com/video-files/30240891/12967342_1920_1080_30fps.mp4"
                    type="video/mp4"
                  />
                </video>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070F]/80 via-transparent to-black/30" />

                <div className="pointer-events-none absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#F2D38A] backdrop-blur-xl">
                    <FaPlay className="text-[10px]" />
                    Premium Preview
                  </div>

                  <h2 className="mt-4 max-w-3xl text-3xl font-black text-white md:text-5xl">
                    Real access. Real energy. Real celebrity moments.
                  </h2>

                  <p className="mt-3 max-w-xl text-sm text-[#B9C2D0] md:text-base">
                    A cinematic preview of live fan rooms, VIP moments,
                    exclusive access, and unforgettable experiences.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HeroPreviewModal;
