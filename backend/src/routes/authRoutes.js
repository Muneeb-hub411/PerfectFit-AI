const { Router } = require("express");
const authcontroller = require("../controllers/authControllers.js");

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", authcontroller.registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login a user and return a JWT token
 * @access Public
 */
authRouter.post("/login", authcontroller.loginUser);

module.exports = authRouter;
