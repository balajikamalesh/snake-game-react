import { getRandomPosition } from "./getRandomPosition";

export const getRandomPositionForObstacle = () => {
  let min = 6,
    max = 94;
  let x = getRandomPosition(min, max),
    y = getRandomPosition(min, max);

  return Math.random() > 0.5
    ? [
        [x, y],
        [x + 1, y],
        [x + 2, y],
        [x + 3, y],
        [x + 4, y],
        [x + 5, y],
      ]
    : [
        [x, y],
        [x, y + 1],
        [x, y + 2],
        [x, y + 3],
        [x, y + 4],
        [x, y + 5],
      ];
};
