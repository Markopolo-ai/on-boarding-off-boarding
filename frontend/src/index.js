import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CartStateProvider } from "./components/Cart";

ReactDOM.render(
  <React.StrictMode>
    <CartStateProvider>
      <App />
    </CartStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
