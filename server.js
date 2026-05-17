const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();

const { Server } = require("socket.io");

const connectDB = require("./config/db");

// ================= ROUTES =================
const matchRoutes = require("./routes/matchRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const searchRoutes = require("./routes/searchRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const messageRoutes = require("./routes/chatRoutes");

// ================= APP INIT =================
const app = express();
const server = http.createServer(app);

// ================= ENV =================
const CLIENT_URL =
  process.env.CLIENT_URL ||
  "https://unibuddy-app.netlify.app";

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

// ================= SOCKET.IO =================
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ================= ONLINE USERS =================
const onlineUsers = {};

// ================= SOCKET EVENTS =================
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // user joins
  socket.on("join", (userId) => {
    if (!userId) return;

    onlineUsers[userId] = socket.id;

    console.log("🟢 Online Users:", onlineUsers);
  });

  // send message
  socket.on("sendMessage", (data) => {
    const { receiverId } = data;

    const receiverSocketId = onlineUsers[receiverId];

    // send to receiver
    if (receiverSocketId) {
      io.to(receiverSocketId).emit(
        "receiveMessage",
        data
      );
    }

    // send back to sender
    socket.emit("receiveMessage", data);
  });

  // disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);

    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        break;
      }
    }

    console.log("🔴 Online Users:", onlineUsers);
  });
});

// ================= DATABASE =================
connectDB();

// ================= ROUTES =================
app.use("/api/matches", matchRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/chat", messageRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("🚀 UniBuddy API Running Successfully");
});

// ================= ERROR HANDLING =================
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({
    message: "Internal Server Error",
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});