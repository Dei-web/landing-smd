import LocationContext from "../../context/location/LocationContext";
import type { MapLocation } from "../../types/map.types";

interface LocationsPanelProps {
  show: boolean;
  onClose: () => void;
  onSelectLocation: (location: MapLocation) => void;
}

export default function LocationsPanel({ show, onClose, onSelectLocation }: LocationsPanelProps) {
  const { locations, isLocationOpen, getStatusText } = LocationContext();

  if (!show) return null;

  return (
    <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-2xl w-96 max-h-[450px] overflow-hidden z-20 border border-gray-200">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
          </svg>
          <h3 className="font-bold text-lg">Nuestras Ubicaciones</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <svg
            className="w-6 h-6 text-white"
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

      <div className="overflow-y-auto max-h-[380px] p-4 space-y-3">
        {locations.map((location) => (
          <div
            key={location.id}
            className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors border border-gray-200 group cursor-pointer"
            onClick={() => onSelectLocation(location)}
          >
            <div className="flex items-start gap-3">
              <img
                src={location.logo}
                alt={location.name}
                className="w-12 h-12 rounded-lg object-cover shadow-md"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isLocationOpen(location)
                        ? "bg-green-500 animate-pulse"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <h4 className="font-semibold text-gray-800 text-sm truncate">
                    {location.name}
                  </h4>
                </div>
                <p
                  className={`text-xs font-medium mb-1 ${
                    isLocationOpen(location) ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {getStatusText(location)} • {location.schedule}
                </p>
                <p className="text-xs text-gray-600 mb-2">{location.address}</p>
                {location.description && (
                  <p className="text-xs text-gray-500 mb-2">
                    {location.description}
                  </p>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectLocation(location);
                  }}
                  className="w-full px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  Ver en mapa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
