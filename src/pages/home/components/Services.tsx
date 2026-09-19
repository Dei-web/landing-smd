import { useState, useEffect, useRef, useMemo } from "react";
import { useServiceContext } from "../../../context/service/ServiceContext";
import type { Service } from "../../../types/service.types";

const getServiceData = (service: Service) => ({
  icon: service.icon,
  title: service.title,
  description: service.description,
  features: service.features,
  image: service.image,
});

interface ServicesGalleryProps {
  services?: Service[];
}

export default function ServicesGallery({
  services: servicesProp,
}: ServicesGalleryProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const collageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // SIEMPRE llamar el hook (nunca condicionalmente)
  const contextData = useServiceContext();

  // Decidir qué servicios usar DESPUÉS de llamar el hook
  const services = useMemo(
    () => servicesProp || contextData?.service || [],
    [servicesProp, contextData?.service]
  );

  const currentService = useMemo(
    () => (services.length > 0 ? getServiceData(services[currentIndex]) : null),
    [services, currentIndex]
  );

  const collageImages = useMemo(() => {
    if (services.length === 0) return [];

    const extendedServices = [...services, ...services, ...services];
    return extendedServices.map((service, idx) => {
      const serviceData = getServiceData(service);
      const row = Math.floor(idx / 4);
      const col = idx % 4;

      return {
        ...serviceData,
        id: `${service.title}-${idx}`,
        top: `${row * 25 - 10}%`,
        left: `${col * 25 + (row % 2 === 0 ? 5 : -5)}%`,
        rotation: ((idx % 3) - 1) * 8,
        scale: 0.85 + (idx % 3) * 0.1,
        delay: idx * 0.15,
      };
    });
  }, [services]);

  // Efecto del typewriter optimizado
  useEffect(() => {
    if (!currentService) return;

    const fullText = currentService.description;
    let currentChar = 0;

    setDisplayedText("");
    setIsTyping(true);

    const typeWriter = () => {
      if (currentChar < fullText.length) {
        setDisplayedText(fullText.slice(0, currentChar + 1));
        currentChar++;
        typingTimeoutRef.current = setTimeout(typeWriter, 50);
      } else {
        setIsTyping(false);
      }
    };

    typeWriter();

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [currentService]);

  // Auto-rotación
  useEffect(() => {
    if (services.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [services.length]);

  const handleNavigate = (direction: "prev" | "next") => {
    setCurrentIndex((prev) => {
      if (direction === "next") {
        return (prev + 1) % services.length;
      } else {
        return prev === 0 ? services.length - 1 : prev - 1;
      }
    });
  };

  // Mostrar loader mientras carga (solo si no hay servicesProp)
  if (!servicesProp && contextData?.loading) {
    return (
      <section className="relative py-20 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center">
        <div className="text-white text-2xl">Cargando servicios...</div>
      </section>
    );
  }

  if (
    !services ||
    !Array.isArray(services) ||
    services.length === 0 ||
    !currentService
  ) {
    console.error("Services debe ser un array con al menos un elemento");
    return null;
  }

  return (
    <section
      id="servicios"
      className="relative py-20 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 overflow-x-hidden"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:wght@700;900&family=Space+Mono:wght@400;700&display=swap');

        @keyframes float-collage {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-30px) translateX(15px);
          }
          66% {
            transform: translateY(-15px) translateX(-15px);
          }
        }

        @keyframes scroll-collage {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes fade-in-scale {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(0deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(var(--rotation));
          }
        }

        @keyframes cursor-blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-title {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .collage-container {
          animation: scroll-collage 60s linear infinite;
          will-change: transform;
        }

        .collage-container:hover {
          animation-play-state: paused;
        }

        .collage-image {
          opacity: 0;
          animation: fade-in-scale 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: var(--delay);
          will-change: opacity, transform;
        }

        .collage-image:hover {
          z-index: 10 !important;
          transform: scale(1.15) rotate(0deg) !important;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .typewriter-cursor {
          display: inline-block;
          width: 3px;
          height: 1.2em;
          background-color: #3b82f6;
          margin-left: 4px;
          animation: cursor-blink 1s step-end infinite;
          vertical-align: text-bottom;
        }

        .service-title {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.08em;
          animation: fade-in-title 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-description {
          font-family: 'Space Mono', monospace;
        }

        .nav-dot {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-dot:hover {
          transform: scale(1.3);
        }

        .nav-arrow {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-arrow:hover {
          transform: scale(1.1);
          background: rgba(59, 130, 246, 0.3);
        }

        .gradient-overlay {
          background: linear-gradient(
            135deg,
            rgba(15, 23, 42, 0.98) 0%,
            rgba(15, 23, 42, 0.95) 30%,
            rgba(30, 41, 59, 0.9) 60%,
            rgba(15, 23, 42, 0.95) 100%
          );
        }

        /* Gradientes de transición suave con la página */
        .gradient-top {
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.95) 10%,
            rgba(248, 250, 252, 0.8) 20%,
            rgba(241, 245, 249, 0.6) 35%,
            rgba(226, 232, 240, 0.4) 50%,
            rgba(203, 213, 225, 0.2) 70%,
            rgba(148, 163, 184, 0.05) 90%,
            transparent 100%
          );
        }

        .gradient-bottom {
          background: linear-gradient(
            to top,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.95) 10%,
            rgba(248, 250, 252, 0.8) 20%,
            rgba(241, 245, 249, 0.6) 35%,
            rgba(226, 232, 240, 0.4) 50%,
            rgba(203, 213, 225, 0.2) 70%,
            rgba(148, 163, 184, 0.05) 90%,
            transparent 100%
          );
        }

        /* Transición fluida de altura - ALTURA FIJA para evitar salto de página */
        .content-container {
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: visible;
        }

        .description-box {
          /* Reserva altura fija: descripción (3 líneas) + features siempre en layout */
          min-height: 380px;
        }

        @media (min-width: 768px) {
          .description-box {
            min-height: 340px;
          }
        }

        .service-title-fixed {
          /* Reserva 2 líneas para títulos largos como "Transporte Médico y de Salud" */
          min-height: 84px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 640px) {
          .service-title-fixed {
            min-height: 96px;
          }
        }

        @media (min-width: 768px) {
          .service-title-fixed {
            min-height: 180px;
          }
        }

        .service-description-fixed {
          /* Reserva ~3 líneas de descripción durante el typewriter */
          min-height: 84px;
        }

        @media (min-width: 768px) {
          .service-description-fixed {
            min-height: 90px;
          }
        }

        .features-container {
          /* Altura siempre reservada: solo cambia opacidad/visibilidad, no layout */
          max-height: 500px;
          margin-top: 2rem;
          overflow: hidden;
          transition: opacity 0.4s ease-in-out, visibility 0.4s;
        }
      `}</style>

      {/* Collage de fondo animado */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={collageRef}
          className="collage-container absolute w-[300%] h-full"
        >
          {collageImages.map((image, idx) => (
            <div
              key={image.id}
              className="collage-image absolute w-[280px] h-[200px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10"
              style={
                {
                  top: image.top,
                  left: image.left,
                  transform: `scale(${image.scale}) rotate(${image.rotation}deg)`,
                  zIndex: idx % 5,
                  "--rotation": `${image.rotation}deg`,
                  "--delay": `${image.delay}s`,
                } as React.CSSProperties
              }
            >
              <img
                src={image.image}
                alt={image.title}
                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-500"
                loading="lazy"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white text-sm font-bold tracking-wide drop-shadow-lg">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Overlay oscuro para mejorar legibilidad */}
        <div className="gradient-overlay absolute inset-0" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex items-start sm:items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-0">
        <div className="max-w-5xl w-full">
          {/* Título con efecto de escritura */}
          <div className="text-center mb-6 md:mb-12">
            <div className="mb-4 md:mb-8">
              <span className="inline-block bg-blue-500/20 backdrop-blur-sm text-blue-300 px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase border border-blue-400/30 shadow-lg">
                Servicio Destacado
              </span>
            </div>

            <h1
              key={currentService.title}
              className="service-title service-title-fixed text-3xl sm:text-6xl md:text-9xl font-black text-white mb-4 md:mb-8 leading-tight break-words"
            >
              {currentService.title}
            </h1>

            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-3 rounded-full border border-white/20 mb-6 md:mb-12">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white text-xs sm:text-sm font-bold tracking-wide uppercase">
                Servicio Premium
              </span>
            </div>

            {/* Descripción con efecto typewriter y transición fluida */}
            <div
              ref={contentRef}
              className="content-container max-w-3xl mx-auto rounded-3xl shadow-2xl"
            >
              <div className="description-box bg-slate-900/95 md:bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-12">
                <p className="service-description service-description-fixed text-white text-base md:text-xl leading-relaxed text-left">
                  {displayedText}
                  {isTyping && <span className="typewriter-cursor" />}
                </p>

                {/* Features con altura fija reservada (solo fade, sin colapso) */}
                <div
                  className="features-container"
                  style={{
                    opacity: isTyping ? 0 : 1,
                    visibility: isTyping ? "hidden" : "visible",
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentService.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-blue-500/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-blue-400/20"
                        style={{
                          animation: `slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                          animationDelay: `${idx * 0.1}s`,
                          opacity: 0,
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="text-blue-100 text-sm font-semibold">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navegación */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-16">
            {/* Flecha izquierda */}
            <button
              onClick={() => handleNavigate("prev")}
              className="nav-arrow w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-blue-300 shadow-lg"
              aria-label="Anterior"
            >
              <svg
                width="20"
                height="20"
                className="sm:w-6 sm:h-6"
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
            <div className="flex gap-2 sm:gap-3">
              {services.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`nav-dot h-2.5 sm:h-3 rounded-full transition-all ${
                    idx === currentIndex
                      ? "w-8 sm:w-12 bg-blue-500 shadow-lg shadow-blue-500/50"
                      : "w-2.5 sm:w-3 bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Ir al servicio ${idx + 1}`}
                />
              ))}
            </div>

            {/* Flecha derecha */}
            <button
              onClick={() => handleNavigate("next")}
              className="nav-arrow w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-blue-300 shadow-lg"
              aria-label="Siguiente"
            >
              <svg
                width="20"
                height="20"
                className="sm:w-6 sm:h-6"
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

          {/* Contador */}
          <div className="text-center mt-4 sm:mt-8">
            <span className="text-white/70 text-xs sm:text-sm font-mono tracking-wider">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(services.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Efecto de viñeta en los bordes */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-slate-950/60" />

      {/* Gradiente superior para transición suave con la página blanca */}
      <div className="gradient-top absolute top-0 left-0 right-0 h-32 pointer-events-none z-20" />

      {/* Gradiente inferior para transición suave con la página blanca */}
      <div className="gradient-bottom absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20" />
    </section>
  );
}
