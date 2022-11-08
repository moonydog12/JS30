const wordEl = document.querySelector('.word');
const wrongLettersEl = document.querySelector('.wrong-letters');
const playAgainBtn = document.querySelector('.popup-button');
const popup = document.querySelector('.popup-container');
const notification = document.querySelector('.notification-container');
const message = document.querySelector('.message');
// const finalMessage = document.querySelector('');

// figure parts
const figureParts = document.querySelectorAll('.figure-part');

const words = ['apple', 'banana', 'cat', 'dog'];

const selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = ['c', 'a', 't'];
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
  console.log(wordEl.innerText, innerWord);
  if (innerWord === selectedWord) {
    message.textContent = 'You won!';
    popup.style.display = 'flex';
  }
};

displayWord();
