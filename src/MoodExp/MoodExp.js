import React from "react";
import { Link } from "react-router-dom";
import "./MoodExp.css";
import Emoji from "../Emoji.js";
import { motion } from "framer-motion";
import Stars from "../Stars/Stars";
import BackBtn from '../BackBtn/BackBtn'

export default function MoodExp(props) {
  const tags = props.mood.tags;

  return (
    <>
      <Stars></Stars>
      <BackBtn></BackBtn>
      <motion.div
        className="moodExp"
        initial="out"
        animate="in"
        exit="outFade"
        transition={props.pageTransition}
        variants={props.pageVariants}
      >
        {props.mood.feeling === "happy" || props.mood.feeling === "jubilant" ? (
          <h1>Awesome! What's on your mind?</h1>
        ) : (
          <h1>Oh no, what's on your mind?</h1>
        )}
        <div className="btnTags">
          <button
            onClick={props.getTags}
            className={tags.includes("Work") ? "tags workClicked" : "tags"}
            value="Work"
          >
            <Emoji symbol="📆" /> Work
          </button>
          <button
            onClick={props.getTags}
            className={tags.includes("Family") ? "tags famClicked" : "tags"}
            value="Family"
          >
            <Emoji symbol="👨‍👨‍👧" /> Family
          </button>
          <button
            onClick={props.getTags}
            className={
              tags.includes("Relationship") ? "tags relClicked" : "tags"
            }
            value="Relationship"
          >
            <Emoji symbol="👩‍❤️‍👩" /> Relationship
          </button>
          <button
            onClick={props.getTags}
            className={tags.includes("Friends") ? "tags friClicked" : "tags"}
            value="Friends"
          >
            <Emoji symbol="👯‍♀️" /> Friends
          </button>
          <button
            onClick={props.getTags}
            className={tags.includes("Health") ? "tags healthClicked" : "tags"}
            value="Health"
          >
            <Emoji symbol="😷" /> Health
          </button>
          <button
            onClick={props.getTags}
            className={tags.includes("Exercise") ? "tags exClicked" : "tags"}
            value="Exercise"
          >
            <Emoji symbol="🚴" /> Exercise
          </button>
          <button
            onClick={props.getTags}
            className={tags.includes("Travel") ? "tags travClicked" : "tags"}
            value="Travel"
          >
            <Emoji symbol="🏝" /> Travel
          </button>
          <button
            onClick={props.getTags}
            className={
              tags.includes("Mindfulness") ? "tags mindClicked" : "tags"
            }
            value="Mindfulness"
          >
            <Emoji symbol="🧠" /> Mindfulness
          </button>
          <button
            onClick={props.getTags}
            className={tags.includes("Food") ? "tags foodClicked" : "tags"}
            value="Food"
          >
            <Emoji symbol="🌮" /> Food
          </button>
          <button
            onClick={props.getTags}
            className={tags.includes("Education") ? "tags eduClicked" : "tags"}
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
          autoComplete="off"
        ></input>
        <br />
        <Link to="/analytics">
          <button
            className="hvr-float-shadow"
            onClick={props.addToAllMoods}
            type="submit"
          >
            Submit
          </button>
        </Link>
      </motion.div>
    </>
  );
}
