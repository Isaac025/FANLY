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

const processingFee = 5.56;

export default function VipMembership() {
  const [step, setStep] = useState(0);
  const { state } = useLocation();
  const navigate = useNavigate();

  const selectedCelebrity = state?.celebrity;

  const tiers = selectedCelebrity?.vipTierFees || {
    standard: 50,
    premium: 75,
    platinum: 100,
  };

  const { createVipMembership, loading } = useAppContext();

  const [formData, setFormData] = useState({
    tier: "standard",
    fullName: "",
    phone: "",
    email: "",
    streetAddress: "",
    shippingAddress: "",
    paymentMethod: "",
  });

  const celebrityName = selectedCelebrity?.name || "Selected Celebrity";
  const annualFee = Number(tiers[formData.tier] || 50);
  const total = annualFee + processingFee;

  const benefits = [
    "Priority booking access",
    "15% discount on all bookings",
    "Exclusive content & update",
    "Birthday messages",
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const selectTier = (tier) => {
    setFormData((prev) => ({
      ...prev,
      tier,
    }));
  };

  const nextStep = () => {
    if (step === 0) {
      if (
        !formData.fullName ||
        !formData.phone ||
        !formData.email ||
        !formData.streetAddress
      ) {
        toast.error("Please complete all membership details");
        return;
      }
    }

    if (step === 1 && !formData.shippingAddress) {
      toast.error("Please enter your shipping address");
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

  const handlePurchase = async () => {
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
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      streetAddress: formData.streetAddress,
      shippingAddress: formData.shippingAddress,
      tier: formData.tier,
      annualFee,
      processingFee,
      total,
      paymentMethod: formData.paymentMethod,
    };

    const membership = await createVipMembership(payload);

    if (membership) {
      navigate("/payment", {
        state: {
          membership,
          celebrity: selectedCelebrity,
          type: "vip",
          amount: total,
        },
      });
    }
  };

  return (
    <div className="page-shell">
      <HeroBlock mode="vip" celebrity={selectedCelebrity} />

      <main className="form-card">
        <FormHeader
          title={`Get ${celebrityName} VIP Fan Card`}
          subtitle="Become a VIP fan with exclusive benefits and perks"
          button="Vip Membership"
        />

        <Steps active={step} />

        {step === 0 && (
          <>
            <div className="blue-panel">
              <p
                style={{
                  color: "#1d4996",
                  background: "#dceaff",
                  padding: "10px",
                  fontSize: 13,
                }}
              >
                Join the exclusive fan community and get special privileges,
                early access, and personalized content.
              </p>

              <h3 style={{ fontWeight: 700, margin: "18px 0" }}>
                Select Membership Tier
              </h3>

              <div className="tier-grid">
                <div
                  className={`tier ${formData.tier === "standard" ? "active" : ""}`}
                  onClick={() => selectTier("standard")}
                >
                  <span>⚪</span>
                  <b>Standard</b>
                  <small>
                    ${Number(tiers.standard || 0).toLocaleString()}/year
                    <br />
                    Basic benefits
                  </small>
                </div>

                <div
                  className={`tier ${formData.tier === "premium" ? "active" : ""}`}
                  onClick={() => selectTier("premium")}
                >
                  <span>🏅</span>
                  <b>Premium</b>
                  <small>
                    ${Number(tiers.premium || 0).toLocaleString()}/year
                    <br />
                    Recommended
                  </small>
                </div>

                <div
                  className={`tier ${formData.tier === "platinum" ? "active" : ""}`}
                  onClick={() => selectTier("platinum")}
                >
                  <span>💎</span>
                  <b>Platinum</b>
                  <small>
                    ${Number(tiers.platinum || 0).toLocaleString()}/year
                    <br />
                    All benefits
                  </small>
                </div>
              </div>
            </div>

            <div className="field-grid">
              <div className="field">
                <label>Full name</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="field">
                <label>Phone number</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 7034060"
                />
              </div>

              <div className="field">
                <label>Email address</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="field">
                <label>Street address</label>
                <input
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  placeholder="No 4/10/2024"
                />
              </div>
            </div>

            <div className="actions">
              <button className="secondary" type="button" disabled>
                ← Back
              </button>

              <button className="primary" type="button" onClick={nextStep}>
                Vip Benefits →
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="blue-panel">
              <h3 style={{ fontWeight: 700, fontSize: 22, marginBottom: 18 }}>
                Vip Fan Card Benefit
              </h3>

              <div className="benefit-grid">
                {benefits.map((benefit) => (
                  <div className="benefit-item" key={benefit}>
                    ● &nbsp; {benefit}
                  </div>
                ))}
              </div>
            </div>

            <div className="field" style={{ marginTop: 28 }}>
              <label>Shipping Address (for physical fan card)</label>
              <textarea
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                placeholder="Enter your shipping address"
              />
            </div>

            <div className="actions">
              <button className="secondary" type="button" onClick={prevStep}>
                ← Back
              </button>

              <button className="primary" type="button" onClick={nextStep}>
                Purchase card →
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="summary-box">
              <h3 style={{ fontWeight: 700, marginBottom: 15 }}>
                Membership summary
              </h3>

              {[
                ["Celebrity", celebrityName],
                ["Membership Tier", formData.tier],
                ["Annual Fee:", `$${annualFee.toFixed(2)}`],
                ["Processing Fee:", `$${processingFee.toFixed(2)}`],
              ].map((row) => (
                <div className="summary-row" key={row[0]}>
                  <span>{row[0]}</span>
                  <b>{row[1]}</b>
                </div>
              ))}

              <div className="divider" />

              <div className="summary-row">
                <span>Total</span>
                <b>${total.toFixed(2)}</b>
              </div>
            </div>

            <div className="purchase-select">
              <label className="payment-label">Select payment method</label>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="">Choose a payment method</option>
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
                onClick={handlePurchase}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Purchase card →"}
              </button>
            </div>
          </>
        )}
      </main>

      <HelpCTA />
      <PageFooter />
    </div>
  );
}
