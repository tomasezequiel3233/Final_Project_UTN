import { createContext, useState } from "react";

export const ChatContext = createContext();

export function ChatProvider({ children }) {

  const [conversations, setConversations] = useState({
    "33": [
      { text: "Bienvenido a la logia.", author: "them" }
    ],
    reptil: [
      { text: "Informe de metamorfosis enviado.", author: "them" }
    ]
  });

  const addMessage = (chatId, message) => {
    setConversations(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message]
    }));
  };

  return (
    <ChatContext.Provider value={{ conversations, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
}