import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Función para scroll suave
  // Función para scroll suave mejorada
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Pequeño delay para que el menú se cierre primero
    setTimeout(() => {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = 100; // Ajusta este valor según la altura real de tu navbar
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    handleSmoothScroll(e, href);
  };

  return (
    <>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 3px;
          background: #3b82f6;
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .hamburger-icon {
          transition: transform 0.3s ease;
        }

        .hamburger-icon.rotate {
          transform: rotate(90deg);
        }

        .mobile-menu {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s ease;
        }

        .mobile-menu.open {
          max-height: 400px;
          opacity: 1;
        }

        @keyframes slideInItem {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .menu-item {
          opacity: 0;
          animation: slideInItem 0.3s ease forwards;
        }

        .mobile-menu.open .menu-item:nth-child(1) {
          animation-delay: 0.05s;
        }

        .mobile-menu.open .menu-item:nth-child(2) {
          animation-delay: 0.1s;
        }

        .mobile-menu.open .menu-item:nth-child(3) {
          animation-delay: 0.15s;
        }

        .mobile-menu.open .menu-item:nth-child(4) {
          animation-delay: 0.2s;
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 40;
        }

        .mobile-menu-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }

        /* Animación de cortina para botón desktop */
        .curtain-btn-desktop {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .curtain-btn-desktop::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #3B82F6;
          border-radius: inherit;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: -1;
        }

        .curtain-btn-desktop:hover::before {
          transform: scaleY(1);
          transform-origin: top;
        }

        .curtain-btn-desktop::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .curtain-btn-desktop:hover::after {
          opacity: 1;
        }

        /* Animación de cortina redondeada para móvil */
        .curtain-btn-mobile {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .curtain-btn-mobile::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
          border-radius: inherit;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: -1;
        }

        .curtain-btn-mobile:active::before {
          transform: scaleY(1);
          transform-origin: top;
        }

        .curtain-btn-mobile::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .curtain-btn-mobile:active::after {
          width: 300px;
          height: 300px;
        }

        nav {
          transition: background-color 0.3s ease, 
                      backdrop-filter 0.3s ease, 
                      box-shadow 0.3s ease;
        }

        /* Scroll suave */
        html {
          scroll-behavior: smooth;
        }

        /* Mejoras para móviles */
        @media (max-width: 768px) {
          .mobile-nav-link {
            font-size: 1.125rem;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            display: block;
            text-align: center;
          }

          .mobile-nav-link:active {
            transform: scale(0.98);
          }

          .mobile-contact-btn {
            font-size: 1.125rem;
            padding: 1rem 2rem;
            margin-top: 0.5rem;
          }
        }
      `}</style>

      {/* Overlay para móviles */}
      <div
        className={`mobile-menu-overlay md:hidden ${
          isMenuOpen ? "active" : ""
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <nav
        className={`fixed w-full py-3 z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? "bg-white/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 animate-fade-in">
              <img
                className="w-14 h-16 sm:w-16 sm:h-20"
                alt="Page logo"
                src={logo}
              />
              <div>
                <h1
                  className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                    isScrolled || isMenuOpen ? "text-gray-900" : "text-white"
                  }`}
                >
                  SMD Logística
                </h1>
                <p
                  className={`text-xs font-mono transition-colors duration-300 ${
                    isScrolled || isMenuOpen ? "text-gray-600" : "text-blue-300"
                  }`}
                >
                  Transport Solutions
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#servicios"
                onClick={(e) => handleLinkClick(e, "#servicios")}
                className={`nav-link font-medium pb-1 transition-colors duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white hover:text-blue-200"
                }`}
              >
                Servicios
              </a>
              <a
                href="#nosotros"
                onClick={(e) => handleLinkClick(e, "#nosotros")}
                className={`nav-link font-medium pb-1 transition-colors duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white hover:text-blue-200"
                }`}
              >
                Nosotros
              </a>
              <a
                href="#galeria"
                onClick={(e) => handleLinkClick(e, "#galeria")}
                className={`nav-link font-medium pb-1 transition-colors duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white hover:text-blue-200"
                }`}
              >
                Galería
              </a>
              <a
                href="#contacto"
                onClick={(e) => handleLinkClick(e, "#contacto")}
                className="curtain-btn-desktop px-6 py-3 rounded-full group/linkContact font-semibold transition-all duration-300 hover:shadow-xl text-white relative"
              >
                <span
                  className={`relative z-10 transition-all duration-300 ${
                    isScrolled
                      ? "text-gray-700 group-hover/linkContact:text-white"
                      : "text-blue-200 group-hover/linkContact:text-white"
                  }`}
                >
                  Contacto
                </span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled || isMenuOpen
                  ? "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  : "text-white hover:bg-white/10 active:bg-white/20"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={28} className="hamburger-icon rotate" />
              ) : (
                <Menu size={28} className="hamburger-icon" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden mobile-menu ${isMenuOpen ? "open" : ""}`}>
          <div className=" shadow-xl">
            <div className="px-4 py-6 space-y-1">
              {[
                { href: "#servicios", label: "Servicios" },
                { href: "#nosotros", label: "Nosotros" },
                { href: "#galeria", label: "Galería" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="menu-item mobile-nav-link text-gray-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 font-medium transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={(e) => handleLinkClick(e, "#contacto")}
                className="menu-item mobile-contact-btn curtain-btn-mobile block bg-blue-600 rounded-full text-center font-semibold transition-all duration-300 text-white relative"
              >
                <span className="relative z-10">Contacto</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
