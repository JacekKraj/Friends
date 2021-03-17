export const getPath = (paths) => {
  let correctPath;
  for (const value in paths) {
    if (paths[value]) {
      correctPath = `${[value]}s/${paths[value]}`;
    }
  }
  return correctPath;
};
