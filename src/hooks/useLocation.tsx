import { useEffect, useState } from "react";
import type { MapLocation } from "../types/map.types";
import fetchLocations from "../services/map.service";

export const useLocation = () => {
  const [locations, setLocations] = useState<MapLocation[]>([]);

  useEffect(() => {
    fetchLocations().then(setLocations);
  }, []);

  return {
    locations
  };
};
