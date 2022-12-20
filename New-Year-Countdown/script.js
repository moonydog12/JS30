const year = document.getElementById('year');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdown = document.getElementById('countdown');

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

// Set background year
year.innerHTML = currentYear + 1;

// Update countdown time
const updateCountdown = () => {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;
  const HOUR_PER_DAY = 24;
  const MINUTE_PER_HOUR = 60;
  const SECOND_PER_MINUTE = 60;
  const MILLISECONDS = 1000;

  const day = Math.floor(diff / MILLISECONDS / SECOND_PER_MINUTE / MINUTE_PER_HOUR / HOUR_PER_DAY);
  const hour = Math.floor(diff / MILLISECONDS / SECOND_PER_MINUTE / MINUTE_PER_HOUR) % HOUR_PER_DAY;
  const minute = Math.floor(diff / MILLISECONDS / SECOND_PER_MINUTE) % MINUTE_PER_HOUR;
  const second = Math.floor(diff / MILLISECONDS) % SECOND_PER_MINUTE;

  // Append value to DOM
  daysEl.innerHTML = day;
  hoursEl.innerHTML = hour < 10 ? `0${hour}` : hour;
  minutesEl.innerHTML = minute < 10 ? `0${minute}` : minute;
  secondsEl.innerHTML = second < 10 ? `0${second}` : second;
};

// Show spinner before countdown
setTimeout(() => {
  // todo:Implement lading animation

  countdown.style.display = 'flex';
}, 1000);

// Countdown every second
setInterval(updateCountdown, 1000);
