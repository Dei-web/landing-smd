import { useEffect, useState } from "react";
import type { Vehicle } from "../types/vehicle.types";
import fetchVehicles from "../services/vehicle.service";

export const useVehicle = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    fetchVehicles().then(setVehicles);
  }, []);

  return {
    vehicles,
  };
};
