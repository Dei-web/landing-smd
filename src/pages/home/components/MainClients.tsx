import { useState, useEffect } from "react";
import integralMantenimiento from "../../../assets/integral-de-mantenimiento-seguridad.png";
import integralesSeguridad from "../../../assets/integrales-de-seguridad.png";
import inteligenciaUrbana from "../../../assets/inteligencia-urbana.png";
import transplus from "../../../assets/transplus.png";

export default function MainClients() {
  const clients = [
    {
      id: 1,
      name: "Inteligencia Urbana S.A.S",
      logo: inteligenciaUrbana,
    },
    {
      id: 2,
      name: "TransPlus",
      logo: transplus,
    },
    {
      id: 3,
      name: "Integral de Mantenimiento y Seguridad",
      logo: integralMantenimiento,
    },
    {
      id: 4,
      name: "Integrales de Seguridad Ltda",
      logo: integralesSeguridad,
    },
  ];

  const [rotation, setRotation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const getActiveClientIndex = () => {
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const anglePerClient = 360 / clients.length;

    let closestIndex = 0;
    let minDiff = Infinity;

    for (let i = 0; i < clients.length; i++) {
      const clientAngle = (anglePerClient * i) % 360;
      const diff = Math.min(
        Math.abs(normalizedRotation - clientAngle),
        Math.abs(normalizedRotation - clientAngle + 360),
        Math.abs(normalizedRotation - clientAngle - 360)
      );

      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }

    return closestIndex;
  };

  useEffect(() => {
    if (!isPlaying || isHovering) return;

    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.5); // ⬅️ Aumentado de 0.2 a 0.5 (2.5x más rápido)
    }, 30);

    return () => clearInterval(interval);
  }, [isPlaying, isHovering]);

  const handleRotate = (direction: "left" | "right") => {
    setIsPlaying(false);
    const angle = 360 / clients.length;
    setRotation((prev) => prev + (direction === "left" ? -angle : angle));
    setTimeout(() => setIsPlaying(true), 2000);
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@600;700&display=swap');

        .clients-section {
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
        }

        .carousel-3d {
          perspective: 800px;
          position: relative;
        }

        .carousel-container {
          position: relative;
          width: 100%;
          height: 300px;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
        }

        .carousel-item {
          position: absolute;
          width: 180px;
          height: 200px;
          left: 50%;
          top: 50%;
          margin-left: -90px;
          margin-top: -100px;
          transform-style: preserve-3d;
          transition: all 0.5s ease;
          background: transparent;
          border: none;
        }

        .carousel-card {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          backface-visibility: hidden;
          transition: all 0.3s ease;
          background: transparent;
        }

        .carousel-item.front .carousel-card {
          transform: scale(1.2);
        }

        .logo-container {
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          transition: all 0.3s ease;
        }

        .carousel-card:hover .logo-container {
          transform: scale(1.15);
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.25));
        }

        .client-logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .client-name {
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          max-width: 140px;
          line-height: 1.3;
        }

        .carousel-item.front .client-name {
          color: #1e293b;
          font-size: 13px;
        }

        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #e2e8f0;
          color: #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 100;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .nav-button:hover {
          background: #3b82f6;
          color: white;
          transform: translateY(-50%) scale(1.1);
        }

        .nav-button.left {
          left: 15%;
        }

        .nav-button.right {
          right: 15%;
        }

        @media (max-width: 768px) {
          .carousel-container {
            height: 250px;
          }

          .carousel-item {
            width: 140px;
            height: 160px;
            margin-left: -70px;
            margin-top: -80px;
          }

          .logo-container {
            width: 90px;
            height: 90px;
          }

          .client-name {
            font-size: 11px;
            max-width: 120px;
          }

          .nav-button {
            width: 36px;
            height: 36px;
          }

          .nav-button.left {
            left: 5%;
          }

          .nav-button.right {
            right: 5%;
          }
        }
      `}</style>

      <div className="clients-section max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4 md:mb-6 flex justify-center">
            <span className="section-badge bg-blue-50 text-blue-700 px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase shadow-lg border border-blue-200">
              Clientes
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-3">
            Nuestros Clientes Principales
          </h2>
          <p className="text-lg text-slate-600">
            Empresas que confían en nosotros
          </p>
        </div>

        {/* 3D Carousel */}
        <div className="carousel-3d">
          <div
            className="carousel-container"
            style={{
              transform: `rotateY(${rotation}deg)`,
            }}
          >
            {clients.map((client, index) => {
              const angle = (360 / clients.length) * index;
              const activeIndex = getActiveClientIndex();
              const isFront = index === activeIndex;

              return (
                <div
                  key={client.id}
                  className={`carousel-item ${isFront ? "front" : ""}`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(280px)`,
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="carousel-card">
                    <div className="logo-container">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="client-logo"
                      />
                    </div>
                    <p className="client-name">{client.name}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            className="nav-button left"
            onClick={() => handleRotate("left")}
            aria-label="Anterior"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            className="nav-button right"
            onClick={() => handleRotate("right")}
            aria-label="Siguiente"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center items-center gap-3 mt-10 mb-8">
          {clients.map((client, index) => {
            const activeIndex = getActiveClientIndex();
            const isActive = index === activeIndex;

            return (
              <button
                key={index}
                onClick={() => {
                  setIsPlaying(false);
                  const angle = (360 / clients.length) * index;
                  setRotation(angle);
                  setTimeout(() => setIsPlaying(true), 2000);
                }}
                className={`group relative transition-all duration-300 ${
                  isActive ? "w-12" : "w-3"
                }`}
                aria-label={`Ir a ${client.name}`}
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
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  <div className="bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
                    {client.name}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
