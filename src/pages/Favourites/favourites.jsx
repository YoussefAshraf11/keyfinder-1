// src/components/Favourites.jsx
import { useState, useMemo } from "react";
import { Star } from "lucide-react";
import img1 from "../../assets/Lisiting/1.svg";
import img2 from "../../assets/Lisiting/2.svg";
import img3 from "../../assets/Lisiting/3.svg";
import img4 from "../../assets/Lisiting/4.svg";
import img5 from "../../assets/Lisiting/5.svg";
import img6 from "../../assets/Lisiting/6.svg";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
/* master list so we can look props up by id */
const allProps = [
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

export default function Favourites() {
  /* read once from LS, then hold in state */
  const [favIds, setFavIds] = useState(() =>
    JSON.parse(localStorage.getItem("favourites") || "[]")
  );

  /* helper: update LS + state */
  const removeFav = (id) => {
    const updated = favIds.filter((n) => n !== id);
    setFavIds(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  const favourites = useMemo(
    () => allProps.filter((p) => favIds.includes(p.id)),
    [favIds]
  );

  return (
    <section className="bg-white pt-8 pb-14 px-4 md:px-8 max-w-5xl mx-auto min-h-[40vh]">
      {favourites.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-[#002349] font-bold text-xl mb-2 text-center">
            My Favourites
          </h1>
          <p className="text-center text-gray-500">
            You haven’t added any properties yet.
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-[#002349] font-bold text-xl mb-6 text-center">
            My Favourites
          </h1>
          <div className="space-y-8">
            {favourites.map((p) => (
              <article
                key={p.id}
                className="relative flex gap-5 bg-[#002349] rounded-xl px-5 py-6 shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
              >
                {/* clickable star → remove */}
                <button
                  onClick={() => removeFav(p.id)}
                  className="absolute top-4 right-4"
                  aria-label="remove from favourites"
                >
                  <Star
                    className="h-6 w-6"
                    stroke="white"
                    strokeWidth={1.4}
                    fill="white"
                  />
                </button>

                {/* thumbnail */}
                <img
                  src={p.image}
                  alt={p.type}
                  className="w-[496px] h-[290px] object-cover rounded-lg shrink-0"
                />

                {/* details + Select */}
                <div className="flex flex-col justify-between flex-1">
                  <ul className="text-white text-[12px] leading-[16px] space-y-[2px]">
                    <li className="text-xl">
                      <span className="font-semibold">Type: </span>
                      {p.type}
                    </li>
                    <li className="text-xl">
                      <span className="font-semibold">Area: </span>
                      {p.area}
                    </li>
                    <li className="text-xl">
                      <span className="font-semibold">Bedrooms: </span>
                      {p.bedrooms}
                    </li>
                    <li className="text-xl">
                      <span className="font-semibold">Bathrooms: </span>
                      {p.bathrooms}
                    </li>
                    <li className="text-xl">
                      <span className="font-semibold">Location: </span>
                      {p.location}
                    </li>
                    <li className="text-xl">
                      <span className="font-semibold">Price: </span>
                      {p.price}
                    </li>
                  </ul>
<button
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "Do you want to remove this property from your favourites?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#002855",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, remove it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          removeFav(p.id);
                          Swal.fire({
                            icon: "success",
                            title: "Removed!",
                            text: "Property has been removed from your favourites.",
                            confirmButtonColor: "#002855",
                          });
                        }
                      });
                    }}
                    className="
                    self-end mt-4
                    bg-white text-[#002349] text-xs font-semibold
                    rounded-[4px] px-6 py-[4px]
                    hover:bg-gray-100
                  "
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
