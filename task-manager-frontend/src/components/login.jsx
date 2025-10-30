import { useState } from "react";
import { loginUser } from "../services/authApi";
import "../styles/global.css";

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.token);
      setMessage("Login successful!");
      setTimeout(() => onLoginSuccess(), 1000);
    } catch {
      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{" "}
        <button onClick={onSwitchToRegister}>Register</button>
      </p>
    </div>
  );
};

export default Login;
