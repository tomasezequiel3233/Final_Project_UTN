import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../Context/ChatContext";

export default function ContactList() {
  const navigate = useNavigate();
  const { messages } = useContext(ChatContext);
  const [search, setSearch] = useState("");

  const contacts = [
    { id: "33", name: "Gran Maestro 33°" },
    { id: "reptil", name: "Reptiliano RRHH" },
    { id: "area51", name: "Área 51 Soporte Técnico" },
    { id: "clima", name: "El que controla el clima" },
    { id: "gatos", name: "Sociedad de Gatitos Cósmicos" },
    { id: "mark", name: "Mark Zuckerberg" },
    { id: "Oráculo", name: "El Oráculo" },
    { id: "Nodo", name: "Nodo Central" },
    { id: "Maestre", name: "Maestre del Código" },
    { id: "Trump", name: "Donald Trump" },
    { id: "Arquitecta", name: "La Arquitecta" },
    { id: "Daddy", name: "Daddy Yankee" },
    { id: "Musk", name: "Elon Musk" },
    { id: "Sombra", name: "Sombra Cuántica" },
    { id: "Viajero", name: "Viajero del Tiempo" },
    { id: "Profetista", name: "La Profetista" },
  ];

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="contact-list">
      <input
        className="search"
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredContacts.map((contact) => {
        const chatMessages = messages?.[String(contact.id)] || [];
        const lastMessage = chatMessages[chatMessages.length - 1];

        const unreadCount = chatMessages.filter(
          (msg) => msg.sender === "other" && !msg.read
        ).length;

        return (
          <div
            key={contact.id}
            className="contact"
            onClick={() => navigate(`/chat/${contact.id}`)}
          >
            <div className="contact-info">
              <strong>{contact.name}</strong>
              <span className="last-message">
                {lastMessage?.text || "Sin mensajes"}
              </span>
            </div>

            <div className="contact-meta">
              <span>{lastMessage?.time || ""}</span>

              {unreadCount > 0 && (
                <span className="badge">{unreadCount}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}