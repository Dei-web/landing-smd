import { useState, useEffect, useRef, type ReactElement } from "react";
import {
  Wrench,
  Cpu,
  AlertCircle,
  Zap,
  Repeat,
  Activity,
  Settings,
} from "lucide-react";
import "../../../../public/styles/pages/workshop/components/Services.css";

interface Service {
  title: string;
  description: string;
  icon: ReactElement;
  image: string;
}

const servicesData: Service[] = [
  {
    title: "Mantenimiento General",
    description:
      "Revisiones y mantenimiento preventivo para asegurar el correcto funcionamiento del vehículo.",
    icon: <Wrench size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Diagnóstico Computarizado",
    description:
      "Uso de escáneres avanzados para identificar fallos electrónicos en el vehículo.",
    icon: <Cpu size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Reparación de Frenos",
    description:
      "Servicio especializado en sistemas de freno para mayor seguridad en cada frenada.",
    icon: <AlertCircle size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Electricidad Automotriz",
    description:
      "Mantenimiento y reparación de sistemas eléctricos y electrónicos del vehículo.",
    icon: <Zap size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Alineación y Balanceo",
    description:
      "Alineamos y balanceamos las ruedas para un manejo más estable y seguro.",
    icon: <Repeat size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cambio de Llantas",
    description:
      "Servicio rápido y profesional para cambiar tus neumáticos cuando sea necesario.",
    icon: <Activity size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Reparación de Motor",
    description:
      "Diagnóstico profundo y reparación del motor para restaurar potencia y eficiencia.",
    icon: <Settings size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80",
  },
];

const Services = () => {
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [cardWidth, setCardWidth] = useState(
    typeof window !== 'undefined' && window.innerWidth < 640 ? 296 : 350
  );
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setCardWidth(window.innerWidth < 640 ? 296 : 350);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const CARD_WIDTH = cardWidth;
  const TOTAL_WIDTH = servicesData.length * CARD_WIDTH;

  // Calcular currentIndex directamente sin estado
  const currentIndex =
    Math.round(Math.abs(offset) / CARD_WIDTH) % servicesData.length;

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && !isDragging) {
        setOffset((prev) => {
          const newOffset = prev - 0.5;
          if (Math.abs(newOffset) >= TOTAL_WIDTH) {
            return 0;
          }
          return newOffset;
        });
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, TOTAL_WIDTH]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(offset);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(offset);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    setOffset(scrollLeft + walk);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    setOffset(scrollLeft + walk);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    setIsPaused(true);
    const scrollAmount = direction === "prev" ? CARD_WIDTH : -CARD_WIDTH;
    setOffset((prev) => {
      const newOffset = prev + scrollAmount;
      if (newOffset > 0) {
        return -TOTAL_WIDTH + scrollAmount;
      }
      if (Math.abs(newOffset) >= TOTAL_WIDTH) {
        return scrollAmount;
      }
      return newOffset;
    });
    setTimeout(() => setIsPaused(false), 2000);
  };

  const goToSlide = (index: number) => {
    setIsPaused(true);
    setOffset(-index * CARD_WIDTH);
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <>
      <section
        className="max-w-full pt-28 mb-40 flex justify-center items-center"
        id="serviciosTaller"
      >
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-gray-600 text-lg mt-4">
              Soluciones integrales para mantener tu vehículo en perfecto estado
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Arrastra para navegar o usa las flechas
            </p>
          </div>

          <div className="relative overflow-hidden pb-14 pt-4 px-2 sm:px-0">
            <div
              className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 md:w-48 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(to right, white, transparent)",
              }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 md:w-48 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(to left, white, transparent)",
              }}
            />

            <div
              ref={carouselRef}
              className="relative flex gap-4 sm:gap-8 transition-transform duration-100"
              style={{
                transform: `translateX(${offset}px)`,
                width: "fit-content",
                cursor: isDragging ? "grabbing" : "grab",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {[...servicesData, ...servicesData, ...servicesData].map(
                (service, index) => (
                  <div
                    key={index}
                    className="service-card flex-shrink-0 w-[280px] sm:w-80"
                    onMouseEnter={() => !isDragging && setIsPaused(true)}
                    onMouseLeave={() => !isDragging && setIsPaused(false)}
                  >
                    <div className="service-card-content">
                      <div className="service-icon">{service.icon}</div>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>

                    <style>{`
                    .service-card:nth-child(${index + 1})::before {
                      background-image: linear-gradient(
                          rgba(0, 0, 0, 0.5),
                          rgba(0, 0, 0, 0.5)
                        ),
                        url('${service.image}');
                    }
                  `}</style>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Navegación mejorada */}
          <div className="flex items-center justify-center gap-8 mt-16">
            {/* Flecha izquierda */}
            <button
              onClick={() => handleNavigate("prev")}
              className="nav-arrow w-12 h-12 md:w-14 md:h-14 rounded-full bg-white backdrop-blur-md border-2 border-gray-200 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:border-blue-600 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Anterior"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Indicadores */}
            <div className="flex gap-3">
              {servicesData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`nav-dot h-3 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-12 bg-blue-600 shadow-lg shadow-blue-600/50"
                      : "w-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Ir al servicio ${idx + 1}`}
                />
              ))}
            </div>

            {/* Flecha derecha */}
            <button
              onClick={() => handleNavigate("next")}
              className="nav-arrow w-12 h-12 md:w-14 md:h-14 rounded-full bg-white backdrop-blur-md border-2 border-gray-200 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:border-blue-600 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Siguiente"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
