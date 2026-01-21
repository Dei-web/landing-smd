import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function AlliesSection() {
  const [hoveredAlly, setHoveredAlly] = useState<number | null>(null);
  const [clickedAlly, setClickedAlly] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Correcto:
  const [tooltipPositions, setTooltipPositions] = useState<
    Record<
      number,
      {
        position: "top" | "bottom" | "left" | "right";
        alignment: "start" | "center" | "end";
      }
    >
  >({});

  const tooltipRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const iconRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calcular posición óptima del tooltip
  useEffect(() => {
    const activeAlly = isMobile ? clickedAlly : hoveredAlly;

    if (
      activeAlly !== null &&
      tooltipRefs.current[activeAlly] &&
      iconRefs.current[activeAlly]
    ) {
      const tooltip = tooltipRefs.current[activeAlly];
      const icon = iconRefs.current[activeAlly];
      if (!tooltip || !icon) return;

      // Pequeño delay para asegurar que el DOM está actualizado
      setTimeout(() => {
        const tooltipRect = tooltip.getBoundingClientRect();
        const iconRect = icon.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const padding = 16; // Margen de seguridad

        let position: "top" | "bottom" | "left" | "right" = "bottom";
        let alignment: "start" | "center" | "end" = "center";

        // Calcular espacio disponible en cada dirección
        const spaceAbove = iconRect.top;
        const spaceBelow = viewportHeight - iconRect.bottom;
        const spaceLeft = iconRect.left;
        const spaceRight = viewportWidth - iconRect.right;

        const tooltipHeight = tooltipRect.height;
        const tooltipWidth = tooltipRect.width;

        // Determinar la mejor posición vertical
        if (spaceBelow >= tooltipHeight + padding) {
          position = "bottom";
        } else if (spaceAbove >= tooltipHeight + padding) {
          position = "top";
        } else if (spaceRight >= tooltipWidth + padding) {
          position = "right";
        } else if (spaceLeft >= tooltipWidth + padding) {
          position = "left";
        } else {
          // Si no cabe en ningún lado, elegir el que tenga más espacio
          const maxSpace = Math.max(
            spaceAbove,
            spaceBelow,
            spaceLeft,
            spaceRight,
          );
          if (maxSpace === spaceBelow) position = "bottom";
          else if (maxSpace === spaceAbove) position = "top";
          else if (maxSpace === spaceRight) position = "right";
          else position = "left";
        }

        // Determinar alineación horizontal (para posiciones top/bottom)
        if (position === "top" || position === "bottom") {
          const iconCenterX = iconRect.left + iconRect.width / 2;
          const tooltipHalfWidth = tooltipWidth / 2;

          if (iconCenterX - tooltipHalfWidth < padding) {
            alignment = "start"; // Alinear a la izquierda
          } else if (iconCenterX + tooltipHalfWidth > viewportWidth - padding) {
            alignment = "end"; // Alinear a la derecha
          } else {
            alignment = "center"; // Centrado
          }
        }

        // Determinar alineación vertical (para posiciones left/right)
        if (position === "left" || position === "right") {
          const iconCenterY = iconRect.top + iconRect.height / 2;
          const tooltipHalfHeight = tooltipHeight / 2;

          if (iconCenterY - tooltipHalfHeight < padding) {
            alignment = "start"; // Alinear arriba
          } else if (
            iconCenterY + tooltipHalfHeight >
            viewportHeight - padding
          ) {
            alignment = "end"; // Alinear abajo
          } else {
            alignment = "center"; // Centrado
          }
        }

        setTooltipPositions((prev) => ({
          ...prev,
          [activeAlly]: { position, alignment },
        }));
      }, 10);
    }
  }, [hoveredAlly, clickedAlly, isMobile]);

  // Cerrar tooltip al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        clickedAlly !== null &&
        !(event.target as Element).closest(".ally-container")
      ) {
        setClickedAlly(null);
      }
    };

    if (isMobile) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [clickedAlly, isMobile]);

  const handleAllyClick = (allyId: number) => {
    if (isMobile) {
      setClickedAlly(clickedAlly === allyId ? null : allyId);
    }
  };

  // Calcular estilos del tooltip basado en posición
  const getTooltipStyle = (allyId: number) => {
    const config = tooltipPositions[allyId];
    if (!config) {
      return {
        top: "120%",
        left: "50%",
        transform: "translateX(-50%)",
      };
    }

    const { position, alignment } = config;
    const style: React.CSSProperties = {};

    // Posición vertical/horizontal principal
    if (position === "bottom") {
      style.top = "calc(100% + 12px)";
    } else if (position === "top") {
      style.bottom = "calc(100% + 12px)";
    } else if (position === "right") {
      style.left = "calc(100% + 12px)";
    } else if (position === "left") {
      style.right = "calc(100% + 12px)";
    }

    // Alineación
    if (position === "top" || position === "bottom") {
      if (alignment === "center") {
        style.left = "50%";
        style.transform = "translateX(-50%)";
      } else if (alignment === "start") {
        style.left = "0";
      } else {
        style.right = "0";
      }
    } else {
      if (alignment === "center") {
        style.top = "50%";
        style.transform = "translateY(-50%)";
      } else if (alignment === "start") {
        style.top = "0";
      } else {
        style.bottom = "0";
      }
    }

    return style;
  };

  // Calcular posición de la flecha
  const getArrowStyle = (allyId: number) => {
    const config = tooltipPositions[allyId];
    if (!config) {
      return {
        top: "-8px",
        left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
      };
    }

    const { position, alignment } = config;
    const style: React.CSSProperties = {};

    // Posición de la flecha según la posición del tooltip
    if (position === "bottom") {
      style.top = "-8px";
      style.transform = "rotate(45deg)";
    } else if (position === "top") {
      style.bottom = "-8px";
      style.transform = "rotate(225deg)";
    } else if (position === "right") {
      style.left = "-8px";
      style.transform = "rotate(315deg)";
    } else if (position === "left") {
      style.right = "-8px";
      style.transform = "rotate(135deg)";
    }

    // Alineación de la flecha
    if (position === "top" || position === "bottom") {
      if (alignment === "center") {
        style.left = "50%";
        style.transform = `translateX(-50%) ${style.transform}`;
      } else if (alignment === "start") {
        style.left = "24px";
      } else {
        style.right = "24px";
      }
    } else {
      if (alignment === "center") {
        style.top = "50%";
        style.transform = `translateY(-50%) ${style.transform}`;
      } else if (alignment === "start") {
        style.top = "24px";
      } else {
        style.bottom = "24px";
      }
    }

    return style;
  };

  const allies = [
    {
      id: 1,
      title: "Respaldo Técnico Especializado",
      icon: (
        <svg
          className="w-10 h-10 md:w-12 md:h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      partners: [
        "Dr Mecánica Automotriz S.A.S.",
        "Import Part",
        "Auto Service",
      ],
      description:
        "Latonería, pintura, mecánica avanzada y servicios automotrices integrales.",
      position: { top: "20%", left: "15%" },
      mobilePosition: { top: "10%", left: "10%" },
    },
    {
      id: 2,
      title: "Aseguradoras Aliadas",
      icon: (
        <svg
          className="w-10 h-10 md:w-12 md:h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      partners: [],
      description:
        "Apoyo en procesos de reparación, gestión de reclamaciones y siniestros, facilitando la experiencia para el cliente.",
      position: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
      mobilePosition: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
    },
    {
      id: 3,
      title: "Proveedores Nacionales",
      icon: (
        <svg
          className="w-10 h-10 md:w-12 md:h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      partners: [],
      description:
        "Acceso inmediato a insumos certificados, repuestos originales y precios competitivos.",
      position: { top: "20%", right: "15%" },
      mobilePosition: { top: "10%", right: "10%" },
    },
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-28 bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden">
      {/* Background decoration - Solo el gradiente central */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-400/3 rounded-full blur-3xl" />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @media (min-width: 768px) {
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes pattern-move {
          0% {
            transform: translate(0, 0) rotate(15deg);
          }
          100% {
            transform: translate(30px, 30px) rotate(15deg);
          }
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        .float-animation:nth-child(2) {
          animation-delay: -1s;
        }

        .float-animation:nth-child(3) {
          animation-delay: -2s;
        }

        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animated-gradient {
          background: linear-gradient(-45deg, #2563eb, #3b82f6, #1d4ed8, #60a5fa);
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }

        .animated-pattern {
          animation: pattern-move 20s linear infinite;
        }

        .tilted-squares-pattern {
          background-image: 
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(255, 255, 255, 0.1) 20px,
              rgba(255, 255, 255, 0.1) 22px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 20px,
              rgba(255, 255, 255, 0.1) 20px,
              rgba(255, 255, 255, 0.1) 22px
            );
        }

        /* Animated Squares */
@keyframes float-square {
  0%, 100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) translateX(10px) rotate(5deg);
  }
  66% {
    transform: translateY(10px) translateX(-10px) rotate(-5deg);
  }
}

@keyframes float-square-delayed {
  0%, 100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
  33% {
    transform: translateY(15px) translateX(-15px) rotate(-8deg);
  }
  66% {
    transform: translateY(-15px) translateX(15px) rotate(8deg);
  }
}

@keyframes float-square-slow {
  0%, 100% {
    transform: translateY(0px) rotate(0deg) scale(1);
  }
  50% {
    transform: translateY(-25px) rotate(10deg) scale(1.1);
  }
}

@keyframes rotate-square {
  0% {
    transform: rotate(0deg) translateY(0px);
  }
  50% {
    transform: rotate(180deg) translateY(-15px);
  }
  100% {
    transform: rotate(360deg) translateY(0px);
  }
}

@keyframes rotate-square-slow {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.15);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

.animate-float-square {
  animation: float-square 8s ease-in-out infinite;
}

.animate-float-square-delayed {
  animation: float-square-delayed 10s ease-in-out infinite;
  animation-delay: -2s;
}

.animate-float-square-slow {
  animation: float-square-slow 12s ease-in-out infinite;
  animation-delay: -4s;
}

.animate-rotate-square {
  animation: rotate-square 6s linear infinite;
}

.animate-rotate-square-slow {
  animation: rotate-square-slow 15s ease-in-out infinite;
  animation-delay: -3s;
}
      `}</style>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="mb-4 md:mb-6 flex justify-center">
            <span className="section-badge bg-blue-50 text-blue-700 px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase shadow-lg border border-blue-200">
              Nuestras Alianzas
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 md:mb-6 px-4">
            Respaldo de Confianza
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
            En{" "}
            <span className="font-semibold text-blue-600">
              SMD Logística y Transporte S.A.S.
            </span>{" "}
            entendemos que la fortaleza de nuestro servicio se basa en el
            trabajo colaborativo. Por ello, hemos establecido alianzas con
            compañías líderes en el sector automotriz, lo que nos permite
            brindar un respaldo técnico completo y confiable a todos nuestros
            clientes.
          </p>
        </div>

        {/* Floating Icons Container */}
        <div className="relative min-h-[400px] md:min-h-[500px] mb-12 md:mb-16">
          {allies.map((ally, index) => (
            <div
              key={ally.id}
              className="absolute float-animation ally-container"
              style={{
                ...(isMobile ? ally.mobilePosition : ally.position),
                animationDelay: `${-index}s`,
                zIndex: (
                  isMobile ? clickedAlly === ally.id : hoveredAlly === ally.id
                )
                  ? 100
                  : 10,
              }}
              onMouseEnter={() => !isMobile && setHoveredAlly(ally.id)}
              onMouseLeave={() => !isMobile && setHoveredAlly(null)}
              onClick={() => handleAllyClick(ally.id)}
            >
              {/* Pulse rings */}
              <div className="absolute inset-0 -m-3 md:-m-4">
                <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 pulse-ring" />
                <div
                  className="absolute inset-0 rounded-full bg-blue-600 opacity-20 pulse-ring"
                  style={{ animationDelay: "1s" }}
                />
              </div>

              {/* Icon Container */}
              <div className="relative cursor-pointer group">
                <div
                  ref={(el) => {
                    iconRefs.current[ally.id] = el;
                  }}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-xl md:rounded-2xl bg-white border-2 border-blue-200 text-blue-600 shadow-xl hover:shadow-2xl flex items-center justify-center transform transition-all duration-500 ${
                    (
                      isMobile
                        ? clickedAlly === ally.id
                        : hoveredAlly === ally.id
                    )
                      ? "scale-110 rotate-6 border-blue-500 bg-blue-50"
                      : "scale-100 rotate-0"
                  }`}
                >
                  {ally.icon}
                </div>

                {/* Tooltip - Visible on hover (desktop) or click (mobile) */}
                <div
                  ref={(el) => {
                    tooltipRefs.current[ally.id] = el;
                  }}
                  className={`absolute transition-all duration-300 ${
                    (
                      isMobile
                        ? clickedAlly === ally.id
                        : hoveredAlly === ally.id
                    )
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                  style={{
                    ...getTooltipStyle(ally.id),
                    width: "max-content",
                    maxWidth: isMobile ? "280px" : "350px",
                    zIndex: 1000,
                  }}
                >
                  <div className="relative bg-white rounded-2xl shadow-2xl p-4 md:p-6 border-2 border-blue-200">
                    {/* Arrow */}
                    <div
                      className="absolute w-4 h-4 bg-white border-l-2 border-t-2 border-blue-200"
                      style={getArrowStyle(ally.id)}
                    />

                    {/* Close button - Solo móvil */}
                    {isMobile && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setClickedAlly(null);
                        }}
                        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors z-10"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}

                    {/* Content */}
                    <div className="relative">
                      <h4 className="text-base md:text-lg font-bold text-blue-600 mb-2 md:mb-3 pr-6">
                        {ally.title}
                      </h4>

                      {/* Partners list */}
                      {ally.partners.length > 0 && (
                        <div className="mb-2 md:mb-3 space-y-1.5 md:space-y-2 bg-blue-50 rounded-lg p-2 md:p-3 border border-blue-100">
                          {ally.partners.map((partner, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-1.5 md:gap-2"
                            >
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 mt-1 md:mt-1.5 flex-shrink-0" />
                              <span className="text-xs md:text-sm font-medium text-slate-700">
                                {partner}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        {ally.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Small label below icon */}
                <div className="mt-2 md:mt-3 text-center">
                  <span className="text-[10px] md:text-xs font-semibold text-blue-600 bg-white border border-blue-200 px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-md whitespace-nowrap">
                    {ally.title.split(" ")[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Connecting lines - Desktop only */}
          <svg
            className="hidden md:block absolute inset-0 w-full h-full pointer-events-none opacity-20"
            style={{ zIndex: 0 }}
          >
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <line
              x1="20%"
              y1="30%"
              x2="50%"
              y2="50%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <line
              x1="50%"
              y1="50%"
              x2="80%"
              y2="30%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>
        </div>

        {/* CTA Section with Animated Background */}
        <div className="relative rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 animated-gradient" />
          {/* Animated tilted squares pattern */}
          <div className="absolute inset-0 tilted-squares-pattern animated-pattern opacity-30" />
          {/* Floating circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-5 md:top-10 left-5 md:left-10 w-24 md:w-32 h-24 md:h-32 bg-white/10 rounded-full blur-2xl animate-pulse"
              style={{ animationDuration: "3s" }}
            />
            <div
              className="absolute bottom-5 md:bottom-10 right-5 md:right-10 w-28 md:w-40 h-28 md:h-40 bg-white/10 rounded-full blur-2xl animate-pulse"
              style={{ animationDuration: "4s", animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 left-1/3 w-20 md:w-24 h-20 md:h-24 bg-white/10 rounded-full blur-xl animate-pulse"
              style={{ animationDuration: "5s", animationDelay: "2s" }}
            />
          </div>
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-2xl md:rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
            {/* Animated Squares Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-16 h-16 md:w-32 md:h-32 border-2 border-blue-400/20 rounded-lg animate-float-square" />
              <div className="absolute top-20 right-16 w-12 h-12 md:w-24 md:h-24 border-2 border-blue-300/20 rounded-lg animate-float-square-delayed" />
              <div className="absolute bottom-16 left-20 w-14 h-14 md:w-28 md:h-28 border-2 border-blue-500/20 rounded-lg animate-float-square-slow" />
              <div className="absolute bottom-10 right-12 w-10 h-10 md:w-20 md:h-20 border-2 border-blue-400/20 rounded-lg animate-rotate-square" />
              <div className="absolute top-1/2 left-1/4 w-8 h-8 md:w-16 md:h-16 border-2 border-blue-300/30 rounded-lg animate-float-square" />
              <div className="absolute top-1/3 right-1/3 w-12 h-12 md:w-24 md:h-24 border-2 border-blue-400/20 rounded-lg animate-rotate-square-slow" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Listo para trabajar con nosotros?
              </h3>
              <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
                Únete a las empresas que confían en nuestro respaldo técnico y
                red de alianzas estratégicas.
              </p>
              <a
                href="#contacto"
                className="cta-button inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg group"
              >
                Contáctanos
                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
