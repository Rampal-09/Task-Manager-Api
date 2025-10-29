const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

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
exports.loginUser = (req, res, next) => {
    const { email , password} =
};
