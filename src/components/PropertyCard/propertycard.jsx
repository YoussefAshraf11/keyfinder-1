export default function PropertyCard({ img, name }) {
  return (
    <div className="w-full max-w-[10.5rem] sm:max-w-[12rem] text-center">
      {/* ↑ 168 px on mobile, 192 px on ≥640 px screens */}

      <img
        src={img}
        alt={name}
        className="w-full h-28 sm:h-32 object-cover rounded-lg shadow"
      />
      {/* ↑ 112 px tall → 128 px tall on ≥640 px screens */}

      <p className="mt-2 text-sm">{name}</p>
    </div>
  );
}
