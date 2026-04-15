const { Router } = require("express");
const authcontroller = require("../controllers/authControllers.js");

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", authcontroller.registerUser);

module.exports = authRouter;
