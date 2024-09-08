import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GoogleOAuthProvider clientId="622846240160-ek5i5mfg6lskck9iinbdtta5l6tv4217.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </>
);
