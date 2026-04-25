import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";

const SignUp = () => {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleRegister(form);
    if (result) {
      navigate("/");
    }
  };
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0f]">
      {/* ── Animated background orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-violet-700/25 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px]" />
      </div>

      {/* ── Subtle dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #a78bfa 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Card ── */}
      <div className="relative z-10 w-full max-w-[460px] mx-4">
        {/* Glow ring behind card */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/30 to-indigo-600/20 blur-2xl scale-105 -z-10" />

        <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.12] rounded-3xl px-10 py-7 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
          {/* ── Brand ── */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/40 text-xl">
              ✦
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-2xl font-bold tracking-tight">
                PerfectFit
              </span>
              <span className="text-[10px] font-semibold tracking-[0.15em] text-violet-400 bg-violet-400/10 border border-violet-400/20 rounded-full px-2 py-0.5 uppercase">
                Gen AI
              </span>
            </div>
          </div>

          {/* ── Heading ── */}
          <div className="mb-5">
            <h1 className="text-3xl font-bold text-white tracking-tight leading-tight mb-1">
              Create account
            </h1>
            <p className="text-white/40 text-[15px]">
              Join PerfectFit and get started today
            </p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name */}
            <div className="group">
              <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-2 group-focus-within:text-violet-400 transition-colors">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-violet-400 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className="w-full bg-white/[0.06] border border-white/[0.1] hover:border-white/20 focus:border-violet-500 focus:bg-violet-500/[0.07] focus:ring-4 focus:ring-violet-500/[0.15] rounded-xl pl-11 pr-4 py-3 text-white text-[15px] placeholder-white/20 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-2 group-focus-within:text-violet-400 transition-colors">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-violet-400 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="w-full bg-white/[0.06] border border-white/[0.1] hover:border-white/20 focus:border-violet-500 focus:bg-violet-500/[0.07] focus:ring-4 focus:ring-violet-500/[0.15] rounded-xl pl-11 pr-4 py-3 text-white text-[15px] placeholder-white/20 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-2 group-focus-within:text-violet-400 transition-colors">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-violet-400 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className="w-full bg-white/[0.06] border border-white/[0.1] hover:border-white/20 focus:border-violet-500 focus:bg-violet-500/[0.07] focus:ring-4 focus:ring-violet-500/[0.15] rounded-xl pl-11 pr-12 py-3 text-white text-[15px] placeholder-white/20 outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-white/20 mt-1.5 pl-1">
                Must be at least 8 characters
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 accent-violet-500 cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-[13px] text-white/35 leading-relaxed cursor-pointer"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full relative group overflow-hidden py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-[15px] tracking-wide shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 mt-2"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative">Create Account →</span>
            </button>
          </form>

          {/* ── Divider ── */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-white/10" />
            <span className="text-[11px] text-white/20 tracking-wider uppercase">
              Have an account?
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/10 to-white/10" />
          </div>

          {/* ── Sign In Link ── */}
          <a
            href="#"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/[0.1] hover:border-violet-500/50 hover:bg-violet-500/[0.06] text-white/50 hover:text-white text-[14px] font-medium transition-all duration-200 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 group-hover:text-violet-400 transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Sign in to existing account
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
