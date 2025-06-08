import { useState, useEffect } from "react";
import { Pencil, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";
import { updateLoggedInUser } from "../../network/auth";
import Swal from "sweetalert2";

/* images ----------------------------------------------------------- */
import bgCover from "../../assets/Profile/cover.svg";
import avatarImg from "../../assets/Profile/Youssef Ashraf.svg";

/* -------------------------------------------------- */
/* helper: editable row                               */
/* -------------------------------------------------- */
function Field({ label, value, onSave, type = "text", mask = false }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  return (
    <div className="grid grid-cols-[110px_1fr_24px] items-center gap-2">
      <span className="text-white font-medium text-sm">{label}</span>

      {editing ? (
        <input
          autoFocus
          type={type}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => {
            setEditing(false);
            onSave(draft);
          }}
          className="w-full rounded bg-white/90 text-[#002349] text-sm px-3 py-1 outline-none"
        />
      ) : (
        <span className="inline-block w-full bg-white text-[#002349] text-center text-sm rounded px-3 py-1">
          {mask ? "•".repeat(Math.max(value.length, 8)) : value}
        </span>
      )}

      <button
        onClick={() => setEditing(true)}
        className="text-white hover:opacity-80"
        aria-label={`edit ${label}`}
      >
        <Pencil size={16} />
      </button>
    </div>
  );
}

/* -------------------------------------------------- */
/* main profile component                             */
/* -------------------------------------------------- */
export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (authUser) {
      setUser({
        username: authUser.username || "",
        email: authUser.email || "",
        password: "", // Don't show actual password
        phone: authUser.phone || "",
      });
    }
  }, [authUser]);

  const update = (k) => (val) => setUser((u) => ({ ...u, [k]: val }));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await updateLoggedInUser({
        username: user.username,
        email: user.email,
        phone: user.phone,
        currentPassword: user.password, // Only if password is being changed
        newPassword: user.password, // Only if password is being changed
        confirmNewPassword: user.password, // Only if password is being changed
      });

      if (response.data.success) {
        // Update Redux store with new user data
        dispatch(setCredentials({
          user: response.data.data.user,
          token: localStorage.getItem('token')
        }));

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Profile updated successfully",
          confirmButtonColor: "#002855",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to update profile",
        confirmButtonColor: "#002855",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#002349] text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgCover})` }}
    >
      <div className="relative w-[340px] sm:w-[420px] bg-[#002349] rounded-xl p-8 shadow-xl">
        <img
          src={avatarImg}
          alt="Profile"
          className="absolute -top-6 right-6 w-20 h-20 object-cover rounded-full border-4 border-white"
        />

        <h2 className="text-white text-2xl font-bold text-center mb-6">
          User Profile
        </h2>

        <div className="space-y-4 mb-8">
          <Field label="UserName:" value={user.username} onSave={update("username")} />
          <Field
            label="Email:"
            value={user.email}
            onSave={update("email")}
            type="email"
          />
          <Field
            label="Password:"
            value={user.password}
            onSave={update("password")}
            mask
          />
          <Field label="Phone" value={user.phone} onSave={update("phone")} />
        </div>

        <div className="space-y-4">
          {/* Save Changes button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-white text-[#002349] font-medium py-2 rounded hover:bg-gray-100 transition disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-white text-[#002349] font-medium py-2 rounded hover:bg-gray-100 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
