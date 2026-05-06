import React from "react";
import Header from "../components/header";
import ReportForm from "../components/reportForm";
import { useReport } from "../hooks/useReport";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const { handleGenerateReport, loading } = useReport();

  const handleSubmit = async (formData) => {
    const report = await handleGenerateReport(formData);
    if (report) {
      navigate(`/report/${report._id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-violet-700/25 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px]" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #a78bfa 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative z-10">
        <Header />
        <div className="flex items-center justify-center px-4 py-12">
          <ReportForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
