import type { UserLocation } from "../../types/map.types";

interface MapControlsProps {
  userLocation: UserLocation | null;
  onToggleDestinations: () => void;
  onToggleLocations: () => void;
  locationsCount: number;
}

export default function MapControls({
  userLocation,
  onToggleDestinations,
  onToggleLocations,
  locationsCount,
}: MapControlsProps ) {
  return (
    <div className="flex justify-center gap-4 mb-6 flex-wrap">
      <button
        id="btn-location"
        className="relative overflow-hidden px-6 py-3 bg-transparent border-2 border-blue-500 text-blue-600 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
      >
        <span className="absolute inset-0 bg-blue-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
        <span className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300">
          <svg
            className="w-5 h-5"
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Trazar ruta desde mi ubicación
        </span>
      </button>

      {userLocation && (
        <button
          onClick={onToggleDestinations}
          className="relative overflow-hidden px-6 py-3 bg-transparent border-2 border-slate-600 text-slate-700 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
        >
          <span className="absolute inset-0 bg-slate-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
          <span className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            Cambiar destino
          </span>
        </button>
      )}

      <button
        onClick={onToggleLocations}
        className="relative overflow-hidden px-6 py-3 bg-transparent border-2 border-green-500 text-green-600 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
      >
        <span className="absolute inset-0 bg-green-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
        <span className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          Ver ubicaciones ({locationsCount})
        </span>
      </button>
    </div>
  );
}
