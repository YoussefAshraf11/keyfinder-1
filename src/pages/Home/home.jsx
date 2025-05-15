/* ---------------- main page ---------------- */
import HeroSection from "../../components/HeroSection/herosection";
import ProjectCard from "../../components/ProjectCard/projectcard";
import PropertyCard from "../../components/PropertyCard/propertycard";
import DeveloperLogo from "../../components/DeveloperLogo/developerlogo";
import { useRef, useEffect, useState, useCallback } from "react";

/* ---  A.  Real-Estate Project thumbnails  --- */
import PalmHillsProj from "../../assets/Real Estate Projects/Palm Hills.svg";
import TheOneProj from "../../assets/Real Estate Projects/The One.svg";
import JewarProj from "../../assets/Real Estate Projects/Jewar.svg";

/* ---  B.  Residential Property icons  --- */
import Apartments from "../../assets/Residental Properties/Apartments.svg";
import Chalet from "../../assets/Residental Properties/Chalet.svg";
import Duplex from "../../assets/Residental Properties/Duplex.svg";
import SVillas from "../../assets/Residental Properties/S Villas.svg";
import StandAlone from "../../assets/Residental Properties/Stand Alone Villas.svg";
import TwinVillas from "../../assets/Residental Properties/Twin Villas.svg";

/* ---  C.  Developer logos  --- */
import AlexWest from "../../assets/Real Estate Developers in Alexandria/Alex West.jpeg";
import Alforat from "../../assets/Real Estate Developers in Alexandria/Alforat Development.svg";
import ElSalam from "../../assets/Real Estate Developers in Alexandria/El Salam Interbuild.svg";
import PalmHillsDev from "../../assets/Real Estate Developers in Alexandria/Palm Hills.svg";
import SaudiEgyptian from "../../assets/Real Estate Developers in Alexandria/Saudi Egyptian.svg";
import ValoreDev from "../../assets/Real Estate Developers in Alexandria/Valore Development.svg";
import ValoreProj from "../../assets/Real Estate Projects/Valore.svg";
import RoyalZoneProj from "../../assets/Real Estate Projects/Royal Zone Villas.svg";
import AlexWestProj from "../../assets/Real Estate Projects/Alex West.svg";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  /* ------------- data ------------- */
  const projects = [
    { img: PalmHillsProj, name: "Palm Hills" },
    { img: TheOneProj, name: "The One" },
    { img: JewarProj, name: "Jewar" },
    { img: ValoreProj, name: "Valore" },
    { img: RoyalZoneProj, name: "Royal Zone Villas" },
    { img: AlexWestProj, name: "Alex West" },
  ];

  const properties = [
    { img: Apartments, name: "Apartments" },
    { img: StandAlone, name: "Stand Alone Villas" },
    { img: TwinVillas, name: "Twin Villas" },
    { img: Duplex, name: "Duplex" },
    { img: Chalet, name: "Chalet" },
    { img: SVillas, name: "S Villas" },
  ];

  const developers = [
    { img: PalmHillsDev, name: "Palm Hills Developments" },
    { img: Alforat, name: "Alforat Development" },
    { img: ValoreDev, name: "Valore Development" },
    { img: SaudiEgyptian, name: "Saudi-Egyptian Developers" },
    { img: ElSalam, name: "El Salam Interbuild" },
    { img: AlexWest, name: "Alex West" },
  ];
  const railRef = useRef(null);
  const [fadeL, setFadeL] = useState(false);
  const [fadeR, setFadeR] = useState(true);

  const wheelToScroll = (e) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
      railRef.current.scrollLeft += e.deltaY;
    }
  };

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
  return (
    <>
      <main className="min-h-screen">
        <HeroSection />

        {/* ---------- intro ---------- */}
        <section className="bg-gray-100">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-primary">
                The Best Real Estate Website in Egypt
              </h2>

              <p className="text-base text-xl text-primary font-medium">
                Welcome to KeyFinder — Your Exclusive Real Estate Broker Hub.
              </p>
              <p className="text-base text-xl text-primary font-medium">
                At KeyFinder, we are redefining the way buyers and sellers
                connect in the real estate market.
              </p>
              <p className="text-base text-xl text-primary font-medium">
                As a leading brokerage company, we collect and list all the most
                exciting and sought-after real estate projects in our region,
                offering buyers exclusive access to a wide range of properties
                through our platform.
              </p>
              <p className="text-base text-xl text-primary font-medium">
                With a focus on providing personalized service and transparent
                processes, we make buying a home easier, faster, and more
                convenient.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Projects ---------- */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-primary font-semibold mb-6 text-lg sm:text-xl md:text-2xl">
            Real Estate Projects in Alexandria
          </h2>

          {/* grid → 3 columns on md+  */}
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 place-items-center">
            {projects.map((p) => (
              <div
                key={p.name}
                onClick={() => navigate("/more-details")}
                className="w-full cursor-pointer"
              >
                <ProjectCard key={p.name} {...p} />
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Residential ---------- */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-primary font-semibold mb-6 text-lg sm:text-xl md:text-2xl">
            Residential Properties in Alexandria
          </h2>

          <div className="relative mt-10">
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
              {properties.map((p) => (
                <div key={p.id} className="shrink-0 w-[320px]">
                  <PropertyCard {...p} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Developers ---------- */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-primary font-semibold mb-6 text-lg sm:text-xl md:text-2xl">
            Real Estate Developers in Alexandria
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {developers.map((d) => (
              <DeveloperLogo key={d.name} {...d} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
