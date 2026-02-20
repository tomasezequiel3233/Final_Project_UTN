import ContactList from "../Components/ContactList";

function Home() {
  return (
    <div className="layout">
      <ContactList />
      <div className="chat-placeholder">
        <p>Seleccioná una conversación secreta 👁</p>
      </div>
    </div>
  );
}

export default Home;