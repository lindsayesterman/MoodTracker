import React from "react";
import { Link } from "react-router-dom";
import "./MoodExp.css";
import happyFace from "../happyFace.png";
import sadFace from "../sadFace.png";

export default function MoodExp(props) {
  return (
    <div className="moodExp">
      {props.mood.feeling === "happy" || props.mood.feeling === "jubilant" ? <h1>Awesome! What's on your mind?</h1> : <h1>Oh no, what's on your mind?</h1>} 
      <div className="btnTags">
        <button onClick={props.getTags} className="tags" value="Work">
          Work
        </button>
        <button onClick={props.getTags} className="tags" value="Family">
          Family
        </button>
        <button onClick={props.getTags} className="tags" value="Relationship">
          Relationship
        </button>
        <button onClick={props.getTags} className="tags" value="Friends">
          Friends
        </button>
        <button onClick={props.getTags} className="tags" value="Health">
          Health
        </button>
        <button onClick={props.getTags} className="tags" value="Exercise">
          Exercise
        </button>
        <button onClick={props.getTags} className="tags" value="Travel">
          Travel
        </button>
        <button onClick={props.getTags} className="tags" value="Mindfulness">
          Mindfulness
        </button>
        <button onClick={props.getTags} className="tags" value="Food">
          Food
        </button>
        <button onClick={props.getTags} className="tags" value="Education">
          Education
        </button>
      </div>
      <input
        onChange={props.getExp}
        placeholder="Add any notes you'd like!"
        className="whyMood"
        name="whyMood"
      ></input>
      <br/>
      <Link to="/graph">
        <button onClick={props.addToAllMoods} type="submit">
          Submit
        </button>
      </Link>
    </div>
  );
}
