import React, { createContext, useReducer, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        dispatch({
          type: "LOGIN",
          payload: { user: storedUser, token: storedToken },
        });
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storedToken}`;
      }
      setLoading(false);
    };

    initializeAuth();

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
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
            return axios(originalRequest);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const login = async (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch({ type: "LOGIN", payload: { user, token } });
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      // Call the server-side logout endpoint
      await axios.post(`http://localhost:5000/api/auth/logout`, { token });

      // Clear local storage and remove the authorization header
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];

      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout failed", error);
      throw error; // Optionally, handle this error in your UI
    }
  };

  const register = async (email, mobile, password) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/register`,
        {
          email,
          mobile,
          password,
        }
      );
      const { user, token } = response.data;
      await login(user, token);
      return response.data;
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/refresh-token`,
        {
          token: localStorage.getItem("token"),
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      console.error("Failed to refresh token", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};