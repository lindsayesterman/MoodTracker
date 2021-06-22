import React from "react";
import "./SelectMood.css";
import { Link } from "react-router-dom";

export default function SelectMood(props) {
  return (
    <div className="selectMood">
      <h1>Hey Lindsay, how are you feeling today?</h1>
      <Link to="/exp">
        <button value="sad" onClick={props.getButtonClicked} id="sad">
          sad
        </button>
        <button value="not well" onClick={props.getButtonClicked} id="nw">
          not well
        </button>
        <button value="neutral" onClick={props.getButtonClicked} id="neutral">
          neutral
        </button>
        <button value="happy" onClick={props.getButtonClicked} id="happy">
          happy
        </button>
        <button value="jubilant" onClick={props.getButtonClicked} id="jub">
          jubilant
        </button>
      </Link>
    </div>
  );
}
