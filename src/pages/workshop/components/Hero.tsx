import { useState } from "react";
import { CheckCircle2, Wrench, Clock } from "lucide-react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [badgePosition, setBadgePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;

    setMousePosition({ x, y });

    setBadgePosition({ x: x * 0.4, y: y * 0.4 });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
    setBadgePosition({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-16 pb-24">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
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
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes wave-move {
          0% { transform: translateX(0) translateZ(0) scaleY(1); }
          50% { transform: translateX(-25%) translateZ(0) scaleY(1.05); }
          100% { transform: translateX(0) translateZ(0) scaleY(1); }
        }

        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes gear-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-gear {
          animation: gear-rotate 20s linear infinite;
        }

        .wave-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          transform: rotate(180deg);
        }

        .wave-container svg {
          position: relative;
          display: block;
          width: calc(150% + 1.3px);
          height: 100px;
        }

        .wave-animation {
          animation: wave-move 20s ease-in-out infinite;
        }

        .image-container-fade {
          position: relative;
          border-radius: 1rem;
          overflow: hidden;
        }

        .image-container-fade::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(
              ellipse 85% 85% at 50% 50%,
              transparent 0%,
              transparent 55%,
              rgba(15, 23, 42, 0.3) 70%,
              rgba(15, 23, 42, 0.6) 85%,
              rgba(15, 23, 42, 0.95) 100%
            );
          pointer-events: none;
          z-index: 10;
          border-radius: inherit;
        }

        .grid-pattern {
          background-image: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 99px,
              rgba(96, 165, 250, 0.05) 99px,
              rgba(96, 165, 250, 0.05) 100px
            );
          background-size: 100px 100px;
        }

        .gradient-border {
          position: relative;
        }

        .gradient-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 1rem;
          padding: 2px;
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(59, 130, 246, 0.1), rgba(96, 165, 250, 0.3));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .text-shimmer {
          background: linear-gradient(90deg, #fff 0%, #dbeafe 50%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn-shine {
          position: relative;
          overflow: hidden;
        }

        .btn-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shine 3s infinite;
        }

        .btn-curtain {
          position: relative;
          overflow: hidden;
        }

        .btn-curtain::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1e40af, #3b82f6);
          clip-path: circle(0% at 50% 50%);
          transition: clip-path 0.6s ease-out;
          z-index: -1;
        }

        .btn-curtain:hover::after {
          clip-path: circle(150% at 50% 50%);
        }

        .btn-curtain:hover {
          color: white;
        }

        .image-3d {
          transition: transform 0.3s ease-out;
          transform-style: preserve-3d;
        }

        .badge-3d {
          transition: transform 0.6s ease-out;
          transform-style: preserve-3d;
        }

        .stat-curtain {
          position: relative;
          overflow: hidden;
        }

        .stat-curtain::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(96, 165, 250, 0.15));
          clip-path: circle(0% at 50% 50%);
          transition: clip-path 0.5s ease-out;
          z-index: -1;
          border-radius: 0.5rem;
        }

        .stat-curtain:hover::after {
          clip-path: circle(150% at 50% 50%);
        }
      `}</style>

      <div className="absolute inset-0 grid-pattern"></div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-400/20 to-transparent"></div>
      </div>

      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-40 right-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-56 h-56 bg-cyan-500 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Decorative gears */}
      <div className="absolute top-20 right-10 opacity-5">
        <Wrench size={120} className="text-blue-300 animate-gear" />
      </div>
      <div className="absolute bottom-32 left-10 opacity-5">
        <Wrench
          size={80}
          className="text-blue-400 animate-gear"
          style={{ animationDirection: "reverse", animationDuration: "15s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-white">
            <div className="inline-block animate-fade-in">
              <span className="bg-blue-500/15 backdrop-blur-sm text-blue-200 px-5 py-2.5 rounded-full text-sm font-semibold border border-blue-400/20 shadow-lg">
                🔧 Servicio Profesional de Taller
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-slide-up tracking-tight">
              Mantenimiento y
              <span className="block text-blue-300 mt-1">
                Reparación Experta
              </span>
            </h1>

            <p
              className="text-lg text-slate-300 leading-relaxed animate-slide-up max-w-xl"
              style={{ animationDelay: "0.2s" }}
            >
              Taller especializado con tecnología de punta. Diagnóstico preciso,
              reparaciones garantizadas y mantenimiento preventivo para mantener
              tu vehículo en óptimas condiciones.
            </p>

            <div
              className="flex flex-wrap gap-4 animate-slide-up pt-2"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href="#serviciosTaller"
                className="bg-blue-500/10 backdrop-blur-sm border-2 border-blue-400/30 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300"
              >
                Nuestros Servicios
              </a>
            </div>
          </div>

          <div
            className="relative animate-fade-in"
            style={{ animationDelay: "0.2s" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl image-container-fade image-3d"
              style={{
                transform: `perspective(1000px) rotateY(${
                  mousePosition.x
                }deg) rotateX(${mousePosition.y}deg) scale(${
                  isHovering ? 1.02 : 1
                })`,
              }}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop"
                  alt="Taller Mecánico"
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="absolute bottom-6 left-6 right-6 bg-white/98 backdrop-blur-md p-5 rounded-xl shadow-2xl flex items-center justify-between z-20 badge-3d"
                style={{
                  transform: `perspective(1000px) rotateY(${badgePosition.x}deg) rotateX(${badgePosition.y}deg)`,
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-green-50 p-2 rounded-lg">
                    <CheckCircle2 className="text-green-600" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-blue-600 text-base">
                      Servicios garantizados
                    </div>
                    <div className="text-xs text-gray-400">
                      Técnicos Especializados
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="bg-blue-50 p-2.5 rounded-lg">
                    <Wrench className="text-blue-500" size={20} />
                  </div>
                  <div className="bg-blue-50 p-2.5 rounded-lg">
                    <Clock className="text-blue-400" size={20} />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -z-10 -inset-8 bg-gradient-to-r from-blue-500/15 via-blue-600/15 to-blue-500/15 rounded-3xl blur-3xl"></div>
          </div>
        </div>
      </div>

      <div className="wave-container">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white wave-animation"
          />
        </svg>
      </div>
    </section>
  );
}
