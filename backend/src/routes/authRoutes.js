const { Router } = require("express");
const authcontroller = require("../controllers/authControllers.js");

const authRouter = Router();

authRouter.post("/register", authcontroller.registerUser);

module.exports = authRouter;
