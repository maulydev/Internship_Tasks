import http from "http";
import { Server } from "socket.io";
import axios from "axios";

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

// Store mapping of userId -> socket.id
const onlineUsers = {};

io.on("connection", (socket) => {
  
  socket.on("register-user", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log(`✅ User ${userId} registered with socket ${socket.id}`);
  });

  socket.on("join-group", ({ username, group }) => {
    socket.join(group);
    socket.to(group).emit("group-message", {
      senderId: "Buddy Bot",
      sender: { name: "Buddy Bot" },
      to: group,
      isSystem: true,
      content: `${username} has joined the chat`,
    });
  });


  socket.on("private-message", async ({ content, senderId, receiverId, authToken }) => {
    const chatPayload = {
      content,
      senderId,
      receiverId,
      groupId: null,
      isSystem: false,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/chats",
        chatPayload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      const messageData = response.data.data;

      // Send to receiver if online
      if (onlineUsers[receiverId]) {
        io.to(onlineUsers[receiverId]).emit("private-message", messageData);
      }

      // Send back to sender so they see their own message instantly
      if (onlineUsers[senderId]) {
        io.to(onlineUsers[senderId]).emit("private-message", messageData);
      }

    } catch (error) {
      console.error("❌ Error sending private message:", error.message);
    }
  });


  socket.on("group-message", async ({ from, to, message, isSystem, isPrivate, authToken }) => {
    const chatPayload = {
      content: message,
      senderId: from,
      receiverId: isPrivate ? to : null,
      groupId: isPrivate ? null : to,
      isSystem,
    };

    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/chats",
        chatPayload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      console.log("response", response)

      io.to(to).emit("group-message", response.data.data);

    } catch (error) {
      console.error("❌ Error sending group message:", error);
    }
  });


  socket.on("disconnect", () => {
    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        console.log(`❌ User ${userId} is now offline`);
        break;
      }
    }
  });
});

const PORT = 5500;

server.listen(PORT, () => {
  console.log(`🚀 Socket server running on http://localhost:${PORT}`);
});
