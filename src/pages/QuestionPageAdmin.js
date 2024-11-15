import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

export default function QuestionPageAdmin() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/questions`, {
          method: "GET",
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch questions list");
        }

        const data = await response.json();
        setQuestions(data);

        // Ensure there is a valid first question with an ID
        if (data.length > 0 && data[0]._id) {
          fetchQuestionById(data[0]._id);
        } else {
          throw new Error("No valid questions found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const fetchQuestionById = async (_id) => {
    if (!_id) {
      console.error("No ID provided to fetchQuestionById");
      return;
    }

    try {
      setLoading(true);

      // Fetch the question by ID
      const response = await fetch(
        `${API_BASE_URL}/api/admin/questions/${_id}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch question data");
      }

      const data = await response.json();

      // Construct the image URL if it exists
      if (data.imageUrl) {
        const imagePath = `${API_BASE_URL}/upload/${data.imageUrl.path.replace(
          /\\/g,
          "/"
        )}`;
        data.imageUrl = imagePath; // Update the imageUrl with the correct path
      }

      setCurrentQuestion(data);

      // Retrieve qrCodeId from localStorage
      const qrCodeId = localStorage.getItem("qrCodeData");
      if (!qrCodeId) {
        console.error("qrCodeId not found in localStorage");
        return;
      }

      // Post the question to the required endpoint
      const postResponse = await fetch(
        `${API_BASE_URL}/api/qr/${qrCodeId}/change/${_id}`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(data), // Ensure you're sending the correct data
        }
      );

      if (!postResponse.ok) {
        throw new Error("Failed to post question to the QR endpoint");
      }

      const postResult = await postResponse.json();
      console.log("Question successfully posted:", postResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      const nextId = questions[nextIndex]?._id; // Update to `_id`
      if (nextId) {
        fetchQuestionById(nextId);
      } else {
        console.error("No ID found for the next question");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between m-4 lg:m-10 space-y-6 lg:space-y-0 bg-white rounded-lg shadow-lg p-6">
        <div className="lg:w-1/2 space-y-4 pr-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-800">
              {currentQuestion?.title}
            </h1>
            <h2 className="text-lg font-medium text-gray-700">
              {currentQuestion?.description}
            </h2>
            <h3 className="text-md text-gray-600">
              Dimension: {currentQuestion?.dimension}
            </h3>
            <h4 className="text-md text-gray-600">
              Year: {currentQuestion?.year}
            </h4>
          </div>
          <div className="mt-6">
            <p className="text-lg font-medium text-gray-800">
              Timer: {currentQuestion?.timer}:00
            </p>
          </div>
        </div>

        <div className="hidden lg:block border-l border-gray-300 mx-4"></div>

        <div className="lg:w-1/2 space-y-6 flex flex-col items-end justify-start">
          <div className="flex space-x-4 text-center justify-end w-full">
            <div className="text-lg font-semibold text-white bg-red-700 p-4 rounded-full">
              <p className="text-xl font-bold ">10</p>
            </div>
            <div className="text-lg font-semibold text-white bg-green-700 p-4 rounded-full">
              <p className="text-xl font-bold">6</p>
            </div>
          </div>

          <div className="w-full flex justify-center my-4">
            {/* Use image path if available */}
            <img
              src={
                currentQuestion?.imageUrl || "https://via.placeholder.com/400"
              }
              alt="Quiz"
              className="rounded-lg shadow-md w-80 h-80 object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleNext}
          disabled={currentIndex >= questions.length - 1}
          className="px-6 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import { API_BASE_URL } from "../config";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { useInterval } from "react-use";

// export default function QuestionPageAdmin() {
//   const [activeQuestion, setActiveQuestion] = useState(null);
//   const [scoreboard, setScoreboard] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const getAuthHeaders = () => ({
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//     "Content-Type": "application/json",
//   });

//   const fetchScoreboard = async () => {
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/api/survey/admin/scoreboard`,
//         {
//           headers: getAuthHeaders(),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to fetch scoreboard");
//       const data = await response.json();
//       setScoreboard(data);
//     } catch (err) {
//       console.error("Error fetching scoreboard:", err);
//     }
//   };

//   const setActiveQuestionById = async (questionId) => {
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/api/survey/admin/active-question/set`,
//         {
//           method: "POST",
//           headers: getAuthHeaders(),
//           body: JSON.stringify({ questionId }),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to set active question");
//       const data = await response.json();
//       setActiveQuestion(data.question);
//       fetchScoreboard(); // Refresh scoreboard after setting new question
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Poll for scoreboard updates every 2 seconds
//   useInterval(() => {
//     if (activeQuestion) {
//       fetchScoreboard();
//     }
//   }, 2000);

//   if (loading) {
//     return <div className="flex justify-center p-8">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <Alert variant="destructive" className="m-4">
//         <AlertDescription>{error}</AlertDescription>
//       </Alert>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <Card className="mb-6">
//         <CardContent className="p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Active Question Info */}
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold">Current Active Question</h2>
//               {activeQuestion ? (
//                 <>
//                   <h3 className="text-xl">{activeQuestion.title}</h3>
//                   <p className="text-gray-600">{activeQuestion.description}</p>
//                   {activeQuestion.imageUrl && (
//                     <img
//                       src={activeQuestion.imageUrl}
//                       alt="Question"
//                       className="rounded-lg max-w-md h-auto"
//                     />
//                   )}
//                   <div className="font-medium">
//                     Timer: {activeQuestion.timer} minutes
//                   </div>
//                 </>
//               ) : (
//                 <p>No active question</p>
//               )}
//             </div>

//             {/* Live Scoreboard */}
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold">Live Scoreboard</h2>
//               {scoreboard ? (
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-green-100 p-4 rounded-lg text-center">
//                       <div className="text-3xl font-bold text-green-700">
//                         {scoreboard.scoreboard.correctCount}
//                       </div>
//                       <div className="text-sm text-green-600">
//                         Correct Answers
//                       </div>
//                     </div>
//                     <div className="bg-red-100 p-4 rounded-lg text-center">
//                       <div className="text-3xl font-bold text-red-700">
//                         {scoreboard.scoreboard.incorrectCount}
//                       </div>
//                       <div className="text-sm text-red-600">
//                         Incorrect Answers
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span>Total Responses:</span>
//                       <span className="font-bold">
//                         {scoreboard.statistics.totalResponses}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Average Time:</span>
//                       <span className="font-bold">
//                         {scoreboard.statistics.averageTime}s
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Correct Percentage:</span>
//                       <span className="font-bold">
//                         {scoreboard.statistics.correctPercentage}%
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <p>No scoreboard data available</p>
//               )}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
