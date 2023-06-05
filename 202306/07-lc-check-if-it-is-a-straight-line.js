// LeetCode 1232. Check If It Is a Straight Line

const checkStraightLine = function (coordinates) {
  coordinates.sort((a, b) => {
    return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
  });
  const slope =
    (coordinates[1][1] - coordinates[0][1]) /
    (coordinates[1][0] - coordinates[0][0]);

  for (let i = 0; i < coordinates.length - 1; i++) {
    const newSlope =
      (coordinates[i + 1][1] - coordinates[i][1]) /
      (coordinates[i + 1][0] - coordinates[i][0]);
    if (newSlope !== slope) {
      return false;
    }
  }

  return true;
};
