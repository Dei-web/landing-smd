import { createContext } from "react";
import type { LocationContextType } from "../types/contextTypes/mapContext.types";

export const useLocationContext = createContext<LocationContextType | null>(null);
