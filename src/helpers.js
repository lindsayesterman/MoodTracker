export const findMostCommonMood = (allMoods) => {
  for (let i = 0; i < allMoods.length; i++) {
    allMoods.sort((x, y) => x - y);

    var bestStreak = 1;
    var bestElem = allMoods[0];
    var currentStreak = 1;
    var currentElem = allMoods[0];

    for (let i = 1; i < allMoods.length; i++) {
      if (allMoods[i - 1].feeling !== allMoods[i].feeling) {
        if (currentStreak > bestStreak) {
          bestStreak = currentStreak;
          bestElem = currentElem;
        }

        currentStreak = 0;
        currentElem = allMoods[i];
      }

      currentStreak++;
    }

    return currentStreak > bestStreak ? currentElem : bestElem;
  }
};
