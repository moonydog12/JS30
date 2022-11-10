# Hangman game

![image](../assets/image/hangman.jpg)

Select a letter to figure out a hidden word in a set amount of chances

## Project Specifications

- Display hangman pole and figure using SVG
- Generate a random word
- Display word in UI with correct letters
- Display wrong letters
- Show notification when select a letter twice
- Show popup on win or lose
- Play again button to reset game

## Note

**Display hangman pole and figure using SVG :**

SVG is used to define vector-based graphics for the Web(in XML format).

USe it in HTML to draw the hangman figure.

```html
<svg height="250" width="200" class="figure-container">
  <!-- SVG Rod -->
  // some HTML codes ...
  <!-- Head -->
  // some HTML codes ...
  <!-- Body -->
  // some HTML codes ...
  <!-- Arms -->
  // some HTML codes ...
  <!-- Legs -->
  // some HTML codes ...
</svg>
```

**Generate a random word:**

Define an array to store the word used in our game, we could manually add new words in the array or use some API to fetch new one.

```js
const words = ['apple', 'banana', 'cat', 'dog', 'wizard', 'programming', 'javascript'];

// randomly choose word from the array
let selectedWord = words[Math.floor(Math.random() * words.length)];
```

**Display word in UI with correct letters :**

```js
const displayWord = () => {
  // split the word to array & check if each letter is included
  // if letter is included,render it to the UI
  wordEl.innerHTML = `
  ${selectedWord
    .split('')
    .map(
      (letter) =>
        `<span class="word-letter">${correctLetters.includes(letter) ? letter : ''}</span>`,
    )
    .join('')}
  `;
  // Check if the words matched final answer,
  // if it did,pop the winner modal
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    message.textContent = 'You won!';
    popup.style.display = 'flex';
  }
};
```

**Display wrong letters:**

```js
const updateWrongLettersEl = () => {
  // Display wrong letters on the UI
  wrongLettersEl.innerHTML = `${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

  // Process the hangman drawing each wrong guess
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    const partEl = part;
    if (index < errors) {
      partEl.style.display = 'block';
    } else {
      partEl.style.display = 'none';
    }
  });

  // Check if lost, if so pop the modal
  if (wrongLetters.length === figureParts.length) {
    message.innerText = 'Unfortunately you lost.';
    popup.style.display = 'flex';
  }
};
```

**Show notification when select a letter twice:**

An utility function to tell user if they guess the same letter more than one time

```js
const showNotification = () => {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 1000);
};
```

**Listen user keydown events**

```js
window.addEventListener('keydown', (e) => {
  const letter = e.key;
  // Check if the key is letter
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    if (selectedWord.includes(letter)) {
      // if the letter not exist in the array, add it and update UI
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    }
    // if the key was wrong, add it to wrong array
    else if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
      updateWrongLettersEl();
    } else {
      showNotification();
    }
  }
});
```

**Restart game**

```js
playAgainBtn.addEventListener('click', () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  // Regenerate new word for game
  selectedWord = words[Math.floor(Math.random() * words.length)];

  // Render UI
  displayWord();
  updateWrongLettersEl();
  popup.style.display = 'none';
});
```

## Summary

> [MDN - SVG tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
