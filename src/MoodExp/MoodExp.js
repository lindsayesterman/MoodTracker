import React from "react";
import { Link } from "react-router-dom";
import "./MoodExp.css";
import happyFace from "../happyFace.png";
import sadFace from "../sadFace.png";

export default function MoodExp(props) {
  return (
    <div className="moodExp">
      <h2>Why are you feeling {props.mood.feeling}?</h2>
      {props.mood.feeling === "happy" || props.mood.feeling === "jubilant" ? (
        <img className="cartoonFace" alt="happy face" src={happyFace}></img>
      ) : (
        <img className="cartoonFace" alt="sad face" src={sadFace}></img>
      )}
      <input
        onChange={props.getExp}
        placeholder="Add any notes you'd like!"
        className="whyMood"
        name="whyMood"
      ></input>
      <br></br>
      <button type="submit" onClick={props.displayExp}>
        Submit
      </button>
    </div>
  );
}
