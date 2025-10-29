const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, minLength: 2, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    createBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tasks", taskSchema);
