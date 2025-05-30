export default function ChatMessage({ sender, text, isOwn }) {
  return (
    <div
      className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2 px-2`}
    >
      <div
        className={`max-w-[60%] p-2 rounded-lg ${
          sender === "System"
            ? "bg-gray-400 text-white text-center"
            : isOwn
            ? "bg-green-500 text-white"
            : "bg-white text-gray-800"
        } shadow`}
      >
        {sender !== "System" && (
          <p className="text-xs font-semibold mb-1">{isOwn ? "You" : sender}</p>
        )}
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}
