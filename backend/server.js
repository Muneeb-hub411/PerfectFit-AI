require("dotenv").config(); // ← sabse pehle add karo
const app = require("./src/app");

const { generateInterviewReport } = require("./src/services/gemini.ai.service");
const {
  resume_text,
  self_description,
  job_title,
  job_description,
} = require("./src/services/temp.js");
const connectToDb = require("./src/config/connectToDb.js");

/**
 * Connect to the MongoDB database.
 */
connectToDb();
console.log(
  generateInterviewReport({
    resume_text,
    self_description,
    job_title,
    job_description,
  }),
);

const PORT = process.env.PORT || 3000;

/**
 * Start the Express server on the specified port. The server will log a message to the console when it is running.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
