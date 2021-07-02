export const findMostCommonMood = (moods) => {
  for (let i = 0; i < moods.length; i++) {
    moods.sort((x, y) => x - y);

    var bestStreak = 1;
    var bestElem = moods[0];
    var currentStreak = 1;
    var currentElem = moods[0];

    for (let i = 1; i < moods.length; i++) {
      if (moods[i - 1].feeling !== moods[i].feeling) {
        if (currentStreak > bestStreak) {
          bestStreak = currentStreak;
          bestElem = currentElem;
        }

        currentStreak = 0;
        currentElem = moods[i];
      }

      currentStreak++;
    }

    return currentStreak > bestStreak ? currentElem : bestElem;
  }
};
