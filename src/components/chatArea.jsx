import { useEffect, useRef } from "react";
import ChatHeader from "./chatHeader";
import MessageList from "./messageList";
import MessageInput from "./messageInput";

const ChatArea = ({
  room,
  username,
  messages,
  sendMessage,
  handleTyping,
  typingStatus,
}) => {
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen w-full bg-[#0B141A]">
      {/* Header */}
      <ChatHeader room={room} typing={typingStatus} />

      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <MessageList messages={messages} currentUser={username} />
        <div ref={messageEndRef} />
      </div>

      {/* Typing Indicator (Optional) */}
      {typingStatus && (
        <div className="px-4 py-2 text-sm text-gray-400">
          {typingStatus} is typing...
        </div>
      )}

      {/* Fixed Input at Bottom */}
      <div className="border-t border-gray-700 p-4 bg-[#0B141A] sticky bottom-0">
        <MessageInput onSend={sendMessage} handleTyping={handleTyping} />
      </div>
    </div>
  );
};

export default ChatArea;
