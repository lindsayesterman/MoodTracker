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

      <button onClick={props.getTags} className="tags" value="work">work</button>
      <button onClick={props.getTags} className="tags" value="school">school</button>
      <button onClick={props.getTags} className="tags" value="family and friends">family and friends</button>
      <button onClick={props.getTags} className="tags" value="health">health</button>

      <input
        onChange={props.getExp}
        placeholder="Add any notes you'd like!"
        className="whyMood"
        name="whyMood"
      ></input>

      <br></br>
      <Link to="/graph">
        <button onClick={props.addToAllMoods} type="submit">Submit</button>
      </Link>
    </div>
  );
}
