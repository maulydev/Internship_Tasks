import { ChatMessage, Payload } from "@/types";
import { linkify } from "@/utils/formatters";
import React, { useEffect, useRef } from "react";

const ChatHistory = ({
  chatHistory,
  access,
}: {
  chatHistory: ChatMessage[];
  access: Payload;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
    >
      {chatHistory?.length > 0 ? (
        chatHistory.map((msg, index) =>
          msg.isSystem ? (
            <div
              key={msg.createdAt + index}
              className="w-full text-center text-xs italic text-gray-400 my-2"
            >
              {msg.content}
            </div>
          ) : (
            <div
              key={msg.createdAt + index}
              className={`${
                msg.senderId === access?.userId
                  ? "ml-auto text-right"
                  : "mr-auto"
              } w-max max-w-xs md:max-w-md lg:max-w-xl rounded-lg text-sm px-6`}
            >
              <span className="text-xs text-white/70 mt-1">
                {msg.sender?.name}
              </span>
              <div
                className={`px-4 py-3 ${
                  msg.senderId === access?.userId
                    ? "bg-blue-600 text-left rounded-3xl rounded-tr-none"
                    : "bg-gray-700 rounded-3xl rounded-tl-none"
                }`}
              >
                <p>{linkify(msg.content)}</p>
              </div>
              <span className="text-xs text-white/70 mt-1">
                {new Date(msg.createdAt || "").toLocaleTimeString()}
              </span>
            </div>
          )
        )
      ) : (
        <div className="flex flex-col items-center justify-center mt-12 text-center text-gray-400">
          <div className="text-4xl mb-2">👋</div>
          <p className="text-lg font-medium">Welcome to the chat</p>
          <p className="text-sm opacity-70">
            Say hello to start the conversation!
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
