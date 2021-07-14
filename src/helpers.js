export const convertNumToEmotion = (num) => {
  num = parseFloat(num);
  if (num === 1) {
    return "Extremely Sad";
  } else if (num === 2) {
    return "Sad";
  } else if (num === 3) {
    return "Neutral";
  } else if (num === 4) {
    return "Happy";
  } else if (num === 5) {
    return "Extremely Happy";
  }
};

function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

export const findMostCommonTag = (allMoods, month) => {
  if (allMoods.length > 0) {
    var arr = [];
    if (month === "allTime") {
      for (let i = 0; i < allMoods.length; i++) {
        for (let j = 0; j < allMoods[i].tags.length; j++) {
          arr.push(allMoods[i].tags[j]);
        }
      }
    } else {
      for (let i = 0; i < month.length; i++) {
        for (let j = 0; j < month[i].length; j++) {
          arr.push(month[i][j]);
        }
      }
    }

    var a = [],
      b = [],
      prev;

    arr.sort();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== prev) {
        a.push(arr[i]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      prev = arr[i];
    }
    var result = [a, b];
    var index = indexOfMax(result[1]);
    var tag = result[0].splice(index, 1);
    var index2 = result[1].splice(index, 1);
    index2 = indexOfMax(result[1]);
    var tag2 = result[0].splice(index2, 1);
    return tag.length > 0 && tag2.length > 0 && month === "allTime"
      ? tag + ", " + tag2
      : tag.length > 0
      ? tag
      : "No tags selected yet.";
  }
};
