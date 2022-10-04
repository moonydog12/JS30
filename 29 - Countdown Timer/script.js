'use strict';
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
let countdown;

buttons.forEach((button) => {
  button.addEventListener('click', startTimer);
});

document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});

function timer(seconds) {
  // 清除現有的計時器
  clearInterval(countdown);

  let now = Date.now();
  let then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    let secondsLeft = Math.round((then - Date.now()) / 1000);
    // 檢查是否需要停止執行
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function startTimer() {
  let seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function displayTimeLeft(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  let display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
  console.log({ minutes, remainderSeconds });
}

function displayEndTime(timestamp) {
  let end = new Date(timestamp);
  let hour = end.getHours();
  let minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}
