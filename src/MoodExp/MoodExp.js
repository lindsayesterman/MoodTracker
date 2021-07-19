import React, { useState, useEffect } from "react";
import "./MoodExp.css";
import Emoji from "../Emoji.js";
import { motion } from "framer-motion";
import Stars from "../Stars/Stars";
import BackBtn from "../BackBtn/BackBtn";
import SelectMood from "../SelectMood/SelectMood";
import GraphPage from "../GraphPage/GraphPage";

export default function MoodExp(props) {
  const tags = props.mood.tags;
  const [submitClicked, setSubmitClicked] = useState(false);
  return (
    <>
      {props.showMood ? (
        !submitClicked ? (
          <>
            <Stars></Stars>
            <div onClick={() => props.updateShowMood(false)}>
              <BackBtn></BackBtn>
            </div>
            <motion.div
              className="moodExp"
              initial="out"
              animate="in"
              exit="outFade"
              transition={props.pageTransition}
              variants={props.pageVariants}
            >
              {props.mood.feeling !== 0 && props.mood.feeling !== 3 ? (
                props.mood.feeling === 4 || props.mood.feeling === 5 ? (
                  <h1>Awesome! What's on your mind?</h1>
                ) : (
                  <h1>Oh no, what's on your mind?</h1>
                )
              ) : (
                <h1>What's on your mind?</h1>
              )}
              <div className="btnTags">
                <button
                  onClick={props.getTags}
                  className={
                    tags.includes("Work") ? "tags workClicked" : "tags"
                  }
                  value="Work"
                >
                  <Emoji symbol="📆" /> Work
                </button>
                <button
                  onClick={props.getTags}
                  className={
                    tags.includes("Family") ? "tags famClicked" : "tags"
                  }
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
                  className={
                    tags.includes("Friends") ? "tags friClicked" : "tags"
                  }
                  value="Friends"
                >
                  <Emoji symbol="👯‍♀️" /> Friends
                </button>
                <button
                  onClick={props.getTags}
                  className={
                    tags.includes("Health") ? "tags healthClicked" : "tags"
                  }
                  value="Health"
                >
                  <Emoji symbol="😷" /> Health
                </button>
                <button
                  onClick={props.getTags}
                  className={
                    tags.includes("Exercise") ? "tags exClicked" : "tags"
                  }
                  value="Exercise"
                >
                  <Emoji symbol="🚴" /> Exercise
                </button>
                <button
                  onClick={props.getTags}
                  className={
                    tags.includes("Travel") ? "tags travClicked" : "tags"
                  }
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
                  className={
                    tags.includes("Food") ? "tags foodClicked" : "tags"
                  }
                  value="Food"
                >
                  <Emoji symbol="🌮" /> Food
                </button>
                <button
                  onClick={props.getTags}
                  className={
                    tags.includes("Education") ? "tags eduClicked" : "tags"
                  }
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
              <button onClick={() => setSubmitClicked(true)} type="submit">
                Submit
              </button>
            </motion.div>
          </>
        ) : (
          <GraphPage
            allMoods={props.allMoods}
            pageTransition={props.pageTransition}
            pageVariants={props.pageVariants}
            mood={props.mood}
            addToAllMoods={props.addToAllMoods}
            fetchData={props.fetchData}
            pushMoodToDb={props.pushMoodToDb}
            removeAllMoods={props.removeAllMoods}
            getExp={props.getExp}
            getMoodClicked={props.getMoodClicked}
            getTags={props.getTags}
            db={props.db}
            date={props.mood.date}
            dateMoodWasLastEntered={props.dateMoodWasLastEntered}
            updateShowMood={props.updateShowMood}
            showMood={props.showMood}
          ></GraphPage>
        )
      ) : (
        <SelectMood
          mood={props.mood}
          getExp={props.getExp}
          getTags={props.getTags}
          getMoodClicked={props.getMoodClicked}
          date={props.mood.date}
          dateMoodWasLastEntered={props.dateMoodWasLastEntered}
          allMoods={props.allMoods}
          addToAllMoods={props.addToAllMoods}
          fetchData={props.fetchData}
          pushMoodToDb={props.pushMoodToDb}
          removeAllMoods={props.removeAllMoods}
          db={props.db}
          pageTransition={props.pageTransition}
          pageVariants={props.pageVariants}
          updateShowMood={props.updateShowMood}
          showMood={props.showMood}
        ></SelectMood>
      )}
    </>
  );
}
