import type { Vehicle } from "../types/vehicle.types";

export default async function fetchVehicles(): Promise<Vehicle[]> {
    return [
        { type: "bus", category: "transporte empresarial", features: ["Aire acondicionado", "Asientos reclinables", "Wi-Fi"], capacity: 25, image: null },
        { type: "van", category: "transporte ejecutivo", features: ["GPS", "Cámaras de seguridad", "Aire acondicionado"], capacity: 12, image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&auto=format&q=80" },
        { type: "microbus", category: "transporte escolar", features: null, capacity: 16, image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&q=80" },
        { type: "bus turismo", category: "transporte turismo", features: ["Baño a bordo", "Pantallas", "Sistema de sonido"], capacity: 25, image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&auto=format&q=80" },
        { type: "sprinter", category: "logistica de eventos", capacity: 0, features: null, image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=600&auto=format&q=80" },
        { type: "bus premium", category: "transporte corporativo", features: ["Asientos VIP", "Iluminación LED", "Cargadores USB"], capacity: 35, image: "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?w=600&auto=format&q=80" },
    ];
}