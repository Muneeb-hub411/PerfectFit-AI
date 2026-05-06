import React from "react";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full relative z-50">
      <div className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/[0.06]" />
      <div className="absolute inset-0 bg-gradient-to-r from-violet-950/20 via-transparent to-indigo-950/20 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left — Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/40 text-base select-none">
            ✦
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-white text-[17px] font-bold tracking-tight leading-none">
              PerfectFit
            </span>
            <span className="text-[9px] font-semibold tracking-[0.18em] text-violet-400 bg-violet-400/10 border border-violet-400/20 rounded-full px-2 py-0.5 uppercase leading-none">
              Gen AI
            </span>
          </div>
        </div>

        {/* Right — Nav + status */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/my-reports")}
            className="text-white/40 hover:text-white text-sm font-medium transition-colors"
          >
            My Reports
          </button>

          <div className="h-4 w-px bg-white/[0.08]" />

          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/60 animate-pulse" />
            <span className="text-[11px] text-white/30 font-medium tracking-wide">
              AI Ready
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
