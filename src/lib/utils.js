export function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  const pad = (num, size) => String(num).padStart(size, '0');

  return `${pad(minutes, 2)}:${pad(seconds, 2)}:${pad(milliseconds, 3)}`;
}
