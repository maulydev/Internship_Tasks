// "use client";

// import ChatHistory from "@/components/chat/chat-history";
// import MessageInputBar from "@/components/chat/message-input";
// import { ChatMessage, ChatHeaderInfo } from "@/types";
// import { socket } from "@/utils/socket-client";
// import { user } from "@/utils/users";
// import { useEffect, useState } from "react";
// import axiosInstance from "@/utils/axiosInstance";
// import { useSearchParams } from "next/navigation";
// import ChatHeader from "./group-info";

// const ChatUI = ({ roomId }: { roomId: string }) => {
//   const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
//   const [chatHeaderInfo, setChatHeaderInfo] = useState<ChatHeaderInfo>(null);
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     setChatHistory([]); // Clear old group messages

//     if (searchParams.get("_p") === "1") {
//       socket.on("private-message", (data) => {
//         setChatHistory((prev) => [...prev, data]);
//       });
//     } else {
//       socket.emit("join-group", {
//         username: user?.name,
//         group: roomId,
//         timestamp: new Date().toLocaleTimeString(),
//       });

//       socket.on("group-message", (data) => {
//         setChatHistory((prev) => [...prev, data]);
//       });
//     }

//     return () => {
//       socket.off("group-message");
//       socket.off("join-group");
//     };
//   }, [roomId]);

//   useEffect(() => {
//     if (searchParams.get("_p") === "1") {
//       (async () => {
//         const response = await axiosInstance.get(
//           `/api/chats/${roomId}/private`
//         );

//         if (response.status === 200) {
//           console.log("response...", response?.data?.receiver?.name);
//           setChatHeaderInfo(response.data?.receiver);
//           setChatHistory(response.data?.messages);
//         }
//       })();
//     } else {
//       (async () => {
//         const response = await axiosInstance.get(`/api/chats/${roomId}/group`);

//         if (response.status === 200) {
//           setChatHeaderInfo(response.data?.group);
//           setChatHistory(response.data?.messages);
//         }
//       })();
//     }
//   }, [roomId]);

//   useEffect(() => {
//     socket.emit("register-user", user?.userId);
//   }, []);

//   return (
//     <div className="flex flex-col h-svh bg-gray-900 text-white w-full">
//       <div className="bg-gray-800 px-4 py-3.5 border-b border-gray-700 flex items-center justify-between">
//         <div>
//           <div className="text-sm font-semibold">
//             {chatHeaderInfo?.name || "Loading..."}
//           </div>
//           <small className="text-green-500">{/* 5 Users */}</small>
//         </div>
//         <ChatHeader chatHeaderInfo={chatHeaderInfo} />
//       </div>

//       <ChatHistory chatHistory={chatHistory} access={user} />
//       <MessageInputBar
//         access={user}
//         roomId={roomId}
//         isPrivate={searchParams.get("_p") === "1"}
//       />
//     </div>
//   );
// };

// export default ChatUI;



// "use client";

// import ChatHistory from "@/components/chat/chat-history";
// import MessageInputBar from "@/components/chat/message-input";
// import { socket } from "@/utils/socket-client";
// import { user } from "@/utils/users";
// import { useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import ChatHeader from "./group-info";
// import { useFetchPrivateChat } from "@/hooks/private";
// import { useFetchGroupChat } from "@/hooks/groups";
// import {
//   requestNotificationPermission,
//   showNotification,
// } from "@/utils/notification";

// const ChatUI = ({ roomId }: { roomId: string }) => {
//   const searchParams = useSearchParams();
//   const isPrivate = searchParams.get("_p") === "1";

//   const { data: privateData, refetch: privateChatRefetch } =
//     useFetchPrivateChat(roomId, isPrivate);
//   const { data: groupData, refetch: groupChatRefetch } = useFetchGroupChat(
//     roomId,
//     !isPrivate
//   );

//   const chatHeaderInfo = isPrivate ? privateData?.receiver : groupData?.group;

//   const chatHistory = isPrivate
//     ? privateData?.messages || []
//     : groupData?.messages || [];

