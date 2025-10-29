const express = require("express");
const authRoutes = express.Router();
const authControllers = require("../controllers/authControllers");
const { validateUser, validateLogin } = require("../validation/validation");

authRoutes.post("/register", validateUser(), authControllers.registerUser);
authRoutes.post("/login", validateLogin(), authControllers.loginUser);

exports.authRoutes = authRoutes;
