// import React from "react";
// import logo from "../assets/gm-admin.png";

// export default function AdminQuizPage() {
//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       {/* Main Content */}

//       {/* Fetcch Quiz details on quiz admin page using URL: http://localhost:5000/api/quizzes/6732dfbc3e154e085cc1c1c8 */}
//       <div className="flex  flex-col lg:flex-row justify-between m-4 lg:m-10 space-y-6 lg:space-y-0 bg-white rounded-lg shadow-lg p-6 lg:h-screen">
//         {/* Left Side */}
//         <div className="lg:w-1/2 space-y-4 pr-4">
//           <img src={logo} alt="logo"/>

//           {/* Centered Button */}
//           <div className="flex justify-center mt-6">
//             <button className="px-6 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition duration-200 w-48">
//               Start
//             </button>
//           </div>
//         </div>

//         {/* Vertical Divider between Left and Right */}
//         <div className="hidden lg:block border-l border-gray-300 mx-4"></div>

//         {/* Right Side */}
//         <div className="lg:w-1/2 space-y-6 flex flex-col items-center pl-4">
//           {/* Right Side Upper: QR Code Placeholder */}
//           <div className="w-full flex flex-col items-center">
//             <img
//               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATZSURBVO3BQY4bSRAEwfAC//9lXx3zVECjk6PRIszwj1QtOaladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhZ98hKQn6RmAnKj5gbIG2qeAHKjZgLyk9S8cVK16KRq0UnVok+WqdkE5A0gk5pJzQRkUnMDZFJzo+YNNZuAbDqpWnRSteikatEnXwbkCTVPqJmA3ACZ1ExqfhKQSc0TQJ5Q800nVYtOqhadVC365B8H5JuA3KiZgExqJiCTmv+Tk6pFJ1WLTqoWffKPU3MDZFLzhpoJyBtAJjX/spOqRSdVi06qFn3yZWp+EpAbIE+omYDcqJmA3Kh5Q81vclK16KRq0UnVok+WAflJQCY1E5BJzQRkUjMBmdRMQJ5QMwGZ1NwA+c1OqhadVC06qVr0yUtqfjM1E5BJzY2aCcgNkE1q/iUnVYtOqhadVC365CUgk5oJyI2aCcgTat4AcqPmRs0E5AbIE0AmNTdAJjUTkBs1b5xULTqpWnRSteiTZUBu1Dyh5gkgT6iZgExAnlAzAblRMwG5AXKj5kbNBGTTSdWik6pFJ1WLPlmmZgIyAXkCyI2aGzUTkCfU3ACZ1NyomYBMaiYgN2pugNyo2XRSteikatFJ1aJPlgGZ1PwkNU8AmdR8E5BJzRtAbtTcAJnUvHFSteikatFJ1SL8I4uATGpugExqJiBPqJmA3Ki5AXKjZgIyqbkBMql5A8iNmm86qVp0UrXopGrRJ7+cmgnIDZAbNROQSc2NmgnIpOYGyBNAJjU3am6A3Kh546Rq0UnVopOqRZ+8BOQNNTdAJjVPALlRMwGZ1ExANqmZgExqJiCTmgnI33RSteikatFJ1SL8Iy8AeULNBORGzQ2QTWomIJOaCcikZhOQSc0EZFJzA2RSs+mkatFJ1aKTqkWfLFNzA2RScwPkRs0EZFJzA+QJIE8AmdTcAJnUTEB+s5OqRSdVi06qFn3ykppNQCY1T6iZgExq3lAzAfmb1NwA+UknVYtOqhadVC365CUgk5oJyBNqJiBPqJnUTEAmNROQGyA3QJ4AsgnIjZpvOqladFK16KRq0ScvqblR8wSQSc0EZFJzA2STmhsgN0CeAPKEmgnITzqpWnRSteikatEny4BMaiYgN2omIDdAbtRMQCYgbwD5m4D8JidVi06qFp1ULcI/8g8D8oSaN4DcqLkBcqPmCSCb1LxxUrXopGrRSdWiT14C8pPUPKFmAjKpuQFyo2YCsgnIpOYJNROQSc2mk6pFJ1WLTqoWfbJMzSYgT6iZgNwA2aTmBsgTap5Qc6Pmm06qFp1ULTqpWvTJlwF5Qs0Tam7U3ACZ1LwBZFIzqZmATEA2AZnUTEAmNW+cVC06qVp0UrXok38ckBs1N2omIJOab1IzAZnUTEBugExqJiCTmk0nVYtOqhadVC365H8OyKRmE5BJzQTkm9RMQG7UTEAmNW+cVC06qVp0UrXoky9T801qngByo+YJNTdqJiA3ar4JyKRm00nVopOqRSdViz5ZBuQnAZnUTECeAHKjZgIyqZmATGomIE+omYBMav6mk6pFJ1WLTqoW4R+pWnJSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoWnVQt+g+c+y5cCJMQcgAAAABJRU5ErkJggg=="
//               alt="code"
//             />
//             {/* <div>img</div> */}
//             <a href="http://localhost:3000"
//               className="mt-4 text-blue-500 hover:underline"
//             >
//               Join Quiz
//             </a>
//           </div>

