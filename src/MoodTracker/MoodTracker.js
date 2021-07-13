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
import { AuthContext } from "../Auth/Auth";
import firebase from "../firebase";
import { Redirect } from "react-router-dom";

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
        date: new Date().toISOString().slice(0, 10),
      },
      allMoods: [], //array of mood objects
      email: "",
      password: "",
      dateMoodWasLastEntered: "",
    };
  }

  async componentDidMount() {
    await this.fetchLastDateEntered();
  }

  pushMoodToDb = async () => {
    if (this.context.currentUser) {
      let state = this.state;
      let self = this;
      var moodTrackerUserRef = db
        .collection("moodTracker")
        .doc(this.context.currentUser.uid);
      var docId;
      await moodTrackerUserRef.get().then((doc) => {
        if (!doc.exists) {
          moodTrackerUserRef.set({
            todaysMoodDocId: "",
            lastDateEntered: this.state.mood.date,
          });
          docId = "";
          this.updateLastDateMoodEntered(this.state.mood.date);
        } else {
          docId = doc.data().todaysMoodDocId;
          this.updateLastDateMoodEntered(doc.data().lastDateEntered);
        }
      });
      if (docId === "") {
        await moodTrackerUserRef
          .collection("date")
          .add({
            feeling: this.state.mood.feeling,
            explanation: this.state.mood.explanation,
            setMoodForToday: true,
            tags: this.state.mood.tags,
            date: this.state.mood.date,
          })
          .then(function (docRef) {
            docId = docRef.id;
            self.updateLastDateMoodEntered(state.mood.date);
            moodTrackerUserRef.set({
              todaysMoodDocId: docId,
              lastDateEntered: state.mood.date,
            });
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
        console.log(this.state.dateMoodWasLastEntered);
      } else {
        await moodTrackerUserRef.collection("date").doc(docId).update({
          feeling: this.state.mood.feeling,
          explanation: this.state.mood.explanation,
          tags: this.state.mood.tags,
        });
      }
    }
  };

  fetchData = async () => {
    const { currentUser } = this.context;
    var moodTrackerRef;
    if (currentUser) {
      moodTrackerRef = db
        .collection("moodTracker")
        .doc(currentUser.uid)
        .collection("date");
    } else {
      moodTrackerRef = null;
    }
    if (moodTrackerRef) {
      const snapshot = await moodTrackerRef.orderBy("date", "desc").get();
      if (snapshot.empty) {
        return;
      }
      snapshot.forEach((doc) => {
        this.addToAllMoods(doc.data());
      });
    }
  };

  fetchLastDateEntered = async () => {
    let self = this;
    var date;
    await db
      .collection("moodTracker")
      .doc(self.context.currentUser.uid)
      .get()
      .then((doc) => {
        self.updateLastDateMoodEntered(doc.data().lastDateEntered);
      });
  };

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

  removeAllMoods = () => {
    this.setState({
      allMoods: [],
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

  updateLastDateMoodEntered = (date) => {
    this.setState({
      dateMoodWasLastEntered: date,
    });
  };

  render() {
    return (
      <div className="mood-tracker">
        <AnimatePresence>
          <Router>
            <Switch>
              {this.state.dateMoodWasLastEntered === this.state.mood.date
                ? console.log("analytics")
                : console.log("select")}
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
                      pushMoodToDb={this.pushMoodToDb}
                      removeAllMoods={this.removeAllMoods}
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
        </AnimatePresence>
      </div>
    );
  }
}
