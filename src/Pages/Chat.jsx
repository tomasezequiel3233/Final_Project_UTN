import { useParams } from "react-router-dom";
import ContactList from "../Components/ContactList";

function Chat() {
  const { id } = useParams();

  return (
    <div className="layout">
      <ContactList />
      <div className="chat-window">
        <h2>Chat secreto: {id}</h2>
      </div>
    </div>
  );
}

export default Chat;