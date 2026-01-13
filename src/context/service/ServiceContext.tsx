import { useContext } from "react";
import { ServiceContext } from "../../hooks/useServiceContext";

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error("useServiceContext must be used within a ServiceProvider");
  }
  return context;
};
