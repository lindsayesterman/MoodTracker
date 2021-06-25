import React, { Component } from "react";
import "./MoodTracker.css";
import SelectMood from "../SelectMood/SelectMood";
import Graph from "../Graph/Graph";
import MoodExp from "../MoodExp/MoodExp";
import star from "../img/shimmerStar.svg";
import { Route, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

export default class MoodTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: {
        feeling: "",
        explanation: "",
        tags: [],
        key: "",
        date: "",
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
        date: Date().toLocaleString(),
      },
    });
    console.log(e.target.id);
  };

  getExp = (e) => {
    this.setState({
      mood: {
        ...this.state.mood,
        explanation: e.target.value,
      },
    });
  };

  removeTag = (e) => {
    this.setState({
      mood: {
        ...this.state.mood,
        tags: this.state.mood.tags.filter(function (t) {
          return t !== e.target.value;
        }),
      },
    });
  };

  getTags = (e) => {
    this.state.mood.tags.includes(e.target.value)
      ? this.removeTag(e)
      : this.setState({
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
        <img alt="star" className="s1" src={star}></img>
        <img alt="star" className="s2" src={star}></img>
        <img alt="star" className="s3" src={star}></img>
        <img alt="star" className="s4" src={star}></img>
        <img alt="star" className="s5" src={star}></img>
        <img alt="star" className="s6" src={star}></img>
        <AnimatePresence>
          <Switch>
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
                    pageTransition={pageTransition}
                    {...routeProps}
                  />
                );
              }}
            />
            <Route
              path="/mind"
              render={(routeProps) => {
                return (
                  <MoodExp
                    mood={this.state.mood}
                    getExp={this.getExp}
                    getTags={this.getTags}
                    addToAllMoods={this.addToAllMoods}
                    pageTransition={pageTransition}
                    {...routeProps}
                  />
                );
              }}
            />
            <Route
              path="/analytics"
              render={(routeProps) => {
                return (
                  <Graph
                    pageTransition={pageTransition}
                    mood={this.state.mood}
                    {...routeProps}
                  />
                );
              }}
            />
          </Switch>
        </AnimatePresence>
      </div>
    );
  }
}