//   useEffect(() => {
//     if (isPrivate) {
//       socket.on("private-message", (data) => {
//         // privateChatRefetch();
//         showNotification("Chat Buddy 💬", `${data?.sender?.name}: ${data?.content}`);
//       });
//     } else {
//       socket.emit("join-group", {
//         username: user?.name,
//         group: roomId,
//         timestamp: new Date().toLocaleTimeString(),
//       });

//       socket.on("group-message", () => {
//         // groupChatRefetch();
//       });
//     }

//     return () => {
//       socket.off("group-message");
//       socket.off("private-message");
//       socket.off("join-group");
//     };
//   }, [roomId, isPrivate, privateChatRefetch, groupChatRefetch]);

//   useEffect(() => {
//     socket.emit("register-user", user?.userId);
//     requestNotificationPermission();
//   }, []);

//   return (
//     <div className="flex flex-col h-svh bg-gray-900 text-white w-full">
//       <div className="bg-gray-800 px-4 py-3.5 border-b border-gray-700 flex items-center justify-between">
//         <div>
//           <div className="text-sm font-semibold">
//             {chatHeaderInfo?.name || "Loading..."}
//           </div>
//           {/* <small className="text-green-500"></small> */}
//         </div>
//         <ChatHeader chatHeaderInfo={chatHeaderInfo} />
//       </div>

//       <ChatHistory chatHistory={chatHistory} access={user} />
//       <MessageInputBar access={user} roomId={roomId} isPrivate={isPrivate} />
//     </div>
//   );
// };

// export default ChatUI;


"use client";

import ChatHistory from "@/components/chat/chat-history";
import MessageInputBar from "@/components/chat/message-input";
import { socket } from "@/utils/socket-client";
import { user } from "@/utils/users";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ChatHeader from "./group-info";
import { useFetchConversations, useFetchPrivateChat } from "@/hooks/private";
import { useFetchGroupChat } from "@/hooks/groups";
import {
  requestNotificationPermission,
  showNotification,
} from "@/utils/notification";
import { ChatMessage } from "@/types";

const ChatUI = ({ roomId }: { roomId: string }) => {
  const searchParams = useSearchParams();
  const isPrivate = searchParams.get("_p") === "1";

  const { data: privateData } = useFetchPrivateChat(roomId, isPrivate);
  const { data: groupData } = useFetchGroupChat(roomId, !isPrivate);
  const { refetch } = useFetchConversations()

  const chatHeaderInfo = isPrivate ? privateData?.receiver : groupData?.group;

  // Local state for messages
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Load initial messages when data changes
  useEffect(() => {
    const messages = isPrivate
      ? privateData?.messages || []
      : groupData?.messages || [];
    setChatHistory(messages);
  }, [privateData, groupData, isPrivate]);

  // Append new messages from socket
  useEffect(() => {
    if (isPrivate) {
      socket.on("private-message", (data: ChatMessage) => {
        setChatHistory((prev) => [...prev, data]);
        showNotification("Chat Buddy 💬", `${data?.sender?.name}: ${data?.content}`);
        refetch()
      });
    } else {
      socket.emit("join-group", {
        username: user?.name,
        group: roomId,
        timestamp: new Date().toLocaleTimeString(),
      });

      socket.on("group-message", (data: ChatMessage) => {
        setChatHistory((prev) => [...prev, data]);
      });
    }

    return () => {
      socket.off("group-message");
      socket.off("private-message");
      socket.off("join-group");
    };
  }, [roomId, isPrivate]);

  useEffect(() => {
    socket.emit("register-user", user?.userId);
    requestNotificationPermission();
  }, []);

  return (
    <div className="flex flex-col h-svh bg-gray-900 text-white w-full">
      <div className="bg-gray-800 px-4 py-3.5 border-b border-gray-700 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">
            {chatHeaderInfo?.name || "Loading..."}
          </div>
        </div>
        <ChatHeader chatHeaderInfo={chatHeaderInfo} />
      </div>

      <ChatHistory chatHistory={chatHistory} access={user} />
      <MessageInputBar access={user} roomId={roomId} isPrivate={isPrivate} />
    </div>
  );
};

export default ChatUI;
