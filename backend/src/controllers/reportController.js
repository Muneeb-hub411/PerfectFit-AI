const interviewReportModel = require("../models/interviewReport.model");
const { generateInterviewReport } = require("../services/gemini.ai.service");
const PDFParser = require("pdf-parse");

const generateReport = async (req, res) => {
  try {
    // PDF check karo
    if (!req.file) {
      return res.status(400).json({ message: "Resume PDF is required" });
    }

    const { self_description, job_title, job_description } = req.body;

    // Fields check karo
    if (!self_description || !job_title || !job_description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // PDF se text nikalo
    const pdfData = await PDFParser(req.file.buffer);
    const resume_text = pdfData.text;

    if (!resume_text) {
      return res
        .status(400)
        .json({ message: "Could not extract text from PDF" });
    }

    // AI ko bhejo
    const report = await generateInterviewReport({
      resume_text,
      self_description,
      job_title,
      job_description,
    });

    // DB mein save karo
    const interviewReport = await interviewReportModel.create({
      user_id: req.userId,
      resume_text,
      self_description,
      job_title,
      job_description,
      ...report,
    });

    res.status(201).json({
      message: "Report generated successfully",
      report: interviewReport,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateReport,
};
