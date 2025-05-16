// src/components/AuthFlow.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaTimes } from "react-icons/fa";
import backgroundImg from "../../assets/Login/login.svg";

export default function AuthFlow() {
  const [step, setStep] = useState("select");
  const navigate = useNavigate();

  return (
    <>
      {step && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImg})` }}
        >
          {/* Home icon */}
          <Link
            to="/"
            className="absolute top-4 right-4 text-white hover:text-gray-200 z-10"
          >
            <FaHome size={24} />
          </Link>

          {/* Modal container */}
          <div className="relative z-20 w-full max-w-md">
            {/* Arrow: on "Are you?" goes to SignIn page; otherwise returns to "Are you?" */}
            <button
              onClick={() =>
                step === "select" ? navigate("/login") : setStep("select")
              }
              className="absolute top-4 left-4 text-white hover:text-gray-200"
            >
              <FaArrowLeft size={20} />
            </button>

            {/* Close “×” on confirmation screens → return to proper form */}
            {(step === "buyer-forgot-confirm" ||
              step === "broker-forgot-confirm") && (
              <button
                onClick={() =>
                  step === "buyer-forgot-confirm"
                    ? setStep("buyer")
                    : setStep("broker")
                }
                className="absolute top-4 right-4 bg-white/25 hover:bg-white/40 text-white rounded-full p-1.5 transition"
              >
                <FaTimes size={16} />
              </button>
            )}

            {/* --- Step 1: Are you? --- */}
            {step === "select" && (
              <div className="bg-[#002349] p-8 rounded-xl text-white text-center">
                <h2 className="text-2xl font-bold mb-6">Are you?</h2>
                <div className="flex justify-around">
                  <button
                    onClick={() => setStep("buyer")}
                    className="flex flex-col items-center"
                  >
                    <span className="font-semibold mb-2">Buyer</span>
                    <div className="h-4 w-4 rounded-full border-2 border-white" />
                  </button>
                  <button
                    onClick={() => setStep("broker")}
                    className="flex flex-col items-center"
                  >
                    <span className="font-semibold mb-2">Broker</span>
                    <div className="h-4 w-4 rounded-full border-2 border-white" />
                  </button>
                </div>
              </div>
            )}

            {/* --- Step 2A: Buyer Sign-Up --- */}
            {step === "buyer" && (
              <div className="bg-[#002349] p-8 rounded-xl text-white">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Sign up for an account
                </h2>
                <p className="text-sm mb-6 text-center">
                  Already have an account?{" "}
                  <button
                    onClick={() => setStep("broker")}
                    className="underline hover:text-gray-200"
                  >
                    Sign in
                  </button>
                </p>
                <form onSubmit={(e) => e.preventDefault()}>
                  <label className="block mb-1 text-sm">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none"
                  />

                  <label className="block mb-1 text-sm">Password</label>
                  <input
                    type="password"
                    required
                    className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none"
                  />

                  <label className="block mb-1 text-sm">
                    Verify Your Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none"
                  />

                  <label className="block mb-1 text-sm">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full border-b border-white mb-6 bg-transparent py-1 focus:outline-none"
                  />

                  <p className="text-xs mb-4 text-center">
                    By creating an account, you acknowledge our Privacy Policy
                    and Terms of Use.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-2 bg-white text-[#002349] font-semibold rounded hover:bg-gray-100"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            )}

            {/* --- Step 2B: Broker Sign-In --- */}
            {step === "broker" && (
              <div className="bg-[#002349] p-8 rounded-xl text-white">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign in</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const email = e.target[1].value;
                    localStorage.setItem(
                      "user",
                      JSON.stringify({ email, role: "broker" })
                    );
                    window.location.href = "/broker-home";
                  }}
                >
                  {" "}
                  <label className="block mb-1 text-sm">ID</label>
                  <input
                    type="text"
                    required
                    className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none"
                  />
                  <label className="block mb-1 text-sm">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none"
                  />
                  <label className="block mb-1 text-sm">Password</label>
                  <input
                    type="password"
                    required
                    className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none"
                  />
                  <div className="flex items-center justify-between mb-6 text-sm">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-white"
                      />
                      <span className="ml-2">keep me signed in</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setStep("broker-forgot")}
                      className="underline hover:text-gray-200"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <p className="text-xs mb-4 text-center">
                    By submitting this form, you accept our Privacy Policy and
                    Terms of Use.
                  </p>
                  <button
                    type="submit"
                    className="w-full py-2 bg-white text-[#002349] font-semibold rounded hover:bg-gray-100"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            )}

            {/* --- Buyer Forgot Password Form --- */}
            {step === "buyer-forgot" && (
              <div className="bg-[#002349] p-8 rounded-xl text-white">
                <h2 className="text-2xl font-bold mb-2 text-center">
                  Forgot Password?
                </h2>
                <p className="text-sm mb-6 text-center">
                  A password reset link will be sent to the provided email
                  address.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep("buyer-forgot-confirm");
                  }}
                >
                  <label className="block mb-1 text-sm">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full border-b border-white mb-6 bg-transparent py-1 focus:outline-none"
                  />

                  <p className="text-xs mb-4 text-center">
                    By submitting this form, you accept our Privacy Policy and
                    Terms of Use.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-2 bg-white text-[#002349] font-semibold rounded hover:bg-gray-100"
                  >
                    Send Link
                  </button>
                </form>
              </div>
            )}

            {/* --- Buyer Forgot Confirmation --- */}
            {step === "buyer-forgot-confirm" && (
              <div className="relative bg-[#002349] p-6 rounded-xl text-white">
                <button
                  onClick={() => setStep("buyer")}
                  className="absolute top-4 right-4 bg-white/25 hover:bg-white/40 rounded-full p-1.5 transition"
                >
                  <FaTimes size={16} />
                </button>
                <p className="text-center">
                  We’ve emailed you instructions for setting your password; you
                  should receive it shortly. If you don’t receive an email,
                  please check the address you registered with and your spam
                  folder.
                </p>
              </div>
            )}

            {/* --- Broker Forgot Password Form --- */}
            {step === "broker-forgot" && (
              <div className="bg-[#002349] p-8 rounded-xl text-white">
                <h2 className="text-2xl font-bold mb-2 text-center">
                  Forgot Password?
                </h2>
                <p className="text-sm mb-6 text-center">
                  A password reset link will be sent to the provided email
                  address and your ID.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep("broker-forgot-confirm");
                  }}
                >
                  <label className="block mb-1 text-sm">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full border-b border-white mb-4 bg-transparent py-1 focus:outline-none"
                  />
                  <label className="block mb-1 text-sm">ID</label>
                  <input
                    type="text"
                    required
                    className="w-full border-b border-white mb-6 bg-transparent py-1 focus:outline-none"
                  />

                  <p className="text-xs mb-4 text-center">
                    By submitting this form, you accept our Privacy Policy and
                    Terms of Use.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-2 bg-white text-[#002349] font-semibold rounded hover:bg-gray-100"
                  >
                    Send Link
                  </button>
                </form>
              </div>
            )}

            {/* --- Broker Forgot Confirmation --- */}
            {step === "broker-forgot-confirm" && (
              <div className="relative bg-[#002349] p-6 rounded-xl text-white">
                <button
                  onClick={() => setStep("broker")}
                  className="absolute top-4 right-4 bg-white/25 hover:bg-white/40 rounded-full p-1.5 transition"
                >
                  <FaTimes size={16} />
                </button>
                <p className="text-center">
                  We’ve emailed you instructions for setting your password; you
                  should receive it shortly. If you don’t receive an email,
                  please check the address you registered with and your spam
                  folder.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
