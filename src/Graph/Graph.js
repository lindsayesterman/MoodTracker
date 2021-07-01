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
import lg from "../img/lineGraphBtn.svg";
import bg from "../img/barGraphBtn.svg";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: {},
      timeRange: "week",
      lineClicked:true,
      barClicked:false,
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

  addPointBackgroundColors = () => {
    var pointBackgroundColors = [];
    var data = this.whichData().data.datasets.data;
    for (let i = 0; i < data.length; i++) {
      if (data[i] > 0 && data[i] < 1.5) {
        pointBackgroundColors.push("#7FBEF9");
      } else if (data[i] >= 1.5 && data[i] < 2.5) {
        pointBackgroundColors.push("#BBDDFB");
      } else if (data[i] >= 2.5 && data[i] < 3.5) {
        pointBackgroundColors.push("#FFE457");
      } else if (data[i] >= 3.5 && data[i] < 4.5) {
        pointBackgroundColors.push("#FFD954");
      } else if (data[i] >= 4.5 && data[i] < 6) {
        pointBackgroundColors.push("#F8C144");
      }
    }
    return pointBackgroundColors;
  };

  addGraphGradient = () => {
    var ctx = document.getElementById("lineChart").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(255, 240, 164, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0) 0)");
    return gradient;
  };

  whichData = () => {
    let data;
    if (this.state.timeRange === "week") {
      data = {
        labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
        datasets: {
          data: [2, 3, 2, 4, 3, 5, 4],
        },
      };
    } else if (this.state.timeRange === "month") {
      data = {
        labels: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        ],
        datasets: {
          data: [
            1, 2, 4, 5, 1, 2, 3, 2, 3, 4, 4, 3, 2, 4, 5, 4, 5, 4, 2, 3, 2, 3, 5,
            3, 2, 5, 3, 3, 3, 4, 5, 5, 5,
          ],
        },
      };
    } else if (this.state.timeRange === "year") {
      data = {
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
          data: [1.4, 1.7, 2.6, 3.2, 3, 3.6, 4, 2.9, 4, 4.5, 3.9, 4, 3.8],
        },
      };
    }
    return { data };
  };

  removeLineAddBar = () => {
    this.setState({
      barClicked: true,
      lineClicked:false
    })
  }

  removeBarAddLine = () => {
    this.setState({
      barClicked: false,
      lineClicked:true
    })
  }

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
          display: false,
          min: 1,
          max: 5.2,
          ticks: {
            display: false,
            stepSize: 1,
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
              borderColor: "#ededed",
              borderWidth: 1,
              pointBackgroundColor: this.addPointBackgroundColors(),
              pointBorderColor: "transparent",
              pointRadius: 7,
            },
          ],
        },
        barData: {
          labels: dataLabels,
          datasets: [
            {
              label: "# of Times Mood Was Selected",
              data: numericalData,
              fill: true,
              backgroundColor: this.addPointBackgroundColors(),
              border: false,
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
          <div className={this.state.lineClicked ? "graphHolder" : "hidden"}>
            <div className="graphColOfFaces">
              <img alt="cartoon face" src={f5}></img>
              <img alt="cartoon face" src={f4}></img>
              <img alt="cartoon face" src={f3}></img>
              <img alt="cartoon face" src={f2}></img>
              <img alt="cartoon face" src={f1}></img>
            </div>
            <Line
              className="graphs"
              id="lineChart"
              data={this.state.graphData.data}
              options={this.state.graphData.options}
            />
          </div>
          <div className={this.state.barClicked ? "graphHolder" : "hidden"}>
            <div className="graphColOfFaces">
              <img alt="cartoon face" src={f5}></img>
              <img alt="cartoon face" src={f4}></img>
              <img alt="cartoon face" src={f3}></img>
              <img alt="cartoon face" src={f2}></img>
              <img alt="cartoon face" src={f1}></img>
            </div>
            <Bar
              id="barChart"
              className="graphs"
              data={this.state.graphData.barData}
              options={this.state.graphData.options}
            />
          </div>
          <img
            onClick={this.removeLineAddBar}
            alt="switch graph btn"
            className="switchGraphLine"
            src={bg}
          ></img>
          <img
            onClick={this.removeBarAddLine}
            alt="switch graph btn"
            className="switchGraphBar"
            src={lg}
          ></img>
        </div>
      </>
    );
  }
}
