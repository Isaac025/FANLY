import React, { useEffect, useState } from "react";
import { HelpCTA, PageFooter } from "./BookingShared";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import featured from "../assets/featured.png";
import { toast } from "react-toastify";

export default function BookCelebrity() {
  const navigate = useNavigate();
  const [celebrities, setCelebrities] = useState([]);

  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
        const { data } = await axiosInstance.get("/celebrities");
        setCelebrities(data.data || []);
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
    <div className="page-shell">
      <NavbarFix />

      <section className="soft-hero">
        <div className="lines" />
        <div className="center-title">
          <h1>Book a Celebrity</h1>
          <p>
            Choose from our exclusive roster of featured celebrities and book
            your perfect event experience
          </p>
        </div>
      </section>

      <section className="center-title" style={{ marginTop: 30 }}>
        <h1 style={{ fontSize: 30 }}>Featured Celebrities</h1>
        <p>
          Book any of our premium celebrities for your special events,
          appearances, and occasions
        </p>
      </section>

      <div className="celebs-grid">
        {celebrities.map((celebrity) => (
          <div className="celeb-card" key={celebrity._id}>
            <img src={celebrity.image || featured} alt={celebrity.name} />

            {celebrity.isFeatured && <span className="badge">Featured</span>}

            <div className="card-meta">
              <div>
                <h3>{celebrity.name}</h3>
                <small>{celebrity.title || "Celebrity"}</small>
              </div>

              <span>⭐ 4.9</span>
            </div>

            <div className="card-actions">
              <button
                className="primary cursor-pointer"
                onClick={() => goToPage("/booking", celebrity)}
              >
                Book now
              </button>

              <button
                onClick={() => goToPage("/donation", celebrity)}
                className="outline cursor-pointer"
              >
                Donate
              </button>
            </div>

            <button
              onClick={() => goToPage("/vip-membership", celebrity)}
              className="cursor-pointer text-center border-[0.5px] border-[#5576B0] w-full mt-4 rounded-md"
            >
              Fan Card
            </button>
          </div>
        ))}
      </div>

      <HelpCTA booking />
      <PageFooter />
    </div>
  );
}

function NavbarFix() {
  const Navbar = React.lazy(() => import("../components/Navbar"));

  return (
    <React.Suspense fallback={null}>
      <Navbar />
    </React.Suspense>
  );
}