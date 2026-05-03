const mongoose = require("mongoose");

const technicalQuestionSchema = new monoose.Schema(
  {
    question: {
      type: String,
    },
    answer: { type: String },
    intention: { type: String },
  },
  { _id: false },
);
const behavioralQuestionSchema = new monoose.Schema(
  {
    question: {
      type: String,
    },
    answer: { type: String },
    intention: { type: String },
  },
  { _id: false },
);

const skillsGapSchema = new monoose.Schema(
  {
    skill: {
      type: String,
    },
    severinity: { type: String, enum: ["low", "medium", "high"] },
  },
  { _id: false },
);

const preperationPlanSchema = new monoose.Schema(
  {
    Day: {
      type: Number,
      required: true,
    },
    tasks: [
      {
        type: String,
        required: true,
      },
    ],
    focus: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);
const interviewReportSchema = new monoose.Schema(
  {
    user_id: {
      type: monoose.Schema.Types.ObjectId,
      ref: "user_Model",
      required: [true, "User id is required"],
    },
    resume_text: {
      type: String,
      required: [true, "Resume text is required"],
    },
    self_description: {
      type: String,
      required: [true, "Self description is required"],
    },
    job_title: {
      type: String,
      required: [true, "Job title is required"],
    },
    job_description: {
      type: String,
      required: [true, "Job description is required"],
    },
    technical_question: [technicalQuestionSchema],
    behavioral_question: [behavioralQuestionSchema],
    skills_gap: [skillsGapSchema],
    preperation_plan: [preperationPlanSchema],
    match_score: {
      type: Number,
      required: [true, "Match score is required"],
    },
  },
  { timestamps: true },
);

const interviewReportModel = mongoose.model(
  "interview_report",
  interviewReportSchema,
);
module.exports = interviewReportModel;
