const year = document.getElementById('year');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const spinner = document.querySelector('.spinner');

const currentYear = new Date().getFullYear();

// Set background year
year.innerHTML = currentYear + 1;
const PER_SECOND = 1000;

// Append value to DOM
const InsertToDOM = (day, hour, minute, second) => {
  // Append value to DOM
  daysEl.innerHTML = day;
  hoursEl.innerHTML = hour < 10 ? `0${hour}` : hour;
  minutesEl.innerHTML = minute < 10 ? `0${minute}` : minute;
  secondsEl.innerHTML = second < 10 ? `0${second}` : second;
};

// Update countdown time
const updateCountdown = () => {
  const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
  const currentTime = new Date();
  const deviation = newYearTime - currentTime;
  const HOUR_PER_DAY = 24;
  const MINUTE_PER_HOUR = 60;
  const SECOND_PER_MINUTE = 60;

  const day = Math.floor(
    deviation / PER_SECOND / SECOND_PER_MINUTE / MINUTE_PER_HOUR / HOUR_PER_DAY,
  );
  const hour =
    Math.floor(deviation / PER_SECOND / SECOND_PER_MINUTE / MINUTE_PER_HOUR) % HOUR_PER_DAY;
  const minute = Math.floor(deviation / PER_SECOND / SECOND_PER_MINUTE) % MINUTE_PER_HOUR;
  const second = Math.floor(deviation / PER_SECOND) % SECOND_PER_MINUTE;

  InsertToDOM(day, hour, minute, second);
};

// Show spinner before countdown
setTimeout(() => {
  spinner.remove();
  countdown.style.display = 'grid';
}, 2 * PER_SECOND);

// Countdown every second
setInterval(updateCountdown, PER_SECOND);
