import React, { Component } from "react";
import "./GraphPage.css";
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
import StatBox from "../StatBox/StatBox";
import { convertNumToEmotion, findMostCommonTag } from "../helpers.js";
import { AuthContext } from "../Auth/Auth";
import MoodExp from "../MoodExp/MoodExp";
import SelectMood from "../SelectMood/SelectMood";

export default class GraphPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      graphData: {},
      timeRange: "week",
      lineClicked: true,
      barClicked: false,
      graphBackBtnClicked: false,
    };
  }

  async componentDidMount() {
    if (this.props.mood.feeling !== 0) {
      await this.props.pushMoodToDb();
    }
    if (this.props.allMoods.length === 0) {
      await this.props.fetchData();
    }
    this.getGraphData();
  }

  handleTimeRangeClicked = (e) => {
    this.setState({ timeRange: e.target.value }, this.getGraphData);
  };

  removeLineAddBar = () => {
    this.setState({
      lineClicked: false,
      barClicked: true,
    });
  };

  removeBarAddLine = () => {
    this.setState({
      barClicked: false,
      lineClicked: true,
    });
  };

  setGraphBackBtnClicked = () => {
    this.setState({
      graphBackBtnClicked: true,
    });
  };

  addDynamicGraphColoring = () => {
    var backgroundColors = [];
    var data = this.getLabelsAndDataForTimeRange().data.datasets.data;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 0) {
        backgroundColors.push("white");
      } else if (data[i] > 0 && data[i] < 1.5) {
        backgroundColors.push("#7FBEF9");
      } else if (data[i] >= 1.5 && data[i] < 2.5) {
        backgroundColors.push("#BBDDFB");
      } else if (data[i] >= 2.5 && data[i] < 3.5) {
        backgroundColors.push("#FFE457");
      } else if (data[i] >= 3.5 && data[i] < 4.5) {
        backgroundColors.push("#FFD954");
      } else if (data[i] >= 4.5 && data[i] < 6) {
        backgroundColors.push("#F8C144");
      }
    }
    return backgroundColors;
  };

  addGraphGradient = () => {
    var ctx = document.getElementById("lineChart").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(255, 240, 164, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0) 0)");
    return gradient;
  };

  getDaysInMonth = () => {
    var now = new Date();
    var days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    var arrayOfDays = [];
    for (let i = 1; i <= days; i++) {
      arrayOfDays.push(i);
    }
    return arrayOfDays;
  };

  getWeekData = (allMoods, dataRequested, index) => {
    let curr = new Date();
    let weekData = [];
    let week = [];
    let indexes = [];
    let notesData = [];
    let tagsData = [];

    for (let i = 0; i < 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      week.push(day);
      weekData.push(0);
      notesData.push("");
      tagsData.push("");
    }

    //get indexes of week days that have a mood
    for (let i = 0; i < allMoods.length; i++) {
      for (let j = 0; j < week.length; j++) {
        if (allMoods[i].date === week[j]) {
          indexes.push(j);
        }
      }
    }

    //add feeling num to weekdata
    for (let i = 0; i < indexes.length; i++) {
      for (let j = 0; j < week.length; j++) {
        if (indexes[i] === j) {
          weekData.splice(j, 1, allMoods[i].feeling);
          notesData.splice(j, 1, allMoods[i].explanation);
          tagsData.splice(j, 1, allMoods[i].tags);
        }
      }
    }

    if (dataRequested === "exp") {
      return notesData[index];
    } else if (dataRequested === "tags") {
      return tagsData[index].join(", ");
    } else if (dataRequested === "feelings") {
      return weekData;
    }
  };

  getMonthData = (allMoods, dataRequested, index) => {
    var month = new Date().getMonth();
    var year = new Date().getFullYear();
    var date = new Date(year, month, 1);
    var days = [];
    let indexes = [];
    var monthData = [];
    let notesData = [];
    let tagsData = [];

    while (date.getMonth() === month) {
      days.push(date.toISOString().slice(0, 10));
      date.setDate(date.getDate() + 1);
      monthData.push(0);
      notesData.push("");
      tagsData.push("");
    }
    for (let i = 0; i < allMoods.length; i++) {
      for (let j = 0; j < days.length; j++) {
        if (allMoods[i].date === days[j]) {
          indexes.push(j);
        }
      }
    }
    for (let i = 0; i < indexes.length; i++) {
      for (let j = 0; j < days.length; j++) {
        if (indexes[i] === j) {
          monthData.splice(j, 1, allMoods[i].feeling);
          notesData.splice(j, 1, allMoods[i].explanation);
          tagsData.splice(j, 1, allMoods[i].tags);
        }
      }
    }
    if (dataRequested === "exp") {
      return notesData[index];
    } else if (dataRequested === "tags") {
      return tagsData[index].join(", ");
    } else if (dataRequested === "feelings") {
      return monthData;
    }
  };

  getYearlyAverages = (allMoods, dataRequested, index) => {
    var year = new Date().getFullYear();
    var date = new Date(year, 0, 1);
    var days = [];
    var yearData = [];
    var indexes = [];
    var tagsData = [];
    var yearAverages = [];
    var month = 0;
    var total = 0;
    var count = 0;
    var totalArr = [];
    var monthlyTags = [];
    var numDaysCompletedInMonth = 0;

    while (date.getYear() + 1900 === year) {
      days.push(date.toISOString().slice(0, 10));
      date.setDate(date.getDate() + 1);
      yearData.push(0);
      tagsData.push([]);
    }
    for (let i = 0; i < allMoods.length; i++) {
      for (let j = 0; j < days.length; j++) {
        if (allMoods[i].date === days[j]) {
          indexes.push(j);
        }
      }
    }
    for (let i = 0; i < indexes.length; i++) {
      for (let j = 0; j < days.length; j++) {
        if (indexes[i] === j) {
          yearData.splice(j, 1, allMoods[i].feeling);
          tagsData.splice(j, 1, allMoods[i].tags);
        }
      }
    }

    while (date.getMonth() === month) {
      total += yearData[count];
      totalArr.push(tagsData[count]);
      count++;
      if (yearData[count] !== 0) {
        numDaysCompletedInMonth++;
      }
      date.setDate(date.getDate() + 1);
      if (date.getMonth() !== month) {
        month++;
        if (total !== 0) {
          yearAverages.push(total / numDaysCompletedInMonth);
          monthlyTags.push(totalArr);
        } else {
          yearAverages.push(total / this.getDaysInMonth().length);
          monthlyTags.push("");
        }
        totalArr = [];
        numDaysCompletedInMonth = 0;
        total = 0;
        totalArr = [];
      }
    }
    if (dataRequested === "tags") {
      return findMostCommonTag(allMoods, monthlyTags[index]);
    } else {
      return yearAverages;
    }
  };

  getLabelsAndDataForTimeRange = () => {
    let data;
    if (this.state.timeRange === "week") {
      data = {
        labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
        datasets: {
          data: this.getWeekData(this.props.allMoods, "feelings"),
        },
      };
    } else if (this.state.timeRange === "month") {
      data = {
        labels: this.getDaysInMonth(),
        datasets: {
          data: this.getMonthData(this.props.allMoods, "feelings"),
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
          data: this.getYearlyAverages(this.props.allMoods),
        },
      };
    }
    return { data };
  };

  breakString = (str, limit) => {
    let brokenString = "";
    for (let i = 0, count = 0; i < str.length; i++) {
      if (count >= limit && str[i] === " ") {
        count = 0;
        brokenString += "\n";
      } else {
        count++;
        brokenString += str[i];
      }
    }
    return brokenString;
  };

  getNotesAndTagsOnGraphHover = (item) => {
    const { allMoods } = this.props;
    const { timeRange } = this.state;
    var hoverInfo;
    if (timeRange === "week") {
      let weekExp = this.getWeekData(allMoods, "exp", item[0].dataIndex);
      let weekTags = this.getWeekData(allMoods, "tags", item[0].dataIndex);
      hoverInfo =
        "Mood: " +
        convertNumToEmotion(Math.round(item[0].raw)) +
        (weekExp ? " \nNotes: " + this.breakString(weekExp, 33) : "") +
        (weekTags ? " \nTags: " + this.breakString(weekTags, 30) : "");
    } else if (timeRange === "month") {
      let monthExp = this.getMonthData(allMoods, "exp", item[0].dataIndex);
      let monthTags = this.getMonthData(allMoods, "tags", item[0].dataIndex);
      hoverInfo =
        "Mood: " +
        convertNumToEmotion(Math.round(item[0].raw)) +
        (monthExp ? " \nNotes: " + this.breakString(monthExp, 33) : "") +
        (monthTags ? " \nTags: " + this.breakString(monthTags, 30) : "");
    } else if (timeRange === "year") {
      hoverInfo =
        `Mood average: ` +
        convertNumToEmotion(Math.round(item[0].raw)) +
        " \nMost common tag: " +
        this.getYearlyAverages(allMoods, "tags", item[0].dataIndex);
    }
    return hoverInfo;
  };

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  getGraphData = () => {
    const dataLabels = this.getLabelsAndDataForTimeRange().data.labels;
    const numericalData =
      this.getLabelsAndDataForTimeRange().data.datasets.data;
    let self = this;
    const options = {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title: function (item, everything) {
              return self.getNotesAndTagsOnGraphHover(item);
            },
            label: function (item, everything) {
              return;
            },
          },
          backgroundColor: "#484848",
          padding: "7",
          xAlign: "left",
        },
      },
      scales: {
        y: {
          display: false,
          min: 0.8,
          max: 5.23,
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
              data: numericalData,
              fill: true,
              backgroundColor: this.addGraphGradient(),
              borderColor: "#ededed",
              borderWidth: 1,
              pointBackgroundColor: this.addDynamicGraphColoring(),
              pointBorderColor: "transparent",
              pointRadius: 7,
              pointHoverRadius: 6,
            },
          ],
        },
        barData: {
          labels: dataLabels,
          datasets: [
            {
              data: numericalData,
              backgroundColor: this.addDynamicGraphColoring(),
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
        {!this.state.graphBackBtnClicked ? (
          <>
            <div onClick={this.setGraphBackBtnClicked}>
              <BackBtn></BackBtn>
            </div>
            <div className="graph">
              <div className="graphHeaderContainer">
                <h1>Your mood over time with Shimmer</h1>
                <StatBox allMoods={this.props.allMoods}></StatBox>
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
              </div>
              <div
                className={this.state.lineClicked ? "graphHolder" : "hidden"}
              >
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
        ) : this.props.mood.feeling === 0 ? (
          <>
            <SelectMood
              mood={this.props.mood}
              getExp={this.props.getExp}
              getTags={this.props.getTags}
              pageTransition={this.props.pageTransition}
              pageVariants={this.props.pageVariants}
              getMoodClicked={this.props.getMoodClicked}
              dateMoodWasLastEntered={this.props.dateMoodWasLastEntered}
              allMoods={this.props.allMoods}
              addToAllMoods={this.props.addToAllMoods}
              fetchData={this.props.fetchData}
              pushMoodToDb={this.props.pushMoodToDb}
              removeAllMoods={this.props.removeAllMoods}
              db={this.props.db}
              updateShowMood={this.props.updateShowMood}
              showMood={this.props.showMood}
            ></SelectMood>
          </>
        ) : (
          <MoodExp
            mood={this.props.mood}
            getExp={this.props.getExp}
            getTags={this.props.getTags}
            pageTransition={this.props.pageTransition}
            pageVariants={this.props.pageVariants}
            getMoodClicked={this.props.getMoodClicked}
            dateMoodWasLastEntered={this.props.dateMoodWasLastEntered}
            allMoods={this.props.allMoods}
            addToAllMoods={this.props.addToAllMoods}
            fetchData={this.props.fetchData}
            pushMoodToDb={this.props.pushMoodToDb}
            removeAllMoods={this.props.removeAllMoods}
            db={this.props.db}
            updateShowMood={this.props.updateShowMood}
            showMood={this.props.showMood}
          />
        )}
      </>
    );
  }
}
