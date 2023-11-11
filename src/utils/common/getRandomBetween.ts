export const getRandomBetween = (start = 1, end = 10) => {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};
