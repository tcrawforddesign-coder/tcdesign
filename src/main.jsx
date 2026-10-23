import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fontsource-variable/geist-mono";
import "./index.css";
import "./styles/brand.css";

// Preview builds (VITE_ROUTER=memory) keep the route in memory, for hosts
// where the page URL can't change, like an in-chat preview.
const Router = import.meta.env.VITE_ROUTER === "memory" ? MemoryRouter : BrowserRouter;

createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);