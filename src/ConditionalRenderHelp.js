import React, { useEffect } from "react";
import SelectMood from "./SelectMood/SelectMood";
import GraphPage from "./GraphPage/GraphPage";

export default function ConditionalRenderHelp(props) {
  useEffect(() => {
    props.fetchLastDateEntered.call(null);
  }, [props.fetchLastDateEntered]);

  return (
    <>
      {props.mood.date === props.dateMoodWasLastEntered ? (
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
          dateMoodWasLastEntered={props.dateMoodWasLastEntered}
          showMood={props.showMood}
          updateShowMood={props.updateShowMood}
        ></GraphPage>
      ) : (
        <>
          <SelectMood
            mood={props.mood}
            getExp={props.getExp}
            getTags={props.getTags}
            getMoodClicked={props.getMoodClicked}
            dateMoodWasLastEntered={props.dateMoodWasLastEntered}
            allMoods={props.allMoods}
            addToAllMoods={props.addToAllMoods}
            fetchData={props.fetchData}
            pushMoodToDb={props.pushMoodToDb}
            removeAllMoods={props.removeAllMoods}
            pageTransition={props.pageTransition}
            pageVariants={props.pageVariants}
            db={props.db}
            showMood={props.showMood}
            updateShowMood={props.updateShowMood}
          ></SelectMood>
        </>
      )}
    </>
  );
}
