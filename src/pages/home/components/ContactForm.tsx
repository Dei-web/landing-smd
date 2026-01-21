import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  AlertCircle,
  Shield,
  X,
} from "lucide-react";
import submitContactForm from "../../../services/submitForm.service";
import type { FormContact } from "../../../types/formContact.types";
import { useToast } from "../../../context/toast/ToastContext";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Loading from "../../../components/loading";

const PrivacyModal = ({ onClose }: { onClose: () => void }) => (
  <div
    className="modal-backdrop fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div
      className="modal-content bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Shield className="text-blue-600" size={20} strokeWidth={2} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            Política de Privacidad y Tratamiento de Datos
          </h3>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
          aria-label="Cerrar"
        >
          <X className="text-slate-600" size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="overflow-y-auto p-6 space-y-6">
        <div>
          <h4 className="font-bold text-lg text-slate-900 mb-3">
            1. Responsable del Tratamiento de Datos
          </h4>
          <p className="text-slate-600 leading-relaxed">
            SMD Logística y Transporte S.A.S., identificada con NIT
            900.527.591-9, es la responsable del tratamiento de sus datos
            personales. Podrá contactarnos en smdinversionessas@gmail.com o al
            teléfono +57 300 646 0095.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-lg text-slate-900 mb-3">
            2. Datos Recopilados
          </h4>
          <p className="text-slate-600 leading-relaxed mb-2">
            A través de este formulario recopilamos:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Nombre completo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Correo electrónico</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Número de teléfono</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Servicio de interés</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Mensaje con detalles de su solicitud</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg text-slate-900 mb-3">
            3. Finalidad del Tratamiento
          </h4>
          <p className="text-slate-600 leading-relaxed mb-2">
            Sus datos serán utilizados exclusivamente para:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Responder a su solicitud de cotización</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>
                Contactarlo para ofrecer nuestros servicios de transporte
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>
                Enviar información comercial relacionada con nuestros servicios
                (si acepta recibir comunicaciones)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Cumplir con obligaciones legales</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg text-slate-900 mb-3">
            4. Derechos del Titular
          </h4>
          <p className="text-slate-600 leading-relaxed mb-2">
            Usted tiene derecho a:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Conocer, actualizar y rectificar sus datos personales</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Solicitar prueba de la autorización otorgada</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Ser informado sobre el uso de sus datos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>
                Revocar la autorización y solicitar la supresión de sus datos
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Acceder gratuitamente a sus datos</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg text-slate-900 mb-3">
            5. Seguridad de los Datos
          </h4>
          <p className="text-slate-600 leading-relaxed">
            Implementamos medidas técnicas, humanas y administrativas para
            proteger sus datos personales y evitar su daño, pérdida, alteración,
            destrucción o uso no autorizado.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-lg text-slate-900 mb-3">6. Vigencia</h4>
          <p className="text-slate-600 leading-relaxed">
            Sus datos serán conservados durante el tiempo necesario para cumplir
            con las finalidades descritas y mientras subsista la relación
            comercial o legal.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900">Nota:</strong> Al enviar el
            formulario, usted declara haber leído y aceptado esta política de
            privacidad y autoriza expresamente el tratamiento de sus datos
            personales conforme a lo establecido.
          </p>
        </div>
      </div>

      <div className="p-6 border-t border-slate-200 bg-slate-50">
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  </div>
);

// Define el tipo esperado:
interface ErrorResponse {
  errors?: Record<string, string[]>;
  message?: string;
}

