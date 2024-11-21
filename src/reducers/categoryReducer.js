// Reducer function to manage state transitions
export const categoryReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SINGLE_START":
      return { ...state, loading: true, error: null, currentCategory: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: null,
      };
    case "FETCH_SINGLE_SUCCESS":
      return {
        ...state,
        loading: false,
        currentCategory: action.payload,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "CREATE_SUCCESS":
      return {
        ...state,
        categories: [...state.categories, action.payload],
        error: null,
      };
    case "UPDATE_SUCCESS":
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat
        ),
        currentCategory: action.payload,
        error: null,
      };
    case "DELETE_SUCCESS":
      return {
        ...state,
        categories: state.categories.filter(
          (cat) => cat._id !== action.payload
        ),
        currentCategory: null,
        error: null,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
