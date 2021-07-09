import React, { Component } from "react";
import "./MoodTracker.css";
import SelectMood from "../SelectMood/SelectMood";
import GraphPage from "../GraphPage/GraphPage";
import MoodExp from "../MoodExp/MoodExp";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../Auth/Home";
import LogIn from "../Auth/LogIn";
import SignUp from "../Auth/SignUp";
import { AuthProvider, AuthContext } from "../Auth/Auth";
import firebase from "../firebase";

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
  duration: 0.3,
};

const db = firebase.firestore();

export default class MoodTracker extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      mood: {
        feeling: 0,
        explanation: "",
        tags: [],
        key: "",
        date: "",
      },
      allMoods: [], //array of mood objects
      email: "",
      password: "",
    };
  }

  getUserEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  getMoodClicked = (e) => {
    this.setState({
      mood: {
        ...this.state.mood,
        feeling: parseFloat(e.target.id),
        key: Date.now(),
        date: new Date().toISOString().slice(0, 10),
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

  addToAllMoods = (mood) => {
    this.setState({
      allMoods: this.state.allMoods.concat(mood),
    });
  };

  render() {
    console.log(this.context)
    return (
      <div className="mood-tracker">
        <AnimatePresence>
          <AuthProvider>
            <Router>
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
                        getMoodClicked={this.getMoodClicked}
                        addToAllMoods={this.addToAllMoods}
                        db={db}
                        allMoods={this.state.allMoods}
                        fetchData={this.fetchData}
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
                        pageTransition={pageTransition}
                        pageVariants={pageVariants}
                        addToAllMoods={this.addToAllMoods}
                        fetchData={this.fetchData}
                        db={db}
                        {...routeProps}
                      />
                    );
                  }}
                />
                <Route
                  path="/analytics"
                  render={(routeProps) => {
                    return (
                      <GraphPage
                        allMoods={this.state.allMoods}
                        pageTransition={pageTransition}
                        pageVariants={pageVariants}
                        mood={this.state.mood}
                        addToAllMoods={this.addToAllMoods}
                        fetchData={this.fetchData}
                        db={db}
                        {...routeProps}
                      />
                    );
                  }}
                />
                <Route exact path="/home" component={Home} />
                <Route exact path="/login" component={LogIn} />
                <Route
                  exact
                  path="/signup"
                  render={(routeProps) => {
                    return (
                      <SignUp
                        getUserEmail={this.getUserEmail}
                        db={db}
                        email={this.state.email}
                        {...routeProps}
                      />
                    );
                  }}
                />
              </Switch>
            </Router>
          </AuthProvider>
        </AnimatePresence>
      </div>
    );
  }
}
