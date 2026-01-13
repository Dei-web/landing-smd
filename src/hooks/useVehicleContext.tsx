import { createContext } from "react";
import type { useVehicle } from "./useVehicle";

export const VehicleContext = createContext<ReturnType<
  typeof useVehicle
> | null>(null);