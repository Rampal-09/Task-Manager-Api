import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/tasks";

const getToken = () => localStorage.getItem("token");

export const createTask = async (taskData) => {
  const res = await axios.post(`${API_URL}/createtask`, taskData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const getAllTasks = async () => {
  const res = await axios.get(`${API_URL}/getALLTask`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const editTask = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/editTask/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axios.delete(`${API_URL}/deleteTask/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};
