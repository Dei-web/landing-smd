import type { RouteInfo } from "../../types/map.types";

interface RouteInfoPanelProps {
  routeInfo: RouteInfo | null;
  onClose: () => void;
}

export default function RouteInfoPanel({ routeInfo, onClose }: RouteInfoPanelProps) {
  if (!routeInfo) return null;

  return (
    <div className="absolute top-4 left-4 bg-white rounded-xl shadow-xl p-4 z-20 border-2 border-blue-500 max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <svg
              className="w-5 h-5 text-blue-600"
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
          </div>
          <div>
            <h4 className="font-bold text-gray-800">Ruta calculada</h4>
            <p className="text-xs text-gray-500">Sigue las calles en azul</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Cerrar panel de ruta"
        >
          <svg
            className="w-5 h-5 text-gray-500 hover:text-gray-700"
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
      <div className="space-y-2">
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
          <span className="text-sm text-gray-600 flex items-center gap-2">
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            Distancia por carretera
          </span>
          <span className="font-bold text-blue-600">{routeInfo.distance}</span>
        </div>
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
          <span className="text-sm text-gray-600 flex items-center gap-2">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Tiempo estimado
          </span>
          <span className="font-bold text-green-600">{routeInfo.time}</span>
        </div>
        <div className="bg-blue-50 rounded-lg p-2">
          <span className="text-xs text-gray-600">Destino:</span>
          <p className="font-semibold text-sm text-gray-800 truncate">
            {routeInfo.destination}
          </p>
        </div>
      </div>
    </div>
  );
}
