import React, { Component } from "react";
import "./Graph.css";
import fG from "../img/simpFG.png";
import { motion } from "framer-motion";
import BackBtn from "../BackBtn/BackBtn";

export default class Graph extends Component {
  render() {
    console.log(this.props.mood);
    return (
      <>
        <BackBtn></BackBtn>

        <div className="graph">
          <div className="statContainer">
            <h1>Your mood over time with Shimmer:)</h1>
            {/* <div className="boxAndButtons"> */}
              <div className="statBox">
                <h3>Your most common stats</h3>
                <div className="boxInsideStatBox">
                  <p>
                    <b>Mood: </b> Happy
                  </p>
                  <br />
                  <p>
                    <b>Tags: </b> School, Work, Food
                  </p>
                </div>
              </div>
              <div className="buttonContainer">
                <button className="week">Week</button>
                <button className="month">Month</button>
                <button className="year">Year</button>
              </div>
            </div>
          {/* </div> */}
          <motion.img
            alt="fake graph"
            initial="outRight"
            animate="in"
            exit="outRight"
            transition={this.props.pageTransition}
            variants={this.props.pageVariants}
            src={fG}
          ></motion.img>
        </div>
      </>
    );
  }
}
