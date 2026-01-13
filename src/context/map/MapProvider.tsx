import {
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useMapContext } from "../../hooks/useMapContext";
import type { MapLocation, UserLocation } from "../../types/map.types";
import type { MapContextType } from "../../types/contextTypes/mapContext.types";

type RouteInfo = {
  distance: string;
  time: string;
  destination: string;
  straightLineDistance: string;
};

type MapProviderProps = {
  children: ReactNode;
};

export const MapProvider = ({ children }: MapProviderProps) => {
  const [map, setMap] = useState<unknown | null>(null);
  const [L, setL] = useState<unknown | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [routingControl, setRoutingControl] = useState<unknown | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);

  // Formatear distancia
  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    }
    return `${(meters / 1000).toFixed(1)} km`;
  };

  // Formatear tiempo
  const formatTime = (seconds: number): string => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  // Crear ruta a una ubicación específica
  const createRouteToLocation = async (
    LeafletLib: unknown,
    mapInstance: unknown,
    _userMarker: unknown,
    lat: number,
    lng: number,
    targetLocation: MapLocation,
    setSelected: Dispatch<SetStateAction<MapLocation | null>>,
    calculateRealDistance: (
      lat1: number,
      lng1: number,
      lat2: number,
      lng2: number
    ) => number
  ): Promise<unknown | null> => {
    try {
      // Cargar el script si no está cargado
      if (!(window as any).L.Routing) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src =
            "https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js";
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error("Failed to load routing script"));
          document.head.appendChild(script);
        });
      }

      // Crear ruta usando calles reales con OSRM
      const control = (window as any).L.Routing.control({
        waypoints: [
          (window as any).L.latLng(lat, lng),
          (window as any).L.latLng(targetLocation.lat, targetLocation.lng),
        ],
        router: (window as any).L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1",
          language: "es",
          profile: "driving",
        }),
        routeWhileDragging: false,
        showAlternatives: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        lineOptions: {
          styles: [
            { color: "#3b82f6", opacity: 0.8, weight: 3 },
            { color: "#60a5fa", opacity: 1, weight: 4 },
          ],
        },
        createMarker: function () {
          return null;
        },
        show: false,
      }).addTo(mapInstance);

      // Obtener información de la ruta
      control.on("routesfound", function (e: any) {
        const routes = e.routes;
        const route = routes[0];

        setRouteInfo({
          distance: formatDistance(route.summary.totalDistance),
          time: formatTime(route.summary.totalTime),
          destination: targetLocation.name,
          straightLineDistance: formatDistance(
            calculateRealDistance(
              lat,
              lng,
              targetLocation.lat,
              targetLocation.lng
            )
          ),
        });
      });

      setSelected(targetLocation);

      return control;
    } catch (error) {
      console.error("Error al cargar leaflet-routing-machine:", error);

      // Fallback: dibujar línea simple si falla la ruta
      const routeLine = (LeafletLib as any)
        .polyline(
          [
            [lat, lng],
            [targetLocation.lat, targetLocation.lng],
          ],
          { color: "#3b82f6", weight: 4, dashArray: "10,8" }
        )
        .addTo(mapInstance);

      const bounds = (LeafletLib as any).latLngBounds(
        [lat, lng],
        [targetLocation.lat, targetLocation.lng]
      );
      (mapInstance as any).flyToBounds(bounds, {
        padding: [50, 50],
        duration: 1.8,
      });

      setSelected(targetLocation);
      return routeLine;
    }
  };

  // Limpiar ruta del mapa
  const clearRoute = (): void => {
    if (routingControl && map) {
      try {
        (map as any).removeControl(routingControl);
      } catch (error) {
        console.error("Error al remover control de ruta:", error);
      }
      setRoutingControl(null);
      setRouteInfo(null);
    }
  };

  // Limpiar todo (usuario + ruta)
  const clearAll = (): void => {
    // Limpiar ruta
    if (routingControl && map) {
      try {
        (map as any).removeControl(routingControl);
      } catch (error) {
        console.error("Error al remover control de ruta:", error);
      }
      setRoutingControl(null);
    }

    // Limpiar marcador de usuario
    if (userLocation && userLocation.marker && map) {
      try {
        (map as any).removeLayer(userLocation.marker);
      } catch (error) {
        console.error("Error al remover marcador de usuario:", error);
      }
      setUserLocation(null);
    }

    setRouteInfo(null);
  };

  // Centrar mapa en ubicación
  const focusLocation = (location: MapLocation): void => {
    if (map) {
      (map as any).flyTo([location.lat, location.lng], 15, {
        duration: 1.5,
      });
    }
  };

  const value: MapContextType = {
    map,
    setMap,
    L,
    setL,
    userLocation,
    setUserLocation,
    routingControl,
    setRoutingControl,
    routeInfo,
    setRouteInfo,
    formatDistance,
    formatTime,
    createRouteToLocation: createRouteToLocation as any, // Type assertion necesaria por incompatibilidad Map vs Location
    clearRoute,
    clearAll,
    focusLocation,
  };

  return (
    <useMapContext.Provider value={value}>{children}</useMapContext.Provider>
  );
};
