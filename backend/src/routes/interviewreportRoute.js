const reportController = require("../controllers/reportController");

const { Router } = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const upload = require("../config/confi.multer");

const interviewReportRouter = Router();

/********************
 * @route POST /api/interviewreport/generate
 * @desc Generate an interview report based on the provided resume, self-description, job title, and job description.
 * @access Private
 ********************/
interviewReportRouter.post(
  "/generate",
  authMiddleware,
  upload.single("resume"),
  reportController.generateReport,
);

module.exports = interviewReportRouter;
