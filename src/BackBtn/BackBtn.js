import React from "react";
import backBtn from "../img/backBtn.svg";
import "./BackBtn.css";

export default function BackBtn(props) {
  return (
    <img
      alt="back button"
      className="backBtn"
      src={backBtn}
    ></img>
  );
}
