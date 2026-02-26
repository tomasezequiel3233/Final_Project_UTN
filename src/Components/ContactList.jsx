import { Link, useSearchParams } from "react-router-dom";
import contacts from "../Data/contacts";

function ContactList() {

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleSearch = (e) => {
    const value = e.target.value;

    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sidebar">
      <h2>IllumiChat 👁</h2>

      <input
        type="text"
        placeholder="Buscar conspirador..."
        value={search}
        onChange={handleSearch}
      />

      {filteredContacts.map(contact => (
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