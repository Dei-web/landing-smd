import React, { useState } from "react";

const features = [
  {
    id: "card1",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    iconSmall: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Precisión",
    description:
      "En cada detalle de nuestro servicio, garantizamos exactitud y cuidado profesional.",
  },
  {
    id: "card2",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    iconSmall: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Rapidez",
    description:
      "Cumplimiento puntual en todos nuestros servicios de transporte y logística.",
  },
  {
    id: "card3",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    iconSmall: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Seguridad",
    description:
      "Protección total para nuestros pasajeros con los más altos estándares de calidad.",
  },
  {
    id: "card4",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
    iconSmall: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
    title: "Calidad",
    description:
      "Excelencia en cada aspecto de nuestro servicio de transporte profesional.",
  },
];

export default function AboutSection() {
  const [mousePositions, setMousePositions] = useState({
    card1: { x: 0, y: 0 },
    card2: { x: 0, y: 0 },
    card3: { x: 0, y: 0 },
    card4: { x: 0, y: 0 },
  });
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent, cardId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePositions((prev) => ({
      ...prev,
      [cardId]: { x, y },
    }));
  };

  return (
    <section id="nosotros" className="relative py-20 md:py-28 bg-white">
      <style>{`
      .gradient-text {
          background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideOutUp {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8) rotate(-5deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-slideInDown {
          animation: slideInDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-slideOutUp {
          animation: slideOutUp 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-pulse-once {
          animation: pulse 0.3s ease-out;
        }

        /* Transición suave para el contenedor */
        .feature-card-container {
          transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Efecto de brillo en el icono seleccionado */
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(110, 183, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 15px rgba(110, 183, 255, 0.8), 0 0 40px rgba(110, 183, 255, 0.4);
          }
        }

        .icon-glow {
          animation: glow 2s ease-in-out infinite;
        }

        /* Detener animación en hover y rotar */
        .floating-icon:hover {
          animation-play-state: paused !important;
        }

        @keyframes rotate360 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-4 md:mb-6 flex justify-center items-center w-full">
          <span className="section-badge bg-blue-50 text-blue-700 px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase shadow-lg border border-blue-200">
            Quienes Somos
          </span>
        </div>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
              Líderes en{" "}
              <span className="gradient-text">Logística y Transporte</span>
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-6 mb-12">
              <p className="text-lg text-gray-600 leading-relaxed">
                Somos una compañía debidamente habilitada con todas las
                exigencias legales para la prestación del servicio de logística
                y transporte de personal.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Conformado con un excelente equipo humano, su profesionalismo y
                la capacidad de servicios nos permite brindar un excelente
                servicio de calidad.
              </p>
            </div>

            {/* Vision Card */}
            <div className="relative bg-gray-50 p-8 rounded-2xl mb-12 shadow-md border border-blue-300">
              <h3 className="font-bold text-gray-900 text-xl mb-4">
                Nuestra Visión 2030
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ser una empresa reconocida a nivel nacional en la modalidad de
                logística y transporte de pasajeros, ofreciendo un servicio
                seguro, eficiente y con tecnología avanzada.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center items-center gap-3 mb-8 lg:mb-0">
              <div className="group flex items-center gap-3 bg-white px-6 py-3.5 rounded-full border border-gray-200 transition-all duration-300 hover:bg-blue-600 hover:border-blue-700 hover:shadow-xl cursor-pointer">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors duration-300">
                  Certificados
                </span>
              </div>

              <div className="group flex items-center gap-3 bg-white px-6 py-3.5 rounded-full border border-gray-200 transition-all duration-300 hover:bg-blue-600 hover:border-blue-700 hover:shadow-xl cursor-pointer">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors duration-300">
                  Innovación
                </span>
              </div>

              <div className="group flex items-center gap-3 bg-white px-6 py-3.5 rounded-full border border-gray-200 transition-all duration-300 hover:bg-blue-600 hover:border-blue-700 hover:shadow-xl cursor-pointer">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors duration-300">
                  Equipo Experto
                </span>
              </div>
            </div>

            {/* Mobile: Icons Row */}
            <div className="lg:hidden">
              {/* Selected Feature Display */}
              <div
                className={`feature-card-container overflow-hidden transition-all duration-500 mb-6 ${
                  selectedFeature ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {selectedFeature && (
                  <div
                    key={selectedFeature}
                    className="bg-gradient-to-br from-blue-50 to-blue-100/80 rounded-3xl p-6 m-7 border border-blue-200 shadow-lg animate-slideInDown"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-400/50 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl animate-scaleIn icon-glow">
                        <div className="text-white">
                          {
                            features.find((f) => f.id === selectedFeature)
                              ?.iconSmall
                          }
                        </div>
                      </div>
                      <div
                        className="flex-1 animate-slideInDown"
                        style={{ animationDelay: "0.1s" }}
                      >
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {
                            features.find((f) => f.id === selectedFeature)
                              ?.title
                          }
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {
                            features.find((f) => f.id === selectedFeature)
                              ?.description
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Icons Grid */}
              <div className="grid grid-cols-4 place-items-center gap-4 mx-4">
                {features.map((feature, index) => (
                  <button
                    key={feature.id}
                    onClick={() =>
                      setSelectedFeature(
                        selectedFeature === feature.id ? null : feature.id
                      )
                    }
                    className={`rounded-2xl max-w-36 transition-all duration-300 flex group/buttonGrid items-center justify-center relative p-4 sm:p-10 overflow-hidden ${
                      selectedFeature === feature.id
                        ? "bg-gradient-to-br from-blue-600 to-blue-400 shadow-2xl scale-110 z-10"
                        : "bg-white border-2 border-blue-300 hover:bg-blue-50 active:scale-95"
                    }`}
                    style={{
                      transitionDelay: `${index * 0.05}s`,
                    }}
                  >
                    {/* Ripple effect */}
                    <div
                      className={`absolute inset-0 bg-blue-400 rounded-xl pointer-events-none transition-all duration-700 ${
                        selectedFeature === feature.id
                          ? "opacity-0 scale-150"
                          : "opacity-0 scale-0"
                      }`}
                    ></div>

                    <div
                      className={`transition-all duration-300 group-hover/buttonGrid:-translate-y-2 group-hover/buttonGrid:scale-110 ${
                        selectedFeature === feature.id
                          ? "text-white scale-110 animate-pulse-once"
                          : "text-blue-300"
                      }`}
                    >
                      {feature.iconSmall}
                    </div>

                    {/* Active indicator dot */}
                    {selectedFeature === feature.id && (
                      <div className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg animate-scaleIn"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: Floating Icons Grid - Hidden on mobile */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-12 place-items-center max-w-md mx-auto">
              {features.map((feature, index) => {
                const positions = [
                  { mt: "mt-0" },
                  { mt: "mt-20" },
                  { mt: "-mt-16" },
                  { mt: "mt-12" },
                ];

                return (
                  <div
                    key={feature.id}
                    className={`group relative ${positions[index].mt}`}
                    onMouseMove={(e) => handleMouseMove(e, feature.id)}
                  >
                    {/* Floating Icon */}
                    <div
                      className="floating-icon w-24 h-24 bg-transparent border-2 border-blue-500 rounded-3xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-blue-800 group-hover:border-transparent group-hover:scale-110 group-hover:shadow-2xl cursor-pointer"
                      style={{
                        animation: `float 3s ease-in-out ${
                          index * 0.5
                        }s infinite`,
                      }}
                    >
                      <div
                        className="text-blue-400 transition-all duration-700 group-hover:text-white group-hover:scale-110"
                        style={{
                          transition: "transform 0.7s ease-in-out",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.animation =
                            "rotate360 0.7s ease-in-out forwards";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.animation = "none";
                        }}
                      >
                        {feature.icon}
                      </div>
                    </div>

                    {/* Expanded Card - Follows Mouse */}
                    <div
                      className="absolute bg-white rounded-2xl p-6 border-2 border-blue-300/40 shadow-2xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 w-72 z-20"
                      style={{
                        left: `${
                          mousePositions[
                            feature.id as keyof typeof mousePositions
                          ].x + 20
                        }px`,
                        top: `${
                          mousePositions[
                            feature.id as keyof typeof mousePositions
                          ].y - 50
                        }px`,
                      }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg text-white rounded-xl flex items-center justify-center mb-4">
                        {feature.iconSmall}
                      </div>
                      <p className="text-gray-900 font-bold text-2xl mb-3">
                        {feature.title}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
