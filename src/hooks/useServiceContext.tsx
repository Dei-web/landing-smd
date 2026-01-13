import { createContext } from "react";
import type { Service } from "../types/service.types";

interface ServiceContextType {
  service: Service[];
  loading: boolean;
  error: Error | null;
}

export const ServiceContext = createContext<ServiceContextType | undefined>(undefined);
