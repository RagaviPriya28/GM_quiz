import React, { useContext } from "react";
import { Navigate } from "react-router-dom"; // Import Navigate for redirection
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/gm-admin.png"

export default function LobbyPage() {
  // Accessing the authentication context
  const { isAuthenticated, user } = useContext(AuthContext);

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Quiz Title */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <img src={logo} alt="logo" />
        {/* User Email */}
        <div className="text-gray-700 text-sm mb-2">
          <h4 className="font-semibold">Welcome, {user?.email || "Guest"}</h4>
        </div>

        {/* Waiting Message */}
        <div className="text-gray-600 mt-4">
          <p>Please wait until the admin starts the quiz.</p>
        </div>
      </div>
    </div>
  );
}
