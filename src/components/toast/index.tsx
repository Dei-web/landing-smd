// components/Toast/ToastContainer.tsx
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { useToast } from "../../context/toast/ToastContext";
import type { Toast } from "../../types/toast.types";

const TOAST_CONFIG = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-900",
    iconColor: "text-emerald-600",
    progressColor: "bg-emerald-600",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-50",
    textColor: "text-red-900",
    iconColor: "text-red-600",
    progressColor: "bg-red-600",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-amber-50",
    textColor: "text-amber-900",
    iconColor: "text-amber-600",
    progressColor: "bg-amber-600",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50",
    textColor: "text-blue-900",
    iconColor: "text-blue-600",
    progressColor: "bg-blue-600",
  },
};

function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useToast();
  const config = TOAST_CONFIG[toast.type];
  const Icon = config.icon;

  // Handle both string and array messages
  const renderMessage = () => {
    if (Array.isArray(toast.message)) {
      return (
        <div className="space-y-1">
          {toast.message.map((msg, idx) => (
            <p
              key={idx}
              className={`${config.textColor} text-sm font-medium leading-relaxed`}
            >
              • {msg}
            </p>
          ))}
        </div>
      );
    }
    return (
      <p className={`${config.textColor} text-sm font-medium leading-relaxed`}>
        {toast.message}
      </p>
    );
  };

  return (
    <div
      className={`toast-item flex items-start gap-3 ${config.bgColor} p-4 rounded-lg shadow-lg backdrop-blur-sm min-w-[320px] max-w-md`}
    >
      <Icon
        className={`${config.iconColor} flex-shrink-0 mt-0.5`}
        size={20}
        strokeWidth={2.5}
      />

      <div className="flex-1 min-w-0">
        {renderMessage()}

        {/* Progress bar */}
        {toast.duration && toast.duration > 0 && (
          <div className="mt-2 h-1 bg-black/10 rounded-full overflow-hidden">
            <div
              className={`h-full ${config.progressColor} progress-bar`}
              style={{
                animation: `shrink ${toast.duration}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>

      <button
        onClick={() => removeToast(toast.id)}
        className={`${config.textColor} hover:opacity-70 transition-opacity flex-shrink-0`}
        aria-label="Cerrar notificación"
      >
        <X size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts } = useToast();

  return (
    <>
      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-out {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }

        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .toast-item {
          animation: slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .toast-item.removing {
          animation: slide-out 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .progress-bar {
          transform-origin: left;
        }
      `}</style>

      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} />
          </div>
        ))}
      </div>
    </>
  );
}
