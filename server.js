const express = require("express");
const cors = require("cors");
const http = require("http");

require("dotenv").config();

const { Server } = require("socket.io");

const connectDB = require("./config/db");

// ✅ IMPORT ROUTES
const matchRoutes = require("./routes/matchRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const searchRoutes = require("./routes/searchRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const messageRoutes = require("./routes/chatRoutes");

// ✅ INITIALIZE EXPRESS
const app = express();

// ✅ CREATE HTTP SERVER
const server = http.createServer(app);

// ✅ CLIENT URL
const CLIENT_URL =
  process.env.CLIENT_URL ||
  "https://unibuddy-app.netlify.app";

// ✅ SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: "https://unibuddy-app.netlify.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ STORE ONLINE USERS
const onlineUsers = {};

// ✅ SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // USER JOINS
  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id;

    console.log("🟢 Online Users:", onlineUsers);
  });

  // SEND MESSAGE
  socket.on("sendMessage", (data) => {
    console.log("📩 Message:", data);

    const receiverSocketId =
      onlineUsers[data.receiverId];

    // SEND TO RECEIVER
    if (receiverSocketId) {
      io.to(receiverSocketId).emit(
        "receiveMessage",
        data
      );
    }

    // ALSO SEND BACK TO SENDER
    socket.emit("receiveMessage", data);
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log(
      "❌ User disconnected:",
      socket.id
    );

    for (let userId in onlineUsers) {
      if (
        onlineUsers[userId] === socket.id
      ) {
        delete onlineUsers[userId];
        break;
      }
    }

    console.log(
      "🔴 Online Users:",
      onlineUsers
    );
  });
});

// ✅ CONNECT DATABASE
connectDB();

// ✅ MIDDLEWARE
app.use(
  cors({
    origin: "https://unibuddy-app.netlify.app",
    credentials: true,
  })
);

app.use(express.json());

// ✅ API ROUTES
app.use("/api/matches", matchRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/chat", messageRoutes);

// ✅ ROOT ROUTE
app.get("/", (req, res) => {
  res.send("🚀 UniBuddy API Running");
});

// ✅ START SERVER
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});
