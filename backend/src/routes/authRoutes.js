const { Router } = require("express");
const authcontroller = require("../controllers/authControllers.js");
const middleware = require("../middleware/auth.middleware.js");

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

/**
 * @route POST /api/auth/logout
 * @desc Logout a user by clearing the JWT token cookie and black list creating a black list token
 * @access Public
 */

authRouter.post("/logout", authcontroller.logoutUser);

/**
 * @route GET /api/auth/getme
 * @desc Get the currently logged in user's information
 * @access Private
 */

authRouter.get("/getme", middleware.authMiddleware, authcontroller.getMe);

module.exports = authRouter;
