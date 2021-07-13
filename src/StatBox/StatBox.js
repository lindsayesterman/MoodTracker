import React from "react";
import "./StatBox.css";
import { convertNumToEmotion } from "../helpers.js";

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

function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

const findMostCommonTag = (allMoods) => {
  if (allMoods.length > 0) {
    var arr = [];
    for (let i = 0; i < allMoods.length; i++) {
      for (let j = 0; j < allMoods[i].tags.length; j++) {
        arr.push(allMoods[i].tags[j]);
      }
    }
    var a = [],
      b = [],
      prev;

    arr.sort();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== prev) {
        a.push(arr[i]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      prev = arr[i];
    }
    var result = [a, b];
    var index = indexOfMax(result[1]);
    var tag = result[0].splice(index, 1);
    var index2 = result[1].splice(index, 1);
    index2 = indexOfMax(result[1]);
    var tag2 = result[0].splice(index2, 1);
    return tag.length > 0 && tag2.length > 0
      ? tag + ", " + tag2
      : tag.length > 0
      ? tag
      : "No tags selected yet.";
  }
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
          <b>Tags: </b> {findMostCommonTag(props.allMoods)}
        </p>
      </div>
    </div>
  );
}
