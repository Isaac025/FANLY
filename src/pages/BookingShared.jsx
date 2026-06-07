import React from "react";
import { FaCalendarAlt, FaStar, FaUser, FaCreditCard } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import featured from "../assets/featured.png";
import "./BookingPages.css";

export const defaultCelebrity = {
  name: "May Rice",
  title: "Actor",
  location: "Austin Texas",
  image: featured,
  bookingFee: 10000,
  fanCardFee: 50,
};

export function HeroBlock({ mode = "vip", celebrity = defaultCelebrity }) {
  const isBooking = mode === "booking";
  const name = celebrity?.name || defaultCelebrity.name;
  const title = celebrity?.title || defaultCelebrity.title;
  const location = celebrity?.location || defaultCelebrity.location;
  const image = celebrity?.image || celebrity?.img || defaultCelebrity.image;
  const bookingFee = celebrity?.bookingFee || defaultCelebrity.bookingFee;
  const fanCardFee = celebrity?.fanCardFee || defaultCelebrity.fanCardFee;

  return (
    <>
      <Navbar />

      <section className="soft-hero">
        <div className="lines" />

        <div className="hero-inner">
          <div>
            <img className="celeb-img" src={image} alt={name} />

            {celebrity?.isFeatured && (
              <span
                className="badge"
                style={{
                  marginTop: -30,
                  marginLeft: 10,
                  position: "relative",
                }}
              >
                Featured
              </span>
            )}
          </div>

          <div className="hero-copy">
            <h1>{isBooking ? `Book ${name}` : `VIP Fan Card - ${name}`}</h1>

            <p>
              {isBooking
                ? "Schedule a professional booking or appearance"
                : "Become a VIP fan with exclusive benefits and perks"}
            </p>

            <div className="pill-row">
              <span className="pill">
                <FaStar /> {location}
              </span>

              <span className="pill">
                <FaUser /> {title}
              </span>
            </div>

            <p>
              {isBooking
                ? `Book ${name} for your event, appearance, or professional engagement. Our team will coordinate all details for a seamless experience.`
                : `Join ${name}'s exclusive fan club and enjoy priority booking, discounted rates, special content, and personalized messages.`}
            </p>

            <span className="price-pill">
              {isBooking
                ? `$${Number(bookingFee).toLocaleString()} Booking fee`
                : `Fan card: $${Number(fanCardFee).toLocaleString()} annual membership`}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export function HelpCTA({ booking = false }) {
  return (
    <section className="cta">
      <h2>
        {booking
          ? "Need Ready to Book Your Celebrity? Help with Your Booking?"
          : "Need Help with Your Booking?"}
      </h2>

      <p>
        Get in touch with our booking specialists for personalized assistance
        and exclusive packages
      </p>

      <div className="cta-buttons">
        <button className="primary">
          {booking ? "Contact us" : "Chat with support"}
        </button>

        <button className="outline">Call us</button>
      </div>
    </section>
  );
}

export function PageFooter() {
  return <Footer />;
}

export function FormHeader({
  title = "Get VIP Fan Card",
  subtitle = "Become a VIP fan with exclusive benefits and perks",
  button = "Vip Membership",
}) {
  return (
    <div className="form-head">
      <div className="head-left">
        <div className="head-icon">
          <FaCalendarAlt />
        </div>

        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>

      <button className="small-btn">{button}</button>
    </div>
  );
}

export function Steps({ active = 1, booking = false }) {
  const steps = booking
    ? ["Event Details", "Requirement", "Payment"]
    : ["Membership Details", "Vip Benefit", "Purchase card"];

  return (
    <div className="steps">
      {steps.map((s, i) => (
        <div className={`step ${i === active ? "active" : ""}`} key={s}>
          {i === 0 ? <FaUser /> : i === 1 ? <FaStar /> : <FaCreditCard />}
          {s}
        </div>
      ))}
    </div>
  );
}

export function Actions({ pay = false }) {
  return (
    <div className="actions">
      <button className="secondary">← Back</button>
      <button className="primary">{pay ? "Payment" : "Purchase card"} →</button>
    </div>
  );
}
