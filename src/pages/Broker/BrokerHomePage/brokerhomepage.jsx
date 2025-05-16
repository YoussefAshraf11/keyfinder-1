/* eslint-disable no-unused-vars */
// src/pages/BrokerHomePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../../assets/Broker/1.svg";
import img2 from "../../../assets/Broker/2.svg";
import img3 from "../../../assets/Broker/3.svg";

const DUMMY_APPTS = [
  {
    id: 1,
    image: img1,
    brokerName: "John Doe",
    date: "2025-06-01",
    time: "10:00 AM",
    location: "Downtown Office",
  },
  {
    id: 2,
    image: img2,
    brokerName: "Jane Smith",
    date: "2025-06-02",
    time: "02:30 PM",
    location: "Uptown Branch",
  },
  {
    id: 3,
    image: img3,
    brokerName: "Alex Johnson",
    date: "2025-06-03",
    time: "11:15 AM",
    location: "Suburb Center",
  },
];

export default function BrokerHomePage() {
  const navigate = useNavigate();

  // load from localStorage or fall back to DUMMY_APPTS
  const [apps, setApps] = useState(() => {
    const stored = JSON.parse(
      localStorage.getItem("brokerAppointments") || "null"
    );
    return Array.isArray(stored) && stored.length ? stored : DUMMY_APPTS;
  });

  // persist any changes to brokerAppointments
  useEffect(() => {
    localStorage.setItem("brokerAppointments", JSON.stringify(apps));
  }, [apps]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-8">
        {apps.length === 0 && (
          <p className="text-center text-gray-600 text-xl">
            You have no appointments scheduled.
          </p>
        )}

        {apps.map((app) => (
          <div
            key={app.id}
            className="flex flex-col lg:flex-row bg-[#002349] rounded-md shadow-md overflow-hidden"
          >
            {/* image */}
            <div className="w-full lg:w-1/3 h-48 md:h-64 lg:h-auto">
              <img
                src={app.image}
                alt={`Appointment ${app.id}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* details */}
            <div className="flex-1 p-6 flex flex-col justify-center">
              <ul className="space-y-2 text-white">
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
                <li>
                  <span className="font-semibold">Time of appointment:</span>{" "}
                  {app.time}
                </li>
              </ul>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() =>
                    navigate(`/broker/appointments/${app.id}`, {
                      state: { appointment: app },
                    })
                  }
                  className="bg-white text-[#002349] px-6 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Check Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
