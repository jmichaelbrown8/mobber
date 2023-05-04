export const formatTime = (seconds: number) => {
  // pull negative
  let multiplier = 1;
  if (seconds < 0) {
    multiplier = -1;
    seconds *= multiplier;
  }

  // Less than a minute
  if (seconds < 60) {
    return `${seconds * multiplier}s`;
  }

  const minutes = Math.floor(seconds / 60);

  // Less than 5 minutes
  if (seconds < 300) {
    const remainingSeconds = seconds % 60;
    return `${minutes * multiplier}m ${remainingSeconds}s`;
  }

  // less than an hour
  if (seconds < 3600) {
    return `${minutes * multiplier}m`;
  }

  // longer than an hour
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours * multiplier}h ${remainingMinutes}m`;
};
