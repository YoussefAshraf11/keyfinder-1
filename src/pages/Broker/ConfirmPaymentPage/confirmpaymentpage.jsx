// src/pages/ConfirmPaymentPage.jsx
import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";

export default function ConfirmPaymentPage() {

  /* 1) Load REAL appointments into state */
  const [storedApps, setStoredApps] = useState(() =>
    JSON.parse(localStorage.getItem("likedAppointments") || "[]")
  );

  /* 2) Build TEST appointment ONCE */
  const testApp = useMemo(() => {
    const expiry = Date.now() + 30 * 1000; // 30-second lifetime
    return {
      id: "__test__",
      image: storedApps[0]?.image || "/placeholder.jpg",
      brokerName: "Test Broker",
      date: new Date(expiry).toISOString(),
      location: "Test Location",
      expiryTs: expiry,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

  /* 3) Live clock (ticks every second) */
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* 4) Enrich REAL appointments with expiryTs */
  const enrichedReal = storedApps.map((a) => ({
    ...a,
    expiryTs: new Date(a.date).getTime(),
  }));

  /* 5) Combine → compute secondsLeft → filter out expired */
  const activeApps = [testApp, ...enrichedReal]
    .map((app) => ({
      ...app,
      secondsLeft: Math.ceil((app.expiryTs - now) / 1000),
    }))
    .filter((app) => app.secondsLeft > 0);

  /* 6) If none left, show empty message */
  if (activeApps.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-2xl">No appointments left.</p>
      </div>
    );
  }

  /* Handler for Confirm Payment */
  const handleConfirm = (appId) => {
    Swal.fire({
      title: "Did the Buyer Complete the Payment Successfully?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove from localStorage (only real apps have persisted IDs)
        const updated = storedApps.filter((a) => a.id !== appId);
        localStorage.setItem("likedAppointments", JSON.stringify(updated));
        setStoredApps(updated);

        // Success alert
        Swal.fire("Payment successful!", "", "success");
      } else {
        // Optional: you can show a message or do nothing
        Swal.fire("Payment not completed.", "", "info");
      }
    });
  };

  /* 7) Render */
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-screen-xl mx-auto px-4 space-y-8">
        {activeApps.map((app) => {
          const { secondsLeft } = app;

          /* remaining-time label */
          let remaining;
          if (secondsLeft <= 30) {
            remaining = `${secondsLeft} second${secondsLeft === 1 ? "" : "s"}`;
          } else if (secondsLeft < 86_400 * 7) {
            const days = Math.ceil(secondsLeft / 86_400);
            remaining = `${days} Day${days > 1 ? "s" : ""}`;
          } else {
            const weeks = Math.ceil(secondsLeft / (86_400 * 7));
            remaining = `${weeks} Week${weeks > 1 ? "s" : ""}`;
          }

          return (
            <div
              key={app.id}
              className="flex bg-[#002349] rounded-md shadow-md overflow-hidden h-[280px] w-full"
            >
              {/* image */}
              <div className="w-1/3 h-full">
                <img
                  src={app.image}
                  alt={`Appointment ${app.id}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* details */}
              <div className="flex-1 p-6 flex flex-col justify-around">
                <div className="flex justify-between items-start">
                  <ul className="text-white space-y-1 text-xl">
                    <li>
                      <span className="font-semibold">With broker:</span>{" "}
                      {app.brokerName}
                    </li>
                    <li>
                      <span className="font-semibold">At:</span> {app.date}
                    </li>
                    <li>
                      <span className="font-semibold">Location:</span>{" "}
                      {app.location}
                    </li>
                  </ul>
                  <div className="text-white text-right text-base">
                    <p className="font-semibold mb-1">Remaining Time:</p>
                    <p className="text-lg">{remaining}</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleConfirm(app.id)}
                    className="bg-white text-[#002349] px-6 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
