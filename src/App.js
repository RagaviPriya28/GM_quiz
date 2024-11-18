// App.js
import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";

// const ProtectedRoute = () => {
//   const { isAuthenticated, loading } = useContext(AuthContext);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // return isAuthenticated ? <Home /> : <Navigate to="/login" />;
// };

export default function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
      />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}