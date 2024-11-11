import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import LobbyPage from "./pages/LobbyPage";
import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
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
        <Route path="/QuestionPageUser" element={<QuestionPageUser />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route path="/SurveyScoreboard" element={<SurveyScoreboard />} />
        <Route
          path="/QuestionsDetailsAdmin/:id"
          element={
            <QuestionsDetailsAdmin/>
          }
        />
      </Routes>
    </>
  );
}