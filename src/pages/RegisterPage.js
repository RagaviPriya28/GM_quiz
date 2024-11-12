import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext); // Use context to access register function

  // State variables for form inputs and errors
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  // Form submit handler with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!username) {
      setUsernameError("Please enter a valid username.");
      isValid = false; // Add this line
    }

    // if (password.length < 8) {
    //   setPasswordError("Password must be at least 8 characters long.");
    //   isValid = false;
    // }

    if (isValid) {
      try {
        await register(email, username, phone); // Call register function from context
        console.log("Form submitted successfully");
        navigate("/"); // Navigate to the login page after successful registration
      } catch (error) {
        console.error("Registration failed", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="register-email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="register-email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email address"
              aria-label="Email"
            />
            {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
            <p className="text-sm text-gray-500">
              We will send important updates to this email
            </p>
          </div>

          {/* Phone Number Input */}
          <div>
            <label
              htmlFor="register-phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <PhoneInput
              id="register-phone"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your phone number"
              value={phone}
              onChange={setPhone}
              aria-label="Phone Number"
            />
            <p className="text-sm text-gray-500">
              Enter phone number with country code
            </p>
          </div>

          <div>
            <label
              htmlFor="register-username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text" // Change from type="username" to type="text"
              id="register-username" // Remove the trailing `]`
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your user name"
              aria-label="Username"
            />
            {usernameError && (
              <p className="text-red-600 text-sm">{usernameError}</p>
            )}
            <p className="text-sm text-gray-500">Unique user name</p>
          </div>

          {/* Password Input */}
          {/* <div>
            <label
              htmlFor="register-password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                id="register-password"
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
                onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500"
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  size="lg"
                />
              </button>
            </div>
            {passwordError && (
              <p className="text-red-600 text-sm">{passwordError}</p>
            )}
            <p className="text-sm text-gray-500">
              Your password must be at least 8 characters long
            </p>
          </div> */}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};
