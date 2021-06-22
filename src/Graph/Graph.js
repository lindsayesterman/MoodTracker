import React, { Component } from "react";
import "./Graph.css";
import fG from "../fakeGraph.png";

export default class Graph extends Component {
  render() {
    console.log(this.props.mood.explanation, this.props.mood.tags);
    return (
      <div className="graph">
        {this.props.mood.feeling === "happy" ||
        this.props.mood.feeling === "jubilant" ? (
          <h1>Awesome, we're glad you're feeling well today!</h1>
        ) : (
          <h1>Oh no, we're sorry you're not feeling well today.</h1>
        )}
        <img alt="fake graph" src={fG}></img>
      </div>
    );
  }
}
