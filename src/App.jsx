import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ContactList from "./Components/ContactList";
import Chat from "./Pages/Chat";
import { ChatProvider } from "./Context/ChatContext";
import "./index.css";


function App() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
          return 100;
        }
        return prev + 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="terminal-box">
          <p>Escaneando rostro...</p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p>{progress}%</p>

          {progress === 100 && (
            <p>Rostro escaneado con éxito. Acceso concedido.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <ChatProvider>
      <div className="app">
        <ContactList />

        <div className="chat-area">
          <Routes>
            <Route path="/" element={<div className="welcome">Selecciona un chat</div>} />
            <Route path="/chat/:id" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </ChatProvider>
  );
}

export default App;