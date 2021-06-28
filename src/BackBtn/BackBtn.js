import React from "react";
import backBtn from "../img/backBtn.svg";
import "./BackBtn.css";
import { useHistory } from "react-router-dom";

export default function BackBtn(props) {
  let history = useHistory();

  return (
    <div>
      <img
        onClick={() => history.goBack()}
        alt="back button"
        className="backBtn"
        src={backBtn}
      ></img>
    </div>
  );
}
