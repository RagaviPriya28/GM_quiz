import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";

const SurveyQuestion = ({ sessionId }) => {  // Pass sessionId as a prop or retrieve it from another source
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const qrCodeId = localStorage.getItem("qrCodeData");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/qr/${qrCodeId}/current`);

        if (!response.ok) {
          throw new Error("Failed to fetch question");
        }

        const data = await response.json();
        setQuestionData(data);
        setStartTime(Date.now());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [qrCodeId, token]);

  const handleAnswerSubmit = async (answerText) => {
    if (!questionData?._id) {
      setError("Session ID or Question ID is missing.");
      return;
    }
  
    setSubmitting(true);
    setError(null); 
    setSuccessMessage(null); 
  
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
  
    try {
      // Construct the URL with sessionId, qrCodeId, and questionId
      const response = await fetch(`${API_BASE_URL}/api/submit-answer/${qrCodeId}/${questionData._id}/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answerType: "single-choice",  // Adjust this if you have different types of questions
          answerText,                   // Use answerText instead of submittedAnswer
          timeTaken,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit answer");
      }
  
      setSuccessMessage("Your answer has been successfully submitted!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {successMessage && <div className="mb-4 text-green-600">{successMessage}</div>}

        <h2 className="text-xl md:text-2xl font-semibold text-center mb-4 md:mb-6">
          {questionData?.title}
        </h2>

        <div className="flex justify-center mb-6 md:mb-8">
          <div className="w-full max-w-3xl aspect-[16/9] relative">
            <img
              src={questionData?.imageUrl || "/api/placeholder/1200/800"}
              alt="Question"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
          {questionData?.answerOptions?.map((option, index) => (
            <button
              key={index}
              className={`flex-1 md:flex-none w-full md:w-auto px-6 md:px-16 py-3 md:py-4 
                ${index === 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                text-white rounded-md transition-colors font-medium text-lg md:text-xl
                disabled:opacity-50`}
              onClick={() => handleAnswerSubmit(option.optionText)}
              disabled={submitting}
            >
              {option.optionText}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurveyQuestion;
