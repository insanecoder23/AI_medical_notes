import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ConsultationData {
  patientName: string;
  patientAge: string;
  language: string;
  consultationType: string;
  consentTimestamp: string;
}

interface ConsultationContextType {
  data: ConsultationData;
  setData: (data: ConsultationData) => void;
}

const defaultData: ConsultationData = {
  patientName: "",
  patientAge: "",
  language: "English",
  consultationType: "General Physician",
  consentTimestamp: "",
};

const ConsultationContext = createContext<ConsultationContextType>({
  data: defaultData,
  setData: () => {},
});

export const useConsultation = () => useContext(ConsultationContext);

export const ConsultationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ConsultationData>(defaultData);
  return (
    <ConsultationContext.Provider value={{ data, setData }}>
      {children}
    </ConsultationContext.Provider>
  );
};
