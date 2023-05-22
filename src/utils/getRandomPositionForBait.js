import { getRandomPosition } from "./getRandomPosition";

export const getRandomPositionForBait = () => {
  const min = 1,
    max = 98;
  return [getRandomPosition(min, max), getRandomPosition(min, max)];
};
