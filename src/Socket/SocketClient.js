import React, { useEffect, useContext, useState, useCallback } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../context/AuthContext";
import { API_BASE_URL } from "../config";

const socketUrl = `${API_BASE_URL}`;

const WebSocketClient = () => {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState({
    isConnected: false,
    error: null,
  });
  const [lastEvent, setLastEvent] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    if (!user?.id) return;

    const newSocket = io(socketUrl, {
      auth: {
        userId: user.id,
        role: user.role,
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(newSocket);

    // Socket event listeners
    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      setConnectionStatus({
        isConnected: true,
        error: null,
      });
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
      setConnectionStatus({
        isConnected: false,
        error: "Disconnected from server",
      });
    });

    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
      setConnectionStatus({
        isConnected: false,
        error: error.message,
      });
    });

    newSocket.on("user_joined_lobby", ({ userId }) => {
      setLastEvent({
        type: "user_joined",
        message: `User ${userId} joined the lobby`,
      });
    });

    newSocket.on("quiz_started", ({ quizId }) => {
      setLastEvent({
        type: "quiz_started",
        message: `Quiz ${quizId} started`,
      });
    });

    newSocket.on("new_question", (question) => {
      setLastEvent({
        type: "new_question",
        message: "New question received",
        data: question,
      });
    });

    newSocket.on("timer_update", ({ countdown }) => {
      setLastEvent({
        type: "timer",
        message: `Timer update: ${countdown}s remaining`,
      });
    });

    // Cleanup on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [user]);

  // Socket action methods
  const joinSession = useCallback(
    async (sessionId) => {
      if (!socket?.connected || !user?.id) return;
      socket.emit("join_session", { sessionId, userId: user.id });
    },
    [socket, user]
  );

  const startQuiz = useCallback(
    (sessionId) => {
      if (!socket?.connected) return;
      socket.emit("start_quiz", sessionId);
    },
    [socket]
  );

  const requestNextQuestion = useCallback(
    (qrCodeData, questionId) => {
      if (!socket?.connected) return;
      socket.emit("next_question", { qrCodeData, questionId });
    },
    [socket]
  );

  const updateTimer = useCallback(
    (countdown) => {
      if (!socket?.connected) return;
      socket.emit("timer_update", { countdown });
    },
    [socket]
  );

  return (
    <div className="space-y-4 p-4">
      {/* Connection Status */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              connectionStatus.isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-sm font-medium text-gray-700">
            {connectionStatus.isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {socket?.id ? `Socket ID: ${socket.id}` : "No connection"}
        </span>
      </div>

      {/* Error Alert */}
      {connectionStatus.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <div className="font-semibold">Error</div>
          <div className="text-sm">{connectionStatus.error}</div>
        </div>
      )}

      {/* Last Event Display */}
      {lastEvent && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-lg">
          <div className="font-semibold">Last Event</div>
          <div className="text-sm">{lastEvent.message}</div>
        </div>
      )}
    </div>
  );
};

export default WebSocketClient;
