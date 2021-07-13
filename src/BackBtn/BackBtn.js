import React from "react";
import backBtn from "../img/backBtn.svg";
import "./BackBtn.css";
import { useHistory } from "react-router-dom";
import { Redirect, Link } from "react-router-dom";

export default function BackBtn(props) {
  let history = useHistory();

  return (
    <div>
      <Link to={"/" + props.url}>
        <img
          alt="back button"
          className="backBtn"
          src={backBtn}
        ></img>
      </Link>
    </div>
  );
}
