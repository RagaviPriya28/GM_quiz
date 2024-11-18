import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/GMI-Logo.png";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest(".profile-dropdown")) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

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

        {/* Right: Authentication Conditional Rendering */}
        <div className="flex items-center gap-4 relative">
          {isAuthenticated ? (
            <div className="relative profile-dropdown">
              <button
                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                </div>
                <span
                  className={`text-gray-600 transition-transform duration-200 ${
                    isProfileOpen ? "transform rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fadeIn">
                  <div className="p-2">
                    <div className="px-4 py-2 text-sm font-medium text-gray-700 truncate">
                      {user?.email}
                    </div>

                    <button
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-blue-300 hover:bg-blue-50 rounded-md transition-colors duration-200"
                      onClick={() => navigate("/profile")}
                    >
                      <span className="text-blue-200">👤</span>
                      Profile
                    </button>
                    {/* <div className="border-t border-gray-200"></div> */}
                    <button
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                      onClick={handleLogout}
                    >
                      <span className="text-red-600">🚪</span>
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              className="hover:bg-gray-200 py-1 px-2 rounded-lg bg-red-100 transition-colors duration-200"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
