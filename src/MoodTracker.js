import React, { Component } from "react";
import "./MoodTracker.css";
import SelectMood from "./SelectMood/SelectMood";
import { Route } from "react-router-dom";
import Graph from "./Graph/Graph";
import MoodExp from "./MoodExp/MoodExp";
import star from './shimmerStar.svg'

export default class MoodTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: {
        feeling: "",
        explanation: "",
        tags: [],
        key: "",
      },
      allMoods: [], //array of mood objects
    };
  }

  getButtonClicked = (e) => {
    this.setState({
      mood: {
        ...this.state.mood,
        feeling: e.target.id,
        key: Date.now(),
      },
    });
    console.log(e.target.id)
  };

  getExp = (e) => {
    this.setState({
      mood: {
        ...this.state.mood,
        explanation: e.target.value,
      },
    });
  };

  getTags = (e) => {
    this.setState({
      mood: {
        ...this.state.mood,
        tags: this.state.mood.tags.concat(e.target.value),
      },
    });
  };

  addToAllMoods = () => {
    this.setState({
      allMoods: this.state.allMoods.concat(this.state.mood),
    });
    console.log(this.state.allMoods);
  };

  render() {
    return (
      <div className="mood-tracker">
        <img className="s1" src={star}></img>
        <img className="s2" src={star}></img>
        <Route
          exact
          path="/"
          render={(routeProps) => {
            return (
              <SelectMood
                mood={this.state.mood}
                getExp={this.getExp}
                getTags={this.getTags}
                addToAllMoods={this.addToAllMoods}
                getButtonClicked={this.getButtonClicked}
                {...routeProps}
              />
            );
          }}
        />
        <Route
          path="/graph"
          render={(routeProps) => {
            return <Graph mood={this.state.mood} {...routeProps} />;
          }}
        />
        <Route
          path="/exp"
          render={(routeProps) => {
            return (
              <MoodExp
                mood={this.state.mood}
                getExp={this.getExp}
                getTags={this.getTags}
                addToAllMoods={this.addToAllMoods}
                {...routeProps}
              />
            );
          }}
        />
      </div>
    );
  }
}
