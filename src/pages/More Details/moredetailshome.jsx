// src/components/ProjectShowcase.jsx
import React from "react";

/* ——— static imports ———
   adjust paths to fit your project structure
———————————————————————————— */
import coverImg from "../../assets/More details/cover.svg";
import palmHillsImg from "../../assets/More details/Palmhills.svg";
import royalZoneImg from "../../assets/More details/Royal Zone Villas.svg";
import alexWestImg from "../../assets/More details/Alex West.svg";
import sawaryImg from "../../assets/More details/swary.svg";

export default function ProjectShowcase() {
  // ——— local data ———
  const specs = {
    area: "120 – 220 m²",
    beds: "2 – 4",
    baths: "2 – 3",
    unitType: "Apartments",
    developer: "ACD Developments",
    price: "3 M EGP – 7 M EGP",
  };

  const similarProjects = [
    { name: "Palm Hills", image: palmHillsImg },
    { name: "Royal Zone Villas", image: royalZoneImg },
    { name: "Alex West", image: alexWestImg },
    { name: "Sawary", image: sawaryImg },
  ];

  return (
    <section className="w-full py-10 px-4 sm:px-6 md:px-8 lg:px-0">
      {/* Top: cover image + specs */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-6">
        {/* Cover Image */}
        <img
          src={coverImg}
          alt="Project cover"
          className="w-full md:w-1/2 lg:w-[460px] aspect-video object-cover rounded-xl shadow-lg"
        />

        {/* Specs Card */}
        <div className="w-full md:w-1/2 bg-[#002855] text-white rounded-xl p-6 sm:p-8 text-base sm:text-lg leading-relaxed shadow-lg m-auto">
          <div className="flex flex-col gap-y-3">
            <div>
              Area Range: <span className="font-normal">{specs.area}</span>
            </div>
            <div>
              Bedrooms: <span className="font-normal">{specs.beds}</span>
            </div>
            <div>
              Bathrooms: <span className="font-normal">{specs.baths}</span>
            </div>
            <div>
              Unit Type: <span className="font-normal">{specs.unitType}</span>
            </div>
            <div>
              Developer: <span className="font-normal">{specs.developer}</span>
            </div>
            <div>
              Price Range:<span className="font-normal">{specs.price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Projects Section */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#002855] mb-4">
          Similar Projects:
        </h2>

        <div className="flex gap-6 overflow-x-auto md:overflow-visible pb-4">
          {similarProjects.map(({ name, image }) => (
            <div
              key={name}
              className="flex flex-col items-center shrink-0 w-40 sm:w-48"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-28 sm:h-32 object-cover rounded-xl shadow-md"
              />
              <span className="mt-2 font-semibold text-center text-sm sm:text-base">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
