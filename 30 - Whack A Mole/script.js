const gameBoard = document.querySelector('.game');
const scoreBoard = document.querySelector('.score');
const waves = gameBoard.querySelectorAll('.wave');
const dolphins = gameBoard.querySelectorAll('.dolphin');
const startButton = document.querySelector('.startBtn');

let lastWave;
let timeUp = false;
let score = 0;

const bonk = function bonkTheMole(e) {
  if (!e.isTrusted) return;
  score += 1;
  this.classList.remove('up');
  scoreBoard.textContent = score;
};

const randomTime = (min, max) => Math.round(Math.random() * (max - min) + min);

const getRandomWave = function getWave() {
  const idx = Math.floor(Math.random() * waves.length);
  const wave = waves[idx];
  // recursion
  if (wave === lastWave) {
    return getRandomWave();
  }
  lastWave = wave;
  return wave;
};

const jump = function activateSvgJump() {
  const time = randomTime(200, 1000);
  const wave = getRandomWave();
  wave.classList.add('up');
  setTimeout(() => {
    wave.classList.remove('up');
    if (!timeUp) {
      jump();
    }
  }, time);
};

const startGame = function startAnewGame() {
  startButton.style.display = 'none';
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  jump();

  setTimeout(() => {
    timeUp = true;
    startButton.style.display = 'block';
  }, 10000);
};

// Event Listeners
dolphins.forEach((dolphin) => dolphin.addEventListener('click', bonk));
startButton.addEventListener('click', startGame);
