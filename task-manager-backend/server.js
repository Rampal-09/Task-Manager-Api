require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const { authRoutes } = require("./routes/authRoutes");

app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("mongoDB connected");
  app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost${process.env.PORT}`);
  });
});
