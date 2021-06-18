import React from "react";
import { Link } from "react-router-dom";
import "./MoodExp.css"

export default function MoodExp(props) {
  return (
    <div className="moodExp">
      <h2>Why are you feeling {props.mood.feeling}?</h2>
      <input
        onChange={props.getExp}
        placeholder="Add any notes you'd like!"
        className="whyMood"
        name="whyMood"
      ></input><br></br>
      <button type="submit" onClick={props.displayExp}>
        Submit
      </button>
    </div>
  );
}
