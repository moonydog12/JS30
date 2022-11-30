# Speed Typer Typing Game

![image](../assets/image/type-racer.jpg)

Game to beat the clock by typing random words

## Project Specifications

- Create game UI including a difficulty setting
- Generate random word and place in DOM
- Score increase after word is typed
- Implement timer
- Add certain amount of time after word is typed based on difficulty
- Store difficulty setting in local storage

## Note

### Script

**Generate random word and place in DOM :**

```js
// Return a randomly chosen word from words array
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const addWordToDOM = () => {
  chosenWord = getRandomWord();
  word.innerHTML = chosenWord;
};
```

**Score increase after word is typed :**

```js
// Listen the input event (whenever use type something into input field)
text.addEventListener('input', (event) => {
  // (1) Store the current value in input field
  const insertedText = event.target.value;

  // (2) Compare user input and chosen word
  if (insertedText === chosenWord) {
    // (3) If words matched, render new word & add score
    addWordToDOM();
    updateScore();

    // Clear input field
    event.target.value = '';
    if (difficulty === 'hard') {
      time += 1;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }
    // (4) Add time according to difficulty
    updateTime();
  }
});
```

**Implement timer**

The `setInterval()` method, repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.

```js
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
let timeInterval = setInterval(updateTime(), 1000);
```

**Store difficulty setting in local storage :**

```js
// Listen for the select input's change event
settingForm.addEventListener('change', (event) => {
  // event target now points to the select input
  difficulty = event.target.value;
  localStorage.setItem('difficulty', difficulty);
});
```

## Summary

**Key points**

- Use `setInterval`/`setTimeout` function to execute async tasks eg. set a timer
- Listen different event with different element eg. `change` event of select input, `input` event of text input

**Reference :**

[javascript.info - Scheduling](https://javascript.info/settimeout-setinterval)
