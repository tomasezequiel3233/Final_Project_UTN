import { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const createMessage = (text, sender, read = false) => ({
    text,
    sender,
    time: getCurrentTime(),
    timestamp: Date.now(),
    read,
  });

  const initialData = {
    "33": [
      createMessage("Recuerda...", "other"),
      createMessage("El ritual comienza pronto.", "other"),
      createMessage("¿Trajiste el símbolo?", "other"),
    ],
    reptil: [
      createMessage("Tu forma humana fue aprobada.", "other"),
    ],
    area51: [
      createMessage("Recientemente un OVNI sobrevolo el recinto.", "other"),
      createMessage("alguna informacion al respecto?.", "other"),
    ],
    Oráculo: [
      createMessage("Ya tomaste la decision?.", "other"),
    ],
    gatos: [
      createMessage("Miau cuántico confirmado 🐾", "other"),
    ],
    Musk: [
      createMessage("Compré tu app.", "other"),
    ],
    clima: [
        createMessage("Mañana llueve. No hay porque", "other"),
    ],
    Viajero: [
        createMessage("No envies ese mensaje a esa persona. El descenlace no es bueno", "other"),
        createMessage("Retiro lo dicho, patee una piedra y cambio tu futuro", "other"),
    ],
    mark: [],
    Nodo: [],
    Maestre: [],
    Trump: [],
    Arquitecta: [],
    Daddy: [],
    Sombra: [],
    Profetista: [],
  };

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("illumi-chat");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [typing, setTyping] = useState(null);

  // Persistencia
  useEffect(() => {
    localStorage.setItem("illumi-chat", JSON.stringify(messages));
  }, [messages]);

  const autoReplies = {
    "33": "El símbolo fue aceptado.",
    reptil: "La transformación continúa.",
    area51: "Okey... Estamos investigando el incidente.",
    Oráculo: "Ya sabías que escribirías esto.",
    gatos: "Miau estratégico en proceso 🐾",
    Musk: "Ya la vendi y compre tu otra app.",
    Viajero: "Otra vez estoy atorado en el futuro.",
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

    setTyping(chatId);

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

      setTyping(null);

    }, 1200);
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
      value={{ messages, sendMessage, markAsRead, typing }}
    >
      {children}
    </ChatContext.Provider>
  );
};
