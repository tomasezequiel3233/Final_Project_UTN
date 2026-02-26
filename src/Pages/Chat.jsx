import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import ContactList from "../Components/ContactList";
import Message from "../Components/Message";
import MessageInput from "../Components/MessageInput";
import { useEffect, useRef } from "react";

function Chat() {
  const { id } = useParams();
  const { conversations, addMessage } = useContext(ChatContext);

  const messages = conversations[id] || [];

  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text) => {
    addMessage(id, { text, author: "me" });
  };

  return (
    <div className="layout">
      <ContactList />

      <div className="chat-window">
        <h2>Chat secreto: {id}</h2>

        <div className="messages">
          {messages.map((msg, index) => (
            <Message
              key={index}
              text={msg.text}
              author={msg.author}
            />
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}

export default Chat;