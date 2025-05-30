import { useState } from "react";
import socket from "../socket"; // ✅ Clean import

function JoinRoom({ setUsername, setRoom, onJoin }) {
  const [nameInput, setNameInput] = useState("");
  const [roomInput, setRoomInput] = useState("");

  const handleJoin = () => {
    if (!nameInput || !roomInput) return;

    setUsername(nameInput);
    setRoom(roomInput);
    socket.emit("join_room", { username: nameInput, room: roomInput });
    onJoin();
  };

  return (
    <div className="flex flex-col gap-4 bg-white text-black p-8 rounded shadow">
      <input
        type="text"
        placeholder="Enter your name"
        className="p-2 border"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room name"
        className="p-2 border"
        value={roomInput}
        onChange={(e) => setRoomInput(e.target.value)}
      />
      <button
        onClick={handleJoin}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Join Room
      </button>
    </div>
  );
}

export default JoinRoom;
