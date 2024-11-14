import React, { useEffect, useState } from "react";

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
        const response = await fetch("http://localhost:5000/api/questions", {
          method: "GET",
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch questions list");
        }

        const data = await response.json();
        setQuestions(data);
        console.log(data);

        // Updated condition to use `_id` instead of `id`
        if (data.length > 0 && data[0]._id) {
          fetchQuestionById(data[0]._id); // Fetch details for the first question using `_id`
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
      const response = await fetch(
        `http://localhost:5000/api/survey-questions/${_id}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch question data");
      }

      const data = await response.json();
      setCurrentQuestion(data);
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
            <img
              src="https://via.placeholder.com/400"
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
