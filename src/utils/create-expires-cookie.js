export default function createExpiresCookie(minutes) {
  const millisecondsInSeconds = 1000;
  const secondsInMinutes = 60;
  const milliseconds = minutes * millisecondsInSeconds * secondsInMinutes;
  const date = new Date(Date.now() + milliseconds);
  return date;
}
