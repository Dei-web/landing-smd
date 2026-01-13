import { useVehicle } from "../../hooks/useVehicle";
import { VehicleContext } from "../../hooks/useVehicleContext";
import type { Props } from "../../types/reactTypes.types";

export function VehicleProvider({ children }: Props) {
    const vehicles = useVehicle();

    return (
        <VehicleContext.Provider value={ vehicles }>
            { children }
        </VehicleContext.Provider>
    );
}