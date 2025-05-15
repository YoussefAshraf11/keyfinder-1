export default function ProjectCard({ img, name }) {
  return (
    <div className="w-full max-w-[22rem] sm:max-w-[24rem] text-center">
      {/* ↑ 352 px wide on mobile, 384 px on ≥640 px */}

      <img
        src={img}
        alt={name}
        className="w-full h-60 sm:h-64 object-cover rounded-xl shadow-md"
      />
      {/* ↑ 240 px tall on mobile, 256 px on ≥640 px */}

      <p className="mt-3 text-lg font-medium">{name}</p>
    </div>
  );
}
