// Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/GMI-Logo.png";

const Navbar = () => {
  const navigate = useNavigate();

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

        {/* Right: Login Button */}
        <div className="flex gap-2">
          <button
            className="hover:bg-gray-200 m-4 py-1 px-2 rounded-lg bg-red-100"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
