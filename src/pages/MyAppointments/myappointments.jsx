/* --------------------------------------------------
   MyAppointments.jsx – loads from localStorage
   -------------------------------------------------- */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments") || "[]");
    setAppointments(stored);
  }, []);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = appointments.filter((a) => a.id !== id);
        setAppointments(updated);
        localStorage.setItem("appointments", JSON.stringify(updated));
        Swal.fire(
          "Cancelled!",
          "Your appointment has been cancelled.",
          "success"
        );
      }
    });
  };

  return (
    <section className="container mx-auto px-4 py-10 max-w-6xl">
      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-[#002349] font-bold text-xl mb-2 text-center">
            My Appointments
          </h1>
          <p className="text-center text-gray-500">No appointment available</p>
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map((a) => (
            <div
              key={a.id}
              className="bg-[#002349] text-white rounded-xl p-4 flex flex-col gap-4 "
            >
              <div className="flex gap-4 items-center">
                <img
                  src={a.img}
                  alt="Property"
                  className="w-[496px] h-[290px] object-cover rounded "
                />

                <div className="flex-1 space-y-1 text-xl ">
                  <p>
                    <span className="font-semibold">With broker:</span>{" "}
                    {a.broker}
                  </p>
                  <p>
                    <span className="font-semibold">At:</span> {a.at}
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span>{" "}
                    {a.location}
                  </p>
                  <p>
                    <span className="font-semibold">Time of appointment:</span>{" "}
                    {a.time}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => handleCancel(a.id)}
                  className="rounded-xl bg-white text-[#002855] px-6 py-2 font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => navigate("/payment", { state: a })}
                  className="rounded-xl bg-white text-[#002855] px-6 py-2 font-bold"
                >
                  Continue With Payment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
