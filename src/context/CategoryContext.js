import React, { createContext, useReducer, useContext, useCallback } from "react";
import axios from "axios";
import { categoryReducer } from "../reducers/categoryReducer";

export const CategoryContext = createContext();

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Initial state for the reducer
const initialState = {
  categories: [],
  loading: false,
  error: null,
  currentCategory: null,
};

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const fetchCategories = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const response = await axios.get("http://localhost:5000/api/categories", {
        headers: getAuthHeaders(),
      });
      dispatch({ type: "FETCH_SUCCESS", payload: response.data });
    } catch (err) {
      dispatch({
        type: "FETCH_ERROR",
        payload: err.response?.data || "Failed to fetch categories",
      });
    }
  }, []);

  const fetchCategoryById = useCallback(async (id) => {
    dispatch({ type: "FETCH_SINGLE_START" });
    try {
      const response = await axios.get(
        `http://localhost:5000/api/categories/${id}`,
        {
          headers: getAuthHeaders(),
        }
      );
      dispatch({ type: "FETCH_SINGLE_SUCCESS", payload: response.data });
      return response.data;
    } catch (err) {
      dispatch({
        type: "FETCH_ERROR",
        payload: err.response?.data || "Failed to fetch category",
      });
      return null;
    }
  }, []);

  const createCategory = useCallback(async (categoryData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/categories",
        categoryData,
        {
          headers: getAuthHeaders(),
        }
      );
      dispatch({ type: "CREATE_SUCCESS", payload: response.data.category });
      return response.data.category;
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response?.data || "Failed to create category",
      });
      return null;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const updateCategory = useCallback(async (id, updatedData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await axios.put(
        `http://localhost:5000/api/categories/${id}`,
        updatedData,
        {
          headers: getAuthHeaders(),
        }
      );
      dispatch({ type: "UPDATE_SUCCESS", payload: response.data.category });
      return response.data.category;
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response?.data || "Failed to update category",
      });
      return null;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const deleteCategory = useCallback(async (id) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`, {
        headers: getAuthHeaders(),
      });
      dispatch({ type: "DELETE_SUCCESS", payload: id });
      return true;
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response?.data || "Failed to delete category",
      });
      return false;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        ...state,
        fetchCategories,
        fetchCategoryById,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook for using CategoryContext
export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};