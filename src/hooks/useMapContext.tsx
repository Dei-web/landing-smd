import { createContext } from "react";
import type { MapContextType } from "../types/contextTypes/mapContext.types"

export const useMapContext = createContext<MapContextType | null>(null);
