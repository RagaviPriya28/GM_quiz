export const quizReducer = (state, action) => {
    switch (action.type) {
      case "CREATE_QUIZ_START":
        return { ...state, loading: true };
      case "CREATE_QUIZ_SUCCESS":
        return {
          ...state,
          loading: false,
          quizzes: [...state.quizzes, action.payload],
        };
      case "CREATE_QUIZ_ERROR":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };