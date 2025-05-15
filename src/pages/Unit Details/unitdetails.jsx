/* --------------------------------------------------
   src/components/UnitDetails.jsx   (v4 – wheel / touch only)
   -------------------------------------------------- */
import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
/* --- TEMP demo images – swap for API data later --- */
import img1 from "../../assets/Select/1.svg";
import img2 from "../../assets/Select/2.svg";
import img3 from "../../assets/Select/3.svg";
import img4 from "../../assets/Select/4.svg";
import img5 from "../../assets/Select/5.svg";
import img6 from "../../assets/Select/6.svg";
import img7 from "../../assets/Select/7.svg";
import img8 from "../../assets/Select/8.svg";
import img9 from "../../assets/Select/9.svg";
import img10 from "../../assets/Select/10.svg";
import img11 from "../../assets/Select/11.svg";
import img12 from "../../assets/Select/12.svg";

export default function UnitDetails({
  gallery = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
  ],
  specs = {
    type: "Apartments",
    area: "120 sqm",
    bedrooms: 3,
    bathrooms: 2,
    at: "Ground Floor",
    location: "Alexandria",
    price: "$150 000",
  },
}) {
  /* -------------- hero -------------- */
  const [hero, setHero] = useState(gallery[0]);
  const navigate = useNavigate();
  /* -------------- slider -------------- */
  const railRef = useRef(null);

  /* vertical wheel → horizontal scroll */
  const wheelToScroll = (e) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
      railRef.current.scrollLeft += e.deltaY;
    }
  };
  const currentIdx = gallery.findIndex((src) => src === hero);

  /* keep fades only when needed */
  const [fadeL, setFadeL] = useState(false);
  const [fadeR, setFadeR] = useState(true);

  const reportEdges = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setFadeL(el.scrollLeft > 0);
    setFadeR(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    reportEdges();
    el.addEventListener("scroll", reportEdges, { passive: true });
    window.addEventListener("resize", reportEdges);
    return () => {
      el.removeEventListener("scroll", reportEdges);
      window.removeEventListener("resize", reportEdges);
    };
  }, [reportEdges]);

  /* -------------- render -------------- */
  return (
    <section className="container mx-auto px-4 py-8 space-y-10">
      {/* ─────────── top row ─────────── */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={hero}
          alt="Selected unit"
          className="max-w-xl  md:w-1/2 aspect-video object-cover rounded-xl shadow"
        />

        <div className="w-full md:w-1/2 bg-[#002855] text-white rounded-xl p-6 space-y-2 text-xl">
          <Spec label="Type" value={specs.type} />
          <Spec label="Area" value={specs.area} />
          <Spec label="Bedrooms" value={specs.bedrooms} />
          <Spec label="Bathrooms" value={specs.bathrooms} />
          <Spec label="At" value={specs.at} />
          <Spec label="Location" value={specs.location} />
          <Spec label="Price" value={specs.price} />
        </div>
      </div>

      {/* ─────────── slider – wheel/touch only ─────────── */}
      <div className="relative">
        <div
          ref={railRef}
          onWheel={wheelToScroll}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-2
                        before:pointer-events-none before:absolute before:inset-y-0 before:left-0
                        before:w-12 before:bg-gradient-to-r before:from-white before:to-transparent
                        after:pointer-events-none after:absolute after:inset-y-0 after:right-0
                        after:w-12 after:bg-gradient-to-l after:from-white after:to-transparent"
          style={{
            "--tw-before-opacity": fadeL ? 1 : 0,
            "--tw-after-opacity": fadeR ? 1 : 0,
          }}
        >
          {gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Unit image ${i + 1}`}
              onClick={() => setHero(src)}
              className={`w-[15rem] h-40 object-cover rounded-lg shrink-0
                             transition ring-2 ${
                               hero === src
                                 ? "ring-[#002855]"
                                 : "ring-transparent hover:ring-gray-300"
                             }`}
            />
          ))}
        </div>
      </div>
      {/* counter */}
      <p className="text-xl md:text-2xl  font-extrabold text-[#002855] text-center">
        {currentIdx + 1}/{gallery.length}&nbsp;images
      </p>
      {/* ─────────── CTA ─────────── */}
      <div className="flex justify-center md:justify-end">
        <button
          onClick={() =>
            navigate("/schedule", {
              state: {
                img: hero, // ← current big image
                specs, // ← (optional) send the whole specs object too
              },
            })
          }
          className="rounded-xl bg-[#002855] px-8 py-4 text-white text-lg font-bold shadow
             transition hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Schedule An Appointment
        </button>
      </div>
    </section>
  );
}

function Spec({ label, value }) {
  return (
    <p className="flex items-center gap-2">
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </p>
  );
}
