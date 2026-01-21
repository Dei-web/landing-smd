import { Award, Clock, ShieldCheck, Users } from "lucide-react";
import { useState } from "react";

const values = [
  {
    icon: ShieldCheck,
    title: "Seguridad",
    desc: "Cumplimiento estricto de normativas y protocolos de seguridad en cada servicio",
  },
  {
    icon: Clock,
    title: "Puntualidad",
    desc: "Compromiso con los tiempos acordados y eficiencia en cada operación",
  },
  {
    icon: Award,
    title: "Calidad",
    desc: "Estándares superiores en servicio, mantenimiento y atención al cliente",
  },
  {
    icon: Users,
    title: "Equipo Experto",
    desc: "Personal altamente capacitado y certificado en transporte profesional",
  },
];

export default function ValuesSection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleCardClick = (idx: number) => {
    // Solo funciona en móvil
    if (window.innerWidth < 640) {
      setExpandedCard(expandedCard === idx ? null : idx);
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <style>{`
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

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .value-card {
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #e5e7eb;
        }

        .value-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 1rem;
          padding: 2px;
          background: #3b82f6;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .value-card.expanded::before {
          opacity: 1;
        }

        @media (min-width: 640px) {
          .value-card:hover::before {
            opacity: 1;
          }
          
          .value-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px -12px rgba(59, 130, 246, 0.25);
            border-color: transparent;
          }
        }

        .value-card.expanded {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -12px rgba(59, 130, 246, 0.25);
          border-color: transparent;
        }

        .icon-circle {
          transition: all 0.4s ease;
        }

        .value-card.expanded .icon-circle {
          background: #3b82f6;
          transform: scale(1.1);
        }

        .value-card.expanded .icon-circle svg {
          color: white;
        }

        @media (min-width: 640px) {
          .value-card:hover .icon-circle {
            background: #3b82f6;
            transform: scale(1.1);
          }

          .value-card:hover .icon-circle svg {
            color: white;
          }
        }

        .gradient-text {
          background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-content {
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (max-width: 639px) {
          .card-content {
            max-height: 0;
            opacity: 0;
          }

          .card-content.expanded {
            max-height: 300px;
            opacity: 1;
            padding-top: 0.75rem;
          }
        }

        @media (min-width: 640px) {
          .card-content {
            max-height: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-slide-up">
          <div className="mb-4 md:mb-6">
            <span className="section-badge bg-blue-50 text-blue-700 px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase shadow-lg border border-blue-200">
              Nuestros Valores
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 md:mb-6 leading-tight px-4">
            Compromiso con la <span className="gradient-text">Excelencia</span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Principios fundamentales que guían cada aspecto de nuestro servicio
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {values.map((value, idx) => {
            const Icon = value.icon;
            const isExpanded = expandedCard === idx;

            return (
              <div
                key={idx}
                className={`value-card bg-white rounded-2xl p-4 md:p-8 shadow-md animate-slide-up ${
                  isExpanded ? "expanded" : ""
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => handleCardClick(idx)}
              >
                {/* Icon */}
                <div className="mb-0 sm:mb-6 flex justify-center sm:justify-start">
                  <div className="icon-circle inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-blue-50 rounded-xl">
                    <Icon className="text-blue-600" size={28} strokeWidth={2} />
                  </div>
                </div>

                {/* Content - Hidden on mobile until tapped, always visible on desktop */}
                <div className={`card-content ${isExpanded ? "expanded" : ""}`}>
                  <h3 className="font-bold text-gray-900 text-base md:text-xl mb-2 md:mb-3 text-center sm:text-left">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-xs md:text-sm text-center sm:text-left">
                    {value.desc}
                  </p>
                </div>

                {/* Tap indicator for mobile - Only shows when NOT expanded */}
                {!isExpanded && (
                  <div className="sm:hidden text-center mt-3">
                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50">
                      <svg
                        className="w-3 h-3 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Close indicator for mobile - Only shows when expanded */}
                {isExpanded && (
                  <div className="sm:hidden text-center mt-3">
                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600">
                      <svg
                        className="w-3 h-3 text-white rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
