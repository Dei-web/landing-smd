import React from "react";

// ==========================================
// TIPOS
// ==========================================

type LoadingVariant =
  | "spinner"
  | "dots"
  | "pulse"
  | "skeleton"
  | "bars"
  | "circle";
type LoadingSize = "sm" | "md" | "lg" | "xl";

interface LoadingProps {
  variant?: LoadingVariant;
  size?: LoadingSize;
  message?: string;
  fullScreen?: boolean;
  color?: string;
  className?: string;
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export const Loading: React.FC<LoadingProps> = ({
  variant = "spinner",
  size = "md",
  message,
  fullScreen = false,
  color = "#3b82f6",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-95 z-50"
    : "flex flex-col items-center justify-center p-2";

  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return <SpinnerLoader size={sizeClasses[size]} color={color} />;
      case "dots":
        return <DotsLoader size={size} color={color} />;
      case "pulse":
        return <PulseLoader size={sizeClasses[size]} color={color} />;
      case "skeleton":
        return <SkeletonLoader />;
      case "bars":
        return <BarsLoader size={size} color={color} />;
      case "circle":
        return <CircleLoader size={sizeClasses[size]} color={color} />;
      default:
        return <SpinnerLoader size={sizeClasses[size]} color={color} />;
    }
  };

  return (
    <div className={`${containerClasses} ${className}`}>
      {renderLoader()}
      {message && (
        <p className="mt-4 text-gray-600 font-medium text-center animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

// ==========================================
// VARIANTES DE LOADERS
// ==========================================

// 1. Spinner Clásico
const SpinnerLoader: React.FC<{ size: string; color: string }> = ({
  size,
  color,
}) => (
  <div
    className={`${size} border-4 border-gray-200 border-t-4 rounded-full animate-spin`}
    style={{ borderTopColor: color }}
  />
);

// 2. Dots Animados
const DotsLoader: React.FC<{ size: LoadingSize; color: string }> = ({
  size,
  color,
}) => {
  const dotSizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
    xl: "w-6 h-6",
  };

  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${dotSizes[size]} rounded-full animate-bounce`}
          style={{
            backgroundColor: color,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
};

// 3. Pulse Circular
const PulseLoader: React.FC<{ size: string; color: string }> = ({
  size,
  color,
}) => (
  <div className="relative">
    <div
      className={`${size} rounded-full animate-ping absolute`}
      style={{ backgroundColor: color, opacity: 0.75 }}
    />
    <div
      className={`${size} rounded-full relative`}
      style={{ backgroundColor: color }}
    />
  </div>
);

// 4. Skeleton (para contenido)
const SkeletonLoader: React.FC = () => (
  <div className="w-full max-w-md space-y-4 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    <div className="h-32 bg-gray-200 rounded w-full mt-4"></div>
    <div className="flex space-x-4 mt-4">
      <div className="h-12 bg-gray-200 rounded flex-1"></div>
      <div className="h-12 bg-gray-200 rounded flex-1"></div>
    </div>
  </div>
);

// 5. Bars Animadas
const BarsLoader: React.FC<{ size: LoadingSize; color: string }> = ({
  size,
  color,
}) => {
  const barHeights = {
    sm: ["h-4", "h-6", "h-4"],
    md: ["h-6", "h-8", "h-6"],
    lg: ["h-8", "h-12", "h-8"],
    xl: ["h-12", "h-16", "h-12"],
  };

  return (
    <div className="flex items-end space-x-2">
      {barHeights[size].map((height, i) => (
        <div
          key={i}
          className={`w-2 ${height} rounded-full animate-pulse`}
          style={{
            backgroundColor: color,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
};

// 6. Circle Progress
const CircleLoader: React.FC<{ size: string; color: string }> = ({
  size,
  color,
}) => (
  <svg className={`${size} animate-spin`} viewBox="0 0 50 50">
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke="#e5e7eb"
      strokeWidth="4"
    />
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke={color}
      strokeWidth="4"
      strokeDasharray="80 120"
      strokeLinecap="round"
      className="animate-dash"
    />
  </svg>
);

// ==========================================
// COMPONENTES ESPECIALIZADOS
// ==========================================

// Loading para Páginas Completas
export const PageLoading: React.FC<{ message?: string }> = ({
  message = "Cargando...",
}) => <Loading variant="spinner" size="lg" message={message} fullScreen />;

// Loading para Botones
export const ButtonLoading: React.FC<{ size?: LoadingSize }> = ({
  size = "sm",
}) => (
  <SpinnerLoader
    size={size === "sm" ? "w-4 h-4" : "w-5 h-5"}
    color="currentColor"
  />
);

// Loading Overlay (para modals, etc)
export const OverlayLoading: React.FC<{ message?: string }> = ({ message }) => (
  <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 rounded-lg">
    <Loading variant="spinner" size="md" message={message} />
  </div>
);

// Loading Card (para tarjetas)
export const CardLoading: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
    <div className="h-32 bg-gray-200 rounded w-full"></div>
  </div>
);

// ==========================================
// ESTILOS CSS (agregar a tu CSS global)
// ==========================================

export const LoadingStyles = () => (
  <style>{`
    @keyframes dash {
      0% {
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dashoffset: -100;
      }
      100% {
        stroke-dashoffset: -200;
      }
    }

    .animate-dash {
      animation: dash 1.5s ease-in-out infinite;
    }

    /* Suavizar animaciones */
    @media (prefers-reduced-motion: reduce) {
      .animate-spin,
      .animate-pulse,
      .animate-bounce,
      .animate-dash {
        animation: none;
      }
    }
  `}</style>
);

export default Loading;
