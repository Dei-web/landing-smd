import React, { useMemo } from "react";
import { useService } from "../../hooks/useService";
import { ServiceContext } from "../../hooks/useServiceContext";

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const serviceData = useService();

  const value = useMemo(
    () => serviceData,
    [serviceData.service, serviceData.error]
  );

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};
