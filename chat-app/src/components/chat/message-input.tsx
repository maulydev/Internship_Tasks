"use client";

import { Payload } from "@/types";
import { socket } from "@/utils/socket-client";
import React, { useState } from "react";

const MessageInputBar = ({
  access,
  roomId,
  isPrivate,
}: {
  access: Payload;
  roomId: string;
  isPrivate: boolean;
}) => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const handleInputMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    if (isPrivate) {
      socket.emit("private-message", {
        content: inputMessage.trim(),
        senderId: access?.userId,
        receiverId: roomId,
        authToken: localStorage.getItem("access")
      });
    } else {
      socket.emit("group-message", {
        senderName: access?.name,
        from: access?.userId,
        to: roomId,
        message: inputMessage.trim(),
        isSystem: false,
        isPrivate: isPrivate,
        timestamp: new Date().toLocaleTimeString(),
        authToken: localStorage.getItem("access")
      });
    }
    setInputMessage("");
  };

  return (
    <div className="px-4 py-3 border-t border-gray-700 bg-gray-800">
      <div className="flex items-center space-x-2">
        <input
          onChange={handleInputMessage}
          value={inputMessage}
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-3 bg-gray-700 text-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          disabled={inputMessage.trim() === ""}
          onClick={handleSendMessage}
          className="bg-blue-600 hover:bg-blue-700 rounded-lg transition px-6 py-3 text-sm font-medium cursor-pointer disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInputBar;