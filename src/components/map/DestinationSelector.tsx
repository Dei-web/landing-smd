import useMapContext from "../../context/location/LocationContext";
import { MapContext } from "../../context/map/MapContext";
import type { MapLocation } from "../../types/map.types";
import LocationCard from "./LocationCard";

interface DestinationSelectorProps {
  show: boolean;
  onClose: () => void;
  userLocation: { lat: number; lng: number } | null;
  onSelectDestination: (location: MapLocation) => void; // Ajusta 'any' según tu tipo de Location
}

export default function DestinationSelector({
  show,
  onClose,
  userLocation,
  onSelectDestination,
}: DestinationSelectorProps) {
  const { locations, isLocationOpen, getStatusText, calculateRealDistance } =
    useMapContext();
  const { formatDistance } = MapContext();

  if (!show || !userLocation) return null;

  const sortedLocations = locations
    .map((location) => ({
      ...location,
      distance: calculateRealDistance(
        userLocation.lat,
        userLocation.lng,
        location.lat,
        location.lng
      ),
    }))
    .sort((a, b) => a.distance - b.distance);

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden z-20 border border-gray-200">
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-4 flex items-center justify-between">
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
          <h3 className="font-bold text-lg">Elige tu destino</h3>
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

      <div className="max-h-80 overflow-y-auto p-4 space-y-3">
        {sortedLocations.map((location, index) => (
          <LocationCard
            key={location.id}
            location={location}
            isLocationOpen={isLocationOpen}
            getStatusText={getStatusText}
            formatDistance={formatDistance}
            onSelect={onSelectDestination}
            isNearest={index === 0}
            showDistance={true}
            distance={location.distance}
          />
        ))}
      </div>
    </div>
  );
}
