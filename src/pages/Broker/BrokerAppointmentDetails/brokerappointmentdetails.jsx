// src/pages/BrokerAppointmentDetail.jsx
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function BrokerAppointmentDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const app = state?.appointment;

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Appointment not found.</p>
      </div>
    );
  }

  const handleFeedback = async () => {
    const { value: choice } = await Swal.fire({
      title: "How was this appointment?",
      html: `
        <div class="flex flex-col space-y-4 text-left">
          <label class="flex items-center">
            <input type="radio" name="feedback" value="liked" class="mr-3 w-4 h-4 text-[#002349]"/>
            <span class="font-semibold text-base">Liked and made a Reservation Paper</span>
          </label>
          <label class="flex items-center">
            <input type="radio" name="feedback" value="notLiked" class="mr-3 w-4 h-4 text-[#002349]"/>
            <span class="font-semibold text-base">Not Liked</span>
          </label>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "p-6 rounded-md",
        confirmButton: "bg-[#002349] text-white px-6 py-2 rounded",
        cancelButton: "bg-gray-500 text-white px-6 py-2 rounded ml-2",
      },
      buttonsStyling: false,
      focusConfirm: false,
      preConfirm: () => {
        const checked = document.querySelector(
          'input[name="feedback"]:checked'
        );
        if (!checked) Swal.showValidationMessage("Please select an option");
        return checked ? checked.value : null;
      },
    });

    if (!choice) return; // cancelled or no selection

    if (choice === "notLiked") {
      // 1) remove from likedAppointments
      const storedLiked = JSON.parse(
        localStorage.getItem("likedAppointments") || "[]"
      );
      const updatedLiked = storedLiked.filter((a) => a.id !== app.id);
      localStorage.setItem("likedAppointments", JSON.stringify(updatedLiked));

      // 2) remove from brokerAppointments
      const storedBroker = JSON.parse(
        localStorage.getItem("brokerAppointments") || "[]"
      );
      const updatedBroker = storedBroker.filter((a) => a.id !== app.id);
      localStorage.setItem("brokerAppointments", JSON.stringify(updatedBroker));

      await Swal.fire({
        icon: "success",
        title: "Removed",
        text: "This appointment has been deleted.",
        customClass: {
          confirmButton: "bg-[#002349] text-white px-6 py-2 rounded",
        },
        buttonsStyling: false,
      });

      navigate("/broker-home");
    } else {
      // Liked → push into likedAppointments as before
      const storedLiked = JSON.parse(
        localStorage.getItem("likedAppointments") || "[]"
      );
      if (!storedLiked.some((a) => a.id === app.id)) {
        storedLiked.push(app);
        localStorage.setItem("likedAppointments", JSON.stringify(storedLiked));
      }
      navigate("/confirm-payment");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-[1185px] h-[480px] bg-[#002349] rounded-md shadow-md overflow-hidden flex">
        <div className="w-1/3 h-full">
          <img
            src={app.image}
            alt={`Appointment ${app.id}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-2/3 p-8 flex flex-col justify-around">
          <ul className="text-white space-y-4 text-xl">
            <li>
              <span className="font-semibold">With broker:</span>{" "}
              {app.brokerName}
            </li>
            <li>
              <span className="font-semibold">At:</span> {app.date}
            </li>
            <li>
              <span className="font-semibold">Location:</span> {app.location}
            </li>
            <li>
              <span className="font-semibold">Time of appointment:</span>{" "}
              {app.time}
            </li>
          </ul>
          <div className="flex justify-end">
            <button
              onClick={handleFeedback}
              className="bg-white text-[#002349] px-6 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
