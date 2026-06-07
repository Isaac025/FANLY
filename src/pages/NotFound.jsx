import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./BookingPages.css";

export default function NotFound() {
  return (
    <div className="page-shell">
      <Navbar />

      <section className="not-found-page">
        <div className="not-found-card">
          <span className="error-badge">404</span>

          <h1>Page not found</h1>

          <p>
            The page you are looking for does not exist, may have been moved, or
            the link is incorrect.
          </p>

          <div className="not-found-actions">
            <Link to="/" className="primary">
              Back to Home
            </Link>

            <Link to="/booking" className="outline-link">
              Book Celebrity
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
