const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      type: "validationError",
      errors: errors.array(),
    });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        type: "duplicateUser",
        message: "you have already register with this email",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
      role: role || "user",
    });
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "register successfuly" });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({
      success: false,
      type: "serverError",
      message: "somthing wrong on server",
    });
  }
};
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "email does not exist",
    });
  }
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "password does not exist",
    });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "email or password incorrect",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "email or password incorrect",
      });
    }

    const payload = {
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    return res.status(200).json({
      success: true,
      message: "login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      type: "serverError",
      message: "something wrong on server",
    });
  }
};
