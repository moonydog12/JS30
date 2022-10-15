'use strict';
const gameBoard = document.querySelector('.game');
const scoreBoard = document.querySelector('.score');
const waves = gameBoard.querySelectorAll('.wave');
const dolphins = gameBoard.querySelectorAll('.dolphin');
const startButton = document.querySelector('.startBtn');

let lastWave;
let timeUp = false;
let score = 0;

dolphins.forEach((dolphin) => dolphin.addEventListener('click', bonk));
startButton.addEventListener('click', startGame);

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomWave() {
  const idx = Math.floor(Math.random() * waves.length);
  const wave = waves[idx];
  // recursion
  if (wave === lastWave) {
    return getRandomWave();
  }
  lastWave = wave;
  return wave;
}

function jump() {
  const time = randomTime(200, 1000);
  const wave = getRandomWave();
  wave.classList.add('up');
  setTimeout(() => {
    wave.classList.remove('up');
    if (!timeUp) {
      jump();
    }
  }, time);
}

function startGame() {
  startButton.style.display = 'none';
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  jump();

  setTimeout(() => {
    timeUp = true;
    startButton.style.display = 'block';
  }, 10000);
}
