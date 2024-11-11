// Navbar.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/GMI-Logo.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="border-b-4 p-2">
      <div className="flex items-center h-12 p-3 gap-4 justify-between">
        {/* Left: Logo with Welcome Message */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <img
            src={logo}
            alt="GMI"
            className="h-10 w-10 rounded-full cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div>
            <h1 className="text-lg font-semibold">Welcome to GMI!</h1>
            <p className="text-sm text-gray-500">Engage, learn, and have fun</p>
          </div>
        </div>

        {/* Right: Login or User Icon */}
        {!isAuthenticated ? (
          <div className="flex gap-2">
            <button
              className="hover:bg-gray-200 m-4 py-1 px-2 rounded-lg bg-red-100"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-red-200">
            <FontAwesomeIcon icon={faUser} className="text-gray-700 text-xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
