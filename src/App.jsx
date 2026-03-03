import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ContactList from "./Components/ContactList";
import Chat from "./Components/Chat";
import ContactInfo from "./Components/ContactInfo";

export default function App() {

  const location = useLocation();

  const isFullScreenRoute =
    location.pathname.startsWith("/chat/") ||
    location.pathname.startsWith("/contact/");

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 1000);
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
        <div className="terminal-box">

          <h1 className="logo">ILLUMI-CHAT 👁️</h1>

          <p className="scan-text">
            ESCANEANDO ROSTRO...
          </p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="progress-counter">
            {progress}%
          </div>

          {progress === 100 && (
            <p className="access-granted">
              ACCESO CONCEDIDO
            </p>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className={`app ${isFullScreenRoute ? "chat-open" : ""}`}>

      <ContactList />

      <div className="chat-area">
        <Routes>

          <Route
            path="/"
            element={
              <div className="welcome-screen">
                <h2>ILLUMI-CHAT 👁️</h2>
                <p>Selecciona un contacto para iniciar comunicación.</p>
              </div>
            }
          />

          <Route path="/chat/:id" element={<Chat />} />

          <Route path="/contact/:id" element={<ContactInfo />} />

        </Routes>
      </div>

    </div>
  );
}