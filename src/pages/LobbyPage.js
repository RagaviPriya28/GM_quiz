import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from "../assets/gm-admin.png";
import { API_BASE_URL } from "../config";

const LobbyPage = () => {
  const [quizStatus, setQuizStatus] = useState('waiting');
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkStatus = async () => {
      const qrCodeData = localStorage.getItem('qrCodeData');
      const userEmail = localStorage.getItem('userEmail');
    
      if (!qrCodeData || !userEmail) {
        setError("Missing session data. Please register again.");
        setTimeout(() => {
          navigate('/register');
        }, 2000);
        return;
      }

      setUserEmail(userEmail);

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/qrcode/registered-users?qrCodeData=${qrCodeData}&email=${userEmail}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.status === 401) {
          setError("Session expired. Please register again.");
          localStorage.removeItem('token');
          localStorage.removeItem('qrCodeData');
          localStorage.removeItem('userEmail');
          setTimeout(() => {
            navigate('/register');
          }, 2000);
          return;
        }
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch status');
        }
    
        const data = await response.json();
        console.log("Quiz status data:", data);

       
        if (data.users && data.users.length > 0) {
          const currentUser = data.users.find(user => user.email === userEmail);
          if (currentUser && currentUser.status === "in progress") {
            console.log("Quiz status changed to in-progress");
            setQuizStatus('in-progress');
            setIsRedirecting(true);
            setTimeout(() => {
              navigate('/question/page/user', { 
                state: { 
                  email: userEmail,
                  qrCodeData,
                }
              });
            }, 1000);
          } else {
            setQuizStatus('waiting');
            setIsRedirecting(false);
          }
        }
      } catch (error) {
        console.error('Error checking status:', error);
        if (error.message.includes('401')) {
          setError('Session expired. Please register again.');
          setTimeout(() => {
            navigate('/register');
          }, 2000);
        } else {
          setError('Failed to check quiz status. Please refresh the page.');
        }
      }
    };

    if (token) {
      checkStatus();
      const interval = setInterval(checkStatus, 2000);
      return () => clearInterval(interval);
    } else {
      setError("Not authorized. Please register again.");
      setTimeout(() => {
        navigate('/register');
      }, 2000);
    }
  }, [navigate, token]);

  const handleRetry = () => {
    setError('');
    window.location.reload();
  };

  const renderStatus = () => {
    if (isRedirecting) {
      return (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg animate-pulse">
          Quiz is starting... Please wait!
        </div>
      );
    }

    if (quizStatus === 'waiting') {
      return (
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
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Quiz Logo" className="h-16" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to the Quiz</h1>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-800 font-medium">
              Status: {isRedirecting ? 'Quiz starting...' : 'Waiting for quiz to start'}
            </p>
          </div>
        </div>

        <div className="text-center">
          {error ? (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error}
              {!error.includes("Please register again") && (
                <button 
                  onClick={handleRetry}
                  className="text-sm underline ml-2"
                >
                  Retry
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {renderStatus()}
            </div>
          )}
        </div>

        <div className="mt-8 text-xs text-gray-400 text-center">
          <p>Session ID: {localStorage.getItem('qrCodeData')}</p>
          <p>Email: {localStorage.getItem('userEmail')}</p>
          <p>Status: {quizStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;