import { createContext, useState } from "react";

export const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [currentReport, setCurrentReport] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <ReportContext.Provider
      value={{
        reports,
        setReports,
        currentReport,
        setCurrentReport,
        loading,
        setLoading,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
