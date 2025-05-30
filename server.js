// import express from "express";
// import http from "http";
// import cors from "cors";
// import { Server } from "socket.io";

// const app = express();
// app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: { origin: "*" },
// });

// io.on("connection", (socket) => {
//   console.log("New connection:", socket.id);

//   socket.on("join_room", ({ username, room }) => {
//     socket.join(room);
//     socket.username = username;
//     io.to(room).emit("chat_message", {
//       sender: "System",
//       text: `${username} joined the room.`,
//     });
//   });

//   socket.on("chat_message", ({ room, username, message }) => {
//     socket.to(room).emit("chat_message", { sender: username, text: message });
//   });

//   socket.on("typing", ({ room, username }) => {
//     socket.to(room).emit("typing", `${username} is typing...`);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// //  Updated: Listen on all interfaces, not just localhost
// server.listen(3001, "0.0.0.0", () =>
//   console.log("Socket.io server running at http://<your-ip>:3001")
// );

import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

// Track users per room
const usersInRoom = {};

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("join_room", ({ username, room }) => {
    socket.join(room);
    socket.username = username;
    socket.room = room;

    // Add user to room list
    if (!usersInRoom[room]) usersInRoom[room] = [];
    usersInRoom[room].push(username);

    // Notify others in the room
    io.to(room).emit("chat_message", {
      sender: "System",
      text: `${username} joined the room.`,
    });

    // Send updated user list
    io.to(room).emit("update_users", usersInRoom[room]);
  });

  socket.on("chat_message", ({ room, username, message }) => {
    socket.to(room).emit("chat_message", { sender: username, text: message });
  });

  socket.on("typing", ({ room, username }) => {
    socket.to(room).emit("typing", `${username} is typing...`);
  });

  socket.on("disconnect", () => {
    const { room, username } = socket;
    if (room && usersInRoom[room]) {
      // Remove user from room
      usersInRoom[room] = usersInRoom[room].filter((u) => u !== username);

      // Update user list for the room
      io.to(room).emit("update_users", usersInRoom[room]);

      // Notify others
      io.to(room).emit("chat_message", {
        sender: "System",
        text: `${username} left the room.`,
      });
    }
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3001, "0.0.0.0", () =>
  console.log("Socket.io server running at http://<your-ip>:3001")
);
