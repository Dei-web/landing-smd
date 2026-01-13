import type { Props } from "../../types/reactTypes.types";
import { useCallback, useMemo, useState } from "react";
import { useLocationContext } from "../../hooks/useLocationContext";
import type { MapLocation } from "../../types/map.types";

// ✅ CAMBIO: Aceptar locations como prop
interface LocationProviderProps extends Props {
  locations: MapLocation[];
}

export const LocationProvider = ({
  children,
  locations,
}: LocationProviderProps) => {
  const [selected, setSelected] = useState<MapLocation | null>(null);

  // Función para verificar si una ubicación está abierta
  const isLocationOpen = useCallback((location: MapLocation) => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();

    if (location.workDays.includes(day)) {
      return hours >= location.startHour && hours < location.endHour;
    }
    return false;
  }, []);

  const getStatusText = useCallback(
    (location: MapLocation) => {
      return isLocationOpen(location) ? "Abierto ahora" : "Cerrado";
    },
    [isLocationOpen]
  );

  // Encontrar la ubicación más cercana
  const findNearestLocation = useCallback(
    (lat: number, lng: number) => {
      if (!locations || locations.length === 0) {
        return null;
      }

      if (
        typeof lat !== "number" ||
        typeof lng !== "number" ||
        isNaN(lat) ||
        isNaN(lng)
      ) {
        return null;
      }

      let nearestLocation = locations[0];
      let minDistance = Infinity;

      locations.forEach((loc) => {
        const R = 6371e3;
        const φ1 = (lat * Math.PI) / 180;
        const φ2 = (loc.lat * Math.PI) / 180;
        const Δφ = ((loc.lat - lat) * Math.PI) / 180;
        const Δλ = ((loc.lng - lng) * Math.PI) / 180;

        const a =
          Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        if (distance < minDistance) {
          minDistance = distance;
          nearestLocation = loc;
        }
      });

      return nearestLocation;
    },
    [locations] // ✅ Dependencia de locations
  );

  const getMapCenter = useCallback((): [number, number] => {
    if (!locations || locations.length === 0) {
      return [10.99252, -74.78332];
    }

    const avgLat =
      locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
    const avgLng =
      locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;

    return [avgLat, avgLng];
  }, [locations]);

  const calculateRealDistance = useCallback(
    (lat1: number, lng1: number, lat2: number, lng2: number) => {
      const R = 6371e3;
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lng2 - lng1) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
    },
    []
  );

  const value = useMemo(
    () => ({
      locations, // ✅ Ahora locations viene de props
      selected,
      setSelected,
      isLocationOpen,
      getStatusText,
      findNearestLocation,
      getMapCenter,
      calculateRealDistance,
    }),
    [
      locations,
      selected,
      isLocationOpen,
      getStatusText,
      findNearestLocation,
      getMapCenter,
      calculateRealDistance,
    ]
  );

  return (
    <useLocationContext.Provider value={value}>
      {children}
    </useLocationContext.Provider>
  );
};
