import React, { useEffect, useContext, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../context/AuthContext";

const socketUrl = "http://localhost:5000";

const WebSocketClient = () => {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

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




    // Cleanup on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [user]);

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

    </div>
  );
};

export default WebSocketClient;
