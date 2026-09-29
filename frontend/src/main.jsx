import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ContentProvider from "./content/ContentProvider";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContentProvider>
      <App />
    </ContentProvider>
  </BrowserRouter>
);