import React, { createContext, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { quizReducer } from "../reducers/quizReducer";

const initialState = {
  quizzes: [],
  loading: false,
  error: null,
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const navigate = useNavigate(); // Initialize useNavigate

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  });

  const createQuiz = async (categoryId) => {
    dispatch({ type: "CREATE_QUIZ_START" });
    try {
      const response = await fetch("http://localhost:5000/api/quizzes", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          categoryId,
          duration: 60,
          isPublic: true,
          status: "draft",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create quiz");
      }

      const data = await response.json();
      dispatch({ type: "CREATE_QUIZ_SUCCESS", payload: data.quiz });

      // Redirect to the created quiz's page
      navigate(`/create/${data.quiz._id}`); // Redirect to /create/quizId
    } catch (error) {
      dispatch({ type: "CREATE_QUIZ_ERROR", payload: error.message });
    }
  };

  return (
    <QuizContext.Provider value={{ state, createQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
