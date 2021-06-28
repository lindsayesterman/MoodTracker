import React from "react";
import star from "../img/shimmerStar.svg";
import "./Stars.css"

export default function Stars() {
  return (
    <div>
      <img alt="star" className="bottomLeftLarge" src={star}></img>
      <img alt="star" className="topRightLarge" src={star}></img>
      <img alt="star" className="topRightBottom" src={star}></img>
      <img alt="star" className="topRightTop" src={star}></img>
      <img alt="star" className="bottomLeftBottom" src={star}></img>
      <img alt="star" className="bottomLeftTop" src={star}></img>
    </div>
  );
}
