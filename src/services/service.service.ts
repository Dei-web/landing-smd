import { Briefcase, Bus, HeartPulse, Truck, Users } from "lucide-react";

import type { Service } from "../types/service.types";
export default async function fetchService(): Promise<Service[]> {
    const services = [
        {
            icon: Bus,
            title: "Logística de Eventos",
            description: "Planificación completa para eventos empresariales, académicos y deportivos con innovación.",
            features: ["Coordinación integral", "Flota especializada", "Personal experto"],
            image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop",
        },
        {
            icon: Briefcase,
            title: "Transporte Empresarial",
            description: "Aliado estratégico para movilizar tu equipo humano con puntualidad y seguridad.",
            features: ["Rutas personalizadas", "Conductores certificados", "GPS en tiempo real"],
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop",
        },
        {
            icon: Users,
            title: "Transporte Escolar",
            description: "Servicio seguro y confiable para estudiantes, directivos y padres de familia.",
            features: ["Personal capacitado", "Flota moderna", "Seguridad certificada"],
            image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&auto=format&fit=crop",
        },
        {
            icon: HeartPulse,
            title: "Atención Médica Integral",
            description: "Servicios de salud diseñados para brindar atención oportuna, segura y humanizada.",
            features: ["Personal médico certificado", "Protocolos de bioseguridad", "Atención personalizada"],
            image: "https://images.unsplash.com/photo-1580281657527-47f249e8f6b8?w=800&auto=format&fit=crop",
        },
        {
            icon: Truck,
            title: "Transporte Ejecutivo",
            description: "Servicio premium adaptado a la dinámica de tu negocio con máxima puntualidad.",
            features: ["Servicio VIP", "Discreción total", "Personal calificado"],
            image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop",
        },
        {
            icon: Bus,
            title: "Transporte Turismo",
            description: "Experiencia única con parque automotor moderno y aliados hoteleros nacionales.",
            features: ["Alianzas hoteleras", "Guías expertos", "Experiencias únicas"],
            image: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&auto=format&fit=crop",
        },
    ];
    
    return services;
}