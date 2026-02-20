import { useParams } from "react-router-dom";

function Chat() {
  const { id } = useParams();

  return (
    <div>
      <h2>Chat secreto #{id}</h2>
    </div>
  );
}

export default Chat;