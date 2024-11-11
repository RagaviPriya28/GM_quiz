import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const LoginPage = () => {
  const navigate = useNavigate();

  // State for email, password, errors, password visibility, and rememberMe checkbox
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Load stored credentials on component mount if rememberMe is checked
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    // Basic validation
    if (!email) {
      setEmailError("Enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Enter correct password");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      if (rememberMe) {
        // Store email and password in localStorage if "Remember me" is checked
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        // Clear stored credentials if "Remember me" is unchecked
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      // Proceed with login logic or redirect
      console.log("Login successful"); // Placeholder
      navigate("/home"); // Redirect to home or desired route
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email"
              aria-label="Email"
            />
            {emailError && <p className="ml-2 text-red-600">{emailError}</p>}
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your password"
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 focus:outline-none"
                aria-label="Toggle password visibility"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {passwordError && (
              <p className="ml-2 text-red-600">{passwordError}</p>
            )}
          </div>
          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            <label className="text-gray-700">Remember me</label>
          </div>
          <div className="flex items-center justify-end mt-2">
            <p className="text-sm text-blue-600 hover:underline cursor-pointer">
              Forgot password?
            </p>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white rounded-md py-2 px-4 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Login
          </button>
          {/* Register Link */}
          <div className="flex items-center justify-center mt-4">
            <p
              className="text-sm text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Don't have an account? Register
            </p>
          </div>
          {/* Divider */}
          <div className="flex items-center justify-center mt-4">
            <p>OR</p>
          </div>
          {/* Social Login Buttons */}
          <div className="space-y-4 mt-4">
            <button
              type="button"
              className="w-full bg-black text-white rounded-md py-2 px-4 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <span>Login with Google</span>
            </button>

            <button
              type="button"
              className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span>Login with Facebook</span>
            </button>
          </div>
          {/* Join Quiz Options */}
          <div className="mt-4 space-y-2">
            <button
              type="button"
              className="w-full border border-gray-300 text-gray-700 rounded-md py-2 px-4 hover:bg-gray-50"
            >
              Scan QR code
            </button>

            <button
              type="button"
              className="w-full border border-gray-300 text-gray-700 rounded-md py-2 px-4 hover:bg-gray-50"
            >
              Enter the PIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
