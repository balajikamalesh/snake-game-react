export const getRandomPosition = (min, max) => {
  return Math.floor((Math.random() * (min + (max - min + 1))) / 2) * 2;
};
