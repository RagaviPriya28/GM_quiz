import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import { AuthContext } from "./context/AuthContext";
import AdminQuizPage from "./pages/AdminQuizPage";
import QuestionPageAdmin from "./pages/QuestionPageAdmin";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    // Render a loading spinner or placeholder until auth state is confirmed
    return <div>Loading...</div>;
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<AdminQuizPage />} />
        <Route path="/questionadmin" element={<QuestionPageAdmin />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}
