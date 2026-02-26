import { useState } from "react";

function MessageInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribí un mensaje secreto..."
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MessageInput;