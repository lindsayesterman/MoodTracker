import React, { Component } from "react";
import "../Graph/Graph.css";
import { motion } from "framer-motion";
import BackBtn from "../BackBtn/BackBtn";
import { Bar, Line, Pie, Bubble, Scatter } from "react-chartjs-2";
import f1 from "../img/faceOne.svg";
import f2 from "../img/faceTwo.svg";
import f3 from "../img/faceThree.svg";
import f4 from "../img/faceFour.svg";
import f5 from "../img/faceFive.svg";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      timeRange: "",
    };
  }

  componentDidMount() {
    this.getChartData();
  }

  handleTimeRangeClicked = (e) => {
    this.setState({
      timeRange: e.target.value,
    });
    console.log(e.target.value);
  };

  getChartData = () => {
    // const myImage = new Image();
    // myImage.src = { f1 };
    var ctx = document.getElementById("lineChart").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(255, 241, 169, .8)");
    gradient.addColorStop(1, "rgba(255, 241, 169, 0) 0)");

    const data = {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          label: "# of Votes",
          data: [1, 3, 3, 4, 3, 5, 4, 5, 3, 5, 3, 4, 2, 3, 4],
          fill: true,
          backgroundColor: gradient,
          borderColor: "black",
          borderWidth: 1,
          pointBackgroundColor: "#7FBEF9",
          pointBorderColor: "#7FBEF9",
          pointRadius: 5,
        },
      ],
    };

    const options = {
      plugins: { legend: { display: false } },
      layout: { padding: { bottom: 10 } },
      scales: {
        y: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
        },
        x: {
          ticks: {
            color: "black",
            font: {
              size: 11,
            },
          },
          grid: {
            display: false,
          },
        },
      },
    };

    this.setState({
      chartData: {
        data: data,
        options: options,
      },
    });
  };

  render() {
    return (
      <>
        <BackBtn></BackBtn>
        <div className="graph">
          <motion.div
            className="statContainer"
            initial="outRight"
            animate="in"
            exit="outRight"
            transition={this.props.pageTransition}
            variants={this.props.pageVariants}
          >
            <h1>Your mood over time with Shimmer:)</h1>
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
              <button
                value="week"
                onClick={this.handleTimeRangeClicked}
                className="week"
              >
                Week
              </button>
              <button
                value="month"
                onClick={this.handleTimeRangeClicked}
                className="month"
              >
                Month
              </button>
              <button
                value="year"
                onClick={this.handleTimeRangeClicked}
                className="year"
              >
                Year
              </button>
            </div>
          </motion.div>
          <div className="graphHolder">
            <div className="graphColOfFaces">
              <img alt="cartoon face" src={f5}></img>
              <img alt="cartoon face" src={f4}></img>
              <img alt="cartoon face" src={f3}></img>
              <img alt="cartoon face" src={f2}></img>
              <img alt="cartoon face" src={f1}></img>
            </div>
            <Line
              id="lineChart"
              data={this.state.chartData.data}
              options={this.state.chartData.options}
            />
          </div>
        </div>
      </>
    );
  }
}
