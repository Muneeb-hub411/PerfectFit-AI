import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const success = await handleLogin(form);
    if (success) navigate("/");
  };
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0f]">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0f] overflow-y-auto py-6">
      {/* ── Animated background orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-violet-700/25 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
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

        <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.12] rounded-3xl p-10 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
          {/* ── Brand ── */}
          <div className="flex items-center gap-3 mb-10">
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white tracking-tight leading-tight mb-2">
              Welcome back
            </h1>
            <p className="text-white/40 text-[15px]">
              Sign in to your account to continue
            </p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="group">
              <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-2 group-focus-within:text-violet-400 transition-colors">
                Email
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
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="w-full bg-white/[0.06] border border-white/[0.1] hover:border-white/20 focus:border-violet-500 focus:bg-violet-500/[0.07] focus:ring-4 focus:ring-violet-500/[0.15] rounded-xl pl-11 pr-4 py-3.5 text-white text-[15px] placeholder-white/20 outline-none transition-all duration-200"
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
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="w-full bg-white/[0.06] border border-white/[0.1] hover:border-white/20 focus:border-violet-500 focus:bg-violet-500/[0.07] focus:ring-4 focus:ring-violet-500/[0.15] rounded-xl pl-11 pr-12 py-3.5 text-white text-[15px] placeholder-white/20 outline-none transition-all duration-200"
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
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-[13px] text-white/30 hover:text-violet-400 transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full relative group overflow-hidden py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-[15px] tracking-wide shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              {/* Shine sweep on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative">Sign In →</span>
            </button>
          </form>

          {/* ── Divider ── */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-white/10" />
            <span className="text-[11px] text-white/20 tracking-wider uppercase">
              New here?
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/10 to-white/10" />
          </div>

          {/* ── Create Account ── */}
          <a
            href="#"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-white/[0.1] hover:border-violet-500/50 hover:bg-violet-500/[0.06] text-white/50 hover:text-white text-[14px] font-medium transition-all duration-200 group"
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
            Create a new account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
