const GoogleGenAI = require("@google/genai").GoogleGenAI;
const z = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const technicalQuestionSchema = z.object({
  question: z.string().describe("Technical interview question"),
  answer: z.string().describe("Suggested answer for the question"),
  intention: z.string().describe("What the interviewer wants to assess"),
});

const behavioralQuestionSchema = z.object({
  question: z.string().describe("Behavioral interview question"),
  answer: z.string().describe("Suggested answer for the question"),
  intention: z.string().describe("What the interviewer wants to assess"),
});

const skillsGapSchema = z.object({
  skill: z.string().describe("Missing or weak skill"),
  severinity: z
    .enum(["low", "medium", "high"])
    .describe("Severity of the skill gap"),
});

const preparationPlanSchema = z.object({
  Day: z.number().describe("Day number of the preparation plan"),
  tasks: z.array(z.string()).describe("List of tasks for the day"),
  focus: z.string().describe("Main focus area for the day"),
});

const interviewReportSchema = z.object({
  technical_question: z.array(technicalQuestionSchema),
  behavioral_question: z.array(behavioralQuestionSchema),
  skills_gap: z.array(skillsGapSchema),
  preperation_plan: z.array(preparationPlanSchema),
  match_score: z
    .number()
    .describe("Match score between resume and job description 0-100"),
});

// ================= AI CALL =================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateInterviewReport = async ({
  resume_text,
  self_description,
  job_title,
  job_description,
}) => {
  const prompt = `
    You are an expert interview coach and career advisor.
    
    Analyze the following resume and job description and generate a detailed interview report.

    Resume:
    ${resume_text}

    Self Description:
    ${self_description}

    Job Title:
    ${job_title}

    Job Description:
    ${job_description}

    Please provide:
    1. 5 technical questions with answers and intentions
    2. 5 behavioral questions with answers and intentions
    3. Skills gap analysis with severity
    4. A 7-day preparation plan with daily tasks and focus areas
    5. A match score (0-100) based on resume vs job description
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  const report = interviewReportSchema.parse(JSON.parse(response.text));
  return report;
};
