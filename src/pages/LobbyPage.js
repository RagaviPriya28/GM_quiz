// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom"; // Import Navigate for redirection
// import { AuthContext } from "../context/AuthContext";
// import logo from "../assets/gm-admin.png"

// export default function LobbyPage() {
//   // Accessing the authentication context
//   const { isAuthenticated, user } = useContext(AuthContext);

//   // If the user is not authenticated, redirect them to the login page
//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       {/* Quiz Title */}
//       <div className="bg-white p-6 rounded-lg shadow-md text-center">
//         <img src={logo} alt="logo" />
//         {/* User Email */}
//         <div className="text-gray-700 text-sm mb-2">
//           <h4 className="font-semibold">Welcome, {user?.email || "Guest"}</h4>
//         </div>

//         {/* Waiting Message */}
//         <div className="text-gray-600 mt-4">
//           <p>Please wait until the admin starts the quiz.</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import logo from "../assets/gm-admin.png";
import { API_BASE_URL } from "../config";

const LobbyPage = () => {
  const [quizStatus, setQuizStatus] = useState('waiting');
  const [error, setError] = useState('');
  const location = useLocation();
  const registrationData = location.state?.registrationData;

  useEffect(() => {
    // Check quiz status using the qrCodeData from registration
    const checkQuizStatus = async () => {
      const qrCodeData = localStorage.getItem('qrCodeData');
      if (!qrCodeData) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/qrcode/registered-users?qrCodeData=${qrCodeData}`, 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to check quiz status');
        }

        const data = await response.json();
        
        // If the admin has started the quiz, the API will return a status
        if (data.status === 'in-progress') {
          setQuizStatus('in-progress');
          window.location.href = '/question/page/user'; // Redirect to quiz page
        }
      } catch (error) {
        console.error('Error checking quiz status:', error);
        setError('Failed to check quiz status');
      }
    };

    // Poll for quiz status every 5 seconds
    const interval = setInterval(checkQuizStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  // If no registration data, redirect back to registration
  // if (!registrationData && !location.state?.email) {
  //   return <Navigate to="/register" />;
  // }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Quiz Logo" className="h-16" />
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to the Quiz</h1>
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <p className="text-blue-800 font-medium">
              Registered as: {location.state?.email || registrationData?.email || 'Guest'}
            </p>
            {location.state?.username && (
              <p className="text-blue-600 text-sm mt-1">
                Username: {location.state.username}
              </p>
            )}
          </div>
        </div>

        {/* Status Section */}
        <div className="text-center">
          {error ? (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </div>
          ) : (
            <div className="space-y-4">
              {quizStatus === 'waiting' ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
                    <p className="text-gray-600">
                      Waiting for admin to start the quiz...
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <p className="text-yellow-800 text-sm">
                      Please don't close this window. The quiz will start automatically.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg">
                  Quiz is starting... Please wait!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;