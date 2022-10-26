const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const registerRoutes = require("./Routes/registerRoutes");
const loginRoutes = require("./Routes/loginRoutes");
const studentRoutes = require("./Routes/studentRoutes");
const facultyRoutes = require("./Routes/facultyRoutes");
const messages = require("./Routes/messagesRoutes");
const recentChatRoutes = require("./Routes/recentChatRoutes");
const { getRecentChatFunc } = require("./Controllers/recentChatController");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", registerRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api", studentRoutes);
app.use("/api", facultyRoutes);
app.use("/api/messages", messages);
app.use("/api/messages", recentChatRoutes);

app.use("/api/DisplayPictures", express.static("DisplayPictures"));
mongoose
  .connect("mongodb://localhost:27017/amibuddy", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen("5000", () => {
  console.log("Server Started On localhost:5000");
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("sendMessage", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msgReceive", { data: data });
    }
  });
  socket.on("updateRecentChatSocket", async (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("getRecentChatSocket", { data: 1 });
    }
  });
});
