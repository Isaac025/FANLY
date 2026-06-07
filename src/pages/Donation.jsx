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

export default function Donation() {
  const [step, setStep] = useState(0);
  const { state } = useLocation();
  const navigate = useNavigate();

  const selectedCelebrity = state?.celebrity;
  const { createDonation, loading } = useAppContext();

  const [formData, setFormData] = useState({
    amount: selectedCelebrity?.donationDefaultAmount || 5000,
    message: "",
    firstName: "",
    email: "",
    charity: "Children Education Foundation",
    paymentMethod: "",
  });

  const celebrityName = selectedCelebrity?.name || "Selected Celebrity";
  const amount = Number(formData.amount || 0);
  const total = amount + serviceFee;

  const charities = [
    "Children Education Foundation",
    "Health Support Initiative",
    "Community Development Fund",
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const nextStep = () => {
    if (step === 0) {
      if (!formData.amount || !formData.firstName || !formData.email) {
        toast.error("Please complete donation amount, name and email");
        return;
      }
    }

    if (step === 1 && !formData.charity) {
      toast.error("Please select a charity");
      return;
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

  const handleDonation = async () => {
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
      celebrityName,
      firstName: formData.firstName,
      email: formData.email,
      amount,
      serviceFee,
      total,
      message: formData.message,
      charity: formData.charity,
      paymentMethod: formData.paymentMethod,
    };

    const donation = await createDonation(payload);

    if (donation) {
      navigate("/payment", {
        state: {
          donation,
          celebrity: selectedCelebrity,
          type: "donation",
          amount: total,
        },
      });
    }
  };

  return (
    <div className="page-shell">
      <HeroBlock celebrity={selectedCelebrity} />

      <main className="form-card">
        <FormHeader
          title={`Make a Donation with ${celebrityName}`}
          subtitle={`Support ${celebrityName}'s chosen charity or cause`}
          button="Donation"
        />

        <Steps active={step} donation />

        {step === 0 && (
          <>
            <div className="blue-panel">
              <h3 style={{ fontWeight: 700 }}>
                Make a Meaningful Donation with {celebrityName}
              </h3>

              <p style={{ marginTop: 10, fontSize: 13, color: "#555" }}>
                Your donation will support {celebrityName}'s chosen charitable
                causes and make a real difference in the world.
              </p>
            </div>

            <div className="field donation-field">
              <label>Donation Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>

            <div className="field donation-field">
              <label>Personal Message (optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <div className="field-grid">
              <div className="field">
                <label>First name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
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
            </div>

            <div className="actions">
              <button className="secondary" type="button" disabled>
                ← Back
              </button>

              <button className="primary" type="button" onClick={nextStep}>
                Charity Info →
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="blue-panel">
              <h3 style={{ fontWeight: 700 }}>
                {celebrityName} supported charities
              </h3>

              <p style={{ marginTop: 10, fontSize: 13, color: "#555" }}>
                Choose the charity or cause you want your donation to support.
              </p>

              <div className="flex flex-col w-full gap-5 mt-5 rounded-sm">
                {charities.map((charity) => (
                  <label
                    className="border border-gray-200 flex items-center gap-3 p-3 rounded"
                    key={charity}
                  >
                    <input
                      type="radio"
                      name="charity"
                      value={charity}
                      checked={formData.charity === charity}
                      onChange={handleChange}
                    />

                    <span>
                      <b className="text-[#2D2D2D]">{charity}</b>
                      <small className="hidden md:block text-[#888686]">
                        Supporting meaningful causes and community impact.
                      </small>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="actions">
              <button className="secondary" type="button" onClick={prevStep}>
                ← Back
              </button>

              <button className="primary" type="button" onClick={nextStep}>
                Complete Donation →
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="summary-box">
              <h3 style={{ fontWeight: 700 }}>Donation summary</h3>

              <div className="summary-row">
                <span>Celebrity</span>
                <b>{celebrityName}</b>
              </div>

              <div className="summary-row">
                <span>Donation Amount:</span>
                <b>${amount.toLocaleString()}</b>
              </div>

              <div className="summary-row">
                <span>Service Fee:</span>
                <b>${serviceFee.toFixed(2)}</b>
              </div>

              <div className="divider" />

              <div className="summary-row">
                <span>Total</span>
                <b>${total.toLocaleString()}</b>
              </div>
            </div>

            <div className="purchase-select">
              <label className="payment-label">Select a payment method</label>

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
                onClick={handleDonation}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Proceed to Payment →"}
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
