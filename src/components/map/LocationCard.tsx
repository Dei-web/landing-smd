import type { MapLocation } from "../../types/map.types";

interface LocationCardProps {
  location: MapLocation; // ⬅️ Cambiado de locations a location y de LocationContextType a MapLocation
  isLocationOpen: (location: MapLocation) => boolean;
  getStatusText: (location: MapLocation) => string;
  formatDistance: (distance: number) => string;
  onSelect: (location: MapLocation) => void;
  isNearest?: boolean;
  showDistance?: boolean;
  distance?: number;
}

export default function LocationCard({
  location, // ⬅️ Cambiado de locations a location
  isLocationOpen,
  getStatusText,
  formatDistance,
  onSelect,
  isNearest = false,
  showDistance = false,
  distance = 0,
}: LocationCardProps) {
  return (
    <button
      onClick={() => onSelect(location)} // ⬅️ Cambiado
      className="w-full bg-gray-50 rounded-xl p-4 hover:bg-slate-50 transition-all border border-gray-200 hover:border-slate-400 group text-left"
    >
      <div className="flex items-start gap-3">
        <img
          src={location.logo} // ⬅️ Cambiado
          alt={location.name} // ⬅️ Cambiado
          className="w-12 h-12 rounded-lg object-cover shadow-md"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {isNearest && (
              <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                Más cercana
              </span>
            )}
            <div
              className={`w-2 h-2 rounded-full ${
                isLocationOpen(location) // ⬅️ Cambiado
                  ? "bg-green-500 animate-pulse"
                  : "bg-red-500"
              }`}
            ></div>
          </div>
          <h4 className="font-semibold text-gray-800 text-sm mb-1">
            {location.name} {/* ⬅️ Cambiado */}
          </h4>
          <p className="text-xs text-gray-600 mb-1">{location.address}</p>{" "}
          {/* ⬅️ Cambiado */}
          <div className="flex items-center gap-3 mt-2">
            {showDistance && distance && (
              <span className="text-xs font-medium text-slate-700 flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                {formatDistance(distance)}
              </span>
            )}
            <span
              className={`text-xs font-medium ${
                isLocationOpen(location) ? "text-green-600" : "text-red-600" // ⬅️ Cambiado
              }`}
            >
              {getStatusText(location)} {/* ⬅️ Cambiado */}
            </span>
          </div>
        </div>
        <svg
          className="w-5 h-5 text-gray-400 group-hover:text-slate-600 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </button>
  );
}
