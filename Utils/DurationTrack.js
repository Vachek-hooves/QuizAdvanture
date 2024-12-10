// add where quiz begins
export const startQuizTime = () => {
  return Date.now();
};

// add where quiz finished.
export const calculateDuration = startTime => {
  const endTime = Date.now();
  const durationInSeconds = Math.floor((endTime - startTime) / 1000);
  return durationInSeconds;
};
