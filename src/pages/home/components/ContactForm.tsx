import { Mail, MapPin, Phone } from "lucide-react";

export const ContactForm = () => {
  return (
    <section
      id="contacto"
      className="py-24 md:py-32 bg-gradient-to-b from-white to-slate-50"
    >
      <style>{`
        .info-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .info-card:hover {
          transform: translateX(4px);
        }
      `}</style>

      <div className="contact-section max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="mb-4 md:mb-6 flex justify-center">
          <span className="section-badge bg-blue-50 text-blue-700 px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase shadow-lg border border-blue-200">
            Contáctanos
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
          Solicita tu
          <br />
          <span className="text-blue-500">Cotización</span>
        </h2>

        <p className="text-lg text-slate-600 mb-12 leading-relaxed font-medium">
          Estamos listos para brindarte el mejor servicio de transporte.
          Contáctanos por teléfono, correo o visítanos y te responderemos en
          menos de 24 horas.
        </p>

        {/* Contact Info */}
        <div className="space-y-6 text-left">
          <div className="info-card flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="text-blue-600" size={20} strokeWidth={2} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Teléfono</h4>
              <p className="text-slate-600">+57 300 646 0095</p>
            </div>
          </div>

          <div className="info-card flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="text-blue-600" size={20} strokeWidth={2} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
              <p className="text-slate-600 break-all">
                smdinversionessas@gmail.com
              </p>
            </div>
          </div>

          <div className="info-card flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="text-blue-600" size={20} strokeWidth={2} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Ubicaciones</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Cra. 41 #86 No 45, Nte. Centro Historico, BARRANQUILLA-
                COLOMBIA, Barranquilla, Atlántico
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
