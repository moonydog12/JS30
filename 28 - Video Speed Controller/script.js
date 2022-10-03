'use strict';
const speed = document.querySelector('.speed');
const speedBar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');

speed.addEventListener('mousemove', handleSpeed);

function handleSpeed(e) {
  let percent = (e.pageY - this.offsetTop) / this.offsetHeight;
  let min = 0.4;
  let max = 4;
  let height = Math.round(percent * 100) + '%';
  let playbackRate = percent * (max - min) + min;
  speedBar.style.height = height;
  speedBar.textContent = playbackRate.toFixed(1) + 'x';
  video.playbackRate = playbackRate;
}
