import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../hooks/useReport";
import Header from "../components/Header";

const severityConfig = {
  high: {
    text: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
    dot: "bg-red-400",
  },
  medium: {
    text: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
    dot: "bg-yellow-400",
  },
  low: {
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    dot: "bg-emerald-400",
  },
};

const ScoreRing = ({ score }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "#a78bfa" : score >= 40 ? "#facc15" : "#f87171";
  const label =
    score >= 70
      ? "Strong Match"
      : score >= 40
        ? "Moderate Match"
        : "Weak Match";

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" width="144" height="144">
          <circle
            cx="72"
            cy="72"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
          />
          <circle
            cx="72"
            cy="72"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1.2s ease",
              filter: `drop-shadow(0 0 10px ${color}80)`,
            }}
          />
        </svg>
        <div className="text-center relative z-10">
          <div className="text-4xl font-bold text-white">{score}</div>
          <div className="text-[11px] text-white/30 mt-0.5">/ 100</div>
        </div>
      </div>
      <span style={{ color }} className="text-sm font-semibold mt-2">
        {label}
      </span>
    </div>
  );
};

const QuestionCard = ({ item, index, accentColor }) => {
  const [open, setOpen] = useState(false);

  const accents = {
    violet: {
      num: "text-violet-400 bg-violet-400/10",
      intent: "text-violet-300",
    },
    indigo: {
      num: "text-indigo-400 bg-indigo-400/10",
      intent: "text-indigo-300",
    },
  };
  const c = accents[accentColor] || accents.violet;

  return (
    <div className="bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.14] rounded-2xl p-5 transition-all duration-200">
      <div className="flex items-start gap-3">
        <span
          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${c.num} flex-shrink-0 mt-0.5`}
        >
          Q{index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-[15px] leading-snug mb-3">
            {item.question}
          </p>

          <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-3">
            <svg
              className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${c.intent}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-white/40 text-[12px] leading-relaxed">
              <span className={`font-semibold ${c.intent}`}>Intent: </span>
              {item.intention}
            </p>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1.5 text-[12px] font-semibold text-white/35 hover:text-white/70 transition-colors"
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            {open ? "Hide" : "Show"} suggested answer
          </button>

          {open && (
            <div className="mt-3 px-4 py-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20">
              <p className="text-emerald-300/80 text-[13px] leading-relaxed">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ icon, title, count }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-base">
      {icon}
    </div>
    <div>
      <h2 className="text-white font-semibold text-[16px] leading-none">
        {title}
      </h2>
      {count && <p className="text-white/30 text-[11px] mt-0.5">{count}</p>}
    </div>
  </div>
);

const ReportDetail = () => {
  const navigate = useNavigate();
  const { currentReport } = useReport();
  const report = currentReport;

  if (!report) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-violet-700/25 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 rounded-3xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-4xl mx-auto mb-5">
            ✦
          </div>
          <h2 className="text-white text-xl font-semibold mb-2">
            No report found
          </h2>
          <p className="text-white/35 text-sm mb-6">
            Generate a report first to see results here.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-violet-600/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const date = new Date(report.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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

          {/* Hero card */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/30 to-indigo-600/20 blur-2xl scale-105 -z-10" />
            <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.12] rounded-3xl px-8 py-7 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-violet-400">
                      {date}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                    {report.job_title}
                  </h1>
                  <p className="text-white/35 text-[14px] leading-relaxed max-w-xl">
                    {report.self_description}
                  </p>
                </div>
                <ScoreRing score={report.match_score} />
              </div>
            </div>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
                <SectionTitle
                  icon="⚙️"
                  title="Technical Questions"
                  count={`${report.technical_question?.length} questions`}
                />
                <div className="space-y-3">
                  {report.technical_question?.map((item, i) => (
                    <QuestionCard
                      key={i}
                      item={item}
                      index={i}
                      accentColor="violet"
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
                <SectionTitle
                  icon="🧠"
                  title="Behavioral Questions"
                  count={`${report.behavioral_question?.length} questions`}
                />
                <div className="space-y-3">
                  {report.behavioral_question?.map((item, i) => (
                    <QuestionCard
                      key={i}
                      item={item}
                      index={i}
                      accentColor="indigo"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
                <SectionTitle
                  icon="📊"
                  title="Skills Gap"
                  count={`${report.skills_gap?.length} gaps found`}
                />
                <div className="space-y-2">
                  {report.skills_gap?.map((item, i) => {
                    const s =
                      severityConfig[item.severinity] || severityConfig.low;
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-3 py-2.5 border-b border-white/[0.05] last:border-0"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`}
                          />
                          <span className="text-white/70 text-[13px] truncate">
                            {item.skill}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border flex-shrink-0 ${s.text} ${s.bg} ${s.border}`}
                        >
                          {item.severinity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
                <SectionTitle
                  icon="📅"
                  title="Prep Plan"
                  count={`${report.preperation_plan?.length} days`}
                />
                <div className="space-y-4">
                  {report.preperation_plan?.map((day, i) => (
                    <div key={i} className="relative pl-6">
                      {i < report.preperation_plan.length - 1 && (
                        <div className="absolute left-[9px] top-5 bottom-0 w-px bg-white/[0.06]" />
                      )}
                      <div className="absolute left-0 top-1 w-[18px] h-[18px] rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center">
                        <span className="text-violet-400 text-[9px] font-bold">
                          {day.Day}
                        </span>
                      </div>
                      <div className="pb-3">
                        <p className="text-white font-semibold text-[13px] mb-1.5">
                          {day.focus}
                        </p>
                        <ul className="space-y-1">
                          {day.tasks?.map((task, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-1.5 text-white/40 text-[11px] leading-relaxed"
                            >
                              <span className="text-violet-500 mt-0.5 flex-shrink-0">
                                ▸
                              </span>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="relative group overflow-hidden px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">+ Generate Another Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
