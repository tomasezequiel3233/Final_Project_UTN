import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../Context/ChatContext";

export default function Chat() {
  const { id } = useParams();
  const { messages, sendMessage, markAsRead } = useContext(ChatContext);

  const chatMessages = messages?.[String(id)] || [];
  const [input, setInput] = useState("");

  // 🔥 Marca mensajes como leídos al entrar
  useEffect(() => {
    markAsRead(id);
  }, [id]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(id, input);
    setInput("");
  };

  return (
    <div className="chat">
      <div className="messages">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "me" ? "me" : "other"}`}
          >
            {msg.text}
            <span className="time">{msg.time}</span>
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribí un mensaje..."
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}