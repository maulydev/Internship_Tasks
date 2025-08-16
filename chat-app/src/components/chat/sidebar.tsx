"use client";

import { useRouter } from "next/navigation";
import { user } from "@/utils/users";
import CreateGroup from "./create-group";
import { BiChevronRight } from "react-icons/bi";
import { useFetchGroups } from "@/hooks/groups";
import { VscLoading } from "react-icons/vsc";
import { useFetchConversations } from "@/hooks/private";
import StartConversation from "./start-new-conversation";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect } from "react";
import { socket } from "@/utils/socket-client";

const Sidebar = () => {
  const router = useRouter();

  const { data: groups, error, isError, isLoading } = useFetchGroups();
  const {
    data: directMessages = [],
    isLoading: isDirectMsgLoading,
  } = useFetchConversations();

  const goToChat = (detail: { id: string; name: string }, isPrivate: 1 | 0) => {
    router.push(`/chat/${detail?.id}?_p=${isPrivate}`);
  };

  const handleLogout = async () => {
    await axiosInstance.post("/api/signout", {});
    router.push("/signin");
  };

  return (
    <aside className="w-sm h-screen flex flex-col justify-between bg-gray-900 text-gray-100 border-r border-gray-700">
      <div className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="bg-blue-500 px-4 py-4 flex items-center justify-between sticky top-0">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center text-lg font-bold text-white">
              🧑
            </div>
            <span className="text-lg font-semibold">
              {user?.name || "Chat Buddy"}
            </span>
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
          <div className="py-2 text-gray-400 text-xs flex justify-between items-center">
            <span className="font-bold uppercase">Direct Messages</span>
            <StartConversation />
          </div>
          {isDirectMsgLoading ? (
            <p className="opacity-50 text-sm italic flex items-center gap-x-4">
              <VscLoading className="animate-spin" />{" "}
              <span>fectching users...</span>
            </p>
          ) : directMessages?.length > 0 ? (
            <ul className="divide-y divide-gray-800">
              {directMessages.map((user) => (
                <li
                  key={user.id}
                  onClick={() => goToChat(user, 1)}
                  className="py-4 px-2 hover:bg-gray-700 cursor-pointer transition"
                >
                  <div className="">
                    <span className="font-medium">{user.name}</span>
                    <p className="opacity-35 truncate text-xs flex items-center gap-x-2 mt-1">
                      <BiChevronRight className="text-lg border" />{" "}
                      {user?.lastMessage || "-"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="opacity-50 text-sm italic">No users online...</p>
          )}
        </div>

        {/* Group Messages */}
        <div className="px-4 mt-8 pb-8">
          <div className="py-2 text-gray-400 text-xs flex justify-between items-center">
            <span className="uppercase font-bold">Group Messages</span>
            <CreateGroup />
          </div>
          {isError ? (
            <p>{error?.message || "Error fetching groups"}</p>
          ) : isLoading ? (
            <p className="opacity-50 text-sm italic flex items-center gap-x-4">
              <VscLoading className="animate-spin" />{" "}
              <span>fectching groups...</span>
            </p>
          ) : groups && groups.length > 0 ? (
            <ul className="divide-y divide-gray-800">
              {groups?.map((group) => (
                <li
                  key={group?.id}
                  onClick={() => (group ? goToChat(group, 0) : {})}
                  className="py-4 px-2 hover:bg-gray-700 cursor-pointer transition"
                >
                  <span className="block font-medium">{group?.name}</span>
                  <p className="block opacity-35 truncate text-xs">
                    {group?.description || "No description"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="opacity-50 text-sm italic flex items-center gap-x-4">
              No groups available...
            </p>
          )}
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
