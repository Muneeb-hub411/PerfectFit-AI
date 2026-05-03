const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const reportRounter = require("./routes/interviewreportRoute");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(morgan("tiny"));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

/**
 * added the prefix "/api/auth" to all routes defined in the authRouter. This means that any route defined in authRouter will be accessible under the "/api/auth" path. For example, if authRouter has a route defined as "/login", it will be accessible at "/api/auth/login".
 */
app.use("/api/auth", authRouter);

app.use("/api/interviewreport", reportRounter);

app.get("/", (req, res) => {
  res.send("Welcome to the PerfectFit-AI backend!");
});
module.exports = app;
