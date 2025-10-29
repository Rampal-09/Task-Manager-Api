const express = require("express");
const taskRoutes = express.Router();
const taskControllers = require("../controllers/taskControllers");
const { authMiddleware } = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");
taskRoutes.post(
  "/createtask",
  authMiddleware,
  roleMiddleware(["user"]),
  taskControllers.createTask
);
taskRoutes.get("/getALLTask", authMiddleware, taskControllers.getAllTask);
taskRoutes.put(
  "/editTask/:id",
  authMiddleware,
  roleMiddleware(["user"]),
  taskControllers.editTask
);
taskRoutes.delete(
  "/deleteTask/:id",
  authMiddleware,
  roleMiddleware(["user"]),
  taskControllers.deleteTask
);
exports.taskRoutes = taskRoutes;
