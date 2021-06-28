import React from "react";
import star from "../img/shimmerStar.svg";
import "./Stars.css"

export default function Stars() {
  return (
    <div>
      <img alt="star" className="s1" src={star}></img>
      <img alt="star" className="s2" src={star}></img>
      <img alt="star" className="s3" src={star}></img>
      <img alt="star" className="s4" src={star}></img>
      <img alt="star" className="s5" src={star}></img>
      <img alt="star" className="s6" src={star}></img>
    </div>
  );
}
