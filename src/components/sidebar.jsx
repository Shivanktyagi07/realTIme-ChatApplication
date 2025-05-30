// Sidebar.jsx
// import { useState } from "react";

const Sidebar = ({ rooms, onJoin }) => {
  return (
    <div className="w-72 bg-[#111B21] text-white flex flex-col border-r border-gray-700">
      {/* Profile Section */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-700">
        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-lg font-bold">
          U
        </div>
        <div>
          <h2 className="text-lg font-semibold">Username</h2>
          <p className="text-sm text-gray-400">Online</p>
        </div>
      </div>

      {/* Rooms List */}
      <div className="flex-1 overflow-y-auto">
        {rooms.map((room, index) => (
          <div
            key={index}
            onClick={() => onJoin(room)}
            className="px-4 py-3 hover:bg-[#202C33] cursor-pointer"
          >
            {room}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
