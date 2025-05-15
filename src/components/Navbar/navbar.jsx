/* src/components/Navbar.jsx */
import { Link, NavLink } from "react-router-dom";
import { Home } from "lucide-react";
import brandLogo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
const NAV_ITEMS = [
  { name: "Listing", path: "/listing" },
  { name: "My Appointments", path: "/myappointments" },
  { name: "Favourites", path: "/favourites" },
  { name: "Interactive Maps", path: "/map" },
];

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="text-white w-full shadow-md">
      {/* ─────────── upper strip (accent colour) ─────────── */}
      <div className="w-full bg-[#001731]">
        <div className="container mx-auto flex justify-end items-center gap-2 px-4 py-2">
          <Home
            size={20}
            strokeWidth={2.5}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
          {localStorage.getItem("user") ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 text-sm font-medium hover:text-gold transition-colors"
            >
              <span className="whitespace-nowrap">My Profile</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm font-medium hover:text-gold transition-colors"
            >
              <span className="whitespace-nowrap">Join/Log&nbsp;In</span>
            </Link>
          )}
        </div>
      </div>

      {/* ─────────── main navigation bar (primary colour) ─────────── */}
      <div className="w-full bg-primary">
        <div className="container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between px-4  gap-6">
          {/* brand logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={brandLogo}
              alt="KeyFinder"
              className="h-35 w-auto  select-none pointer-events-none"
            />
          </Link>

          {/* nav links */}
          <nav className="flex flex-wrap justify-center sm:justify-end gap-8 text-sm font-medium uppercase tracking-wide">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `hover:text-gold transition-colors ${
                    isActive ? "text-gold" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
