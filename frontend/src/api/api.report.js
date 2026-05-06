import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const generateReport = async (formData) => {
  try {
    const response = await api.post("/api/interviewreport/generate", formData);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to generate report");
    throw error;
  }
};

export const getReportsByUser = async () => {
  try {
    const response = await api.get("/api/interviewreport/myreports");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch reports");
    throw error;
  }
};
