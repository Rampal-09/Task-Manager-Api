const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
