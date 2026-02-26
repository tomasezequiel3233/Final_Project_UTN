import { useParams } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../Context/ChatContext";
import Message from "../Components/Message";
import MessageInput from "../Components/MessageInput";

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
  );
}

export default Chat;