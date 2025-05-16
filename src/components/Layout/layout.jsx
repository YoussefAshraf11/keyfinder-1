// src/components/Layout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

// adjust these paths to wherever your components actually live
import Navbar from "../Navbar/navbar.jsx";
import Footer from "../Fotter/fotter.jsx";

export default function Layout() {
  const { pathname } = useLocation();
  const isBrokerRoute = pathname.startsWith("/broker");
  return (
    <>
      <Navbar />
      <Outlet />
      {!isBrokerRoute && <Footer />}{" "}
    </>
  );
}
