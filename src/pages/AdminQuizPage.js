

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/gm-admin.png";
// import { API_BASE_URL } from "../config";

// const AdminQuizPage = () => {
//   const [registeredUsers, setRegisteredUsers] = useState([]);
//   const [qrCodeData, setQrCodeData] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [qrLoading, setQrLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [startingQuiz, setStartingQuiz] = useState(false);
//   const navigate = useNavigate();

//   const handleUnauthorized = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const getAuthHeaders = () => {
//     const token = localStorage.getItem("token");
//     return {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     };
//   };

//   const handleStartQuiz = async () => {
//     if (!qrCodeData || startingQuiz) return;

//     setStartingQuiz(true);
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/api/qrcode/start-survey/${qrCodeData}`,
//         {
//           method: "POST",
//           headers: getAuthHeaders(),
//         }
//       );

//       console.log(response.data);

//       if (response.status === 401) {
//         handleUnauthorized();
//         return;
//       }

//       if (!response.ok) {
//         throw new Error("Failed to start quiz");
//       }

//       navigate("question/admin");
//     } catch (error) {
//       console.error("Error starting quiz:", error);
//       setError("Failed to start quiz. Please try again.");
//     } finally {
//       setStartingQuiz(false);
//     }
//   };

//   useEffect(() => {
//     const generateQrCode = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/qrcode/generate`, {
//           method: "GET",
//           headers: getAuthHeaders(),
//         });

//         if (response.status === 401) {
//           handleUnauthorized();
//           return;
//         }

//         if (!response.ok) {
//           throw new Error("Failed to generate QR code");
//         }

//         const data = await response.json();
//         if (data.qrCodeData) {
//           setQrCodeData(data.qrCodeData);
//         } else {
//           setQrCodeData(`quiz-${Date.now()}`);
//         }
//       } catch (error) {
//         console.error("Error generating QR code:", error);
//         setError("Failed to generate QR code");
//         setQrCodeData(`quiz-${Date.now()}`);
//       } finally {
//         setQrLoading(false);
//       }
//     };

//     generateQrCode();
//   }, [navigate]);

//   useEffect(() => {
//     const fetchRegisteredUsers = async () => {
//       if (!qrCodeData) return;

//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/api/qrcode/registered-users?qrCodeData=${qrCodeData}`,
//           {
//             method: "GET",
//             headers: getAuthHeaders(),
//           }
//         );

//         if (response.status === 401) {
//           handleUnauthorized();
//           return;
//         }

//         if (!response.ok) {
//           throw new Error("Failed to fetch registered users");
//         }

//         const data = await response.json();
//         const users = Array.isArray(data) ? data : data.users || [];
//         setRegisteredUsers(users);
//         setError("");
//       } catch (error) {
//         console.error("Error fetching registered users:", error);
//         setError("Failed to fetch registered users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (qrCodeData) {
//       fetchRegisteredUsers();
//       const interval = setInterval(fetchRegisteredUsers, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [qrCodeData, navigate]);

//   const registrationUrl = qrCodeData
//     ? `${window.location.origin}/register/${qrCodeData}`
//     : "";
//   const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(
//     registrationUrl
//   )}`;

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       <div className="bg-white rounded-lg shadow-lg m-4 lg:m-10">
//         <div className="flex flex-col lg:flex-row justify-between p-6 space-y-6 lg:space-y-0">
//           <div className="lg:w-1/2 space-y-4">
//             <div className="flex justify-center">
//               <img src={logo} alt="Quiz Admin Logo" className="mx-auto" />
//             </div>
//             <div className="flex justify-center mt-6">
//               <button
//                 onClick={handleStartQuiz}
//                 disabled={startingQuiz || !registeredUsers.length}
//                 className={`px-6 py-2 rounded-md transition duration-200 ${
//                   startingQuiz || !registeredUsers.length
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-blue-500 hover:bg-blue-600 text-white"
//                 }`}
//               >
//                 {startingQuiz ? (
//                   <span className="flex items-center">
//                     <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
//                     Starting...
//                   </span>
//                 ) : (
//                   "Start Quiz"
//                 )}
//               </button>
//             </div>
//             {!registeredUsers.length && (
//               <p className="text-center text-sm text-gray-500">
//                 Wait for users to register before starting the quiz
//               </p>
//             )}
//           </div>

//           <div className="lg:w-1/2 space-y-6">
//             <div className="text-center">
//               <h2 className="text-xl font-bold mb-4">
//                 Quiz Registration QR Code
//               </h2>
//               {qrLoading ? (
//                 <div className="flex justify-center items-center h-64">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
//                 </div>
//               ) : (
//                 <>
//                   <img
//                     src={qrCodeUrl}
//                     alt="Registration QR Code"
//                     className="mx-auto w-64 h-64 border rounded-lg shadow-md"
//                   />
//                   <p className="mt-4 text-sm text-gray-600">
//                     Scan QR code or use this link:
//                     <br />
//                     <a
//                       href={registrationUrl}
//                       className="text-blue-500 hover:underline"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {registrationUrl}
//                     </a>
//                   </p>
//                 </>
//               )}
//             </div>

//             <div className="border-t pt-6">
//               <h3 className="text-lg font-semibold mb-4">
//                 Users ({registeredUsers.length})
//               </h3>
//               {error && (
//                 <p className="text-red-500 text-center mb-4">{error}</p>
//               )}
//               <div className="bg-gray-50 p-4 rounded-lg max-h-[400px] overflow-y-auto">
//                 {loading ? (
//                   <div className="flex justify-center items-center h-32">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
//                   </div>
//                 ) : registeredUsers.length > 0 ? (
//                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                     {registeredUsers.map((user, index) => (
//                       <div
//                         key={user._id || user.id || index}
//                         className="bg-blue-100 p-2 rounded-lg text-center text-blue-800"
//                       >
//                         {user.userName || user.name || "Anonymous User"}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-center text-gray-500">
//                     No users registered yet
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminQuizPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/gm-admin.png";
import { API_BASE_URL } from "../config";

const AdminQuizPage = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [qrCodeData, setQrCodeData] = useState('');
  const [loading, setLoading] = useState(true);
  const [qrLoading, setQrLoading] = useState(true);
  const [error, setError] = useState('');
  const [startingQuiz, setStartingQuiz] = useState(false);
  const navigate = useNavigate();

  const handleUnauthorized = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const handleStartQuiz = async () => {
    if (!qrCodeData || startingQuiz) return;

    setStartingQuiz(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/qrcode/start-survey/${qrCodeData}`,
        {
          method: 'POST',
          headers: getAuthHeaders(),
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to start quiz');
      }

      
      navigate('/question/page/admin');
    } catch (error) {
      console.error('Error starting quiz:', error);
      setError('Failed to start quiz. Please try again.');
    } finally {
      setStartingQuiz(false);
    }
  };

    useEffect(() => {
      const generateQrCode = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/qrcode/generate`, {
            method: 'GET',
            headers: getAuthHeaders()
          });
          
          if (response.status === 401) {
            handleUnauthorized();
            return;
          }
          
          if (!response.ok) {
            throw new Error('Failed to generate QR code');
          }
          
          const data = await response.json();
          const qrData = data.qrCodeData || `quiz-${Date.now()}`;
          setQrCodeData(qrData);
  
          // Store qrCodeData in localStorage
          localStorage.setItem('qrCodeData', qrData);
  
        } catch (error) {
          console.error('Error generating QR code:', error);
          setError('Failed to generate QR code');
          const fallbackQrData = `quiz-${Date.now()}`;
          setQrCodeData(fallbackQrData);
          localStorage.setItem('qrCodeData', fallbackQrData); // Store fallback data if generation fails
        } finally {
          setQrLoading(false);
        }
      };
  
      generateQrCode();
    }, [navigate]);
  

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      if (!qrCodeData) return;
      
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/qrcode/registered-users?qrCodeData=${qrCodeData}`, 
          {
            method: 'GET',
            headers: getAuthHeaders()
          }
        );
        
        if (response.status === 401) {
          handleUnauthorized();
          return;
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch registered users');
        }
        
        const data = await response.json();
        const users = Array.isArray(data) ? data : data.users || [];
        setRegisteredUsers(users);
        setError('');
      } catch (error) {
        console.error('Error fetching registered users:', error);
        setError('Failed to fetch registered users');
      } finally {
        setLoading(false);
      }
    };

    if (qrCodeData) {
      fetchRegisteredUsers();
      const interval = setInterval(fetchRegisteredUsers, 5000);
      return () => clearInterval(interval);
    }
  }, [qrCodeData, navigate]);

  const registrationUrl = qrCodeData ? `${window.location.origin}/register/${qrCodeData}` : '';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(registrationUrl)}`;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg m-4 lg:m-10">
        <div className="flex flex-col lg:flex-row justify-between p-6 space-y-6 lg:space-y-0">
          <div className="lg:w-1/2 space-y-4">
            <div className="flex justify-center">
              <img src={logo} alt="Quiz Admin Logo" className="mx-auto" />
            </div>
            <div className="flex justify-center mt-6">
              <button 
                onClick={handleStartQuiz}
                disabled={startingQuiz || !registeredUsers.length}
                className={`px-6 py-2 rounded-md transition duration-200 ${
                  startingQuiz || !registeredUsers.length
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {startingQuiz ? (
                  <span className="flex items-center">
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    Starting...
                  </span>
                ) : (
                  'Start Quiz'
                )}
              </button>
            </div>
            {!registeredUsers.length && (
              <p className="text-center text-sm text-gray-500">
                Wait for users to register before starting the quiz
              </p>
            )}
          </div>

          <div className="lg:w-1/2 space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">Quiz Registration QR Code</h2>
              {qrLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                </div>
              ) : (
                <>
                  <img 
                    src={qrCodeUrl}
                    alt="Registration QR Code"
                    className="mx-auto w-64 h-64 border rounded-lg shadow-md"
                  />
                  <p className="mt-4 text-sm text-gray-600">
                    Scan QR code or use this link:
                    <br />
                    <a 
                      href={registrationUrl}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {registrationUrl}
                    </a>
                  </p>
                </>
              )}
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">
                 Users ({registeredUsers.length})
              </h3>
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}
              <div className="bg-gray-50 p-4 rounded-lg max-h-[400px] overflow-y-auto">
                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                  </div>
                ) : registeredUsers.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {registeredUsers.map((user, index) => (
                      <div 
                        key={user._id || user.id || index}
                        className="bg-blue-100 p-2 rounded-lg text-center text-blue-800"
                      >
                        {user.userName || user.name || 'Anonymous User'}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No users registered yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQuizPage;



