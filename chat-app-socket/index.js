const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*", // For dev — restrict in prod
  },
});

// Store mapping of users to socket IDs
const userSocketMap = new Map();

io.on("connection", (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  // Handle user joining with user ID
  socket.on("register", (userId) => {
    userSocketMap.set(userId, socket.id);
    socket.userId = userId;
    console.log(`📌 Registered user: ${userId}`);
  });

  // Join a group (room)
  socket.on("join group", (groupId) => {
    socket.join(groupId);
    console.log(`👥 ${socket.userId} joined group: ${groupId}`);
    io.to(groupId).emit("group notice", `${socket.userId} joined the group`);
  });

  // Group message
  socket.on("group message", ({ groupId, message }) => {
    console.log(`📢 Group ${groupId} message: ${message}`);
    io.to(groupId).emit("group message", {
      from: socket.userId,
      message,
    });
  });

  // 1-on-1 message
  socket.on("private message", ({ toUserId, message }) => {
    const targetSocketId = userSocketMap.get(toUserId);
    if (targetSocketId) {
      io.to(targetSocketId).emit("private message", {
        from: socket.userId,
        message,
      });
    } else {
      console.log(`⚠️ User ${toUserId} not connected`);
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    userSocketMap.delete(socket.userId);
    console.log(`❌ Disconnected: ${socket.userId}`);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running at http://localhost:${PORT}`);
});
