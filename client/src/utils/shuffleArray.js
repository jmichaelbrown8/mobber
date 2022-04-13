export default function shuffleArray(array) {
  const multiplier = array.length;
  if (multiplier <= 1) {
    return array;
  }
  const randomIndex = Math.floor(Math.random() * multiplier);
  return [
    array[randomIndex],
    ...shuffleArray(
      array.slice(0, randomIndex).concat(array.slice(randomIndex + 1))
    ),
  ];
}
