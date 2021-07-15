import React from "react";
import backBtn from "../img/backBtn.svg";
import "./BackBtn.css";
import { Link } from "react-router-dom";

export default function BackBtn(props) {
  return (
    <div>
      <Link to={"/mood/" + props.url}>
        <img alt="back button" className="backBtn" src={backBtn}></img>
      </Link>
    </div>
  );
}
