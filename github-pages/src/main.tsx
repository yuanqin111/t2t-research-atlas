import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../app/globals.css";
import "../../app/reading-layout.css";
import App from "../../app/page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
