import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "¿Ofrecen garantía en las reparaciones?",
      answer:
        "Sí, todas nuestras reparaciones cuentan con garantía. El tiempo de garantía varía según el tipo de servicio: 30 días para servicios generales, 90 días para reparaciones mecánicas mayores, y 1 año para repuestos originales instalados.",
    },
    {
      question: "¿Qué formas de pago aceptan?",
      answer:
        "Aceptamos múltiples formas de pago: efectivo, tarjetas de crédito y débito, transferencias bancarias, Nequi y Daviplata.",
    },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      id="preguntasFrecuentes"
      className="relative py-40 overflow-hidden"
    >
      {/* Fondo con imagen */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-blue-900/90"></div>

        {/* Patrón */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="pointer-events-none absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white via-blue-200/20 via-70% to-transparent backdrop-blur-sm" />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-blue-200/20 via-70% to-transparent backdrop-blur-sm" />

      {/* Contenido */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-gray-300 text-lg">
            Encuentra respuestas a las dudas más comunes sobre nuestro taller
            mecánico
          </p>
        </div>

        {/* Acordeón */}
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Botón */}
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                onClick={() => toggle(i)}
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">
                  {item.question}
                </span>

                <svg
                  className={`w-6 h-6 text-blue-700 transform transition-transform duration-300 flex-shrink-0 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Contenido */}
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-48 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
