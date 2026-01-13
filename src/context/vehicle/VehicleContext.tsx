import { useContext } from "react";
import { VehicleContext } from "../../hooks/useVehicleContext";

export function useVehicleContext() {
    const ctx = useContext(VehicleContext);

    if (!ctx) throw new Error("Use inside provider");
    
    return ctx;
}