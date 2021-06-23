import React from "react";
import { Link } from "react-router-dom";
import "./MoodExp.css";
import Emoji from "../Emoji.js";

export default function MoodExp(props) {
  return (
    <div className="moodExp">
      {props.mood.feeling === "happy" || props.mood.feeling === "jubilant" ? (
        <h1>Awesome! What's on your mind?</h1>
      ) : (
        <h1>Oh no, what's on your mind?</h1>
      )}
      <div className="btnTags">
        <button onClick={props.getTags} className="tags" value="Work">
          <Emoji symbol="📆" />
          {" "}Work
        </button>
        <button onClick={props.getTags} className="tags" value="Family">
          <Emoji symbol="👨‍👨‍👧" />
          {" "}Family
        </button>
        <button onClick={props.getTags} className="tags" value="Relationship">
          <Emoji symbol="👩‍❤️‍👩" />
          {" "}Relationship
        </button>
        <button onClick={props.getTags} className="tags" value="Friends">
          <Emoji symbol="👯‍♀️" />
          {" "}Friends
        </button>
        <button onClick={props.getTags} className="tags" value="Health">
          <Emoji symbol="😷" />
          {" "}Health
        </button>
        <button onClick={props.getTags} className="tags" value="Exercise">
          <Emoji symbol="🚴" />
          {" "}Exercise
        </button>
        <button onClick={props.getTags} className="tags" value="Travel">
          <Emoji symbol="🏝" />
          {" "}Travel
        </button>
        <button onClick={props.getTags} className="tags" value="Mindfulness">
          <Emoji symbol="🧠" />
          {" "}Mindfulness
        </button>
        <button onClick={props.getTags} className="tags" value="Food">
          <Emoji symbol="🌮" />
          {" "}Food
        </button>
        <button onClick={props.getTags} className="tags" value="Education">
          <Emoji symbol="📚" />
          {" "}Education
        </button>
      </div>
      <input
        onChange={props.getExp}
        placeholder="Add any notes you'd like!"
        className="whyMood"
        name="whyMood"
      ></input>
      <br />
      <Link to="/graph">
        <button onClick={props.addToAllMoods} type="submit">
          Submit
        </button>
      </Link>
    </div>
  );
}
