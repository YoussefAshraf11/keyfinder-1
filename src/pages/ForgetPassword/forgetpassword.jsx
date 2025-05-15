// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaTimes } from "react-icons/fa";
import backgroundImg from "../../assets/Login/login.svg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: call your forgot-password API here
    setSent(true);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Home icon */}
      <Link
        to="/"
        className="absolute top-4 right-4 text-white hover:text-gray-200 z-10"
      >
        <FaHome size={24} />
      </Link>

      <div className="relative bg-[#002349] p-8 rounded-xl shadow-xl w-full max-w-sm text-white">
        {!sent ? (
          <>
            <h2 className="text-2xl font-bold mb-2 text-center">
              Forgot Password?
            </h2>
            <p className="text-sm mb-6 text-center">
              A password reset link will be sent to the provided email address.
            </p>

            <form onSubmit={handleSubmit}>
              <label className="block mb-1 text-sm">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full border-b border-white mb-6 bg-transparent py-1 focus:outline-none"
              />

              <p className="text-xs mb-4 text-center">
                By submitting this form, you acknowledge that you accept our
                Privacy Policy and Terms of Use.
              </p>

              <button
                type="submit"
                className="w-full py-2 bg-white text-[#002349] font-semibold rounded hover:bg-gray-100 transition"
              >
                Send Link
              </button>
            </form>
          </>
        ) : (
          <>
            {/* Close button */}
            <button
              onClick={() => navigate("/login")}
              className="
                absolute top-4 right-4
                p-1.5
                bg-white/25 hover:bg-white/40
                rounded-full
                transition
                z-10
              "
            >
              <FaTimes size={14} className="text-white" />
            </button>

            <p className="text-center">
              We’ve emailed you instructions for setting your password; you
              should receive it shortly. If you don’t receive an email, please
              check the address you registered with, and your spam folder.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
