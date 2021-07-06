import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./MoodExp.css";
import Emoji from "../Emoji.js";
import { motion } from "framer-motion";
import Stars from "../Stars/Stars";
import BackBtn from "../BackBtn/BackBtn";
import { AuthContext } from "../Auth/Auth";

export default function MoodExp(props) {
  const { currentUser } = useContext(AuthContext);

  function pushMoodToDb() {
    props.addToAllMoods(props.mood);
    props.db
      .collection("moodTracker")
      .doc(currentUser.uid)
      .set(
        {
          feeling: props.mood.feeling,
          explanation: props.mood.explanation,
          setMoodForToday: true,
          tags: props.mood.tags,
          date: props.mood.date,
        },
        { merge: true }
      );
  }

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
        {props.mood.feeling === 4 || props.mood.feeling === 5 ? (
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
            onClick={pushMoodToDb}
            type="submit"
          >
            Submit
          </button>
        </Link>
      </motion.div>
    </>
  );
}
