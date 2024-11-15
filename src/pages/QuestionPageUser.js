import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";

const SurveyQuestion = () => {
  const [questionData, setQuestionData] = useState(null); // State to store the question data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  // Fetch the QR code ID from localStorage
  const qrCodeId = localStorage.getItem("qrCodeData");

  useEffect(() => {
    // Define an async function to fetch the data
    const fetchData = async () => {
      if (qrCodeId) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/qr/${qrCodeId}/current`
          );
          if (!response.ok) {
            // If the response is not OK (status 200-299), throw an error
            throw new Error(
              "Failed to fetch the question. Please check the API URL or the server status."
            );
          }
          const data = await response.json(); // Parse the JSON data if the response is OK
          console.log(data); // Log the response data to the console
          setQuestionData(data); // Set the question data when successfully fetched
        } catch (err) {
          // Handle errors
          setError(err.message); // Set the error message if the fetch fails
        } finally {
          setLoading(false); // Set loading to false after the request completes (success or error)
        }
      } else {
        setError("QR code ID not found in localStorage");
        setLoading(false);
      }
    };

    fetchData(); // Call the async function to fetch the data
  }, [qrCodeId]); // Effect will re-run when qrCodeId changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there's an issue
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <div className="w-[80%] bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {questionData?.title || "Survey user: page 2: question 1"}
        </h2>

        <div className="flex justify-center mb-8">
          <div className="w-[90%] aspect-[16/9] relative">
            <img
              src={questionData?.imageUrl || "/api/placeholder/1200/800"}
              alt="Artwork"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-center gap-8">
          <button
            className="px-16 py-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium text-xl"
            onClick={() => console.log("YES clicked")}
          >
            {questionData?.answerOptions[0].optionText}
          </button>

          <button
            className="px-16 py-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium text-xl"
            onClick={() => console.log("NO clicked")}
          >
            {questionData?.answerOptions[1].optionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyQuestion;
