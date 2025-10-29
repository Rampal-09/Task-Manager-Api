const Task = require("../models/taskModel");
exports.createTask = async (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      success: false,
      type: "clientError",
      message: "title or description can not be empty",
    });
  }
  try {
    const newTask = new Task({
      title: title,
      description: description,
      createBy: req.user.id,
      status: "pending",
    });

    await newTask.save();

    return res.status(201).json({
      success: true,
      message: "task created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      type: "serverError",
      message: "somthing wrong on server",
    });
  }
};

exports.getAllTask = async (req, res, next) => {
  try {
    const getTasks = await Task.find({ createBy: req.user.id });
    if (getTasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "task not found",
      });
    }
    return res.json({
      success: true,
      message: "task get successfully",
      data: getTasks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      type: "serverError",
      message: "somthing wrong on server",
    });
  }
};

exports.editTask = async (req, res, next) => {
  const { title, description, status } = req.body;
  const taskId = req.params.id;

  if (!taskId) {
    return res.status(400).json({
      success: false,
      message: "taskId not found",
    });
  }
  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "task not found",
      });
    }
    if (task.createBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "unauthorize",
      });
    }
    if (task) {
      task.title = title;
      task.description = description;
      task.status = status;
    }
    await task.save();
    return res.status(200).json({
      success: true,
      message: "task update successfully",
      data: task,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      type: "serverError",
      message: "somthing wrong on server",
    });
  }
};

exports.deleteTask = async (req, res, next) => {
  const taskid = req.params.id;
  if (!taskid) {
    return res.status(400).json({
      success: false,
      message: "taskId not  found",
    });
  }
  try {
    const task = await Task.findById(taskid);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "task not found",
      });
    }
    if (task.createBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "unauthorize",
      });
    }
    await task.deleteOne();
    return res.status(200).json({
      success: true,
      message: "task delete successfully",
      data: task,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      type: "serverError",
      message: "somthing wrong on server",
    });
  }
};
