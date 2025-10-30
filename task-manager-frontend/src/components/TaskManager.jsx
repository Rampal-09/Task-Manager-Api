import { useEffect, useState } from "react";
import {
  createTask,
  getAllTasks,
  editTask,
  deleteTask,
} from "../services/taskApi";
import "../styles/global.css";

const TaskManager = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await getAllTasks();
      setTasks(res.data || []);
      setMessage(res.message || "Tasks fetched successfully");
    } catch (err) {
      console.error("Error fetching tasks:", err);

      setTasks([]);
      setMessage(err.response?.data?.message || "No tasks found");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTaskId) {
        await editTask(editingTaskId, form);
        setMessage("Task updated successfully");
      } else {
        await createTask(form);
        setMessage("Task created successfully");
      }
      setForm({ title: "", description: "" });
      setEditingTaskId(null);
      fetchTasks();
    } catch (err) {
      console.error("Edit/Create error:", err);
      setMessage(err.response?.data?.message || "Error saving task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);

      setTasks((prev) => prev.filter((task) => task._id !== id));

      fetchTasks();
      setMessage("Task deleted successfully");
    } catch {
      setMessage("Error deleting task");
    }
  };

  const handleEdit = (task) => {
    setForm({ title: task.title, description: task.description });
    setEditingTaskId(task._id);
  };

  return (
    <div className="container" style={{ width: "500px" }}>
      <h2>Task Manager</h2>
      <button onClick={onLogout}>Logout</button>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingTaskId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <h3>Your Tasks</h3>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            <span>
              <b>{t.title}</b> – {t.description}
            </span>
            <div>
              <button onClick={() => handleEdit(t)}>Edit</button>
              <button onClick={() => handleDelete(t._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
