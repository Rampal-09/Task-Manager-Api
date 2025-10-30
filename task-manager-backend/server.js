require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.get("/", (req, res, next) => {
  res.send("server is running..");
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { authRoutes } = require("./routes/authRoutes");
const { taskRoutes } = require("./routes/taskRoutes");

app.use("/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("mongoDB connected");
  app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost${process.env.PORT}`);
  });
});
