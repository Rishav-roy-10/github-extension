import React from "react";
import { createRoot } from "react-dom/client";
import PopupApp from "./PopupApp";
import "../index.css"; // Tailwind styles

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<PopupApp />);
