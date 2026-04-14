const { Router } = require("express");
const { registerUser } = require("../controllers/authControllers");

const authRouter = Router();
authRouter.post("/register", registerUser);

module.exports = authRouter;
