import { useContext } from "react";
import { useMapContext } from "../../hooks/useMapContext";

export const MapContext = () => {
  const ctx = useContext(useMapContext);
  if (!ctx) {
    throw new Error("Map debe ser usado dentro de MapProvider");
  }
  return ctx;
};
