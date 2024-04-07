import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
export const server =
  " https://12d7-2401-4900-1c7b-9e68-948e-4795-427-d1c0.ngrok-free.app";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
