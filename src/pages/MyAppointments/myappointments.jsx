/* --------------------------------------------------
   MyAppointments.jsx – loads from API
   -------------------------------------------------- */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { getMyAppointments } from "../../network/appointment";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failedImages, setFailedImages] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getMyAppointments();
        console.log("Appointments:", response.data.data);
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load appointments",
          confirmButtonColor: "#002855",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
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

        Swal.fire(
          "Cancelled!",
          "Your appointment has been cancelled.",
          "success"
        );
      }
    });
  };

  const handleImageError = (propertyId) => {
    setFailedImages(prev => new Set([...prev, propertyId]));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-[#002349] text-xl">Loading appointments...</p>
      </div>
    );
  }

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
              key={a._id}
              className="bg-[#002349] text-white rounded-xl p-4 flex flex-col gap-4"
            >
              <div className="flex gap-4 items-center">
                <div className="w-[496px] h-[290px] rounded-lg shrink-0 bg-[#001731] flex items-center justify-center overflow-hidden">
                  {!a.property?.images?.[0] || failedImages.has(a.property._id) ? (
                    <div className="text-white text-center p-4">
                      <p className="text-lg font-semibold">Image Not Available</p>
                    </div>
                  ) : (
                    <img
                      src={a.property.images[0]}
                      alt={a.property.title || "Property"}
                      className="w-full h-full object-cover rounded-lg"
                      onError={() => handleImageError(a.property._id)}
                    />
                  )}
                </div>

                <div className="flex-1 space-y-1 text-xl">
                  <p>
                    <span className="font-semibold">With broker:</span>{" "}
                    {a.brokerId?.username || "Unknown"}
                  </p>
                  <p>
                    <span className="font-semibold">Property:</span>{" "}
                    {a.property?.title || "Unknown"}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(a.appointmentDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Time:</span>{" "}
                    {new Date(a.appointmentDate).toLocaleTimeString()}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {a.status}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => handleCancel(a._id)}
                  className="rounded-xl bg-white text-[#002855] px-6 py-2 font-bold"
                >
                  Cancel
                </button>
                {a.status === 'scheduled' && (
                  <button
                    onClick={() => navigate("/payment", { state: a })}
                    className="rounded-xl bg-white text-[#002855] px-6 py-2 font-bold"
                  >
                    Continue With Payment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
