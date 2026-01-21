import { Mail, MapPin, Phone } from "lucide-react";
import logo from "../../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Función para scroll suave
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();

    // Si estamos en una página diferente a home, navegar primero
    if (location.pathname !== "/") {
      navigate(`/${targetId}`);
    } else {
      // Si ya estamos en home, hacer scroll directamente
      setTimeout(() => {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navHeight = 100;
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
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@600;700&display=swap');

        .footer-section {
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
        }

        .footer-link {
          transition: all 0.2s ease;
        }

        .footer-link:hover {
          color: #3b82f6;
          transform: translateX(2px);
        }

        .social-icon {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-icon:hover {
          transform: translateY(-2px);
          background: #3b82f6;
        }

        .tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          background: #1e293b;
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          margin-bottom: 4px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: #1e293b;
        }

        .social-icon:hover .tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(-4px);
        }
      `}</style>

      <div className="footer-section">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">
                    <img src={logo} alt="Logo" />
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">
                    SMD Logística
                  </h3>
                  <p className="text-xs text-blue-400 font-medium tracking-wide">
                    Transport Solutions
                  </p>
                </div>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Soluciones de transporte con excelencia y compromiso desde 2008.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href="#"
                  className="social-icon w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600"
                  aria-label="TikTok"
                >
                  <span className="tooltip">Síguenos en TikTok</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="social-icon w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600"
                  aria-label="Instagram"
                >
                  <span className="tooltip">Síguenos en Instagram</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="font-bold text-white mb-6 text-sm tracking-wider uppercase">
                Servicios
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/#servicios"
                    onClick={(e) => handleSmoothScroll(e, "#servicios")}
                    className="footer-link block text-slate-400 text-sm"
                  >
                    Logística de Eventos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#servicios"
                    onClick={(e) => handleSmoothScroll(e, "#servicios")}
                    className="footer-link block text-slate-400 text-sm"
                  >
                    Transporte Empresarial
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#servicios"
                    onClick={(e) => handleSmoothScroll(e, "#servicios")}
                    className="footer-link block text-slate-400 text-sm"
                  >
                    Transporte Escolar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#servicios"
                    onClick={(e) => handleSmoothScroll(e, "#servicios")}
                    className="footer-link block text-slate-400 text-sm"
                  >
                    Transporte Ejecutivo
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#servicios"
                    onClick={(e) => handleSmoothScroll(e, "#servicios")}
                    className="footer-link block text-slate-400 text-sm"
                  >
                    Transporte Turismo
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-bold text-white mb-6 text-sm tracking-wider uppercase">
                Empresa
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/#nosotros"
                    onClick={(e) => handleSmoothScroll(e, "#nosotros")}
                    className="footer-link block text-slate-400 text-sm"
                  >
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#galeria"
                    onClick={(e) => handleSmoothScroll(e, "#galeria")}
                    className="footer-link block text-slate-400 text-sm"
                  >
                    Nuestra Flota
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#servicios"
                    onClick={(e) => handleSmoothScroll(e, "#servicios")}
                    className="footer-link block text-slate-400 text-sm"
                  >
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link
                    to="/taller"
                    className="footer-link block text-slate-400 text-sm"
                  >
                    Servicio de taller
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#contacto"
                    onClick={(e) => handleSmoothScroll(e, "#contacto")}
                    className="footer-link block text-slate-400 text-sm"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-bold text-white mb-6 text-sm tracking-wider uppercase">
                Contacto
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone
                    className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <div>
                    <a
                      href="tel:+573006460095"
                      className="text-slate-400 text-sm hover:text-blue-400 transition-colors"
                    >
                      +57 300 646 0095
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail
                    className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <div>
                  <a  
                      href="mailto:smdinversionessas@gmail.com"
                      className="text-slate-400 text-sm break-all hover:text-blue-400 transition-colors"
                    >
                      smdinversionessas@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin
                    className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Cra. 41 #86 No 45, Nte. Centro Historico, BARRANQUILLA-
                      COLOMBIA, Barranquilla, Atlántico
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mx-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} SMD Logística y Transporte
                S.A.S. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-6">
                <span className="text-slate-500 text-sm">
                  NIT: 900.527.591-9
                </span>
                <a
                  href="#"
                  className="text-slate-500 hover:text-blue-400 text-sm transition-colors"
                >
                  Política de Privacidad
                </a>
                <a
                  href="#"
                  className="text-slate-500 hover:text-blue-400 text-sm transition-colors"
                >
                  Términos y Condiciones
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}