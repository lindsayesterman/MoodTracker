import React, { Component } from "react";
import "./Graph.css";
import fG from "../img/fakeGraph.png";
import { motion } from "framer-motion";

export default class Graph extends Component {
  render() {
    console.log(this.props.mood);
    return (
      <motion.div
        className="graph"
        initial="out"
        animate="in"
        exit="out"
        variants={this.props.pageTransition}
      >
        <h1>Your mood over time with Shimmer:)</h1>
        <img alt="fake graph" src={fG}></img>
      </motion.div>
    );
  }
}
