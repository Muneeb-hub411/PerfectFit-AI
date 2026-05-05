const interviewReportModel = require("../models/interviewReport.model");
const { generateInterviewReport } = require("../services/gemini.ai.service");
const pdfParse = require("pdf-parse");

const generateReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume PDF is required" });
    }

    const { self_description, job_title, job_description } = req.body;

    if (!self_description || !job_title || !job_description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const pdfData = await new pdfParse.PDFParse(
      Uint8Array.from(req.file.buffer),
    ).getText();

    const pdfData = await PDFParser(req.file.buffer);

    const resume_text = pdfData.text;

    if (!resume_text) {
      return res
        .status(400)
        .json({ message: "Could not extract text from PDF" });
    }

    const report = await generateInterviewReport({
      resume_text,
      self_description,
      job_title,
      job_description,
    });
    console.log("Generated Report:", report); // Debugging line to see the generated report

    const interviewReport = await interviewReportModel.create({
      user_id: req.userId,
      resume_text,
      self_description,
      job_title,
      job_description,
      technical_question: report.technical_question,
      behavioral_question: report.behavioral_question,
      skills_gap: report.skills_gap,
      preperation_plan: report.preperation_plan,
      match_score: report.match_score,
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

const getreportByUserId = async (req, res) => {
  try {
    const reports = await interviewReportModel.find({ user_id: req.userId });
    res.status(200).json({ reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateReport,
  getreportByUserId,
};
