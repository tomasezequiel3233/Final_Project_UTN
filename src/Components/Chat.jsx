import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { ChatContext } from "../Context/ChatContext";
import contacts from "../Data/contacts";

export default function Chat() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { messages, sendMessage, markAsRead, typing } = useContext(ChatContext);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const chatMessages = messages[id] || [];

  const currentContact = contacts.find(
    (contact) => contact.id === id
  );

  // Marcar como leído al entrar
  useEffect(() => {
    if (id) {
      markAsRead(id);
    }
  }, [id]);

  // Marcar como leído si llegan mensajes nuevos
  useEffect(() => {
    if (!id) return;

    const hasUnread = chatMessages.some(
      (msg) => msg.sender === "other" && !msg.read
    );

    if (hasUnread) {
      markAsRead(id);
    }
  }, [chatMessages]);

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(id, input);
    setInput("");
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div className="chat">

      {isMobile && (
        <button
          className="mobile-back"
          onClick={() => navigate("/")}
        >
          ←
        </button>
      )}

      {currentContact && (
        <div
          className="chat-header clickable"
          onClick={() => navigate(`/contact/${id}`)}
        >
          <img
            src={currentContact.img}
            alt={currentContact.name}
            className="chat-avatar"
          />

          <div className="chat-header-info">
            <h3>{currentContact.name}</h3>
            <span className="status">
              {typing === id ? "Escribiendo..." : "En línea"}
            </span>
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