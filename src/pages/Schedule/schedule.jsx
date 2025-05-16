/* eslint-disable no-unused-vars */
/* --------------------------------------------------
   Schedule.jsx   (v2 – matches blue mock-up)
   -------------------------------------------------- */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useLocation } from "react-router-dom";
/* ——— images ——— */
import cover from "../../assets/Schedule/cover.svg";
import fake1 from "../../assets/Schedule/fake 1.svg";
import fake2 from "../../assets/Schedule/fake 2.svg";
import fake3 from "../../assets/Schedule/fake 3.svg";
import fake5 from "../../assets/Schedule/fake 5.svg";

/* ——— demo data ——— */
const brokers = [
  { id: 1, img: fake1, name: "Broker 1", title: "Senior Broker", rating: 5 },
  { id: 2, img: fake2, name: "Broker 2", title: "Expert Broker", rating: 4.5 },
  { id: 3, img: fake3, name: "Broker 3", title: "Senior Broker", rating: 4.8 },
  { id: 4, img: fake5, name: "Broker 4", title: "Expert Broker", rating: 4.9 },
];

export default function Schedule() {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [selectedBroker, selectB] = useState(null);
  const { state } = useLocation();
  const selectedImg = state?.img || cover; // fall back to default cover
  const incomingSpecs = state?.specs;
  const handleSelect = (b) => {
    selectB(b);
    Swal.fire({
      icon: "success",
      title: "Selected!",
      text: `You selected ${b.name} successfully`,
      confirmButtonColor: "#002855",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointment = {
      id: Date.now(),
      img: selectedImg,
      broker: selectedBroker.name,
      at: date,
      location: "Alexandria",
      time: time,
      type: "Apartments",
      area: "120 sqm",
      bedrooms: 3,
      bathrooms: 2,
      price: "$150 000",
    };

    const prev = JSON.parse(localStorage.getItem("appointments") || "[]");
    const updated = [...prev, appointment];
    localStorage.setItem("appointments", JSON.stringify(updated));

    navigate("/myappointments");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-[900px] px-4 py-10 space-y-12 text-[#002855]"
    >
      {/* ───────────────── property + specs ───────────────── */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={selectedImg}
          alt="Property"
          className="w-full md:w-[420px] aspect-[4/3] object-cover rounded-lg shadow"
        />

        <div className="flex-1 bg-[#002855] text-white rounded-lg p-6 space-y-2 text-base sm:text-lg">
          <Spec label="Type" val="Apartments" />
          <Spec label="Area" val="120 sqm" />
          <Spec label="Bedrooms" val="3" />
          <Spec label="Bathrooms" val="2" />
          <Spec label="Location" val="Alexandria" />
          <Spec label="Price" val="$150 000" />
        </div>
      </div>

      {/* ───────────────── date & time ───────────────── */}
      {/* ─────────────── date & time (stacked under labels) ─────────────── */}
      <div className="flex flex-col gap-6 text-lg font-semibold">
        <div>
          <p className="mb-1 text-xl font-bold">Choose Date:</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-45 rounded-full bg-[#002855] text-white px-5 py-2 cursor-pointer ml-15
             outline-none appearance-none accent-white
             [color-scheme:dark]
             [::-webkit-calendar-picker-indicator]:invert
             [::-webkit-calendar-picker-indicator]:opacity-100"
          />
        </div>

        <div>
          <p className="mb-1 text-xl font-bold">Choose Time:</p>
          <div className="relative w-40">
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-full bg-[#002855] text-white px-5 py-2 pr-10 ml-15
                 outline-none appearance-none cursor-pointer
                 [color-scheme:dark]"
            >
              {Array.from({ length: 24 }).map((_, i) => {
                const hour = i % 12 === 0 ? 12 : i % 12;
                const ampm = i < 12 ? "AM" : "PM";
                return (
                  <option
                    key={i}
                    value={`${hour.toString().padStart(2, "0")}:00 ${ampm}`}
                  >
                    {hour.toString().padStart(2, "0")}:00 {ampm}
                  </option>
                );
              })}
            </select>

            {/* White arrow injected manually */}
            <div className="pointer-events-none absolute inset-y-0 -right-5 flex items-center">
              <svg
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────── brokers ───────────────── */}
      <div className="space-y-4">
        <p className="text-xl font-bold">Choose Broker:</p>

        <div className="flex flex-wrap justify-center gap-6">
          {brokers.map((b) => (
            <div
              key={b.id}
              className={`w-44 h-72 bg-[#002855] text-white rounded-xl p-4 flex flex-col items-center
                  justify-between text-center ${
                    selectedBroker?.id === b.id ? "ring-2 ring-white" : ""
                  }`}
            >
              {/* Oval image */}
              <div className="w-20 aspect-[2/3] overflow-hidden rounded-full border-2 border-white">
                <img
                  src={b.img}
                  alt={b.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info block */}
              <div className="space-y-1 text-sm leading-tight mt-2">
                <p className="font-semibold">Experienced</p>
                <p className="text-xs">Customers Rate:</p>
                <Stars rating={b.rating} />
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={() => handleSelect(b)}
                className="rounded-full bg-white text-[#002855] text-sm px-4 py-1 mt-2"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ───────────────── submit ───────────────── */}
      <div className="text-center">
        <button
          type="submit"
          disabled={!date || !selectedBroker}
          className="rounded-xl bg-[#002855] px-10 py-2 text-white text-lg font-bold 
                        disabled:opacity-40"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

/* helper components */
function Spec({ label, val }) {
  return (
    <p>
      <span className="font-semibold">{label}:</span> {val}
    </p>
  );
}

function Stars({ rating }) {
  const full = Math.round(rating);
  return (
    <div className="flex justify-center text-white text-sm">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < full ? "★" : "☆"}</span>
      ))}
    </div>
  );
}
