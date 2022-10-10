'use strict';
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

let lastHole;
let timeUp = false;
let score = 0;
moles.forEach((mole) => mole.addEventListener('click', bonk));
function bonk(e) {
  if (!e.isTrusted) {
    return;
  }
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

// 取隨機時間
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole() {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  // recursion
  if (hole === lastHole) {
    return randomHole();
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole();
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) {
      peep();
    }
  }, 800);
}

function startGame(params) {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();

  setTimeout(() => {
    timeUp = true;
  }, 10000);
}
