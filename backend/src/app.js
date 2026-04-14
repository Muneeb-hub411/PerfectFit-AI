const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the PerfectFit-AI backend!");
});
module.exports = app;
