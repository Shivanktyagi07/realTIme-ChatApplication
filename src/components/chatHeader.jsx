const ChatHeader = ({ room, typing }) => {
  return (
    <div className="px-4 py-3 bg-[#202C33] border-b border-gray-700 flex flex-col">
      <h2 className="text-lg font-semibold">{room || "No Room Selected"}</h2>
      {typing && <p className="text-sm text-green-400">{typing}</p>}
    </div>
  );
};

export default ChatHeader;
