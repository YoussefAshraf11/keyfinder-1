import "leaflet/dist/leaflet.css";
// src/components/AlexandriaMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Optional: Custom marker icon (you can skip this if you prefer default)
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function AlexandriaMap() {
  return (
    <div className="w-full h-[500px] rounded-xl shadow-md overflow-hidden">
      <MapContainer
        center={[31.2001, 29.9187]} // Coordinates for Alexandria
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Add markers for popular locations */}
        <Marker position={[31.2156, 29.9553]} icon={customIcon}>
          <Popup>Stanley Bridge</Popup>
        </Marker>
        <Marker position={[31.2243, 29.9524]} icon={customIcon}>
          <Popup>Sporting Club</Popup>
        </Marker>
        <Marker position={[31.2152, 29.9248]} icon={customIcon}>
          <Popup>Alexandria Corniche</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
