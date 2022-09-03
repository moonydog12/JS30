'use strict';

const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');

function setDate() {
  const now = new Date();
  // 秒針
  const seconds = now.getSeconds();
  const secondsDegrees = (seconds / 60) * 360 + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  // 分針
  const minutes = now.getMinutes();
  const minutesDegree = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
  minuteHand.style.transform = `rotate(${minutesDegree}deg)`;

  // 時針
  const hours = now.getHours();
  const hourDegree = (hours / 12) * 360 + (minutes / 60) * 30 + 90;
  hourHand.style.transform = `rotate(${hourDegree}deg)`;
}

// 每一秒執行一次 setDate
setInterval(setDate, 1000);
