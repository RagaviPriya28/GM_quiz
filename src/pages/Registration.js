import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { API_BASE_URL } from "../config";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { qrCodeData } = useParams(); 

  
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [registrationError, setRegistrationError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    
    setEmailError("");
    setUsernameError("");
    setRegistrationError("");

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!username) {
      setUsernameError("Please enter a valid username.");
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/qrcode/register/${qrCodeData}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            phoneNumber: phone,
            userName: username
          })
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        }

        const data = await response.json();
        console.log("Registration successful:", data);
        
      
        alert("Registration successful! Redirecting to quiz page...");
        navigate(`/lobby`); 
      } catch (error) {
        console.error("Registration failed:", error);
        setRegistrationError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Quiz Registration</h2>
        {registrationError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {registrationError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">
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
            />
            {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
          </div>

         
          <div>
            <label htmlFor="register-phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <PhoneInput
              id="register-phone"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
            />
          </div>

          
          <div>
            <label htmlFor="register-username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="register-username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Choose a username"
            />
            {usernameError && <p className="text-red-600 text-sm">{usernameError}</p>}
          </div>

         
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register for Quiz
          </button>
        </form>
      </div>
    </div>
  );
};



