import { useParams, useNavigate } from "react-router-dom";
import contacts from "../Data/contacts";
import { useState } from "react";

export default function ContactInfo() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(false);

  const contact = contacts.find(c => c.id === id);

  if (!contact) return null;

  return (
    <div className="contact-info-page">

      <div className="info-header">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← VOLVER
        </button>
      </div>

      <div className="contact-profile">

        <img
          src={contact.img}
          alt={contact.name}
          className="contact-info-avatar"
          onClick={() => setShowImage(true)}
        />

        <h2>{contact.name}</h2>

        <p className="contact-phone">
          +54 9 11 {Math.floor(10000000 + Math.random() * 90000000)}
        </p>

        <span className="contact-status">
          Miembro activo del sistema
        </span>

      </div>

      <div className="contact-options">

        <div className="option-item">
          📂 Ver archivos secretos
        </div>

        <div className="option-item">
          🔕 Silenciar conversación
        </div>

        <div className="option-item danger">
          🚫 Bloquear contacto
        </div>

        <div className="option-item danger">
          ⚠️ Reportar anomalía
        </div>

      </div>

      {showImage && (
        <div
          className="image-modal"
          onClick={() => setShowImage(false)}
        >
          <img
            src={contact.img}
            alt={contact.name}
            className="modal-image"
          />
        </div>
      )}

    </div>
  );
}