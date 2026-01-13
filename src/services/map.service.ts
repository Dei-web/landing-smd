import logoPage from "../assets/logo.png";
import type { MapLocation } from "../types/map.types";

export default async function fetchLocations(): Promise<MapLocation[]> {
    return Promise.resolve([
        {
            id: 1,
            name: "SMD | Logistica y Transporte",
            lat: 10.981807306670976,
            lng: -74.7871691401238,
            address: "Cra. 41 #86 No 45, Nte. Centro Historico, BARRANQUILLA- COLOMBIA, Barranquilla, Atlántico",
            description: "Servicio de transporte, logistica y más.",
            schedule: "Lun-Vie: 7am - 9pm",
            logo: logoPage,
            workDays: [1, 2, 3, 4, 5],
            startHour: 7,
            endHour: 21,
            googleMapsUrl: "",
        },
    ]);
}