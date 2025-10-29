import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskManager from "./components/TaskManager";
import "./styles/global.css";

function App() {
  const [view, setView] = useState("login");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setView("login");
  };

  if (token) return <TaskManager onLogout={handleLogout} />;

  return (
    <>
      {view === "login" && (
        <Login
          onLoginSuccess={() => setView("tasks")}
          onSwitchToRegister={() => setView("register")}
        />
      )}
      {view === "register" && (
        <Register onSwitchToLogin={() => setView("login")} />
      )}
    </>
  );
}

export default App;
