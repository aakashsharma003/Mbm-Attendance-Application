import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
export const server =
  "https://fec5-2401-4900-1c7b-24f5-6533-5b46-5169-2daa.ngrok-free.app";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
