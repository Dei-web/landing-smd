import { useEffect } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import VehiclesGallery from "./components/VehiclesGallery";
import AboutSection from "./components/AboutSection";
import { WhatsappFloat } from "../../components/whastapp";
import { ContactForm } from "./components/ContactForm";
import MapUbication from "../../components/map";
import ValuesSection from "./components/ValuesSection";
import MainClients from "./components/MainClients";
import AlliesSection from "./components/AlliesSection";

const Home = () => {
  useEffect(() => {
    // Configurar Intersection Observer para animaciones de scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-up-visible");
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observar todas las secciones con la clase animate-on-scroll
    const sections = document.querySelectorAll(".animate-on-scroll");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <style>{`
        /* Animación fade-up */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Estado inicial - oculto y desplazado */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        /* Estado visible - animado */
        .animate-fade-up-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Delays escalonados para efecto cascada */
        .animate-on-scroll:nth-child(1) {
          transition-delay: 0s;
        }

        .animate-on-scroll:nth-child(2) {
          transition-delay: 0.1s;
        }

        .animate-on-scroll:nth-child(3) {
          transition-delay: 0.2s;
        }

        .animate-on-scroll:nth-child(4) {
          transition-delay: 0.3s;
        }

        .animate-on-scroll:nth-child(5) {
          transition-delay: 0.4s;
        }

        .animate-on-scroll:nth-child(6) {
          transition-delay: 0.5s;
        }

        .animate-on-scroll:nth-child(7) {
          transition-delay: 0.6s;
        }

        .animate-on-scroll:nth-child(8) {
          transition-delay: 0.7s;
        }

        /* Suavizar en dispositivos de baja potencia */
        @media (prefers-reduced-motion: reduce) {
          .animate-on-scroll {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      <Navbar />

      {/* Hero sin animación - se muestra inmediatamente */}
      <Hero />

      {/* Secciones con animación de scroll */}
      <div className="animate-on-scroll">
        <ValuesSection />
      </div>

      <div className="animate-on-scroll">
        <Services />
      </div>

      <div className="animate-on-scroll">
        <AboutSection />
      </div>

      <div className="animate-on-scroll">
        <VehiclesGallery />
      </div>

      <div className="animate-on-scroll">
        <ContactForm />
      </div>

      <div className="animate-on-scroll">
        <MainClients />
      </div>

      <div className="animate-on-scroll">
        <AlliesSection />
      </div>

      <div className="animate-on-scroll">
        <MapUbication />
      </div>

      <Footer />

      <WhatsappFloat />
    </div>
  );
};

export default Home;
