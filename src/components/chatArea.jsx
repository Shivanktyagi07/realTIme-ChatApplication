import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

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
    <div className="flex flex-col h-full w-full bg-[#0B141A]">
      <ChatHeader room={room} typing={typingStatus} />

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <MessageList messages={messages} currentUser={username} />
        <div ref={messageEndRef} />
      </div>

      <MessageInput onSend={sendMessage} handleTyping={handleTyping} />
    </div>
  );
};

export default ChatArea;
