"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Sidebar = () => {
  const router = useRouter();

  const directMessages = [
    { id: "user-1", name: "John Doe", status: "online" },
    { id: "user-2", name: "Alice Johnson", status: "offline" },
    { id: "user-3", name: "Michael Scott", status: "online" },
    { id: "user-4", name: "Angela Martin", status: "offline" },
    { id: "user-5", name: "Dwight Schrute", status: "online" },
  ];

  const groupMessages = [
    { id: "group-1", name: "Dev Team" },
    { id: "group-2", name: "Friends Group" },
    { id: "group-3", name: "Startup Crew" },
    { id: "group-4", name: "Family Chat" },
  ];

  const goToChat = (id: string) => {
    router.push(`/chat/${id}`);
  };

  const handleLogout = async () => {
    const response = await axios.post("/api/signout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    console.log("Logged out");
    router.push("/signin");
  };

  return (
    <aside className="w-sm h-screen flex flex-col justify-between bg-gray-900 text-gray-100 border-r border-gray-700">
      <div>
        {/* Top Bar */}
        <div className="bg-blue-500 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center text-lg font-bold text-white">
              🧑
            </div>
            <span className="text-lg font-semibold">Chat Buddy</span>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-6 bg-gray-900">
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-400 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Direct Messages */}
        <div className="px-4">
          <div className="py-2 text-gray-400 uppercase text-xs flex justify-between">
            <span>Direct Messages</span>
            <button className="text-lg bg-gray-800 px-4 cursor-pointer">
              +
            </button>
          </div>
          <ul className="divide-y divide-gray-800">
            {directMessages.map((user) => (
              <li
                key={user.id}
                onClick={() => goToChat(user.id)}
                className="py-4 px-2 hover:bg-gray-700 cursor-pointer transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{user.name}</span>
                  <span
                    className={`text-xs ${
                      user.status === "online"
                        ? "text-green-400"
                        : "text-gray-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Group Messages */}
        <div className="px-4 mt-8">
          <div className="py-2 text-gray-400 uppercase text-xs flex justify-between">
            <span>Group Messages</span>
            <button className="text-lg bg-gray-800 px-4 cursor-pointer">
              +
            </button>
          </div>
          <ul className="divide-y divide-gray-800">
            {groupMessages.map((group) => (
              <li
                key={group.id}
                onClick={() => goToChat(group.id)}
                className="py-4 px-2 hover:bg-gray-700 cursor-pointer transition"
              >
                <span className="font-medium">{group.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 py-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full bg-gray-800 text-red-400 border border-red-400 hover:bg-gray-700 py-3 rounded-lg text-sm font-medium transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
