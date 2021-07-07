import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import MoodTracker from "./MoodTracker/MoodTracker";

ReactDOM.render(
  <BrowserRouter>
    <MoodTracker />
  </BrowserRouter>,
  document.getElementById("root")
);
