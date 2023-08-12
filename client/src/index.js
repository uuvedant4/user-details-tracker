import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DetailsContextProvider } from "./context/DetailsContext/DetailsContext";
import { DetailContextProvider } from "./context/DetailContext/DetailContext";
import React from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DetailsContextProvider>
    <DetailContextProvider>
      <App />
    </DetailContextProvider>
  </DetailsContextProvider>
);
