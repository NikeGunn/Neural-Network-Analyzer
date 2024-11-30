export const processLayer = (
  inputValues: number[],
  weights: number[]
): number => {
  return inputValues.reduce((sum, value, index) => {
    return sum + value * weights[index];
  }, 0);
};

export const sigmoid = (x: number): number => {
  return 1 / (1 + Math.exp(-x));
};