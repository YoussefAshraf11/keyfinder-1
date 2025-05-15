import { useState } from "react";
import { Pencil } from "lucide-react";

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
  /* local demo state – replace with API data later */
  const [user, setUser] = useState({
    name: "Ahmad Khatab",
    email: "user123@no1.com",
    password: "myPassword!",
    phone: "01•••••••••",
    country: "Egypt",
  });

  /* helper to update single field */
  const update = (k) => (val) => setUser((u) => ({ ...u, [k]: val }));

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgCover})` }}
    >
      {/* card */}
      <div className="relative w-[340px] sm:w-[420px] bg-[#002349] rounded-xl p-8 shadow-xl">
        {/* avatar */}
        <img
          src={avatarImg}
          alt="Profile"
          className="absolute -top-6 right-6 w-20 h-20 object-cover rounded-full border-4 border-white"
        />

        <h2 className="text-white text-2xl font-bold text-center mb-6">
          User Profile
        </h2>

        <div className="space-y-4">
          <Field label="Name:" value={user.name} onSave={update("name")} />
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
          <Field
            label="Country"
            value={user.country}
            onSave={update("country")}
          />
        </div>
      </div>
    </section>
  );
}
