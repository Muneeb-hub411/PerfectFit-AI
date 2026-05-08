const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Fix flat array like ["question", "Q1", "intention", "I1", "answer", "A1"]
// into [{ question: "Q1", intention: "I1", answer: "A1" }]
const fixFlatArray = (arr, keys) => {
  if (!Array.isArray(arr) || arr.length === 0) return arr;
  if (typeof arr[0] === "object" && arr[0] !== null) return arr; // already correct

  const result = [];
  const chunkSize = keys.length * 2; // each key appears as label + value
  for (let i = 0; i < arr.length; i += chunkSize) {
    const obj = {};
    keys.forEach((key, j) => {
      obj[key] = arr[i + j * 2 + 1];
    });
    result.push(obj);
  }
  return result;
};

const sanitizeResponse = (data) => {
  data.technical_question = fixFlatArray(data.technical_question, [
    "question",
    "intention",
    "answer",
  ]);

  data.behavioral_question = fixFlatArray(data.behavioral_question, [
    "question",
    "intention",
    "answer",
  ]);

  data.skills_gap = fixFlatArray(data.skills_gap, ["skill", "severinity"]);

  if (Array.isArray(data.skills_gap)) {
    data.skills_gap = data.skills_gap.map((s) => ({
      ...s,
      severinity: s.severinity?.toLowerCase(),
    }));
  }

  data.preperation_plan = fixFlatArray(data.preperation_plan, [
    "Day",
    "focus",
    "tasks",
  ]);

  if (Array.isArray(data.preperation_plan)) {
    data.preperation_plan = data.preperation_plan.map((p) => ({
      ...p,
      Day: Number(p.Day),
      tasks: Array.isArray(p.tasks) ? p.tasks : [p.tasks],
    }));
  }

  return data;
};

const validateResponse = (data) => {
  const errors = [];

  if (typeof data.match_score !== "number")
    errors.push("match_score must be a number");
  if (typeof data.title !== "string") errors.push("title must be a string");

  ["technical_question", "behavioral_question"].forEach((field) => {
    if (!Array.isArray(data[field]) || data[field].length < 3)
      errors.push(`${field} must be an array with at least 3 items`);
    data[field]?.forEach((item, i) => {
      if (!item.question || !item.intention || !item.answer)
        errors.push(`${field}[${i}] missing required fields`);
    });
  });

  if (!Array.isArray(data.skills_gap) || data.skills_gap.length < 2)
    errors.push("skills_gap must have at least 2 items");
  data.skills_gap?.forEach((item, i) => {
    if (!["low", "medium", "high"].includes(item.severinity))
      errors.push(`skills_gap[${i}].severinity must be low/medium/high`);
  });

  if (!Array.isArray(data.preperation_plan) || data.preperation_plan.length < 5)
    errors.push("preperation_plan must have at least 5 days");

  if (errors.length > 0) throw new Error(errors.join(" | "));
};

const generateInterviewReport = async ({
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

STRICT RULES:
- Return ONLY a single valid JSON object. No markdown, no code fences, no extra text.
- Every array must contain OBJECTS, never flat strings.
- WRONG:  "technical_question": ["question", "How do...", "intention", "To assess..."]
- CORRECT: "technical_question": [{ "question": "How do...", "intention": "To assess...", "answer": "..." }]
- severinity must be lowercase only: "low", "medium", or "high"
- tasks must be an array of strings.

Return a JSON object with this EXACT structure:

{
  "match_score": 85,
  "title": "MERN Stack Developer",
  "technical_question": [
    {
      "question": "How do you manage state in a large React application?",
      "intention": "To assess the candidate's knowledge of React state management patterns.",
      "answer": "Discuss Redux, Zustand, or Context API. Mention when to use each based on app complexity."
    },
    {
      "question": "Explain the event loop in Node.js.",
      "intention": "To evaluate understanding of Node.js async architecture.",
      "answer": "Explain the call stack, callback queue, and how the event loop processes async operations non-blocking."
    },
    {
      "question": "How would you optimize a slow MongoDB query?",
      "intention": "To test database performance knowledge.",
      "answer": "Mention indexing, using .explain(), avoiding $where, projection to limit fields, and aggregation pipelines."
    }
  ],
  "behavioral_question": [
    {
      "question": "Tell me about a time you missed a deadline. How did you handle it?",
      "intention": "To assess accountability and time management.",
      "answer": "Use STAR method. Situation: tight sprint. Task: deliver feature. Action: communicated early, reprioritized. Result: partial delivery with plan for rest."
    },
    {
      "question": "Describe a conflict with a teammate and how you resolved it.",
      "intention": "To evaluate communication and professionalism.",
      "answer": "Focus on listening, finding common ground, and keeping the team goal in focus. Avoid blaming."
    },
    {
      "question": "How do you handle working under pressure with multiple deadlines?",
      "intention": "To gauge stress management and prioritization skills.",
      "answer": "Explain task prioritization using urgency/impact matrix, clear communication with manager, and breaking tasks into smaller chunks."
    }
  ],
  "skills_gap": [
    { "skill": "Docker and containerization", "severinity": "high" },
    { "skill": "TypeScript", "severinity": "medium" },
    { "skill": "CI/CD pipelines", "severinity": "low" }
  ],
  "preperation_plan": [
    { "Day": 1, "focus": "React Advanced Concepts", "tasks": ["Revise useCallback, useMemo", "Build a small app using Redux Toolkit"] },
    { "Day": 2, "focus": "Node.js and Express Security", "tasks": ["Study OWASP Top 10", "Implement JWT authentication"] },
    { "Day": 3, "focus": "MongoDB Optimization", "tasks": ["Practice aggregation pipelines", "Learn indexing strategies"] },
    { "Day": 4, "focus": "Docker and CI/CD", "tasks": ["Containerize a Node.js app", "Set up GitHub Actions pipeline"] },
    { "Day": 5, "focus": "Mock Interviews", "tasks": ["Do a full mock interview", "Prepare project walkthroughs"] }
  ]
}

Generate the actual report now for the candidate above. Same structure, different content.`;

  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${MAX_RETRIES}`);

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json", // keep this — still helps even if schema is ignored
          temperature: 0.3,
        },
      });

      const rawText = response.text
        .trim()
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```\s*$/i, "")
        .trim();

      console.log("Raw AI Response:", rawText);

      const parsed = JSON.parse(rawText);
      const sanitized = sanitizeResponse(parsed);
      validateResponse(sanitized); // throws if still broken

      console.log(`Success on attempt ${attempt}`);
      return sanitized;
    } catch (err) {
      console.error(`Attempt ${attempt} failed:`, err.message);
      if (attempt === MAX_RETRIES) {
        throw new Error(
          `AI failed after ${MAX_RETRIES} attempts: ${err.message}`,
        );
      }
      await new Promise((res) => setTimeout(res, attempt * 1500));
    }
  }
};

module.exports = { generateInterviewReport };
