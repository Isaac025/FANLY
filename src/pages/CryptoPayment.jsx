import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeroBlock, FormHeader, HelpCTA, PageFooter } from "./BookingShared";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FaBitcoin,
  FaEthereum,
  FaDollarSign,
  FaCopy,
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowRight,
  FaReceipt,
  FaUserCheck,
  FaNetworkWired,
} from "react-icons/fa";

export default function CryptoPayment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [rates, setRates] = useState({});
  const [selectedCrypto, setSelectedCrypto] = useState("btc");
  const [copied, setCopied] = useState(false);

  const booking = state?.booking;
  const donation = state?.donation;
  const membership = state?.membership;
  const celebrity = state?.celebrity;
  const type = state?.type || "booking";

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

  const paymentType =
    type === "booking"
      ? "Booking Payment"
      : type === "donation"
        ? "Donation Payment"
        : "VIP Membership Payment";

  const breakdown = useMemo(
    () => [
      ["Celebrity", celebrityName],
      ["Payment Type", paymentType],
      ["Amount", `$${amount.toLocaleString()}`],
      ["Service Fee", `$${serviceFee.toFixed(2)}`],
    ],
    [celebrityName, paymentType, amount, serviceFee],
  );

  const cryptoOptions = {
    btc: {
      name: "Bitcoin",
      symbol: "BTC",
      icon: <FaBitcoin />,
      address: "bc1qv4xu0kag0n5eczry2sjce3mvdxjqx7z0l3qxte",
      network: "Bitcoin Network",
      coinGeckoId: "bitcoin",
      color: "#F7931A",
    },
    eth: {
      name: "Ethereum",
      symbol: "ETH",
      icon: <FaEthereum />,
      address: "0xA3Fe75B61bb5590cD16433a15Aaa4aA9772d731C",
      network: "Ethereum ERC20",
      coinGeckoId: "ethereum",
      color: "#627EEA",
    },
    usdt: {
      name: "Tether",
      symbol: "USDT",
      icon: <FaDollarSign />,
      address: "TLaU2JDTtHECpyMo37gVdXCo14by3sJcC3",
      network: "USDT TRC20",
      coinGeckoId: "tether",
      color: "#26A17B",
    },
  };

  const activeCrypto = cryptoOptions[selectedCrypto];
  const cryptoRate = rates[selectedCrypto] || 0;
  const cryptoAmount = cryptoRate ? total / cryptoRate : 0;

  const cryptoAddress = activeCrypto.address;
  const cryptoNetwork = activeCrypto.network;

  const qrData = `${activeCrypto.symbol}:${cryptoAddress}?amount=${cryptoAmount.toFixed(6)}`;

  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
    qrData,
  )}`;

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd",
        );

        const data = await res.json();

        setRates({
          btc: data?.bitcoin?.usd || 0,
          eth: data?.ethereum?.usd || 0,
          usdt: data?.tether?.usd || 1,
        });
      } catch (error) {
        toast.error("Could not fetch crypto rates");
      }
    };

    fetchCryptoPrices();
  }, []);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(cryptoAddress);
      setCopied(true);
      toast.success(" wallet address copied");

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Could not copy address");
    }
  };

  const goToConfirmation = () => {
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
        cryptoAmount,
        cryptoSymbol: activeCrypto.symbol,
        cryptoAddress,
        cryptoNetwork,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] text-[#0B1220]">
      <HeroBlock mode="booking" celebrity={celebrity} />

      <main className="relative overflow-hidden px-4 py-20 sm:px-5 lg:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-180px] top-[-160px] h-[520px] w-[520px] rounded-full bg-[#2563EB]/10 blur-[150px]" />
          <div className="absolute right-[-180px] top-[20%] h-[560px] w-[560px] rounded-full bg-[#06B6D4]/10 blur-[160px]" />
          <div className="absolute bottom-[-220px] left-[25%] h-[500px] w-[500px] rounded-full bg-[#D6B36A]/15 blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <FormHeader
            title={`${activeCrypto.name} Payment`}
            subtitle={`Complete your payment carefully using the exact ${activeCrypto.network} address below.`}
            button="Secure Checkout"
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px]">
            <motion.section
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="rounded-[34px] border border-[#DDE3EE] bg-white p-5 shadow-[0_30px_100px_rgba(15,23,42,0.08)] sm:p-8"
            >
              <div className="mb-8 flex flex-col gap-5 rounded-[28px] border border-[#DDE3EE] bg-[#F8FAFC] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7931A]/15 text-3xl text-[#F7931A]">
                    <FaBitcoin />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2563EB]">
                      Bitcoin Checkout
                    </p>
                    <h2 className="mt-1 text-2xl font-black text-[#0B1220]">
                      Payment Instructions
                    </h2>
                    <p className="mt-1 text-sm text-[#64748B]">
                      Send only BTC to the wallet address shown here.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#DDE3EE] bg-white px-5 py-4 text-left sm:text-right">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#64748B]">
                    Total Due
                  </p>
                  <h3 className="text-3xl font-black text-[#0B1220]">
                    ${total.toLocaleString()}
                  </h3>
                </div>
              </div>

              <div className="mb-6 grid gap-3 sm:grid-cols-3">
                {Object.entries(cryptoOptions).map(([key, coin]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedCrypto(key)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selectedCrypto === key
                        ? "border-[#2563EB] bg-[#EFF6FF]"
                        : "border-[#DDE3EE] bg-white hover:border-[#2563EB]/50"
                    }`}
                  >
                    <div
                      className="mb-3 text-2xl"
                      style={{ color: coin.color }}
                    >
                      {coin.icon}
                    </div>

                    <h4 className="font-black text-[#0B1220]">{coin.symbol}</h4>
                    <p className="text-xs font-bold text-[#64748B]">
                      {coin.network}
                    </p>
                  </button>
                ))}
              </div>

              <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
                <div className="rounded-[28px] border border-[#DDE3EE] bg-[#F8FAFC] p-5 text-center">
                  <div className="mx-auto flex h-[280px] w-full max-w-[280px] items-center justify-center rounded-[24px] border border-[#DDE3EE] bg-white p-4">
                    {cryptoRate ? (
                      <img
                        src={qrImage}
                        alt="Bitcoin payment QR code"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <p className="text-sm font-bold text-[#64748B]">
                        Loading QR code...
                      </p>
                    )}
                  </div>

                  <p className="mt-4 text-sm font-bold text-[#0B1220]">
                    Scan to pay with {activeCrypto.name}
                  </p>

                  <p className="mt-2 text-xs leading-6 text-[#64748B]">
                    Confirm the amount and address inside your wallet before
                    sending.
                  </p>
                </div>

                <div className="space-y-5">
                  <InfoCard
                    icon={<FaNetworkWired />}
                    label="Network"
                    value={cryptoNetwork}
                  />

                  <div className="rounded-[24px] border border-[#DDE3EE] bg-white p-5">
                    <label className="mb-3 block text-xs font-black uppercase tracking-[0.22em] text-[#64748B]">
                      {activeCrypto.symbol} Wallet Address
                    </label>

                    <div className="flex flex-col gap-3 rounded-2xl border border-[#DDE3EE] bg-[#F8FAFC] p-4 sm:flex-row sm:items-center">
                      <span className="flex-1 break-all text-sm font-bold text-[#0B1220]">
                        {cryptoAddress}
                      </span>

                      <button
                        type="button"
                        onClick={copyAddress}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-black text-white transition hover:bg-[#1D4ED8]"
                      >
                        {copied ? <FaCheckCircle /> : <FaCopy />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-[#FACC15]/40 bg-[#FFFBEB] p-5">
                    <div className="flex gap-3">
                      <FaExclamationTriangle className="mt-1 shrink-0 text-[#D97706]" />
                      <div>
                        <h4 className="font-black text-[#92400E]">
                          Important payment warning
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-[#92400E]">
                          Send only {activeCrypto.symbol} through the{" "}
                          {activeCrypto.network}. Sending another coin or using
                          a wrong network may result in permanent loss of funds.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#2563EB] px-6 py-5 text-sm font-black uppercase tracking-widest text-white shadow-[0_20px_45px_rgba(37,99,235,0.25)] transition hover:-translate-y-1"
                    type="button"
                    onClick={goToConfirmation}
                  >
                    I Have Paid
                    <FaArrowRight className="transition group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.section>

            <motion.aside
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="space-y-5"
            >
              <div className="rounded-[34px] border border-[#DDE3EE] bg-white p-6 shadow-[0_30px_100px_rgba(15,23,42,0.08)]">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB]/10 text-xl text-[#2563EB]">
                    <FaReceipt />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#64748B]">
                      Order Summary
                    </p>
                    <h3 className="text-2xl font-black">Payment breakdown</h3>
                  </div>
                </div>

                <div className="space-y-1">
                  {breakdown.map(([label, value]) => (
                    <SummaryRow key={label} label={label} value={value} />
                  ))}
                </div>

                <div className="my-5 h-px bg-[#E2E8F0]" />

                <SummaryRow
                  label="Total USD"
                  value={`$${total.toLocaleString()}`}
                  strong
                />

                <SummaryRow
                  label={`Total ${activeCrypto.symbol}`}
                  value={
                    cryptoRate
                      ? `${cryptoAmount.toFixed(6)}  ${activeCrypto.symbol}`
                      : "Loading..."
                  }
                  strong
                />

                <div className="mt-5 rounded-2xl border border-[#DDE3EE] bg-[#F8FAFC] p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#64748B]">
                    ${activeCrypto.symbol} Rate
                  </p>
                  <p className="mt-1 text-lg font-black text-[#0B1220]">
                    {cryptoRate
                      ? `$${cryptoRate.toLocaleString()} / ${activeCrypto.symbol}`
                      : "Loading..."}
                  </p>
                </div>
              </div>

              <div className="rounded-[30px] border border-[#DDE3EE] bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
                <h3 className="mb-4 text-xl font-black">Security checklist</h3>

                <TrustItem
                  icon={<FaLock />}
                  text="Confirm the wallet address before sending."
                />
                <TrustItem
                  icon={<FaShieldAlt />}
                  text="Use Bitcoin network only."
                />
                <TrustItem
                  icon={<FaUserCheck />}
                  text="After payment, continue to confirmation."
                />
              </div>
            </motion.aside>
          </div>
        </div>
      </main>

      <HelpCTA booking />
      <PageFooter />
    </div>
  );
}

function SummaryRow({ label, value, strong }) {
  return (
    <div className="flex justify-between gap-5 border-b border-[#EEF2F7] py-4 text-sm last:border-b-0">
      <span className={strong ? "font-black text-[#0B1220]" : "text-[#64748B]"}>
        {label}
      </span>

      <b
        className={
          strong
            ? "text-right text-lg font-black text-[#2563EB]"
            : "text-right font-black text-[#0B1220]"
        }
      >
        {value}
      </b>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-[24px] border border-[#DDE3EE] bg-white p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#06B6D4]/10 text-[#0891B2]">
          {icon}
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#64748B]">
            {label}
          </p>
          <h4 className="mt-1 font-black text-[#0B1220]">{value}</h4>
        </div>
      </div>
    </div>
  );
}

function TrustItem({ icon, text }) {
  return (
    <div className="mb-3 flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 last:mb-0">
      <div className="text-[#2563EB]">{icon}</div>
      <p className="text-sm font-bold leading-6 text-[#334155]">{text}</p>
    </div>
  );
}
