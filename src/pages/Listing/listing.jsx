import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/Searchbar/searchbar.jsx";
import { ChevronDown, Star } from "lucide-react";

/* images */
import img1 from "../../assets/Lisiting/1.svg";
import img2 from "../../assets/Lisiting/2.svg";
import img3 from "../../assets/Lisiting/3.svg";
import img4 from "../../assets/Lisiting/4.svg";
import img5 from "../../assets/Lisiting/5.svg";
import img6 from "../../assets/Lisiting/6.svg";

const properties = [
  {
    id: 1,
    image: img1,
    type: "Apartments",
    area: "120 sqm",
    bedrooms: 3,
    bathrooms: 2,
    location: "Alexandria",
    price: "$150 000",
  },
  {
    id: 2,
    image: img2,
    type: "Stand Alone Villas",
    area: "300 sqm",
    bedrooms: 4,
    bathrooms: 3,
    location: "Alexandria",
    price: "$350 000",
  },
  {
    id: 3,
    image: img3,
    type: "Twin Villas",
    area: "280 sqm",
    bedrooms: 4,
    bathrooms: 3,
    location: "Alexandria",
    price: "$330 000",
  },
  {
    id: 4,
    image: img4,
    type: "Duplex",
    area: "200 sqm",
    bedrooms: 3,
    bathrooms: 2,
    location: "Alexandria",
    price: "$220 000",
  },
  {
    id: 5,
    image: img5,
    type: "Chalet",
    area: "350 sqm",
    bedrooms: 5,
    bathrooms: 4,
    location: "Alexandria",
    price: "$420 000",
  },
  {
    id: 6,
    image: img6,
    type: "S Villas",
    area: "400 sqm",
    bedrooms: 6,
    bathrooms: 5,
    location: "Alexandria",
    price: "$550 000",
  },
];

export default function PropertyList() {
  const [showPropertyType, setShowPropertyType] = useState(false);
  const [showArea, setShowArea] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const [selectedProperty, setSelectedProperty] = useState("Property Type");
  const [selectedArea, setSelectedArea] = useState("Area");
  const [selectedPrice, setSelectedPrice] = useState("Average Price");

  const toggle = (dropdown) => {
    setShowPropertyType(dropdown === "property");
    setShowArea(dropdown === "area");
    setShowPrice(dropdown === "price");
  };

  const propertyTypes = ["Chalet", "Apartment", "Twins", "Stand Alone Villas"];
  const areaOptions = [
    "Less than 100 m²",
    "100 m² → 150 m²",
    "150 m² → 200 m²",
    "Over 200 m²",
  ];
  const priceOptions = [
    "Less than 1 million",
    "1–2 million",
    "2–3 million",
    "3–4 million",
    "4–5 million",
    "Over 5 million",
  ];
  /* ─ favourites state ─ */
  const [favIds, setFavIds] = useState(() =>
    JSON.parse(localStorage.getItem("favourites") || "[]")
  );
  const navigate = useNavigate();

  /* keep localStorage in-sync */
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favIds));
  }, [favIds]);

  const toggleFav = (id) => {
    setFavIds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
    /* redirect */
    navigate("/favourites");
  };

  return (
    <section className="bg-white pt-8 pb-14 px-4 md:px-8 max-w-5xl mx-auto">
      {/* search */}
      <SearchBar
        placeholder="Search Properties…"
        wrapperClassName="w-full max-w-md mx-auto"
        inputClassName="bg-[#001731] text-gray-200 placeholder-gray-400"
        buttonClassName="bg-[#002349] hover:bg-[#032d6b]"
        iconClassName="h-4 w-4"
      />

      <div className="mt-4 flex flex-wrap justify-center gap-3 relative">
        {/* Property Type */}
        <div className="relative">
          <button
            onClick={() => toggle("property")}
            className="inline-flex items-center bg-[#001731] px-5 py-2 rounded-full text-sm text-white font-semibold"
          >
            {selectedProperty}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {showPropertyType && (
            <ul className="absolute mt-2 w-48 bg-white text-[#042987] rounded shadow z-20 text-sm text-left">
              {propertyTypes.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedProperty(item);
                    setShowPropertyType(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Area */}
        <div className="relative">
          <button
            onClick={() => toggle("area")}
            className="inline-flex items-center bg-[#001731] px-5 py-2 rounded-full text-sm text-white font-semibold"
          >
            {selectedArea}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {showArea && (
            <ul className="absolute mt-2 w-56 bg-white text-[#042987] rounded shadow z-20 text-sm text-left">
              {areaOptions.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedArea(item);
                    setShowArea(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Average Price */}
        <div className="relative">
          <button
            onClick={() => toggle("price")}
            className="inline-flex items-center bg-[#001731] px-5 py-2 rounded-full text-sm text-white font-semibold"
          >
            {selectedPrice}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {showPrice && (
            <ul className="absolute mt-2 w-52 bg-white text-[#042987] rounded shadow z-20 text-sm text-left">
              {priceOptions.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedPrice(item);
                    setShowPrice(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* card list */}
      <div className="mt-6 space-y-8">
        {properties.map((p) => {
          const selected = favIds.includes(p.id);
          return (
            <article
              key={p.id}
              className="relative flex gap-5 bg-[#002349] rounded-xl px-5 py-6 shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
            >
              {/* star */}
              <button
                onClick={() => toggleFav(p.id)}
                className="absolute top-4 right-4"
                aria-label="save to favourites"
              >
                <Star
                  className="h-6 w-6"
                  /* outline by default, filled when selected */
                  stroke="white"
                  strokeWidth={1.4}
                  fill={selected ? "white" : "transparent"}
                />
              </button>

              {/* thumbnail */}
              <img
                src={p.image}
                alt={p.type}
                className="w-[496px] h-[290px] object-cover rounded-lg shrink-0"
              />

              {/* details + button */}
              <div className="flex flex-col justify-between flex-1">
                <ul className="text-white text-[12px] leading-[16px] space-y-[2px]">
                  <li className="text-xl">
                    <span className="font-semibold text-xl">Type: </span>
                    {p.type}
                  </li>
                  <li className="text-xl">
                    <span className="font-semibold text-xl">Area: </span>
                    {p.area}
                  </li>
                  <li className="text-xl">
                    <span className="font-semibold text-xl">Bedrooms: </span>
                    {p.bedrooms}
                  </li>
                  <li className="text-xl">
                    <span className="font-semibold text-xl">Bathrooms: </span>
                    {p.bathrooms}
                  </li>
                  <li className="text-xl">
                    <span className="font-semibold text-xl">Location: </span>
                    {p.location}
                  </li>
                  <li className="text-xl">
                    <span className="font-semibold text-xl">Price: </span>
                    {p.price}
                  </li>
                </ul>

                <button
                  className="self-end mt-4 bg-white text-[#002349] text-xs font-semibold rounded-[4px] px-6 py-[4px]"
                  onClick={() => navigate("/unit-details")}
                >
                  select
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
