const wordEl = document.querySelector('.word');
const wrongLettersEl = document.querySelector('.wrong-letters');
const playAgainBtn = document.querySelector('.popup-button');
const popup = document.querySelector('.popup-container');
const notification = document.querySelector('.notification-container');
const message = document.querySelector('.message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['apple', 'banana', 'cat', 'dog', 'wizard', 'programming', 'javascript'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show the hidden word
const displayWord = () => {
  wordEl.innerHTML = `
  ${selectedWord
    .split('')
    .map(
      (letter) =>
        `<span class="word-letter">${correctLetters.includes(letter) ? letter : ''}</span>`,
    )
    .join('')}
  `;
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    message.textContent = 'You won!';
    popup.style.display = 'flex';
  }
};
// Update the wrong letters
const updateWrongLettersEl = () => {
  // Display wrong letters
  wrongLettersEl.innerHTML = `${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    const partEl = part;
    // Display parts
    if (index < errors) {
      partEl.style.display = 'block';
    } else {
      partEl.style.display = 'none';
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    message.innerText = 'Unfortunately you lost.';
    popup.style.display = 'flex';
  }
};

// Show notification
const showNotification = () => {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 1000);
};
// Keydown letter press

window.addEventListener('keydown', (e) => {
  const letter = e.key;
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
      updateWrongLettersEl();
    } else {
      showNotification();
    }
  }
});

// Restart game
playAgainBtn.addEventListener('click', () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();
  popup.style.display = 'none';
});

displayWord();
