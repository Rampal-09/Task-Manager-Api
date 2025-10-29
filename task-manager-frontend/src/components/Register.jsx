import { useState } from "react";
import { registerUser } from "../services/authApi";
import "../styles/global.css";

const Register = ({ onSwitchToLogin }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      setMessage(res.message);
      setTimeout(() => onSwitchToLogin(), 1500);
    } catch {
      setMessage("Error registering user");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <select name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>
        Already registered? <button onClick={onSwitchToLogin}>Login</button>
      </p>
    </div>
  );
};

export default Register;
