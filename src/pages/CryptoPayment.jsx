import React from "react";
import { useLocation } from "react-router-dom";
import { HeroBlock, FormHeader, HelpCTA, PageFooter } from "./BookingShared";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CryptoPayment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state?.booking;
  const celebrity = state?.celebrity;
  const type = state?.type || "booking";

  const cryptoAddress = "0xA7B9cD12Ef34567890aBCdEf1234567890ABcDEF";

  const celebrityName =
    celebrity?.name || booking?.celebrityName || "Selected Celebrity";

  const amount = Number(booking?.amount || state?.amount || 0);
  const serviceFee = Number(booking?.serviceFee || 5.56);
  const total = Number(booking?.total || amount + serviceFee);

  const paymentType =
    type === "booking"
      ? "Booking Payment"
      : type === "donation"
        ? "Donation Payment"
        : "VIP Membership Payment";

  return (
    <div className="page-shell">
      <HeroBlock mode="booking" celebrity={celebrity} />

      <main className="form-card">
        <FormHeader
          title="Crypto Payment"
          subtitle="Complete your payment using cryptocurrency"
          button="Crypto"
        />

        <div className="summary-box">
          <h3 style={{ fontWeight: 700 }}>Payment breakdown</h3>

          <div className="summary-row">
            <span>Celebrity</span>
            <b>{celebrityName}</b>
          </div>

          <div className="summary-row">
            <span>Payment Type:</span>
            <b>{paymentType}</b>
          </div>

          <div className="summary-row">
            <span>Amount:</span>
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

        <div className="crypto-box">
          <h3>Scan QR Code</h3>
          <p>Scan the QR code below with your crypto wallet to continue.</p>

          <div className="qr-placeholder">
            <div className="qr-grid">
              {Array.from({ length: 64 }).map((_, index) => (
                <span key={index}></span>
              ))}
            </div>
          </div>

          <div className="crypto-address-box">
            <label>Crypto Wallet Address</label>

            <div className="address-row">
              <span>{cryptoAddress}</span>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(cryptoAddress);
                  toast.success("Wallet address copied");
                }}
              >
                Copy
              </button>
            </div>
          </div>

          <button
            className="primary crypto-pay-btn"
            type="button"
            onClick={() =>
              navigate("/payment-confirmation", {
                state: {
                  celebrity,
                  booking,
                  donation: state?.donation,
                  membership: state?.membership,
                  type,
                  amount,
                  serviceFee,
                  total,
                  cryptoAddress,
                },
              })
            }
          >
            Proceed to pay →
          </button>
        </div>
      </main>

      <HelpCTA booking />
      <PageFooter />
    </div>
  );
}
