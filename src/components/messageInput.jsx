// import { useState } from "react";
// import { Send } from "lucide-react";

// const MessageInput = ({ onSend, handleTyping }) => {
//   const [message, setMessage] = useState("");

//   const handleSend = () => {
//     if (message.trim()) {
//       onSend(message);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="flex items-center p-4 bg-[#202C33] border-t border-gray-700">
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => {
//           setMessage(e.target.value);
//           handleTyping?.();
//         }}
//         onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         placeholder="Type a message"
//         className="flex-1 p-2 rounded-md bg-gray-800 text-white outline-none"
//       />
//       <button
//         onClick={handleSend}
//         className="ml-2 p-2 bg-green-600 rounded-full hover:bg-green-700"
//       >
//         <Send size={20} />
//       </button>
//     </div>
//   );
// };

import { useState } from "react";
import { Send, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const MessageInput = ({ onSend, handleTyping }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="flex items-center p-4 bg-[#202C33] border-t border-gray-700 relative">
      <button
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className="text-gray-400 hover:text-white mr-2"
      >
        <Smile size={24} />
      </button>

      {showEmojiPicker && (
        <div className="absolute bottom-14 left-2 z-50">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            searchDisabled={false}
            skinTonesDisabled={false}
            theme="dark"
            height={300}
            width={300}
          />
        </div>
      )}

      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          handleTyping?.();
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message"
        className="flex-1 p-2 rounded-md bg-gray-800 text-white outline-none"
      />

      <button
        onClick={handleSend}
        className="ml-2 p-2 bg-green-600 rounded-full hover:bg-green-700"
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default MessageInput;
