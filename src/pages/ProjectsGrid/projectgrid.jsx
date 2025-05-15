// src/components/ProjectsGrid.jsx

// Importing all SVGs from the Projects folder
import PalmHills from "../../assets/Projects/Palm_Hills.svg";
import TheOne from "../../assets/Projects/the+one.svg";
import ValoreAnton from "../../assets/Projects/valore.svg";
import AlexWest from "../../assets/Projects/Alex-West.svg";
import Jewar from "../../assets/Projects/Jewar.svg";
import RoyalZone from "../../assets/Projects/Royal Zone Villas.svg";
import ValoreSmouha from "../../assets/Projects/Valore Smouha.svg";
import Sawary from "../../assets/Projects/Swary.svg";
import Muruj from "../../assets/Projects/Muruj.svg";

const PROJECTS = [
  { name: "Palm Hills", image: PalmHills },
  { name: "The One", image: TheOne },
  { name: "Valore  Antonidades", image: ValoreAnton },
  { name: "Alex West", image: AlexWest },
  { name: "Jewar", image: Jewar },
  { name: "Royal Zone Villas", image: RoyalZone },
  { name: "Valore Smouha", image: ValoreSmouha },
  { name: "Sawary", image: Sawary },
  { name: "Muruj", image: Muruj },
];

export default function ProjectsGrid() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#002855] mb-6 text-center">
        Real estate projects in Alexandria
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
        {PROJECTS.map(({ name, image }) => (
          <div
            key={name}
            className="w-full max-w-[450px] rounded-xl overflow-hidden shadow-md border border-gray-200"
          >
            <img src={image} alt={name} className="w-full h-64 object-cover" />
            <div className="bg-[#002855] flex justify-center items-center h-20 text-white rounded-2xl text-center py-2 font-semibold">
              {name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
