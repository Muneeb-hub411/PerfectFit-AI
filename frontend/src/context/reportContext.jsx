import { createContext, useState } from "react";

export const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <ReportContext.Provider value={{ report, setReport, loading, setLoading }}>
      {children}
    </ReportContext.Provider>
  );
};
