const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const interviewReportSchema = z.object({
  match_score: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job description",
    ),

  technical_question: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question asked in the interview"),
        intention: z
          .string()
          .describe("The intention behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, and approach",
          ),
      }),
    )
    .describe(
      "Technical questions along with their intention and suggested answers",
    ),

  behavioral_question: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioral question asked in the interview"),
        intention: z
          .string()
          .describe("The intention behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, and approach",
          ),
      }),
    )
    .describe(
      "Behavioral questions along with their intention and suggested answers",
    ),

  skills_gap: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("Severity of this skill gap"),
      }),
    )
    .describe("List of skill gaps with severity"),

  preperation_plan: z
    .array(
      z.object({
        Day: z
          .number()
          .describe("Day number in the preparation plan (starting from 1)"),
        focus: z.string().describe("Main focus area for the day"),
        tasks: z.array(z.string()).describe("Tasks to complete on this day"),
      }),
    )
    .describe("Day-wise preparation plan"),

  title: z.string().describe("The job title for which the report is generated"),
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateInterviewReport = async ({
  resume_text,
  self_description,
  job_title,
  job_description,
}) => {
  const prompt = `
    You are an expert interview coach and career advisor.
    
    Analyze the following resume and job description and generate a detailed interview report.
    You must return ONLY valid JSON. No explanation.

Use EXACTLY this structure:

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
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });
  console.log("Raw AI Response:", response.text); // Debugging line to see the raw response
  const JSonres = JSON.parse(response.text);
  console.log("Parsed AI Response:", JSonres); // Debugging line to see the parsed response
  return JSonres;
};

module.exports = { generateInterviewReport }; // ← export aisa karo
