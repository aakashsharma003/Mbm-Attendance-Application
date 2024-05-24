import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// "http://localhost:8000"
export const server =
  "https://nurse-travis-impression-neighborhood.trycloudflare.com";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
