const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 * Register a new user
 * @route POST /api/auth/register
 *
 *
 */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingUser = await userModel.findOne({
    $or: [{ email }, { password }],
  });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email or password already exists" });
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    name,
    email,
    password: hashedpassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1D",
  });

  res.cookie("token", token);

  res.status(201).json({ message: "User registered successfully", user });
};

/**
 * Login a user
 * @route POST /api/auth/login
 * @desc Login a user and return a JWT token
 * @access Public
 */

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1D",
  });
  res.cookie("token", token);
  res.status(200).json({ message: "User logged in successfully", user });
};

const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};
module.exports = { registerUser, loginUser, logoutUser };
