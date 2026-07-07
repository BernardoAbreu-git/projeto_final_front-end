import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Classes from "../pages/Classes";
import Enrollments from "../pages/Enrollments";
import Grades from "../pages/Grades";
import Profile from "../pages/Profile";

export default function AppRoutes() {

  /* ===============================================
      BACK-END

      Aqui será feita a autenticação.

      Exemplo:

      const token = localStorage.getItem("token");

      if (token) {
          return Dashboard;
      }

      else {

          return Login;

      }

  =============================================== */

  const logged = true; // depois o back-end muda isso

  if (!logged) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>

      <Route path="/" element={<Dashboard />} />

      <Route path="/users" element={<Users />} />

      <Route path="/classes" element={<Classes />} />

      <Route path="/enrollments" element={<Enrollments />} />

      <Route path="/grades" element={<Grades />} />

      <Route path="/profile" element={<Profile />} />

    </Routes>
  );
}