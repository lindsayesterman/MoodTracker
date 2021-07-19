import React from "react";
import "./StatBox.css";
import { convertNumToEmotion, findMostCommonTag } from "../helpers.js";

const findMostCommonMood = (allMoods) => {
  if (allMoods.length > 0) {
    for (let i = 0; i < allMoods.length; i++) {
      allMoods.sort((x, y) => x - y);

      var bestStreak = 1;
      var bestElem = allMoods[0].feeling;
      var currentStreak = 1;
      var currentElem = allMoods[0].feeling;

      for (let i = 1; i < allMoods.length; i++) {
        if (allMoods[i - 1].feeling !== allMoods[i].feeling) {
          if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
            bestElem = currentElem;
          }

          currentStreak = 0;
          currentElem = allMoods[i].feeling;
        }

        currentStreak++;
      }

      var num = currentStreak > bestStreak ? currentElem : bestElem;
      return convertNumToEmotion(num);
    }
  } else return "Happy";
};

export default function StatBox(props) {
  return (
    <div className="statBox">
      <h3>Your most common stats</h3>
      <div className="boxInsideStatBox">
        <p>
          <b>Mood: </b> {findMostCommonMood(props.allMoods, "feeling")}
        </p>
        <br />
        <p>
          <b>Tags: </b> {findMostCommonTag(props.allMoods, "allTime")}
        </p>
      </div>
    </div>
  );
}
