import { useContext, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { ChatContext } from "../Context/ChatContext";
import contacts from "../Data/contacts";

export default function ContactList() {
  const { messages } = useContext(ChatContext);
  const [search, setSearch] = useState("");

  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) => {
      const lastA = messages[a.id]?.[messages[a.id].length - 1];
      const lastB = messages[b.id]?.[messages[b.id].length - 1];

      if (!lastA && !lastB) return 0;
      if (!lastA) return 1;
      if (!lastB) return -1;

      return lastB.timestamp - lastA.timestamp;
    });
  }, [messages]);

  const filteredContacts = sortedContacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="contact-list">

      <div className="contact-search">
        <input
          type="text"
          placeholder="Buscar contacto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="contacts">
        {filteredContacts.map((contact) => {
          const chat = messages[contact.id] || [];
          const lastMessage = chat[chat.length - 1];

          const unreadCount = chat.filter(
            (msg) => msg.sender === "other" && !msg.read
          ).length;

          return (
            <NavLink
              key={contact.id}
              to={`/chat/${contact.id}`}
              className={({ isActive }) =>
                isActive
                  ? "contact-item active"
                  : "contact-item"
              }
            >
              <img
                src={contact.img}
                alt={contact.name}
                className="avatar"
              />

              <div className="contact-info">
                <h4>{contact.name}</h4>
                <p>
                  {lastMessage
                    ? lastMessage.text
                    : "Sin mensajes"}
                </p>
              </div>

              <div className="contact-meta">
                {lastMessage && (
                  <span>{lastMessage.time}</span>
                )}

                {unreadCount > 0 && (
                  <span className="unread-badge">
                    {unreadCount}
                  </span>
                )}
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}