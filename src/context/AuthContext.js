// src/AuthContext.js
import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      dispatch({
        type: "LOGIN",
        payload: { user: storedUser, token: storedToken },
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    // Add interceptor for handling token expiration
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Check if the error is a 401 and we haven’t retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshedToken = await refreshToken();
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${refreshedToken}`;
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${refreshedToken}`;
            return axios(originalRequest); // Retry with refreshed token
          } catch (refreshError) {
            logout(); // Log out if refresh fails
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    // Remove interceptor on unmount
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch({ type: "LOGIN", payload: { user, token } });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: "LOGOUT" });
  };

  // Function to refresh token if expired
  const refreshToken = async () => {
    try {
      const response = await axios.post("/api/refresh-token", {
        token: localStorage.getItem("token"),
      });
      const { token } = response.data;

      // Store new token and update axios authorization header
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return token;
    } catch (error) {
      console.error("Failed to refresh token", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
