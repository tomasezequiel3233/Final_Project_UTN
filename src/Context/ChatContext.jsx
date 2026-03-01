import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState({
    "33": [
      { text: "El ritual comienza pronto.", sender: "other", time: "21:10", read: false },
      { text: "¿Trajiste el símbolo?", sender: "other", time: "21:11", read: false },
    ],
    reptil: [
      { text: "Tu forma humana fue aprobada.", sender: "other", time: "18:12", read: false },
    ],
    area51: [
      { text: "Reiniciá el platillo volador.", sender: "other", time: "16:47", read: false },
      { text: "Error 404: Alien no encontrado.", sender: "other", time: "16:48", read: false },
      { text: "Recientemente un OVNI sobrevolo el perimetro ¿estas al tanto?", sender: "other", time: "17:18", read: false },
    ],
    Oráculo: [
      { text: "Ya sabías que escribirías esto.", sender: "other", time: "12:45", read: false },
    ],
    gatos: [
      { text: "Miau cuántico confirmado 🐾", sender: "other", time: "14:11", read: false },
      { text: "Dominaremos el mundo pronto.", sender: "other", time: "14:12", read: false },
      { text: "Pero primero una siesta.", sender: "other", time: "14:13", read: false },
    ],
    Musk: [
      { text: "Compré tu app.", sender: "other", time: "08:45", read: false },
      { text: "Ahora es mía.", sender: "other", time: "08:46", read: false },
    ],
    Viajero: [
      { text: "Otra vez me quede atorado en el futuro", sender: "other", time: "20:13", read: false },
      { text: "No envies ese mensaje mañana, lo que pasa no es bueno", sender: "other", time: "20:27", read: false },
    ],
    clima: [
      { text: "Mañana llueve. No hay porque", sender: "other", time: "23:09", read: false },
    ],
    mark: [],
    Nodo: [],
    Maestre: [],
    Trump: [],
    Arquitecta: [],
    Daddy: [],
    Sombra: [],
    Profetista: [],
  });

  // Generador de hora actual
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Respuestas automáticas según contacto
  const autoReplies = {
    "33": "El símbolo fue aceptado.",
    reptil: "La transformación continúa.",
    area51: "Estamos investigando el incidente.",
    Oráculo: "El destino ya fue escrito.",
    gatos: "Miau estratégico en proceso 🐾",
    Musk: "Interesante propuesta.",
    Viajero: "El tiempo es relativo.",
    clima: "El clima ya fue modificado.",
    mark: "Estoy analizando tus datos.",
    Nodo: "Conexión restablecida.",
    Maestre: "El código fluye correctamente.",
    Trump: "I'm coming for you.",
    Arquitecta: "Todo está según el diseño.",
    Daddy: "Dale más gasolina 🔥",
    Sombra: "Estoy en todas partes.",
    Profetista: "Eso ya lo vi venir."
  };

  // Enviar mensaje
  const sendMessage = (chatId, text) => {
    if (!text.trim()) return;

    const newMessage = {
      text,
      sender: "me",
      time: getCurrentTime(),
      read: true,
    };

    setMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage],
    }));

    // Respuesta automática con delay
    setTimeout(() => {
      const reply = {
        text: autoReplies[chatId] || "Interesante...",
        sender: "other",
        time: getCurrentTime(),
        read: false,
      };

      setMessages((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), reply],
      }));
    }, 1000);
  };

  // Marcar mensajes como leídos
  const markAsRead = (chatId) => {
    setMessages((prev) => ({
      ...prev,
      [chatId]: prev[chatId]?.map((msg) =>
        msg.sender === "other" ? { ...msg, read: true } : msg
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