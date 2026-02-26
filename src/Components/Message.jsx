function Message({ text, author }) {
  return (
    <div className={`message ${author === "me" ? "me" : "them"}`}>
      {text}
    </div>
  );
}

export default Message;