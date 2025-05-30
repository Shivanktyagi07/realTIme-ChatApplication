const MessageList = ({ messages, currentUser }) => {
  return (
    <>
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`p-2 rounded-lg ${
            msg.sender === currentUser || msg.sender === "You"
              ? "bg-green-700 self-end"
              : "bg-gray-700 self-start"
          } max-w-xs`}
        >
          <p className="text-sm font-semibold">{msg.sender}</p>
          <p>{msg.text}</p>
        </div>
      ))}
    </>
  );
};

export default MessageList;
