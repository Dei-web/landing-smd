import { useEffect, useState } from "react";
import { LocationProvider } from "../context/location/LocationProvider";
import { MapProvider } from "../context/map/MapProvider";
import { ServiceProvider } from "../context/service/ServiceProvider";
import { VehicleProvider } from "../context/vehicle/VehicleProvider";
import type { Props } from "../types/reactTypes.types";
import fetchLocations from "../services/map.service";
import type { MapLocation } from "../types/map.types";
import { LoadingStyles, PageLoading } from "../components/loading";
import { ToastProvider } from "../context/toast/ToastContext";

export default function Providers({ children }: Props) {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations()
      .then((data) => {
        setLocations(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <LoadingStyles />
        <PageLoading message="Cargando ubicaciones..." />
      </>
    );
  }

  return (
    <VehicleProvider>
      <ServiceProvider>
        <MapProvider>
          <ToastProvider>
            <LocationProvider locations={locations}>
              {children}
            </LocationProvider>
          </ToastProvider>
        </MapProvider>
      </ServiceProvider>
    </VehicleProvider>
  );
}
