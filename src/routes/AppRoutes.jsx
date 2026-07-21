import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Login from "../pages/Login";
import Dashboard from "../pages/DashBoard";
import Users from "../pages/Users";
import Classes from "../pages/Classes";
import Enrollments from "../pages/Enrollments";
import Grades from "../pages/Grades";
import Profile from "../pages/Profile";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
}

export default function AppRoutes() {

  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />

      <Route path="/classes" element={<ProtectedRoute><Classes /></ProtectedRoute>} />

      <Route path="/enrollments" element={<ProtectedRoute><Enrollments /></ProtectedRoute>} />

      <Route path="/grades" element={<ProtectedRoute><Grades /></ProtectedRoute>} />

      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

    </Routes>
  );

}