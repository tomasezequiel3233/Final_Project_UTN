import { useParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { ChatContext } from "../Context/ChatContext";
import contacts from "../Data/contacts";

export default function Chat() {
  const { id } = useParams();
  const { messages, sendMessage, markAsRead } = useContext(ChatContext);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const chatMessages = messages[id] || [];

  const currentContact = contacts.find(
    (contact) => contact.id === id
  );

  //  Marcar como leído cuando cambia el chat
  useEffect(() => {
    if (id) {
      markAsRead(id);
    }
  }, [id]);

  //  Marcar como leído SOLO si hay mensajes no leídos
  useEffect(() => {
    if (!id) return;

    const hasUnread = chatMessages.some(
      (msg) => msg.sender === "other" && !msg.read
    );

    if (hasUnread) {
      markAsRead(id);
    }
  }, [chatMessages]);

  //  Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(id, input);
    setInput("");
  };

  return (
    <div className="chat">

      {currentContact && (
        <div className="chat-header">
          <img
            src={currentContact.img}
            alt={currentContact.name}
            className="chat-avatar"
          />
          <div className="chat-header-info">
            <h3>{currentContact.name}</h3>
            <span className="status">En línea</span>
          </div>
        </div>
      )}

      <div className="messages">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender}`}
          >
            {msg.text}

            <div className="message-meta">
              <span className="time">{msg.time}</span>

              {msg.sender === "me" && (
                <span className={`ticks ${msg.read ? "read" : ""}`}>
                  ✓✓
                </span>
              )}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Escribí un mensaje..."
        />
        <button onClick={handleSend}>
          Enviar
        </button>
      </div>

    </div>
  );
}