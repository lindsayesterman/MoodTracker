export const convertNumToEmotion = (num) => {
  num = parseFloat(num);
  if (num === 1) {
    return "Extremely sad";
  } else if (num === 2) {
    return "Sad";
  } else if (num === 3) {
    return "Neutral";
  } else if (num === 4) {
    return "Happy";
  } else if (num === 5) {
    return "Extremely happy";
  }
};

export const getDaysInMonth = () => {
  var now = new Date();
  var days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  var arrayOfDays = [];
  for (let i = 1; i <= days; i++) {
    arrayOfDays.push(i);
  }
  return arrayOfDays;
};

export const getWeekData = (allMoods) => {
  let curr = new Date();
  let weekData = [];
  let week = [];
  let indexes = [];

  for (let i = 0; i < 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    week.push(day);
    weekData.push(null);
  }
  for (let i = 0; i < allMoods.length; i++) {
    for (let j = 0; j < week.length; j++) {
      if (allMoods[i].date === week[j]) {
        indexes.push(j);
      }
    }
  }
  for (let i = 0; i < indexes.length; i++) {
    for (let j = 0; j < week.length; j++) {
      if (indexes[i] === j) {
        weekData.splice(j, 1, allMoods[i].feeling);
      }
    }
  }
  return weekData;
};

export const getMonthData = (allMoods) => {
  var month = new Date().getMonth();
  var year = new Date().getFullYear();
  var date = new Date(year, month, 1);
  var days = [];
  let indexes = [];
  var monthData = [];

  while (date.getMonth() === month) {
    days.push(date.toISOString().slice(0, 10));
    date.setDate(date.getDate() + 1);
    monthData.push(null);
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
      }
    }
  }
  return monthData;
};

export const getYearlyAverages = (allMoods) => {
  var year = new Date().getFullYear();
  var date = new Date(year, 0, 1);
  var days = [];
  var yearData = [];
  var indexes = [];
  while (date.getYear() + 1900 === year) {
    days.push(date.toISOString().slice(0, 10));
    date.setDate(date.getDate() + 1);
    yearData.push(null);
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
      }
    }
  }
  var yearAverages = [];
  var month = 0;
  var total = 0;
  var count = 0;
  while (date.getMonth() === month) {
    total += yearData[count];
    count++;
    date.setDate(date.getDate() + 1);
    if (date.getMonth() !== month) {
      month++;
      yearAverages.push(total / getDaysInMonth().length);
      total = 0;
    }
  }
  return yearAverages;
};