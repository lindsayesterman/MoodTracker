import "./App.css";
import SelectMood from "./SelectMood/SelectMood";
import { Route } from "react-router-dom";
import Graph from "./Graph/Graph";
import MoodExp from "./MoodExp/MoodExp";

import React, { Component } from "react";

export default class App extends Component {
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
      <div className="App">
        <div className="c1"></div>
        <div className="c2"></div>
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
