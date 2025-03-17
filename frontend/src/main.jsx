import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./components/App.jsx";
import { StrictMode } from "react";
import { GlobalContextProvider } from "./context/GlobalContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </StrictMode>
);
