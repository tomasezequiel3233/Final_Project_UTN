import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

  const createMessage = (text, sender, read = false) => ({
    text,
    sender,
    time: getCurrentTime(),
    timestamp: Date.now(),
    read,
  });

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [messages, setMessages] = useState({
    "33": [
      createMessage("El ritual comienza pronto.", "other"),
      createMessage("¿Trajiste el símbolo?", "other"),
    ],
    reptil: [
      createMessage("Tu forma humana fue aprobada.", "other"),
    ],
    area51: [
      createMessage("Reiniciá el platillo volador.", "other"),
    ],
    Oráculo: [
      createMessage("Ya sabías que escribirías esto.", "other"),
    ],
    gatos: [
      createMessage("Miau cuántico confirmado 🐾", "other"),
    ],
    Musk: [
      createMessage("Compré tu app.", "other"),
    ],
    Viajero: [],
    clima: [],
    mark: [],
    Nodo: [],
    Maestre: [],
    Trump: [],
    Arquitecta: [],
    Daddy: [],
    Sombra: [],
    Profetista: [],
  });

  const autoReplies = {
    "33": "El símbolo fue aceptado.",
    reptil: "La transformación continúa.",
    area51: "Estamos investigando el incidente.",
    Oráculo: "El destino ya fue escrito.",
    gatos: "Miau estratégico en proceso 🐾",
    Musk: "Interesante propuesta.",
    Viajero: "El tiempo es relativo.",
    clima: "El clima ya fue modificado.",
    mark: "I'm not a reptilian!",
    Nodo: "Conexión restablecida.",
    Maestre: "El código fluye correctamente.",
    Trump: "I'm coming for you.",
    Arquitecta: "Todo está según el diseño.",
    Daddy: "Dale más gasolina 🔥",
    Sombra: "Estoy en todas partes.",
    Profetista: "Eso ya lo vi venir."
  };

  const sendMessage = (chatId, text) => {
    if (!text.trim()) return;

    const myMessage = createMessage(text, "me", false);

    setMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), myMessage],
    }));

    setTimeout(() => {
      setMessages((prev) => {

        const updatedChat = prev[chatId].map((msg) =>
          msg.sender === "me" && !msg.read
            ? { ...msg, read: true }
            : msg
        );

        const reply = createMessage(
          autoReplies[chatId] || "Interesante...",
          "other",
          false
        );

        return {
          ...prev,
          [chatId]: [...updatedChat, reply],
        };
      });
    }, 1000);
  };

  const markAsRead = (chatId) => {
    setMessages((prev) => ({
      ...prev,
      [chatId]: prev[chatId]?.map((msg) =>
        msg.sender === "other"
          ? { ...msg, read: true }
          : msg
      ),
    }));
  };

  return (
    <ChatContext.Provider
      value={{ messages, sendMessage, markAsRead }}
    >
      {children}
    </ChatContext.Provider>
  );
};
