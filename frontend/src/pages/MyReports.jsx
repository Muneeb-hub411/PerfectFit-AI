import React from "react";
import { useNavigate } from "react-router";
import { useReport } from "../hooks/useReport";
import Header from "../components/Header";

const severityConfig = {
  high: {
    text: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
  },
  medium: {
    text: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
  },
  low: {
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
};

const ScoreRing = ({ score }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "#a78bfa" : score >= 40 ? "#facc15" : "#f87171";

  return (
    <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
      <svg className="absolute inset-0 -rotate-90" width="64" height="64">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="4"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="text-white font-bold text-sm relative z-10">
        {score}
      </span>
    </div>
  );
};

const ReportCard = ({ report, onClick }) => {
  const date = new Date(report.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const topGaps = report.skills_gap?.slice(0, 2) || [];

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-violet-500/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-900/30"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/0 to-indigo-600/0 group-hover:from-violet-600/5 group-hover:to-indigo-600/5 transition-all duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-violet-400">
                {date}
              </span>
            </div>
            <h3 className="text-white font-semibold text-[15px] leading-snug truncate">
              {report.job_title}
            </h3>
            <p className="text-white/35 text-[12px] mt-0.5 truncate">
              {report.self_description}
            </p>
          </div>
          <ScoreRing score={report.match_score} />
        </div>

        {topGaps.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {topGaps.map((g, i) => {
              const s = severityConfig[g.severinity] || severityConfig.low;
              return (
                <span
                  key={i}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.text} ${s.bg} ${s.border}`}
                >
                  {g.skill}
                </span>
              );
            })}
            {report.skills_gap?.length > 2 && (
              <span className="text-[10px] text-white/25 px-2 py-0.5">
                +{report.skills_gap.length - 2} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 text-[11px] text-white/30">
            <span>⚙️ {report.technical_question?.length || 0} technical</span>
            <span>🧠 {report.behavioral_question?.length || 0} behavioral</span>
          </div>
          <span className="text-violet-400 text-[11px] font-semibold group-hover:text-violet-300 transition-colors">
            View report →
          </span>
        </div>
      </div>
    </div>
  );
};

const MyReports = () => {
  const navigate = useNavigate();
  const { reports, loading, setCurrentReport } = useReport();

  const handleOpen = (report) => {
    setCurrentReport(report);
    navigate(`/report/${report._id}`);
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

        <div className="max-w-5xl mx-auto px-4 py-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors group mb-8"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Dashboard
          </button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
                My Reports
              </h1>
              <p className="text-white/35 text-[15px]">
                {reports.length > 0
                  ? `${reports.length} report${reports.length > 1 ? "s" : ""} generated`
                  : "No reports yet"}
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">+ New Report</span>
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
              <span className="text-white/30 text-sm">Loading reports...</span>
            </div>
          ) : reports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-20 h-20 rounded-3xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-4xl mb-5">
                ✦
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">
                No reports yet
              </h3>
              <p className="text-white/35 text-sm mb-6 max-w-xs">
                Generate your first AI-powered interview report by submitting
                your resume and job details.
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-violet-600/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                Create First Report →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report) => (
                <ReportCard
                  key={report._id}
                  report={report}
                  onClick={() => handleOpen(report)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReports;
