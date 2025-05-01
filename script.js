let startTime;
let elapsedTime = 0;
let timerInterval;

function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById('clock').textContent = timeString;
  requestAnimationFrame(updateClock);
}
updateClock();

function startStopwatch() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      displayTime(elapsedTime);
    }, 10);
  }
}

function stopStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  displayTime(elapsedTime);
  document.getElementById('laps').innerHTML = '';
}

function displayTime(ms) {
  const milliseconds = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  const formatted = 
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
  document.getElementById('stopwatch').textContent = formatted;
}

function pad(unit) {
  return unit.toString().padStart(2, '0');
}

function recordLap() {
  if (!elapsedTime) return;
  const lapTime = document.createElement('div');
  lapTime.textContent = document.getElementById('stopwatch').textContent;
  document.getElementById('laps').appendChild(lapTime);
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}
