import React, { Component } from "react";
import "./MoodTracker.css";
import SelectMood from "../SelectMood/SelectMood";
import Graph from "../Graph/Graph";
import MoodExp from "../MoodExp/MoodExp";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../Auth/Home";
import LogIn from "../Auth/LogIn";
import SignUp from "../Auth/SignUp";
import { AuthProvider } from "../Auth/Auth";

const pageVariants = {
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "-100vw",
  },
  outRight: {
    opacity: 0,
    x: "100vw",
  },
  outFade: {
    opacity: 0,
  },
};

const pageTransition = {
  // type: "spring",
  // stiffness: 120,
  transition: "linear",
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
        <AnimatePresence>
          <AuthProvider>
            <Router>
              <Switch>
                <Route
                  exact
                  path="/select"
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
                  path="/explain"
                  render={(routeProps) => {
                    return (
                      <MoodExp
                        mood={this.state.mood}
                        getExp={this.getExp}
                        getTags={this.getTags}
                        addToAllMoods={this.addToAllMoods}
                        pageTransition={pageTransition}
                        pageVariants={pageVariants}
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
                        pageVariants={pageVariants}
                        mood={this.state.mood}
                        {...routeProps}
                      />
                    );
                  }}
                />
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/signup" component={SignUp} />
              </Switch>
            </Router>
          </AuthProvider>
        </AnimatePresence>
      </div>
    );
  }
}
