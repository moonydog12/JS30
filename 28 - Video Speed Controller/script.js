const speed = document.querySelector('.speed');
const speedBar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');

const controlSpeed = function handleSpeed(e) {
  const percent = (e.pageY - this.offsetTop) / this.offsetHeight;
  const min = 0.4;
  const max = 4;
  const height = `${Math.round(percent * 100)}%`;
  const playbackRate = percent * (max - min) + min;
  speedBar.style.height = height;
  speedBar.textContent = `${playbackRate.toFixed(1)}x`;
  video.playbackRate = playbackRate;
};

speed.addEventListener('mousemove', controlSpeed);
