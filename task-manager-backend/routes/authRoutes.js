const express = require("express");
const authRoutes = express.Router();
const authControllers = require("../controllers/authControllers");

authRoutes.post("/register", authControllers.registerUser);
authRoutes.post("/login", authControllers.loginUser);

exports.authRoutes = authRoutes;
