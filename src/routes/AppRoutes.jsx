import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/DashBoard";
import Users from "../pages/Users";
import Classes from "../pages/Classes";
import Enrollments from "../pages/Enrollments";
import Grades from "../pages/Grades";
import Profile from "../pages/Profile";

export default function AppRoutes() {

  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/users" element={<Users />} />

      <Route path="/classes" element={<Classes />} />

      <Route path="/enrollments" element={<Enrollments />} />

      <Route path="/grades" element={<Grades />} />

      <Route path="/profile" element={<Profile />} />

    </Routes>
  );

}