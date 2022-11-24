const word = document.querySelector('.word');
const text = document.querySelector('#text');
const scoreEl = document.querySelector('#score');
const timeEl = document.querySelector('#time');
const endgameEl = document.querySelector('.end-game-container');
const settingBtn = document.querySelector('#setting-btn');
const setting = document.querySelector('#setting');
const settingForm = document.querySelector('#setting__form');
const difficultySelect = document.querySelector('#difficulty');
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

// Init variables
let chosenWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem('difficulty') ?? 'medium';
difficultySelect.value = difficulty;

text.focus();

// If the game is over,show end screen
const gameOver = () => {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button id="reload-btn">Reload</button>
  `;
  endgameEl.style.display = 'flex';
};

// Start counting down
const updateTime = () => {
  time -= 1;
  timeEl.innerHTML = `${time}s`;

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
};

// Set the initial timer
let timeInterval = setInterval(updateTime, 1000);

// Generate random word form words array and add to DOM
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const addWordToDOM = () => {
  chosenWord = getRandomWord();
  word.innerHTML = chosenWord;
};

const updateScore = () => {
  score += 1;
  scoreEl.innerHTML = score;
};

// Init game setting
const init = () => {
  score = 0;
  time = 10;
  difficulty = localStorage.getItem('difficulty') ?? 'medium';
  addWordToDOM();
  updateScore();
  updateTime();
  timeInterval = setInterval(updateTime, 1000);
  endgameEl.style.display = 'none';
};

// Listener
text.addEventListener('input', (event) => {
  const input = event.target;
  const insertedText = input.value;

  if (insertedText === chosenWord) {
    addWordToDOM();
    updateScore();

    // Clear input field
    input.value = '';
    if (difficulty === 'hard') {
      time += 1;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

// Setting button clicked
settingBtn.addEventListener('click', () => {
  setting.classList.toggle('hide');
});

// Setting select
settingForm.addEventListener('change', (event) => {
  difficulty = event.target.value;
  localStorage.setItem('difficulty', difficulty);
});

endgameEl.addEventListener('click', (e) => {
  const id = e.target.getAttribute('id');
  if (id === 'reload-btn') {
    init();
  }
});

addWordToDOM();
