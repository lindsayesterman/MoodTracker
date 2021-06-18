import React from "react";

export default function SelectMood(props) {
  return (
    <div>
      <h1>Hey Lindsay, how are you feeling today?</h1>
      <button value="sad" onClick={props.getButtonClicked} id="sad">
        sad
      </button>
      <button value="not well" onClick={props.getButtonClicked} id="nw">
        not well
      </button>
      <button value="neutral" onClick={props.getButtonClicked} id="neutral">
        neutral
      </button>
      <button value="happy" onClick={props.getButtonClicked} id="happy">
        happy
      </button>
      <button value="jubilant" onClick={props.getButtonClicked} id="jub">
        jubilant
      </button>
    </div>
  );
}
