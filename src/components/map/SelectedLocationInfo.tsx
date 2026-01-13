import LocationContext from "../../context/location/LocationContext";
import type { MapLocation } from "../../types/map.types";

interface SelectedLocationInfoProps {
  location: MapLocation | null;
  onClose: () => void;
}

export default function SelectedLocationInfo({ location, onClose }: SelectedLocationInfoProps) {
  const { isLocationOpen, getStatusText } = LocationContext();

  if (!location) return null;

  return (
    <div className="absolute bottom-8 left-8 bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-2xl w-80 text-white hover:scale-105 transition-transform duration-300 z-10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isLocationOpen(location)
                  ? "bg-green-400 animate-pulse"
                  : "bg-red-400"
              }`}
            ></div>
            <h3 className="text-xl font-bold">{location.name}</h3>
          </div>
          <p
            className={`text-xs font-medium mb-2 ${
              isLocationOpen(location) ? "text-green-300" : "text-red-300"
            }`}
          >
            {getStatusText(location)} • {location.schedule}
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            {location.address}
          </p>
          {location.description && (
            <p className="text-gray-400 text-xs">{location.description}</p>
          )}
        </div>

        <button
          className="ml-3 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
          onClick={onClose}
        >
          <svg
            className="w-5 h-5 text-gray-400 hover:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <a
        href={
          location.googleMapsUrl ||
          `https://www.google.com/maps?q=${location.lat},${location.lng}`
        }
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors duration-200"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
        Abrir en Google Maps
      </a>
    </div>
  );
}
