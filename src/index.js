import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./Auth/Auth";
import MoodTracker from "./MoodTracker/MoodTracker";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <MoodTracker />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
