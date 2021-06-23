import React, { Component } from "react";
import "./Graph.css";
import fG from "../img/fakeGraph.png";

export default class Graph extends Component {
  render() {
    console.log(this.props.mood);
    return (
      <div className="graph">
       <h1>Your mood over time with Shimmer:)</h1>
        <img alt="fake graph" src={fG}></img>
      </div>
    );
  }
}
