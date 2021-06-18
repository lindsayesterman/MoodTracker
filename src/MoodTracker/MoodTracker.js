import React, { Component } from "react";
import "./MoodTracker.css";
import MoodExp from "../MoodExp/MoodExp";
import { Route } from "react-router-dom";
import SelectMood from "../SelectMood/SelectMood";

export default class MoodTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: {
        feeling: "",
        explanation: "",
        key: "",
      },
    };
  }

  getButtonClicked = (e) => {
    this.setState({
      mood: {
        ...this.state.mood,
        feeling: e.target.value,
        key: Date.now(),
      },
    });
  };

  getExp = (e) => {
    this.setState({
      mood: {
        ...this.state.mood,
        explanation: e.target.value,
      },
    });
  };

  displayExp = (e) => {
    e.preventDefault();
    console.log(this.state.mood.explanation);
    window.location.href="/graph"
  };

  render() {
    return (
      <div className="mood-tracker">
        <SelectMood
          mood={this.state.mood}
          getButtonClicked={this.getButtonClicked}
        ></SelectMood>
        {this.state.mood.feeling !== "" ? (
          <div>
            <MoodExp
              displayExp={this.displayExp}
              getExp={this.getExp}
              mood={this.state.mood}
            ></MoodExp>
          </div>
        ) : (
          console.log("hey")
        )}
      </div>
    );
  }
}
