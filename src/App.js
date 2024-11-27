import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css"; // Updated custom CSS
import ChatHistory from "./component/ChatHistory";
import Loading from "./component/Loading";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI("API_KEY_HERE");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;

      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Basic Info Section */}
      <header className="header">
        <h1>Welcome to Our Website</h1>
        <p>Your basic info section goes here.</p>
      </header>

      <section className="content">
        <h2>About Us</h2>
        <p>Details about your services, products, or company.</p>
      </section>

      {/* Chatbot Icon */}
      <button
        onClick={toggleChat}
        className="chat-icon"
      >
        💬
      </button>

      {/* Chatbot Pop-up */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Chat with Us</h3>
            <button onClick={toggleChat} className="close-btn">✖</button>
          </div>
          <div className="chat-body">
            <ChatHistory chatHistory={chatHistory} />
            <Loading isLoading={isLoading} />
          </div>
          <div className="chat-footer">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your message..."
              value={userInput}
              onChange={handleUserInput}
            />
            <button onClick={sendMessage} disabled={isLoading} className="send-btn">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
