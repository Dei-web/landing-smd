import { useEffect, useState, useRef } from "react";
import type { Service } from "../types/service.types";
import fetchService from "../services/service.service";

export const useService = () => {
  const [service, setService] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true); // Ya inicia en true
  const [error, setError] = useState<Error | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    fetchService()
      .then((data) => {
        setService(data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        console.error("Error fetching services:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    service,
    loading,
    error,
  };
};
