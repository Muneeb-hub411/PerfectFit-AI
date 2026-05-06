import { useContext, useEffect } from "react";
import { ReportContext } from "../context/reportContext";
import {
  generateReport as generateReportApi,
  getReportsByUser,
} from "../api/api.report";
import { toast } from "react-toastify";

export const useReport = () => {
  const context = useContext(ReportContext);
  const {
    reports,
    setReports,
    currentReport,
    setCurrentReport,
    loading,
    setLoading,
  } = context;

  const handleGenerateReport = async (formData) => {
    setLoading(true);
    try {
      const data = await generateReportApi(formData);
      setReports((prev) => [data.report, ...prev]);
      setCurrentReport(data.report);
      toast.success("Report generated successfully");
      return data.report;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to generate report");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllReports = async () => {
    setLoading(true);
    try {
      const data = await getReportsByUser();
      setReports(data.reports);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllReports();
  }, []);

  return {
    handleGenerateReport,
    handleGetAllReports,
    reports,
    currentReport,
    setCurrentReport,
    loading,
  };
};