//           {/* Horizontal Divider in Right Side */}
//           <div className="w-full border-t border-gray-300 my-4"></div>

//           {/* Right Side Lower */}
//           <div className="w-full space-y-4">
//             <h1 className="text-lg font-semibold text-gray-800">Joined: 20</h1>

//             {/* Participant List */}
//             <div className="bg-gray-50 p-4 rounded-lg shadow-inner overflow-y-auto max-h-[400px] h-[300px] sm:h-[400px]">
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 1</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 2</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 3</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 4</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 5</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 6</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 7</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 8</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 9</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 10</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 11</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 12</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 13</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 14</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 15</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 16</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 17</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 18</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 19</h1>
//                 <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 20</h1>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import logo from "../assets/gm-admin.png";
// import { API_BASE_URL } from "../config";

// const AdminQuizPage = () => {
//   const [registeredUsers, setRegisteredUsers] = useState([]);
//   const [qrCodeData, setQrCodeData] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [qrLoading, setQrLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleUnauthorized = () => {
//     localStorage.removeItem('token');
//     navigate('/login'); 
//   };

  
//   const getAuthHeaders = () => {
//     const token = localStorage.getItem('token');
//     return {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     };
//   };

 
//   useEffect(() => {
//     const generateQrCode = async () => {
//       try {
//         const response = await fetch('${API_BASE_URL}/api/qrcode/generate', {
//           method: 'GET',
//           headers: getAuthHeaders()
//         });
        
//         if (response.status === 401) {
//           handleUnauthorized();
//           return;
//         }
        
//         if (!response.ok) {
//           throw new Error('Failed to generate QR code');
//         }
        
//         const data = await response.json();
//         if (data.qrCodeData) {
//           setQrCodeData(data.qrCodeData);
//         } else {
//           setQrCodeData(`quiz-${Date.now()}`);
//         }
//       } catch (error) {
//         console.error('Error generating QR code:', error);
//         setError('Failed to generate QR code');
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
//             method: 'GET',
//             headers: getAuthHeaders()
//           }
//         );
        
//         if (response.status === 401) {
//           handleUnauthorized();
//           return;
//         }
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch registered users');
//         }
        
//         const data = await response.json();
//         const users = Array.isArray(data) ? data : data.users || [];
//         setRegisteredUsers(users);
//         setError('');
//       } catch (error) {
//         console.error('Error fetching registered users:', error);
//         setError('Failed to fetch registered users');
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

//   const registrationUrl = qrCodeData ? `${window.location.origin}/register/${qrCodeData}` : '';
//   const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(registrationUrl)}`;

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
//                 onClick={() => console.log('Starting quiz...')}
//                 className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
//               >
//                 Start Quiz
//               </button>
//             </div>
//           </div>

//           <div className="lg:w-1/2 space-y-6">
//             <div className="text-center">
//               <h2 className="text-xl font-bold mb-4">Quiz Registration QR Code</h2>
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
//                 Registered Users ({registeredUsers.length})
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
//                         {user.userName || user.name || 'Anonymous User'}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-center text-gray-500">No users registered yet</p>
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

      
      navigate('question/page/admin');
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
        const response = await fetch('${API_BASE_URL}/api/qrcode/generate', {
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
        if (data.qrCodeData) {
          setQrCodeData(data.qrCodeData);
        } else {
          setQrCodeData(`quiz-${Date.now()}`);
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
        setError('Failed to generate QR code');
        setQrCodeData(`quiz-${Date.now()}`);
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