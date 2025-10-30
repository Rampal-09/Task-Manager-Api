import axios from "axios";
const API_URL = "http://localhost:5000";

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/auth/register`, userData);
  return res.data;
};

export const loginUser = async (loginData) => {
  const res = await axios.post(`${API_URL}/auth/login`, loginData);
  return res.data;
};
