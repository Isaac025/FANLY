import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  HeroBlock,
  FormHeader,
  Steps,
  HelpCTA,
  PageFooter,
} from "./BookingShared";
import { useAppContext } from "../context/AppContext";

const serviceFee = 5.56;

export default function Booking() {
  const { state } = useLocation();
  const selectedCelebrity = state?.celebrity;

  const navigate = useNavigate();
  const { createBooking, loading } = useAppContext();

  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    eventDate: "",
    eventTime: "",
    gender: "",
    eventLocation: "",
    eventType: "",
    duration: "",
    specialRequest: "",
    paymentMethod: "",
  });

  const bookingFee = Number(selectedCelebrity?.bookingFee || 0);
  const total = bookingFee + serviceFee;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const nextStep = () => {
    if (step === 0) {
      const requiredFields = [
        "fullName",
        "phone",
        "email",
        "eventDate",
        "eventTime",
        "gender",
        "eventLocation",
        "eventType",
        "duration",
      ];

      const missingField = requiredFields.find((field) => !formData[field]);

      if (missingField) {
        toast.error("Please complete all event details");
        return;
      }
    }

    if (step < 2) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePayment = async () => {
    if (!selectedCelebrity?._id) {
      toast.error("Please select a celebrity first");
      navigate("/book-celebrity");
      return;
    }

    if (!formData.paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    const payload = {
      celebrity: selectedCelebrity._id,
      celebrityName: selectedCelebrity.name,

      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      gender: formData.gender,

      eventDate: formData.eventDate,
      eventTime: formData.eventTime,
      eventLocation: formData.eventLocation,
      eventType: formData.eventType,
      duration: formData.duration,
      specialRequest: formData.specialRequest,

      amount: bookingFee,
      serviceFee,
      total,
      paymentMethod: formData.paymentMethod,
    };
    const booking = await createBooking(payload);

    if (booking) {
      navigate("/payment", {
        state: {
          booking,
          celebrity: selectedCelebrity,
          type: "booking",
          amount: total,
        },
      });
    }
  };

  return (
    <div className="page-shell">
      <HeroBlock mode="booking" celebrity={selectedCelebrity} />

      <main className="form-card">
        <FormHeader
          title={`Book ${selectedCelebrity?.name || "Celebrity"}`}
          subtitle="Schedule a professional booking or appearance"
          button="Booking"
        />

        <Steps active={step} booking />

        {step === 0 && (
          <>
            <div className="field-grid">
              <div className="field">
                <label>Full name</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Phone number</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 7000000"
                />
              </div>

              <div className="field">
                <label>Email address</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Event Date</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Event time</label>
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="field">
                <label>Event location</label>
                <input
                  name="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Event type</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                >
                  <option value="">Select Event type</option>
                  <option>Birthday</option>
                  <option>Private Party</option>
                  <option>Corporate Event</option>
                  <option>Meet and Greet</option>
                </select>
              </div>

              <div className="field">
                <label>Duration</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                >
                  <option value="">Select Duration</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>3 hours</option>
                  <option>Full day</option>
                </select>
              </div>
            </div>

            <div className="actions">
              <button className="secondary" type="button" disabled>
                ← Back
              </button>

              <button className="primary" type="button" onClick={nextStep}>
                Requirement →
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="requirement-box">
              <label>Special Requests or Requirements</label>

              <textarea
                name="specialRequest"
                value={formData.specialRequest}
                onChange={handleChange}
                placeholder="Please specify any requirement, equipment need or special request for the celebrity"
                rows="7"
              />
            </div>

            <div className="celebrity-requirements">
              <h3>Celebrity Requirements</h3>

              <p>● Professional sound system required for performances</p>
              <p>● Private green room with refreshments</p>
              <p>● Security personnel must be provided</p>
              <p>● Transportation from local airport/hotel</p>
              <p>● Approval of any recording or photography</p>
            </div>

            <div className="actions">
              <button className="secondary" type="button" onClick={prevStep}>
                ← Back
              </button>

              <button className="primary" type="button" onClick={nextStep}>
                Payment →
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="summary-box">
              <h3>Booking summary</h3>

              <div>
                <span>Celebrity</span>
                <strong>{selectedCelebrity?.name || "Celebrity"}</strong>
              </div>

              <div>
                <span>Base Booking Fee:</span>
                <strong>${bookingFee.toLocaleString()}</strong>
              </div>

              <div>
                <span>Service Fee:</span>
                <strong>${serviceFee.toFixed(2)}</strong>
              </div>

              <hr />

              <div>
                <span>Total</span>
                <strong>${total.toLocaleString()}</strong>
              </div>
            </div>

            <div className="payment-box">
              <label>Select payment method</label>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="">Choose a payment method</option>
                <option value="card">Card Payment</option>
                <option value="bank">Bank Transfer</option>
                <option value="crypto">Crypto Payment</option>
              </select>
            </div>

            <div className="actions">
              <button className="secondary" type="button" onClick={prevStep}>
                ← Back
              </button>

              <button
                className="primary"
                type="button"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Payment →"}
              </button>
            </div>
          </>
        )}
      </main>

      <HelpCTA booking />
      <PageFooter />
    </div>
  );
}