export const ContactForm = () => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  const MAX_MESSAGE_LENGTH = 500;
  const MIN_MESSAGE_LENGTH = 20;

  useEffect(() => {
    if (showPrivacyModal) {
      const scrollY = window.scrollY;

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [showPrivacyModal]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      setErrors({});

      const formData = new FormData(e.currentTarget);
      const target = e.currentTarget;

      const data: FormContact = {
        fullName: formParameters(formData, "fullName"),
        email: formParameters(formData, "email"),
        phoneNumber: formParameters(formData, "numberPhone"),
        interestService: parseServiceVehicle(
          formParameters(formData, "interestService")
        ),
        message: formParameters(formData, "message"),
      };

      const response = await submitContactForm(data);

      if (!response.ok) {
        const errorData = (await response.json()) as ErrorResponse; // ⬅️ Type assertion aquí

        if (errorData.errors) {
          const formattedErrors: Record<string, string> = {};
          Object.keys(errorData.errors).forEach((key) => {
            formattedErrors[key] = errorData.errors![key][0]; // ⬅️ Añadido ! (non-null assertion)
          });
          setErrors(formattedErrors);

          // Simplificado ya que errorData tiene el tipo correcto:
          const firstError = errorData.errors
            ? Object.values(errorData.errors)[0]?.[0] || "Error desconocido"
            : "Error desconocido";

          showToast("error", firstError);
        } else {
          showToast(
            "error",
            errorData.message || "Error al enviar el formulario"
          );
        }
        setIsLoading(false);
        return;
      }

      const dataResponse = await response.json();

      setIsLoading(false);
      showToast(
        "success",
        dataResponse.message || "¡Formulario enviado correctamente!"
      );
      target.reset();
      setErrors({});
    } catch {
      setIsLoading(false);
      showToast("error", "Error de conexión. Por favor, intenta nuevamente.");
    }
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageLength(e.target.value.length);
  };

  const parseServiceVehicle = (
    value: string | null
  ): ServiceRequire | null => {
    if (!value) return null;

    const valueParse = value.toLowerCase();

    const category: ServiceRequire[] = [
      "transporte empresarial",
      "transporte ejecutivo",
      "transporte escolar",
      "transporte turismo",
      "logistica de eventos",
      "transporte corporativo",
    ];

    return category.includes(valueParse as ServiceRequire)
      ? (valueParse as ServiceRequire)
      : null;
  };

  const getCounterColor = () => {
    if (messageLength === 0) return "text-slate-400";
    if (messageLength < MIN_MESSAGE_LENGTH) return "text-amber-600";
    if (messageLength > MAX_MESSAGE_LENGTH) return "text-red-600";
    return "text-blue-600";
  };

  const formParameters = (formData: FormData, key: string): string | null => {
    const value = formData.get(key);
    return typeof value === "string" ? value : null;
  };

  const getErrorMessage = (fieldName: string): string | null => {
    return errors[fieldName] || null;
  };

  const hasError = (fieldName: string): boolean => {
    return !!errors[fieldName];
  };

  return (
    <>
      <section
        id="contacto"
        className="py-24 md:py-32 bg-gradient-to-b from-white to-slate-50"
      >
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@600;700&display=swap');

        .form-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .form-input.error {
          border-color: #ef4444;
        }

        .form-input.error:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .info-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .info-card:hover {
          transform: translateX(4px);
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }

        .error-shake {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-backdrop {
          animation: fadeIn 0.3s ease-out;
        }

        .modal-content {
          animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .focus\\:shadow-amber:focus {
          box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
        }

        .focus\\:shadow-blue:focus {
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
      `}</style>

        <div className="contact-section max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
            {/* Left Column - Info */}
            <div>
              <div className="mb-4 md:mb-6 flex justify-center">
                <span className="section-badge bg-blue-50 text-blue-700 px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase shadow-lg border border-blue-200">
                  Contactanos
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                Solicita tu
                <br />
                <span className="text-blue-500">Cotización</span>
              </h2>

              <p className="text-lg text-slate-600 mb-12 leading-relaxed font-medium">
                Estamos listos para brindarte el mejor servicio de transporte.
                Completa el formulario y nos pondremos en contacto contigo.
              </p>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="info-card flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone
                      className="text-blue-600"
                      size={20}
                      strokeWidth={2}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      Teléfono
                    </h4>
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
                    <MapPin
                      className="text-blue-600"
                      size={20}
                      strokeWidth={2}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Ubicaciones
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Cra. 41 #86 No 45, Nte. Centro Historico, BARRANQUILLA-
                      COLOMBIA, Barranquilla, Atlántico
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 lg:p-10 rounded-2xl border border-slate-200 shadow-sm"
              >
                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      className={`form-input w-full px-4 py-3 rounded-lg border focus:outline-none transition-all text-slate-900 ${
                        hasError("fullName")
                          ? "border-red-500 error error-shake"
                          : "border-slate-300"
                      }`}
                      placeholder="Juan Pérez"
                    />
                    {getErrorMessage("fullName") && (
                      <div className="flex items-start gap-2 mt-2 px-1">
                        <AlertCircle
                          size={16}
                          className="text-red-600 flex-shrink-0 mt-0.5"
                        />
                        <span className="text-sm font-medium text-red-600 leading-relaxed">
                          {getErrorMessage("fullName")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      className={`form-input w-full px-4 py-3 rounded-lg border focus:outline-none transition-all text-slate-900 ${
                        hasError("email")
                          ? "border-red-500 error error-shake"
                          : "border-slate-300"
                      }`}
                      placeholder="correo@ejemplo.com"
                    />
                    {getErrorMessage("email") && (
                      <div className="flex items-start gap-2 mt-2 px-1">
                        <AlertCircle
                          size={16}
                          className="text-red-600 flex-shrink-0 mt-0.5"
                        />
                        <span className="text-sm font-medium text-red-600 leading-relaxed">
                          {getErrorMessage("email")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      required
                      name="numberPhone"
                      className={`form-input w-full px-4 py-3 rounded-lg border focus:outline-none transition-all text-slate-900 ${
                        hasError("phoneNumber")
                          ? "border-red-500 error error-shake"
                          : "border-slate-300"
                      }`}
                      placeholder="+57 300 123 4567"
                    />
                    {getErrorMessage("phoneNumber") && (
                      <div className="flex items-start gap-2 mt-2 px-1">
                        <AlertCircle
                          size={16}
                          className="text-red-600 flex-shrink-0 mt-0.5"
                        />
                        <span className="text-sm font-medium text-red-600 leading-relaxed">
                          {getErrorMessage("phoneNumber")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Interest Service */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Servicio de Interés
                    </label>
                    <select
                      required
                      name="interestService"
                      className={`form-input w-full px-4 py-3 rounded-lg border focus:outline-none transition-all text-slate-900 bg-white ${
                        hasError("interestService")
                          ? "border-red-500 error error-shake"
                          : "border-slate-300"
                      }`}
                    >
                      <option value="">Seleccione un servicio</option>
                      <option value="Logistica de Eventos">
                        Logística de Eventos
                      </option>
                      <option value="Transporte Empresarial">
                        Transporte Empresarial
                      </option>
                      <option value="Transporte Escolar">
                        Transporte Escolar
                      </option>
                      <option value="Transporte Ejecutivo">
                        Transporte Ejecutivo
                      </option>
                      <option value="Transporte Turismo">
                        Transporte Turismo
                      </option>
                    </select>
                    {getErrorMessage("interestService") && (
                      <div className="flex items-start gap-2 mt-2 px-1">
                        <AlertCircle
                          size={16}
                          className="text-red-600 flex-shrink-0 mt-0.5"
                        />
                        <span className="text-sm font-medium text-red-600 leading-relaxed">
                          {getErrorMessage("interestService")}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Header con contador */}
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Mensaje
                      </label>
                      <span
                        className={`char-counter text-xs font-semibold ${getCounterColor()}`}
                      >
                        {messageLength}/{MAX_MESSAGE_LENGTH}
                      </span>
                    </div>

                    {/* Textarea con estilos dinámicos */}
                    <textarea
                      required
                      name="message"
                      rows={4}
                      maxLength={MAX_MESSAGE_LENGTH}
                      onChange={handleMessageChange}
                      className={`form-input w-full px-4 py-3 rounded-lg border focus:outline-none transition-all resize-none text-slate-900 ${
                        hasError("message")
                          ? "border-red-500 error error-shake"
                          : messageLength === 0
                          ? "border-slate-300"
                          : messageLength < MIN_MESSAGE_LENGTH
                          ? "border-amber-400 focus:border-amber-500 focus:shadow-amber"
                          : messageLength >= MIN_MESSAGE_LENGTH &&
                            messageLength <= MAX_MESSAGE_LENGTH
                          ? "border-blue-400 focus:border-blue-500 focus:shadow-blue"
                          : "border-slate-300"
                      }`}
                      placeholder="Cuéntanos sobre tu necesidad... (Mínimo 20 caracteres)"
                    />

                    {/* Advertencia de mínimo */}
                    {messageLength > 0 &&
                      messageLength < MIN_MESSAGE_LENGTH &&
                      !hasError("message") && (
                        <div className="flex items-start gap-2 mt-2 px-1">
                          <AlertCircle
                            size={14}
                            className="text-amber-600 flex-shrink-0 mt-0.5"
                          />
                          <span className="text-xs font-medium text-amber-600">
                            Faltan {MIN_MESSAGE_LENGTH - messageLength}{" "}
                            caracteres para el mínimo
                          </span>
                        </div>
                      )}

                    {/* Error de validación Laravel */}
                    {getErrorMessage("message") && (
                      <div className="flex items-start gap-2 mt-2 px-1">
                        <AlertCircle
                          size={16}
                          className="text-red-600 flex-shrink-0 mt-0.5"
                        />
                        <span className="text-sm font-medium text-red-600 leading-relaxed">
                          {getErrorMessage("message")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Privacy Policy Notice */}
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <Shield
                      className="text-blue-600 flex-shrink-0 mt-0.5"
                      size={20}
                      strokeWidth={2}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Al enviar este formulario, aceptas nuestra{" "}
                        <button
                          type="button"
                          onClick={() => setShowPrivacyModal(true)}
                          className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors"
                        >
                          Política de Privacidad y Tratamiento de Datos
                        </button>
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3.5 px-6 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loading
                          className="p-2"
                          color="white"
                          variant="spinner"
                          size="sm"
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <span>Enviar Solicitud</span>
                        <ArrowRight size={18} strokeWidth={2.5} />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Additional Info */}
              <p className="text-sm text-slate-500 text-center mt-6">
                Responderemos tu solicitud en menos de 24 horas
              </p>
            </div>
          </div>
        </div>
      </section>

      {showPrivacyModal &&
        createPortal(
          <PrivacyModal onClose={() => setShowPrivacyModal(false)} />,
          document.body
        )}
    </>
  );
};
