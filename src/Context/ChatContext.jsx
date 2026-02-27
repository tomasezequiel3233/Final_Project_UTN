import { createContext, useState } from "react";

export const ChatContext = createContext();

export function ChatProvider({ children }) {

  // 🔹 Generador de hora (cada mensaje tiene su propia hora)
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 🔹 Estado inicial con algunos mensajes 
  const [messages, setMessages] = useState({
    "33": [
      { text: "El ritual comienza pronto.", sender: "other", time: "21:10", read: false },
      { text: "¿Trajiste el símbolo?", sender: "other", time: "21:11", read: false },
    ],
    reptil: [
      { text: "Tu forma humana fue aprobada.", sender: "other", time: "18:12" },
    ],
    area51: [
      { text: "Reiniciá el platillo volador.", sender: "other", time: "16:47", read: false },
      { text: "Error 404: Alien no encontrado.", sender: "other", time: "16:48", read: false },
      { text: "Recientemente un OVNI sobrevolo el perimetro ¿estas al tanto?", sender: "other", time: "17:18", read: false },
    ],
    Oráculo: [
      { text: "Ya sabías que escribirías esto.", sender: "other", time: "12:45" },
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

  // 🔹 Enviar mensaje
  const sendMessage = (chatId, text) => {
    if (!text.trim()) return;

    const id = String(chatId);

    const newMessage = {
      text,
      sender: "me",
      time: getCurrentTime(),
    };

    setMessages((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), newMessage],
    }));
  };

  // 🔹 Marcar como leído (para futuro badge real)
  const markAsRead = (chatId) => {
    const id = String(chatId);

    setMessages((prev) => ({
      ...prev,
      [id]: (prev[id] || []).map((msg) => ({
        ...msg,
        unread: false,
      })),
    }));
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        markAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}