# Speech Text Reader

![image](../assets/image/text-reader.jpg)

A text to speech app for non-verbal people. Pre-made buttons and custom text speech. This project uses the Web Speech API

## Project Specifications

- Create responsive UI (CSS Grid) with picture buttons
- Speaks the text when button clicked
- Drop down custom text to speech
- Speaks the text typed in
- Change voices and accents

## Note

**Responsive UI :**

Using CSS Grid to build the layout of buttons. `@media` syntax creates breakpoints which display different layouts according browser viewport.

```css
main {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

@media (max-width: 760px) {
  main {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1100px) {
    main {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 500px) {
    main {
      grid-template-columns: 1fr;
    }
  }
}
```

💡 Reference :

> [CSS trick - A complete guide to CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
>
> [MDN - CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid)

**Speaks the text when button clicked :**

To use `Web Speech API`, we must create a new `SpeechSynthesisUtterance` object.

```js
// 1) Init speech SpeechSynthesisUtterance object
const message = new SpeechSynthesisUtterance();

// 2) Set text
const setTextMessage = (text) => {
  message.text = text;
};

// 3) Set the speaking event
const speakText = () => {
  speechSynthesis.speak(message);
};

// Create speech boxes dynamically
const createBox = (item) => {
  const box = document.createElement('div');
  const { image, text } = item;
  box.classList.add('box');
  box.innerHTML = `
  <img src="${image}" alt="${text}">
  <p class="info">${text}</p>
  `;

  // Binding click event for each box
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();
  });
};
```

💡 Reference :

> [Speech-Synthesis](https://github.com/moonydog12/JavaScript-Armory/tree/main/Speech-Synthesis)

**Drop down custom text to speech :**

```js
// Toggle dropdown text box
toggleBtn.addEventListener('click', () => {
  document.querySelector('.text__box').classList.toggle('show');
});
```

```css
/* style.css */
.text__box {
  /* Hide the textbox when users load the page */
  transform: translate(-50%, -800px);
  transition: all 1s ease-in-out;
}

.text__box.show {
  transform: translate(-50%, 0);
}
```

**Speaks the text typed in textarea:**

```js
readBtn.addEventListener('click', () => {
  setTextMessage(textArea.value);
  speakText();
});
f;
```

**Change voices and accents :**

```js
const getVoices = () => {
  voices = speechSynthesis.getVoices();

  // Append voice data to generated option element
  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voiceSelect.appendChild(option);
  });
};

// Set voice
const setVoice = (event) => {
  message.voice = voices.find((voice) => voice.name === event.target.value);
};

// Bind voices changed event
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Bind the change event for select element
voiceSelect.addEventListener('change', setVoice);
```

## Summary

**Key points**

- CSS grid
- Web Speech API