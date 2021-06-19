import "./App.css";
import MoodTracker from "./MoodTracker/MoodTracker";
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

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={(routeProps) => {
            return (
              <MoodTracker
                mood={this.state.mood}
                displayExp={this.props.displayExp}
                getExp={this.getExp}
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
      </div>
    );
  }
}
