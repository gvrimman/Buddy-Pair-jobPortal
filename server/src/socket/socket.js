const socketIo = require("socket.io");
const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser"); // To parse cookies
const { socketAuthMiddleware } = require("../middlewares/socketAuthMiddleware");
const Conversation = require("../models/conversation");
const Message = require("../models/message");

const app = express();

// Middleware for parsing cookies in HTTP requests (optional for future use)
app.use(cookieParser());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// Attach middleware for Socket.IO authentication
io.use(socketAuthMiddleware);

io.on("connection", (socket) => {
  const userId = socket?.user?._id || "demouid"; // Extracted from socketAuthMiddleware

  // Map userId to the current socket ID
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
  }

  // Emit the list of online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("joinRoom", ({ chatId }) => {
    socket.join(chatId);
  });

  socket.on("sendMessage", async ({ receiverId, chatId, content }) => {
    try {
      const chat = await Conversation.findById(chatId);

      if (chat) {
        const message = new Message({
          senderId: userId,
          receiverId,
          message: content,
          chatRoom: chatId,
        });
        await message.save();
        chat.messages.push(message._id);
        if (!chat.initiated) chat.initiated = true;
        await chat.save();

        io.to(chatId).emit("newMessage", message);
      } else {
        console.log("chat not found");
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  });

  // Listen for disconnection
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log(`User ${userId} disconnected`);
  });
});

module.exports = { app, io, server, getReceiverSocketId };
