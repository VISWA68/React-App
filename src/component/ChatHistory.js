const ChatHistory = ({ chatHistory }) => {
  return (
    <div className="chat-history">
      {chatHistory.map((entry, index) => (
        <div
          key={index}
          className={`message ${entry.type === "user" ? "user-message" : "bot-message"}`}
        >
          <p>{entry.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
