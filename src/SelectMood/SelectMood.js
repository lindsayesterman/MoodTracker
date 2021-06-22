import React from "react";
import "./SelectMood.css";
import { Link } from "react-router-dom";
import f1 from './faceOne.svg'
import f2 from './faceTwo.svg'
import f3 from './faceThree.svg'
import f4 from './faceFour.svg'
import f5 from './faceFive.svg'

export default function SelectMood(props) {
  return (
    <div className="selectMood">
      <h1 className="welcome">Welcome back Lindsay <br /> How are you feeling today?</h1>
      <Link to="/exp">
        <img alt="sad face" id="sad" onClick={props.getButtonClicked} src={f1}></img>
        <img alt="not well face" id="not well" onClick={props.getButtonClicked} src={f2}></img>
        <img alt="neutral face" id="neutral" onClick={props.getButtonClicked} src={f3}></img>
        <img alt="happy face" id="happy" onClick={props.getButtonClicked} src={f4}></img>
        <img alt="jubilant face" id="jubilant" onClick={props.getButtonClicked} src={f5}></img>
      </Link>
    </div>
  );
}
