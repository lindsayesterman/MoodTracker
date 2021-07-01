import React, { Component } from "react";
import "../Graph/Graph.css";
import { motion } from "framer-motion";
import BackBtn from "../BackBtn/BackBtn";
import { Bar, Line } from "react-chartjs-2";
import f1 from "../img/faceOne.svg";
import f2 from "../img/faceTwo.svg";
import f3 from "../img/faceThree.svg";
import f4 from "../img/faceFour.svg";
import f5 from "../img/faceFive.svg";
import whiteArrow from "../img/whiteArrow.png";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: {},
      timeRange: "week",
      arrowClicked: false,
    };
  }

  componentDidMount() {
    this.getGraphData();
  }

  handleTimeRangeClicked = (e) => {
    this.setState({
      timeRange: e.target.value,
    });
    this.setState({ timeRange: e.target.value }, this.getGraphData);
    console.log(this.state.timeRange);
  };

  addGraphGradient = () => {
    var ctx = document.getElementById("lineChart").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(255, 240, 164, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0) 0)");
    console.log(gradient)
    return gradient;
  };

  whichData = () => {
    if (this.state.timeRange === "week") {
      const data = {
        labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
        datasets: {
          data: [1, 3, 3, 4, 3, 5, 4],
        },
      };
      return { data };
    } else if (this.state.timeRange === "month") {
      const data = {
        labels: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        ],
        datasets: {
          data: [
            1, 4, 5, 1, 2, 3, 2, 3, 4, 4, 3, 2, 4, 5, 4, 5, 4, 2, 3, 2, 3, 5, 3,
            2, 5, 3, 3, 3, 4, 5, 5, 5,
          ],
        },
      };
      return { data };
    } else if (this.state.timeRange === "year") {
      const data = {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: {
          data: [2.7, 3, 3.2, 3, 3.6, 4, 3.5, 4, 4.5, 3.9, 4, 3.8],
        },
      };
      return { data };
    }
  };

  removeLineAddBar = () => {
    this.setState({ arrowClicked: !this.state.arrowClicked });
  };

  getGraphData = () => {
    const dataLabels = this.whichData().data.labels;
    const numericalData = this.whichData().data.datasets.data;

    const options = {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
      },
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
      graphData: {
        data: {
          labels: dataLabels,
          datasets: [
            {
              label: "# of Times Mood Was Selected",
              data: numericalData,
              fill: true,
              backgroundColor: this.addGraphGradient(),
              borderColor: "#ddd",
              borderWidth: 1,
              pointBackgroundColor: "#7FBEF9",
              pointBorderColor: "#7FBEF9",
              pointRadius: 5,
            },
          ],
        },
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
          <div className={this.state.arrowClicked ? "hidden" : "graphHolder"}>
            <div className="graphColOfFaces">
              <img alt="cartoon face" src={f5}></img>
              <img alt="cartoon face" src={f4}></img>
              <img alt="cartoon face" src={f3}></img>
              <img alt="cartoon face" src={f2}></img>
              <img alt="cartoon face" src={f1}></img>
            </div>
            <Line
              id="lineChart"
              data={this.state.graphData.data}
              options={this.state.graphData.options}
            />
          </div>
          <div className={this.state.arrowClicked ? "graphHolder" : "hidden"}>
            <div className="graphColOfFaces">
              <img alt="cartoon face" src={f5}></img>
              <img alt="cartoon face" src={f4}></img>
              <img alt="cartoon face" src={f3}></img>
              <img alt="cartoon face" src={f2}></img>
              <img alt="cartoon face" src={f1}></img>
            </div>
            <Bar
              id="lineChart"
              data={this.state.graphData.data}
              options={this.state.graphData.options}
            />
          </div>
          <img
            onClick={this.removeLineAddBar}
            alt="white arrow"
            className={this.state.arrowClicked ? "whiteArrowRotated" : "whiteArrow"}
            src={whiteArrow}
          ></img>
        </div>
      </>
    );
  }
}
