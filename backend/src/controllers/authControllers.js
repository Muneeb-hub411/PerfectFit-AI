const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

module.exports = { registerUser };
