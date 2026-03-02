import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ContactList from "./Components/ContactList";
import Chat from "./Components/Chat";

export default function App() {

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 1200);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="matrix-bg"></div>

        <div className="terminal-box">
          <p className="scan-text">Escaneando rostro...</p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {progress === 100 && (
            <p className="access-granted">
              Acceso concedido
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <ContactList />

      <div className="chat-area">
        <Routes>
          <Route
            path="/"
            element={<div className="welcome">Selecciona un chat</div>}
          />
          <Route
            path="/chat/:id"
            element={<Chat />}
          />
        </Routes>
      </div>
    </div>
  );
}