import React from "react";
import SelectMood from "./SelectMood/SelectMood";
import GraphPage from "./GraphPage/GraphPage";

export default function ConditionalRenderHelp(props) {
  return (
    <>
      {props.dateMoodWasLastEntered !== "" &&
      props.mood.date === props.dateMoodWasLastEntered ? (
        <GraphPage
          allMoods={props.allMoods}
          pageTransition={props.pageTransition}
          pageVariants={props.pageVariants}
          mood={props.mood}
          addToAllMoods={props.addToAllMoods}
          fetchData={props.fetchData}
          pushMoodToDb={props.pushMoodToDb}
          removeAllMoods={props.removeAllMoods}
          db={props.db}
        ></GraphPage>
      ) : (
        <>
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
          ></SelectMood>
        </>
      )}
    </>
  );
}
