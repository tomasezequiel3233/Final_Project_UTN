import { useContext, useMemo, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { Link, useLocation } from "react-router-dom";
import contacts from "../Data/contacts"; 

function ContactList() {
  const { messages } = useContext(ChatContext);
  const [search, setSearch] = useState("");
  const location = useLocation();

  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) => {
      const lastA = messages[a.id]?.slice(-1)[0];
      const lastB = messages[b.id]?.slice(-1)[0];

      if (!lastA) return 1;
      if (!lastB) return -1;

      return lastB.time?.localeCompare(lastA.time);
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
          placeholder="Buscar chat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="contacts">
        {filteredContacts.map((contact) => {
          const chatMessages = messages[contact.id] || [];
          const lastMessage = chatMessages[chatMessages.length - 1];

          const unreadCount = chatMessages.filter(
            (msg) => msg.sender === "other" && msg.read === false
          ).length;

          const isActive = location.pathname === `/chat/${contact.id}`;

          return (
            <Link
              to={`/chat/${contact.id}`}
              key={contact.id}
              className={`contact-item ${isActive ? "active" : ""}`}
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
                    ? lastMessage.text.slice(0, 30)
                    : "Sin mensajes"}
                </p>
              </div>

              <div className="contact-meta">
                {lastMessage && <span>{lastMessage.time}</span>}

                {unreadCount > 0 && (
                  <div className="unread-badge">
                    {unreadCount}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ContactList;