import { Wrench, Cog, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, type ReactElement } from "react";

interface TooltipConfig {
  position: "top" | "bottom" | "left" | "right";
  alignment: "start" | "center" | "end";
}

interface Feature {
  id: number;
  icon: ReactElement;
  title: string;
  description: string;
  position: React.CSSProperties;
}

export default function TallerSection() {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [tooltipPositions, setTooltipPositions] = useState<Record<number, TooltipConfig>>({});

  const tooltipRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const iconRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const features: Feature[] = [
    {
      id: 0,
      icon: <Wrench size={32} />,
      title: "Mantenimiento Preventivo",
      description: "Revisiones programadas para evitar fallas",
      position: { top: "15%", left: "10%" },
    },
    {
      id: 1,
      icon: <Cog size={32} />,
      title: "Reparaciones Especializadas",
      description: "Técnicos certificados y equipos de última generación",
      position: { top: "25%", right: "15%" },
    },
    {
      id: 2,
      icon: <ShieldCheck size={32} />,
      title: "Garantía de Calidad",
      description: "Repuestos originales y trabajo garantizado",
      position: { bottom: "35%", left: "15%" },
    },
    {
      id: 3,
      icon: <Clock size={32} />,
      title: "Servicio Rápido",
      description: "Minimizamos el tiempo de inactividad de tu vehículo",
      position: { bottom: "20%", right: "10%" },
    },
  ];

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calcular posición óptima del tooltip
  useEffect(() => {
    if (
      activeTooltip !== null &&
      tooltipRefs.current[activeTooltip] &&
      iconRefs.current[activeTooltip]
    ) {
      const tooltip = tooltipRefs.current[activeTooltip];
      const icon = iconRefs.current[activeTooltip];
      if (!tooltip || !icon) return;

      const timeoutId = setTimeout(() => {
        const tooltipRect = tooltip.getBoundingClientRect();
        const iconRect = icon.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const padding = 16;

        let position: "top" | "bottom" | "left" | "right" = "bottom";
        let alignment: "start" | "center" | "end" = "center";

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
          const maxSpace = Math.max(
            spaceAbove,
            spaceBelow,
            spaceLeft,
            spaceRight
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
            alignment = "start";
          } else if (iconCenterX + tooltipHalfWidth > viewportWidth - padding) {
            alignment = "end";
          } else {
            alignment = "center";
          }
        }

        // Determinar alineación vertical (para posiciones left/right)
        if (position === "left" || position === "right") {
          const iconCenterY = iconRect.top + iconRect.height / 2;
          const tooltipHalfHeight = tooltipHeight / 2;

          if (iconCenterY - tooltipHalfHeight < padding) {
            alignment = "start";
          } else if (
            iconCenterY + tooltipHalfHeight >
            viewportHeight - padding
          ) {
            alignment = "end";
          } else {
            alignment = "center";
          }
        }

        setTooltipPositions((prev) => ({
          ...prev,
          [activeTooltip]: { position, alignment },
        }));
      }, 10);

      return () => clearTimeout(timeoutId);
    }
  }, [activeTooltip]);

  // Cerrar tooltip al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeTooltip !== null &&
        !(event.target as Element).closest(".floating-icon-wrapper")
      ) {
        setActiveTooltip(null);
      }
    };

    if (isMobile) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeTooltip, isMobile]);

  const handleIconClick = (id: number) => {
    if (isMobile) {
      setActiveTooltip(activeTooltip === id ? null : id);
    }
  };

  // Calcular estilos del tooltip basado en posición
  const getTooltipStyle = (id: number): React.CSSProperties => {
    const config = tooltipPositions[id];
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
  const getArrowStyle = (id: number): React.CSSProperties => {
    const config = tooltipPositions[id];
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

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@600;700&display=swap');

        .feature-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
        }

        .feature-icon {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .cta-button {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transition: all 0.4s ease;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
          z-index: -1;
          transition: transform 0.4s ease;
        }

        .cta-button:hover::after {
          transform: scale(1.05);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -8px rgba(37, 99, 235, 0.4);
        }

        .gear-bg {
          position: absolute;
          opacity: 0.03;
          animation: rotate-slow 60s linear infinite;
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.4;
          animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          animation: pulse-badge 3s ease-in-out infinite;
        }

        @keyframes pulse-badge {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }
          50% { transform: scale(1.05); box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4); }
        }

        .cta-gear-left {
          animation: rotate-slow-reverse 40s linear infinite;
        }

        .cta-gear-right {
          animation: rotate-slow 35s linear infinite;
        }

        @keyframes rotate-slow-reverse {
          from { transform: rotate(15deg); }
          to { transform: rotate(-345deg); }
        }

        /* Mobile Floating Icons Styles */
        .floating-icon-wrapper {
          position: absolute;
          z-index: 20;
          animation: float-gentle 4s ease-in-out infinite;
        }

        .floating-icon-wrapper:nth-child(1) {
          animation-delay: 0s;
        }

        .floating-icon-wrapper:nth-child(2) {
          animation-delay: 1s;
        }

        .floating-icon-wrapper:nth-child(3) {
          animation-delay: 2s;
        }

        .floating-icon-wrapper:nth-child(4) {
          animation-delay: 3s;
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .floating-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .floating-icon::after {
          content: '';
          position: absolute;
          inset: -4px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 18px;
          opacity: 0.3;
          z-index: -1;
          animation: pulse-ring 2s ease-in-out infinite;
        }

        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0; }
        }

        .floating-icon.active {
          transform: scale(1.1);
          box-shadow: 0 12px 32px rgba(59, 130, 246, 0.6);
        }

        .mobile-features-container {
          position: relative;
          min-height: 400px;
          margin-bottom: 3rem;
        }
      `}</style>

      <div className="taller-section relative z-10">
        {/* Decorative Background Elements */}
        <div
          className="gear-bg top-10 right-20 text-slate-300"
          style={{ fontSize: "200px" }}
        >
          <Cog size={200} strokeWidth={1} />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="mb-4 md:mb-6 flex justify-center">
              <span className="section-badge bg-blue-50 text-blue-700 px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase shadow-lg border border-blue-200">
                Servicios Adicionales
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Taller Especializado
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Mantenemos tu flota en óptimas condiciones con nuestro servicio de
              taller profesional. Experiencia, calidad y confianza en cada
              reparación.
            </p>
          </div>

          {/* Mobile: Floating Icons with Tooltips */}
          <div className="block lg:hidden mobile-features-container mb-16">
            {features.map((feature, idx) => (
              <div
                key={feature.id}
                className="floating-icon-wrapper"
                style={{
                  ...feature.position,
                  animationDelay: `${-idx}s`,
                  zIndex: activeTooltip === feature.id ? 100 : 20,
                }}
                onMouseEnter={() => !isMobile && setActiveTooltip(feature.id)}
                onMouseLeave={() => !isMobile && setActiveTooltip(null)}
                onClick={() => handleIconClick(feature.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleIconClick(feature.id);
                  }
                }}
              >
                <div
                  ref={(el) => {
                    iconRefs.current[feature.id] = el;
                  }}
                  className={`floating-icon ${
                    activeTooltip === feature.id ? "active" : ""
                  }`}
                >
                  {feature.icon}
                </div>

                {/* Tooltip */}
                <div
                  ref={(el) => {
                    tooltipRefs.current[feature.id] = el;
                  }}
                  className={`absolute transition-all duration-300 ${
                    activeTooltip === feature.id
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                  style={{
                    ...getTooltipStyle(feature.id),
                    width: "max-content",
                    maxWidth: isMobile ? "280px" : "320px",
                    zIndex: 1000,
                  }}
                >
                  <div className="relative bg-white rounded-2xl shadow-2xl p-4 md:p-5 border-2 border-blue-200">
                    {/* Arrow */}
                    <div
                      className="absolute w-4 h-4 bg-white border-l-2 border-t-2 border-blue-200"
                      style={getArrowStyle(feature.id)}
                    />

                    {/* Close button - Solo móvil */}
                    {isMobile && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTooltip(null);
                        }}
                        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors z-10"
                        aria-label="Cerrar tooltip"
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
                      <h4 className="text-base md:text-lg font-bold text-blue-600 mb-2 pr-6">
                        {feature.title}
                      </h4>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Features Grid */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="feature-card bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="feature-icon w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full">
                <Cog
                  size={isMobile ? 200 : 300}
                  className="absolute -top-20 -left-20 text-white cta-gear-left"
                />
                <Wrench
                  size={isMobile ? 190 : 250}
                  className="absolute size-44 -bottom-10 -right-16 text-white"
                  style={{ transform: "rotate(-60deg)" }}
                />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Necesitas servicio de taller?
              </h3>
              <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
                Descubre todos nuestros servicios especializados de
                mantenimiento y reparación. Tu flota merece el mejor cuidado.
              </p>
              <Link
                to="/taller"
                className="cta-button inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg group"
              >
                Ver Servicios de Taller
                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}