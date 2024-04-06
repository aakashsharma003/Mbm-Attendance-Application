import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
export const server =
  "https://e0f2-2401-4900-1c7a-15b4-bc70-2566-eff0-abc8.ngrok-free.app";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
