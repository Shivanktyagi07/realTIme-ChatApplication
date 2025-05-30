import { useState, useEffect } from "react";
import socket from "./socket";
import ChatArea from "./components/chatArea";
import UserList from "./components/userList";

export default function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const [users, setUsers] = useState([]);
  const [joined, setJoined] = useState(false);

  // Listen for socket events
  useEffect(() => {
    socket.on("chat_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("typing", (data) => {
      setTypingStatus(`${data.username} is typing...`);
      // Clear typing indicator after 2 seconds
      clearTimeout(window.typingTimeout);
      window.typingTimeout = setTimeout(() => setTypingStatus(""), 2000);
    });

    socket.on("update_users", (userList) => {
      setUsers(userList);
    });

    return () => {
      socket.off("chat_message");
      socket.off("typing");
      socket.off("update_users");
    };
  }, []);

  const joinRoom = () => {
    if (username.trim() && room.trim()) {
      socket.emit("join_room", { username, room });
      setJoined(true);
    }
  };

  const sendMessage = (message) => {
    if (message.trim()) {
      socket.emit("chat_message", { room, username, message });
      setMessages((prev) => [...prev, { sender: "You", text: message }]);
    }
  };

  const handleTyping = () => {
    socket.emit("typing", { room, username });
  };

  if (!joined) {
    return (
      <div className="min-h-screen min-w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white">
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
            <span role="img" aria-label="rocket"></span>
            Join Chat Room
          </h1>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room name"
            className="w-full px-4 py-3 mb-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button
            onClick={joinRoom}
            className="w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-xl text-white font-semibold shadow-md"
          >
            Join Room
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <UserList users={users} currentUser={username} />

      {/* Chat Area */}
      <ChatArea
        room={room}
        username={username}
        messages={messages}
        sendMessage={sendMessage}
        handleTyping={handleTyping}
        typingStatus={typingStatus}
      />
    </div>
  );
}
