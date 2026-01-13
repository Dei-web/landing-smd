import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import {
  Check,
  ArrowRight,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useVehicleContext } from "../../../context/vehicle/VehicleContext";
import type { Vehicle } from "../../../types/vehicle.types";
import { capitalize } from "../../../utils/words";

interface VehiclesCarouselProps {
  vehicles?: Vehicle[];
}

export default function VehiclesCarouselOptimized({
  vehicles: vehiclesProp,
}: VehiclesCarouselProps = {}) {
  const contextData = useVehicleContext();
  const vehicles = vehiclesProp || contextData?.vehicles || [];

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fixedTooltip, setFixedTooltip] = useState<Vehicle | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredVehicle, setHoveredVehicle] = useState<Vehicle | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Dimensiones memorizadas
  const { cardWidth, cardHeight, gap } = useMemo(
    () => ({
      cardWidth: isMobile ? 240 : 320,
      cardHeight: isMobile ? 280 : 320,
      gap: isMobile ? 16 : 24,
    }),
    [isMobile]
  );

  // Detectar mobile solo una vez al montar y en resize (throttled)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Efecto para medir el contenedor
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateContainerWidth();

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateContainerWidth, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Vehículos infinitos memorizados
  const infiniteVehicles = useMemo(() => {
    const copies = [];
    for (let i = 0; i < 4; i++) {
      // Reducido de 6 a 4
      copies.push(...vehicles);
    }
    return copies;
  }, [vehicles]);

  const singleSetWidth = useMemo(
    () => vehicles.length * (cardWidth + gap),
    [vehicles.length, cardWidth, gap]
  );

  // Inicializar posición
  useEffect(() => {
    if (scrollPosition === 0 && singleSetWidth > 0) {
      setScrollPosition(singleSetWidth * 2);
    }
  }, [singleSetWidth]);

  // Animación optimizada con throttling
  useEffect(() => {
    if (!isPlaying || vehicles.length === 0) return;

    let lastTime = performance.now();
    const speed = 0.5;
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      // Throttle a 60fps
      if (deltaTime < frameTime) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      lastTime = currentTime - (deltaTime % frameTime);

      setScrollPosition((prev) => {
        const newPosition = prev + speed * (deltaTime / 16);

        if (newPosition >= singleSetWidth * 3) {
          return singleSetWidth * 2;
        }

        return newPosition;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, vehicles.length, singleSetWidth]);

  // Handlers optimizados
  const handlePrevious = useCallback(() => {
    setIsPlaying(false);
    setScrollPosition((prev) => {
      let newPos = prev - (cardWidth + gap);
      if (newPos < singleSetWidth) {
        newPos = singleSetWidth * 3 - (cardWidth + gap);
      }
      return newPos;
    });
    setTimeout(() => setIsPlaying(true), 3000);
  }, [cardWidth, gap, singleSetWidth]);

  const handleNext = useCallback(() => {
    setIsPlaying(false);
    setScrollPosition((prev) => {
      let newPos = prev + (cardWidth + gap);
      if (newPos >= singleSetWidth * 3) {
        newPos = singleSetWidth * 2 + (cardWidth + gap);
      }
      return newPos;
    });
    setTimeout(() => setIsPlaying(true), 3000);
  }, [cardWidth, gap, singleSetWidth]);

  // Cálculo de estilos simplificado (sin opacity dinámica para mejor performance)
  const getCardStyle = useCallback(
    (index: number) => {
      if (containerWidth === 0) return { zIndex: 1 };

      const cardPosition = index * (cardWidth + gap);
      const viewportCenter = scrollPosition + containerWidth / 2;
      const cardCenter = cardPosition + cardWidth / 2;
      const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
      const maxDistance = containerWidth / 2 + cardWidth;
      const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

      return {
        zIndex: Math.max(1, Math.floor(50 - normalizedDistance * 49)),
      };
    },
    [scrollPosition, cardWidth, gap, containerWidth]
  );

  const handleCardClick = useCallback(
    (vehicle: Vehicle) => {
      if (isMobile) {
        setIsPlaying(false);
        setFixedTooltip(vehicle);
      }
    },
    [isMobile]
  );

  // Rastreo global del mouse para tooltip preciso
  useEffect(() => {
    if (!isMobile && hoveredVehicle) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener("mousemove", handleGlobalMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleGlobalMouseMove);
      };
    }
  }, [isMobile, hoveredVehicle]);

  const handleCardMouseEnter = useCallback(
    (vehicle: Vehicle) => {
      if (!isMobile) {
        setHoveredVehicle(vehicle);
      }
    },
    [isMobile]
  );

  const handleCardMouseLeave = useCallback(() => {
    if (!isMobile) {
      setHoveredVehicle(null);
    }
  }, [isMobile]);

  const closeFixedTooltip = useCallback(() => {
    setFixedTooltip(null);
    setIsPlaying(true);
  }, []);

  // Prevenir scroll cuando el modal móvil está abierto
  useEffect(() => {
    if (fixedTooltip && isMobile) {
      // Guardar el scroll actual
      const scrollY = window.scrollY;

      // Prevenir scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        // Restaurar scroll cuando se cierre el modal
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [fixedTooltip, isMobile]);

  if (!vehicles || !Array.isArray(vehicles) || vehicles.length === 0) {
    return null;
  }

  return (
    <section id="galeria" className="relative w-full py-24 md:py-32 bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@600;700&display=swap');

        @keyframes pulse-bubble {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .vehicle-card {
          transition: box-shadow 0.3s ease-out;
          will-change: auto;
        }

        .vehicle-card:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .vehicle-card-image {
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }

        .vehicle-card:hover .vehicle-card-image,
        .vehicle-card.active .vehicle-card-image {
          opacity: 1;
        }

        .vehicle-icon-bg {
          transition: opacity 0.3s ease-in-out;
        }

        .vehicle-card:hover .vehicle-icon-bg,
        .vehicle-card.active .vehicle-icon-bg {
          opacity: 0;
        }

        .carousel-track {
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="mb-4 md:mb-6 flex justify-center">
            <span className="section-badge bg-blue-50 text-blue-700 px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase shadow-lg border border-blue-200">
              Nuestra Flota
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            Vehículos Modernos
            <br />
            <span className="text-blue-500">para Cada Necesidad</span>
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            Flota diversa y meticulosamente mantenida, diseñada para ofrecer
            seguridad, confort y profesionalismo en cada viaje
          </p>
        </div>

        {/* Carousel Section */}
        <div className="flex flex-col items-center gap-8 mb-8">
          {/* Carousel with Navigation */}
          <div className="relative w-full">
            <div
              ref={containerRef}
              className={`overflow-hidden ${isMobile ? "h-80" : "h-96"}`}
            >
              {/* Gradient Left */}
              <div className="absolute left-0 top-0 bottom-0 w-48 sm:20 bg-gradient-to-r from-white via-white/20 to-transparent z-10 pointer-events-none" />

              {/* Gradient Right */}
              <div className="absolute right-0 top-0 bottom-0 w-48 sm:20 bg-gradient-to-l from-white via-white/20 to-transparent z-10 pointer-events-none" />

              {/* Navigation Buttons */}
              <button
                onClick={handlePrevious}
                className="absolute left-[10%] top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 border border-slate-200 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Anterior"
              >
                <ChevronLeft
                  className="w-5 h-5 md:w-6 md:h-6"
                  strokeWidth={2.5}
                />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-[10%] top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 border border-slate-200 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Siguiente"
              >
                <ChevronRight
                  className="w-5 h-5 md:w-6 md:h-6"
                  strokeWidth={2.5}
                />
              </button>

              <div className="flex items-center h-full pb-10">
                <div
                  className="carousel-track flex gap-6 items-center"
                  style={{
                    transform: `translate3d(-${scrollPosition}px, 0, 0)`,
                  }}
                >
                  {infiniteVehicles.map((vehicle, index) => {
                    const cardStyle = getCardStyle(index);

                    return (
                      <div
                        key={`${vehicle.type}-${index}`}
                        className="vehicle-card rounded-full flex-shrink-0"
                        style={{
                          width: `${cardWidth}px`,
                          height: `${cardHeight}px`,
                          ...cardStyle,
                        }}
                        onClick={() => handleCardClick(vehicle)}
                        onMouseEnter={() => handleCardMouseEnter(vehicle)}
                        onMouseLeave={handleCardMouseLeave}
                      >
                        <div className="h-full rounded-2xl overflow-hidden hover:shadow-lg relative group cursor-pointer bg-white/80 backdrop-blur-sm hover:border border-slate-200/50">
                          {/* Vehicle Icon Background */}
                          <div className="vehicle-icon-bg absolute inset-0 bg-white flex items-center justify-center">
                            <div
                              className="relative w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-blue-500 flex items-center justify-center overflow-hidden transition-shadow duration-300 mb-11 group-hover:shadow-2xl"
                              style={{
                                animation:
                                  "pulse-bubble 3s ease-in-out infinite",
                                boxShadow:
                                  "0 10px 40px rgba(59, 130, 246, 0.3)",
                              }}
                            >
                              <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                  backgroundImage: `url(${
                                    vehicle.image ||
                                    "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop"
                                  })`,
                                  filter: "blur(1px)",
                                }}
                              />
                              <div className="absolute inset-0 bg-white/20" />
                            </div>
                          </div>

                          {/* Background Image - Only visible on hover */}
                          <div
                            className="vehicle-card-image absolute inset-0"
                            style={{
                              backgroundImage: `url(${
                                vehicle.image ||
                                "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop"
                              })`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 group-hover:bg-gradient-to-t group-hover:from-slate-900 group-hover:via-slate-900/60 to-transparent" />

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <div className="px-3 py-2 bg-blue-500 rounded-full text-white text-xs font-bold uppercase tracking-wide shadow-lg">
                              {vehicle.category}
                            </div>
                          </div>

                          {/* Vehicle Info */}
                          <div className="absolute flex justify-center items-center flex-col bottom-0 left-0 right-0 p-4 md:p-6">
                            <h3
                              className={`font-bold text-slate-900 group-hover:text-white mb-2 leading-tight transition-colors ${
                                isMobile ? "text-xl" : "text-2xl"
                              }`}
                            >
                              {capitalize(vehicle.type)}
                            </h3>
                            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-blue-50/90 group-hover:bg-white/20 backdrop-blur-md border border-blue-200/50 group-hover:border-white/30 transition-colors">
                              <Users
                                className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors"
                                strokeWidth={2.5}
                              />
                              <span className="text-sm font-bold text-slate-900 group-hover:text-white transition-colors">
                                {vehicle.capacity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Floating Tooltip - Follows Cursor */}
              {hoveredVehicle &&
                !isMobile &&
                createPortal(
                  <div
                    ref={tooltipRef}
                    className="fixed z-50 pointer-events-none transition-opacity duration-200"
                    style={{
                      left: `${mousePosition.x + 20}px`,
                      top: `${mousePosition.y - 100}px`,
                      opacity: hoveredVehicle ? 1 : 0,
                    }}
                  >
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 p-4 min-w-[280px] max-w-[320px]">
                      {/* Vehicle Info Header */}
                      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-200">
                        <div
                          className="w-12 h-12 rounded-full border-2 border-blue-500 flex-shrink-0 overflow-hidden"
                          style={{
                            backgroundImage: `url(${
                              hoveredVehicle.image ||
                              "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop"
                            })`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className="w-full h-full bg-white/20" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-slate-900 leading-tight">
                            {capitalize(hoveredVehicle.type)}
                          </h4>
                          <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                            {hoveredVehicle.category}
                          </p>
                        </div>
                      </div>

                      {/* Capacity */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Capacidad
                        </span>
                        <div className="flex items-center gap-2">
                          <Users
                            className="w-4 h-4 text-blue-600"
                            strokeWidth={2.5}
                          />
                          <span className="text-sm font-bold text-slate-900">
                            {hoveredVehicle.capacity} pasajeros
                          </span>
                        </div>
                      </div>

                      {/* Features Preview */}
                      {hoveredVehicle.features &&
                        hoveredVehicle.features.length > 0 && (
                          <div className="pt-3 border-t border-slate-100">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                              Características
                            </p>
                            <ul className="space-y-1.5">
                              {hoveredVehicle.features
                                .slice(0, 3)
                                .map((feature, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2"
                                  >
                                    <Check
                                      className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5"
                                      strokeWidth={3}
                                    />
                                    <span className="text-xs text-slate-700 leading-relaxed">
                                      {feature}
                                    </span>
                                  </li>
                                ))}
                              {hoveredVehicle.features.length > 3 && (
                                <li className="text-xs text-blue-600 font-semibold mt-2">
                                  +{hoveredVehicle.features.length - 3} más...
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                      {/* Tooltip Arrow */}
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white/95 backdrop-blur-xl border-l border-b border-slate-200 transform rotate-45" />
                    </div>
                  </div>,
                  document.body
                )}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-3">
            {vehicles.map((vehicle, index) => {
              const adjustedPosition = scrollPosition - singleSetWidth * 2;
              const currentVehicleIndex =
                Math.floor(adjustedPosition / (cardWidth + gap)) %
                vehicles.length;
              const normalizedIndex =
                currentVehicleIndex < 0
                  ? vehicles.length + currentVehicleIndex
                  : currentVehicleIndex;
              const isActive = index === normalizedIndex;

              return (
                <button
                  key={index}
                  onClick={() => {
                    setIsPlaying(false);
                    const targetPosition =
                      singleSetWidth * 2 + index * (cardWidth + gap);
                    setScrollPosition(targetPosition);
                    setTimeout(() => setIsPlaying(true), 3000);
                  }}
                  className={`group relative transition-all duration-300 ${
                    isActive ? "w-12" : "w-3"
                  }`}
                  aria-label={`Ir a ${vehicle.type}`}
                >
                  {/* Background bar */}
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-blue-600 shadow-lg shadow-blue-500/50"
                        : "bg-slate-200 hover:bg-slate-300"
                    }`}
                  />

                  {/* Tooltip on hover */}
                  {!isMobile && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
                        {capitalize(vehicle.type)}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Enhanced Navigation Hint */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 shadow-sm">
            {/* Status indicator with animation */}
            <div className="relative flex items-center justify-center">
              <div
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  isPlaying ? "bg-green-500" : "bg-orange-500"
                }`}
              />
              {isPlaying && (
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping" />
              )}
            </div>

            {/* Status text */}
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-xs font-bold text-slate-800">
                {isPlaying ? "Reproducción Automática" : "En Pausa"}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {isPlaying
                  ? "Navegando automáticamente"
                  : "Usa las flechas o los puntos para navegar"}
              </span>
            </div>

            {/* Play/Pause button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="ml-2 w-8 h-8 rounded-full bg-white border border-blue-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow"
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isPlaying ? (
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-3 bg-blue-600 rounded-full" />
                  <div className="w-0.5 h-3 bg-blue-600 rounded-full" />
                </div>
              ) : (
                <div className="w-0 h-0 border-l-[6px] border-l-blue-600 border-y-[4px] border-y-transparent ml-0.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dialog Modal */}
      {fixedTooltip &&
        isMobile &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998]"
              onClick={closeFixedTooltip}
            />

            <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[9999] max-w-sm mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div
                  className="relative h-48 overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(37, 99, 235, 0.6) 60%, transparent 100%), url(${
                      fixedTooltip.image ||
                      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <button
                    onClick={closeFixedTooltip}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-colors shadow-lg z-10"
                  >
                    <X className="w-5 h-5 text-slate-700" />
                  </button>

                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-2 bg-blue-500 rounded-full text-white text-xs font-bold uppercase tracking-wide shadow-lg">
                      {fixedTooltip.category}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                      {capitalize(fixedTooltip.type)}
                    </h3>
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                      <Users className="w-4 h-4 text-white" strokeWidth={2.5} />
                      <span className="text-sm font-bold text-white">
                        {fixedTooltip.capacity} pasajeros
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 max-h-[50vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
                      <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                        Tipo
                      </div>
                      <div className="text-sm font-bold text-blue-900">
                        {capitalize(fixedTooltip.type)}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-center">
                      <div className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-1">
                        Categoría
                      </div>
                      <div className="text-sm font-bold text-sky-900">
                        {fixedTooltip.category}
                      </div>
                    </div>
                  </div>

                  {fixedTooltip.features &&
                    fixedTooltip.features.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                          Características
                        </h4>
                        <div className="space-y-2">
                          {fixedTooltip.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100"
                            >
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                                <Check
                                  className="w-3 h-3 text-white"
                                  strokeWidth={3}
                                />
                              </div>
                              <span className="text-sm text-slate-700 leading-relaxed">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  <button className="w-full bg-blue-600 text-white py-3.5 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                    <span>Solicitar Información</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </section>
  );
}
