import React, { useContext } from "react";
import "./SelectMood.css";
import f1 from "../img/faceOne.svg";
import f2 from "../img/faceTwo.svg";
import f3 from "../img/faceThree.svg";
import f4 from "../img/faceFour.svg";
import f5 from "../img/faceFive.svg";
import Stars from "../Stars/Stars";
import { AuthContext } from "../Auth/Auth";
import MoodExp from "../MoodExp/MoodExp";

export default function SelectMood(props) {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      {!props.showMood || props.mood.feeling === 0 ? (
        <>
          <Stars></Stars>
          <div className="selectMood">
            <h1 className="welcome">
              Welcome back{" "}
              {currentUser
                ? currentUser.email.substring(
                    0,
                    currentUser.email.lastIndexOf("@")
                  )
                : ":)"}{" "}
              <br /> How are you feeling today?
            </h1>
            <img
              className="sad"
              alt="sad face"
              id={1}
              onClick={props.getMoodClicked}
              src={f1}
            ></img>
            <img
              className="nw"
              alt="not well face"
              id={2}
              onClick={props.getMoodClicked}
              src={f2}
            ></img>
            <img
              className="neutral"
              alt="neutral face"
              id={3}
              onClick={props.getMoodClicked}
              src={f3}
            ></img>
            <img
              className="happy"
              alt="happy face"
              id={4}
              onClick={props.getMoodClicked}
              src={f4}
            ></img>
            <img
              className="jub"
              alt="jubilant face"
              id={5}
              onClick={props.getMoodClicked}
              src={f5}
            ></img>
          </div>
        </>
      ) : (
        <MoodExp
          mood={props.mood}
          getExp={props.getExp}
          getTags={props.getTags}
          pageTransition={props.pageTransition}
          pageVariants={props.pageVariants}
          getMoodClicked={props.getMoodClicked}
          dateMoodWasLastEntered={props.dateMoodWasLastEntered}
          allMoods={props.allMoods}
          addToAllMoods={props.addToAllMoods}
          fetchData={props.fetchData}
          pushMoodToDb={props.pushMoodToDb}
          db={props.db}
          removeAllMoods={props.removeAllMoods}
          updateShowMood={props.updateShowMood}
          showMood={props.showMood}
        />
      )}
    </>
  );
}
