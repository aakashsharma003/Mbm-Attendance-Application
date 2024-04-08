import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
export const server =
  "https://80f7-2401-4900-1c7b-24f5-49ea-1a23-b04e-7c17.ngrok-free.app";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
