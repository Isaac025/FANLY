import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeroBlock, FormHeader, HelpCTA, PageFooter } from "./BookingShared";
import { toast } from "react-toastify";

export default function CryptoPayment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [btcRate, setBtcRate] = useState(0);

  const booking = state?.booking;
  const donation = state?.donation;
  const membership = state?.membership;
  const celebrity = state?.celebrity;
  const type = state?.type || "booking";

  const cryptoAddress = "bc1qu57er6n853w95glt0z6sugx728uddc8yca76pn";
  const cryptoNetwork = "Bitcoin (BTC)";

  const celebrityName =
    celebrity?.name ||
    booking?.celebrityName ||
    donation?.celebrityName ||
    membership?.celebrityName ||
    "Selected Celebrity";

  const amount = Number(
    booking?.amount ||
      donation?.amount ||
      membership?.annualFee ||
      state?.amount ||
      0,
  );

  const serviceFee = Number(
    booking?.serviceFee ||
      donation?.serviceFee ||
      membership?.processingFee ||
      5.56,
  );

  const total = Number(
    booking?.total ||
      donation?.total ||
      membership?.total ||
      amount + serviceFee,
  );

  const totalBTC = btcRate ? total / btcRate : 0;

  const qrData = `bitcoin:${cryptoAddress}?amount=${totalBTC.toFixed(6)}`;
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    qrData,
  )}`;

  const paymentType =
    type === "booking"
      ? "Booking Payment"
      : type === "donation"
        ? "Donation Payment"
        : "VIP Membership Payment";

  useEffect(() => {
    const fetchBTCPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
        );

        const data = await res.json();
        setBtcRate(data.bitcoin.usd);
      } catch (error) {
        toast.error("Could not fetch BTC rate");
      }
    };

    fetchBTCPrice();
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText(cryptoAddress);
    toast.success("BTC wallet address copied");
  };

  return (
    <div className="page-shell">
      <HeroBlock mode="booking" celebrity={celebrity} />

      <main className="form-card">
        <FormHeader
          title="Bitcoin Payment"
          subtitle="Complete your payment using Bitcoin"
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
            <span>Total USD</span>
            <b>${total.toLocaleString()}</b>
          </div>

          <div className="summary-row">
            <span>Total BTC</span>
            <b>{btcRate ? `${totalBTC.toFixed(6)} BTC` : "Loading..."}</b>
          </div>
        </div>

        <div className="crypto-box">
          <h3>Scan Bitcoin QR Code</h3>
          <p>
            Send only Bitcoin (BTC) to this address. Sending any other crypto
            may result in loss of funds.
          </p>

          <div className="qr-placeholder">
            {btcRate ? (
              <img src={qrImage} alt="Bitcoin payment QR code" />
            ) : (
              <p>Loading QR code...</p>
            )}
          </div>

          <div className="crypto-address-box">
            <label>Network</label>
            <div className="address-row">
              <span>{cryptoNetwork}</span>
            </div>
          </div>

          <div className="crypto-address-box">
            <label>BTC Wallet Address</label>

            <div className="address-row">
              <span>{cryptoAddress}</span>

              <button type="button" onClick={copyAddress}>
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
                  donation,
                  membership,
                  type,
                  amount,
                  serviceFee,
                  total,
                  totalBTC,
                  cryptoAddress,
                  cryptoNetwork,
                },
              })
            }
          >
            I Have Paid →
          </button>
        </div>
      </main>

      <HelpCTA booking />
      <PageFooter />
    </div>
  );
}
