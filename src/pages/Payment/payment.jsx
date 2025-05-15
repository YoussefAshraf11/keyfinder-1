/* --------------------------------------------------
   Payment.jsx – shows selected appointment info
   -------------------------------------------------- */
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Payment() {
  const navigate = useNavigate();
  const { state: data } = useLocation(); // get appointment info

  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");

  const handleSubmit = (e) => {
    e.preventDefault();

    // remove current appointment from localStorage
    const stored = JSON.parse(localStorage.getItem("appointments") || "[]");
    const updated = stored.filter((a) => a.id !== data?.id);
    localStorage.setItem("appointments", JSON.stringify(updated));

    Swal.fire("Success!", "Payment scheduled successfully!", "success").then(
      () => navigate("/")
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-[900px] px-4 py-10 space-y-12 text-[#002855]"
    >
      {/* ───────────────── property + specs ───────────────── */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={data?.img}
          alt="Property"
          className="w-full md:w-[420px] aspect-[4/3] object-cover rounded-lg shadow"
        />

        <div className="flex-1 bg-[#002855] text-white rounded-lg p-6 space-y-2 text-base sm:text-lg">
          <Spec label="Type" val={data?.type} />
          <Spec label="Area" val={data?.area} />
          <Spec label="Bedrooms" val={data?.bedrooms} />
          <Spec label="Bathrooms" val={data?.bathrooms} />
          <Spec label="At" val={data?.at} />
          <Spec label="Location" val={data?.location} />
          <Spec label="Price" val={data?.price} />
          <Spec label="With broker" val={data?.broker} />
        </div>
      </div>

      {/* ─────────────── date & time input ─────────────── */}
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

      {/* ───────────────── submit ───────────────── */}
      <div className="text-center">
        <button
          type="submit"
          disabled={!date}
          className="rounded-xl bg-[#002855] px-10 py-2 text-white text-lg font-bold 
               disabled:opacity-40"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

/* helper component */
function Spec({ label, val }) {
  return (
    <p>
      <span className="font-semibold">{label}:</span> {val}
    </p>
  );
}
