import { useContext } from "react";
import { useLocationContext } from "../../hooks/useLocationContext";

export default function LocationContext() {
  const ctx = useContext(useLocationContext);
  if (!ctx) {
    throw new Error("useLocation debe ser usado dentro de LocationProvider");
  }
  return ctx;
}
