import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState([
    { text: "Hola 👋", sender: "other" },
    { text: "¿Cómo estás?", sender: "other" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const myMessage = {
      text: newMessage,
      sender: "me",
    };

    setMessages((prev) => [...prev, myMessage]);
    setNewMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">

      {/* 🔥 Header con nombre del chat */}
      <div className="chat-header">
        Chat {id}
      </div>

      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "me" ? "sent" : "received"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <form className="input-area" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Chat;