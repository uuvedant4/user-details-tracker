import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DetailsContextProvider } from "./context/DetailsContext/DetailsContext";
import { DetailContextProvider } from "./context/DetailContext/DetailContext";
import React from "react";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.baseURL = "https://assignment-hzez.onrender.com";
root.render(
  <DetailsContextProvider>
    <DetailContextProvider>
      <App />
    </DetailContextProvider>
  </DetailsContextProvider>
);
