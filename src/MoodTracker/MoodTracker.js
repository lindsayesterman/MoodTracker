import React, { Component } from "react";
import "./MoodTracker.css";
import MoodExp from "../MoodExp/MoodExp";
import { Route, Link } from "react-router-dom";
import SelectMood from "../SelectMood/SelectMood";
import Graph from "../Graph/Graph";

export default class MoodTracker extends Component {
  render() {
    return (
      <div className="mood-tracker">
        <div className="c1"></div>
        <div className="c2"></div>
        <SelectMood
          mood={this.props.mood}
          getButtonClicked={this.props.getButtonClicked}
        ></SelectMood>
        {/* {this.props.mood.feeling !== "" ? (
          <div>
            <MoodExp
              getExp={this.props.getExp}
              getTags={this.props.getTags}
              addToAllMoods={this.props.addToAllMoods}
              mood={this.props.mood}
            ></MoodExp>
          </div>
        ) : (
          <SelectMood
            mood={this.props.mood}
            getButtonClicked={this.props.getButtonClicked}
          ></SelectMood>
        )} */}
      </div>
    );
  }
}
