import React, { useState, useRef } from "react";

const ReportForm = ({ onSubmit, loading }) => {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState({
    job_title: "",
    job_description: "",
    self_description: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (f) => {
    if (f && f.type === "application/pdf") setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_title", form.job_title);
    formData.append("job_description", form.job_description);
    formData.append("self_description", form.self_description);

    onSubmit(formData);
  };

  const inputClass =
    "w-full bg-white/[0.06] border border-white/[0.1] hover:border-white/20 focus:border-violet-500 focus:bg-violet-500/[0.07] focus:ring-4 focus:ring-violet-500/[0.15] rounded-xl px-4 py-3 text-white text-[15px] placeholder-white/20 outline-none transition-all duration-200";

  const labelClass =
    "block text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-2 group-focus-within:text-violet-400 transition-colors";

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/30 to-indigo-600/20 blur-2xl scale-105 -z-10" />
      <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.12] rounded-3xl px-8 py-8 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
            Generate Report
          </h1>
          <p className="text-white/40 text-[15px]">
            Upload your resume and fill in the details to get your AI interview
            report.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelClass}>Resume (PDF)</label>
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 p-6 text-center ${
                dragging
                  ? "border-violet-500 bg-violet-500/10"
                  : file
                    ? "border-violet-500/50 bg-violet-500/[0.06]"
                    : "border-white/[0.1] hover:border-violet-500/40 hover:bg-white/[0.03]"
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />

              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-violet-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-medium truncate max-w-[220px]">
                      {file.name}
                    </p>
                    <p className="text-white/35 text-[11px]">
                      {(file.size / 1024).toFixed(1)} KB · PDF
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="ml-auto text-white/25 hover:text-red-400 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-white/30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <p className="text-white/40 text-sm mb-1">
                    <span className="text-violet-400 font-medium">
                      Click to upload
                    </span>{" "}
                    or drag & drop
                  </p>
                  <p className="text-white/20 text-[11px]">
                    PDF only · Max 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="group">
            <label className={labelClass}>Job Title</label>
            <input
              type="text"
              name="job_title"
              placeholder="e.g. MERN Stack Developer"
              value={form.job_title}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div className="group">
            <label className={labelClass}>Job Description</label>
            <textarea
              name="job_description"
              placeholder="Paste the full job description here..."
              value={form.job_description}
              onChange={handleChange}
              required
              rows={5}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="group">
            <label className={labelClass}>About Yourself</label>
            <textarea
              name="self_description"
              placeholder="Briefly describe yourself, your experience, and what you're looking for..."
              value={form.self_description}
              onChange={handleChange}
              required
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !file}
            className="w-full relative group overflow-hidden py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-[15px] tracking-wide shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="relative flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating your report...
                </>
              ) : (
                "Generate Interview Report →"
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
