import React, { useEffect, useContext, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../context/AuthContext";

const socketUrl = "http://localhost:5000";

const WebSocketClient = () => {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [quizState, setQuizState] = useState("waiting"); // waiting, started, finished
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    const newSocket = io(socketUrl, {
      auth: {
        userId: user?.id,
        role: user?.role,
      },
      transports: ["websocket", "polling"],
    });

    setSocket(newSocket);

    // Socket event listeners
    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("participant_joined", (data) => {
      setParticipants((prev) => [...prev, data.participant]);
    });

    newSocket.on("participant_left", (data) => {
      setParticipants((prev) =>
        prev.filter((p) => p.id !== data.participantId)
      );
    });

    newSocket.on("quiz_started", () => {
      setQuizState("started");
    });

    newSocket.on("quiz_finished", () => {
      setQuizState("finished");
    });

    newSocket.on("new_question", (question) => {
      setCurrentQuestion(question);
    });

    newSocket.on("participants_list", (data) => {
      setParticipants(data.participants);
    });

    // Cleanup on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [user]);

  // Admin-only functions
  const startQuiz = () => {
    if (user?.role === "admin" && socket) {
      socket.emit("start_quiz");
    }
  };

  const nextQuestion = () => {
    if (user?.role === "admin" && socket) {
      socket.emit("request_next_question");
    }
  };

  const endQuiz = () => {
    if (user?.role === "admin" && socket) {
      socket.emit("end_quiz");
    }
  };

  // User functions
  const submitAnswer = (answerId) => {
    if (user?.role === "user" && socket) {
      socket.emit("submit_answer", {
        questionId: currentQuestion?.id,
        answerId,
      });
    }
  };

  // Render different controls based on user role
  const renderControls = () => {
    if (user?.role === "admin") {
      return (
        <div className="flex gap-4">
          {quizState === "waiting" && (
            <button
              onClick={startQuiz}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Start Quiz
            </button>
          )}
          {quizState === "started" && (
            <>
              <button
                onClick={nextQuestion}
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                Next Question
              </button>
              <button
                onClick={endQuiz}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                End Quiz
              </button>
            </>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${
            socket?.connected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="text-sm text-gray-600">
          {socket?.connected ? "Connected" : "Disconnected"}
        </span>
      </div>

      {/* Controls */}
      {renderControls()}

      {/* Participants Count */}
      {user?.role === "admin" && (
        <div className="text-sm text-gray-600">
          Participants: {participants.length}
        </div>
      )}
    </div>
  );
};

export default WebSocketClient;
