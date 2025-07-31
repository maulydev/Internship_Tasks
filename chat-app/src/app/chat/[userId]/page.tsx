"use client";

import { useParams } from "next/navigation";

const ChatUI = () => {
  const { userId } = useParams();

  const messages = [
    { id: 1, fromMe: false, content: "Hey there!", timestamp: "2:00 PM" },
    {
      id: 2,
      fromMe: true,
      content:
        "Hello! How are you?, px-4 py-2 text-gray-400 uppercase text-xs flex justify-between mt-8, px-4 py-2 text-gray-400 uppercase text-xs flex justify-between mt-8, px-4 py-2 text-gray-400 uppercase text-xs flex justify-between mt-8, Hello! How are you?, px-4 py-2 text-gray-400 uppercase text-xs flex justify-between mt-8, px-4 py-2 text-gray-400 uppercase text-xs flex justify-between mt-8, px-4 py-2 text-gray-400 uppercase text-xs flex justify-between mt-8",
      timestamp: "2:01 PM",
    },
    {
      id: 3,
      fromMe: false,
      content: "Doing great, thanks!",
      timestamp: "2:02 PM",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white w-full">
      {/* Top Bar */}
      <div className="bg-gray-800 px-4 py-3.5 border-b border-gray-700 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Chat with {userId}</div>
          <small className="text-green-500">Online</small>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${
              msg.fromMe ? "ml-auto text-right" : "mr-auto"
            } w-max max-w-xs md:max-w-md lg:max-w-xl rounded-lg text-sm px-6`}
          >
            <div
              className={`px-4 py-3 ${
                msg.fromMe
                  ? "bg-blue-600 text-left rounded-3xl rounded-br-none"
                  : "bg-gray-700 rounded-3xl rounded-bl-none"
              }`}
            >
              <p>{msg.content}</p>
            </div>
            <span className="text-xs text-white/70 mt-1">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="px-4 py-3 border-t border-gray-700 bg-gray-800">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-3 bg-gray-700 text-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-700 rounded-lg transition px-6 py-3 text-sm font-medium cursor-pointer">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
