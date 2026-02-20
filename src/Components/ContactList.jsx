import { Link } from "react-router-dom";
import contacts from "../Data/contacts";

function ContactList() {
  return (
    <div className="sidebar">
      <h2>IllumiChat 👁</h2>
      {contacts.map((contact) => (
        <Link 
          key={contact.id} 
          to={`/chat/${contact.id}`} 
          className="contact"
        >
          {contact.name}
        </Link>
      ))}
    </div>
  );
}

export default ContactList;