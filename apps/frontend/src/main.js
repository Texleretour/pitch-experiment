import { StrictMode } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element (lol)");
}
createRoot(rootElement).render(_jsx(StrictMode, { children: _jsx(App, {}) }));
