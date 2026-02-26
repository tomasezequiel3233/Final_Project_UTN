import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ChatProvider } from "./Context/ChatContext";

ReactDOM.createRoot(document.getElementById("root")).render(
 <BrowserRouter>
  <ChatProvider>
    <App />
  </ChatProvider>
</BrowserRouter>
);