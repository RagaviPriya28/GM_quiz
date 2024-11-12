import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AuthContext } from "./context/AuthContext";
import AdminQuizPage from "./pages/AdminQuizPage";
import WebSocketClient from "./Socket/SocketClient";
import LobbyPage from "./pages/LobbyPage";

// ProtectedRoute component for role-based access
const ProtectedRoute = () => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) {
    // Show a spinner or loading message
    return <div>Loading...</div>;
  }

  // If the user is authenticated and has an "admin" role, show the AdminQuizPage
  if (isAuthenticated && user?.role === "admin") {
    return <AdminQuizPage />;
  }

  // If the user is authenticated and has a "user" role, show the LobbyPage
  if (isAuthenticated && user?.role === "user") {
    return <LobbyPage />;
  }

  // If not authenticated, redirect to the login page
  return <Navigate to="/login" />;
};

export default function App() {
  return (
    <>
      <WebSocketClient />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Protect the / route with ProtectedRoute */}
        <Route path="/" element={<ProtectedRoute />} />
      </Routes>
    </>
  );
}
