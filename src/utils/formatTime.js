export default function formatTime(seconds) {
  // Less than a minute
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);

  // Less than 5 minutes
  if (seconds < 300) {
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  // less than an hour
  if (seconds < 3600) {
    return `${minutes}m`;
  }

  // longer than an hour
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

// console.log(formatTime(40)); // 40s

// console.log(formatTime(140)); // 2m 20s

// console.log(formatTime(600)); // 10m

// console.log(formatTime(7260)); // 2h 1m
