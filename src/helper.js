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
