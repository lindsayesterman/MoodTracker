import React, { useState, useStyles, Component } from "react";
import { Link } from "react-router-dom";
import "./MoodExp.css";
import Emoji from "../Emoji.js";
// import '../hover.css'

export default function MoodExp(props) {
  const classes = `tags btnClicked`;
  const tags = props.mood.tags;

  return (
    <div className="moodExp">
      {props.mood.feeling === "happy" || props.mood.feeling === "jubilant" ? (
        <h1>Awesome! What's on your mind?</h1>
      ) : (
        <h1>Oh no, what's on your mind?</h1>
      )}
      <div className="btnTags">
        <button
          onClick={props.getTags}
          className={tags.includes("Work") ? classes : "tags"}
          value="Work"
        >
          <Emoji symbol="📆" /> Work
        </button>
        <button
          onClick={props.getTags}
          className={tags.includes("Family") ? classes : "tags"}
          value="Family"
        >
          <Emoji symbol="👨‍👨‍👧" /> Family
        </button>
        <button
          onClick={props.getTags}
          className={tags.includes("Relationship") ? classes : "tags"}
          value="Relationship"
        >
          <Emoji symbol="👩‍❤️‍👩" /> Relationship
        </button>
        <button
          onClick={props.getTags}
          className={tags.includes("Friends") ? classes : "tags"}
          value="Friends"
        >
          <Emoji symbol="👯‍♀️" /> Friends
        </button>
        <button
          onClick={props.getTags}
          className={tags.includes("Health") ? classes : "tags"}
          value="Health"
        >
          <Emoji symbol="😷" /> Health
        </button>
        <button
          onClick={props.getTags}
          className={tags.includes("Exercise") ? classes : "tags"}
          value="Exercise"
        >
          <Emoji symbol="🚴" /> Exercise
        </button>
        <button
          onClick={props.getTags}
          className={tags.includes("Travel") ? classes : "tags"}
          value="Travel"
        >
          <Emoji symbol="🏝" /> Travel
        </button>
        <button
          onClick={props.getTags}
          className={tags.includes("Mindfulness") ? classes : "tags"}
          value="Mindfulness"
        >
          <Emoji symbol="🧠" /> Mindfulness
        </button>
        <button
          onClick={props.getTags}
          className={tags.includes("Food") ? classes : "tags"}
          value="Food"
        >
          <Emoji symbol="🌮" /> Food
        </button>
        <button
          onClick={props.getTags}
          className={tags.includes("Education") ? classes : "tags"}
          value="Education"
        >
          <Emoji symbol="📚" /> Education
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
        <button
          className="hvr-float-shadow"
          onClick={props.addToAllMoods}
          type="submit"
        >
          Submit
        </button>
      </Link>
    </div>
  );
}
