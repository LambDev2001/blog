export const splitLabel = (input) => {
  return input
    .replace(/([A-Z])/g, " $1") //when uppercase, add space before
    .trim() // remove whitespace around
    .replace(/^\w/, (c) => c.toUpperCase()); //capitalize first letter
};
