import type { Vehicle } from "../types/vehicle.types";

export default async function fetchVehicles(): Promise<Vehicle[]> {
    return [
        {
            type: "Camioneta Combinada",
            category: "ejecutivo",
            capacity: 4,
            features: [
                "Ideal para transporte ejecutivo",
                "Comodidad premium",
                "Aire acondicionado"
            ],
            image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&auto=format&fit=crop"
        },
        {
            type: "Camioneta DC",
            category: "ejecutivo",
            capacity: 4,
            features: [
                "Doble cabina",
                "Espacio de carga adicional",
                "Versatilidad garantizada"
            ],
            image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop"
        },
        {
            type: "Campera",
            category: "ejecutivo",
            capacity: 4,
            features: [
                "Confort y estilo",
                "Perfecto para grupos pequeños",
                "Equipamiento completo"
            ],
            image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop"
        },
        {
            type: "Van",
            category: "mediano",
            capacity: 9,
            features: [
                "5 a 9 pasajeros",
                "Ideal para grupos familiares",
                "Espacio para equipaje",
                "Aire acondicionado"
            ],
            image: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&auto=format&fit=crop"
        },
        {
            type: "Microbus",
            category: "mediano",
            capacity: 19,
            features: [
                "10 a 19 pasajeros",
                "Perfecto para eventos corporativos",
                "Asientos reclinables",
                "Sistema de audio"
            ],
            image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop"
        },
        {
            type: "Buseta",
            category: "grande",
            capacity: 30,
            features: [
                "20 a 30 pasajeros",
                "Ideal para rutas escolares",
                "Seguridad certificada",
                "Monitoreo GPS"
            ],
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop"
        },
        {
            type: "Bus",
            category: "grande",
            capacity: 38,
            features: [
                "31 a 38 pasajeros",
                "Transporte masivo",
                "Baño a bordo (opcional)",
                "Aire acondicionado central",
                "Pantallas de entretenimiento"
            ],
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop"
        }
    ];
}