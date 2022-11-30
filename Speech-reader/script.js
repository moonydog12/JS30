const main = document.querySelector('main');
const voiceSelect = document.querySelector('.voices');
const textArea = document.querySelector('.text__area');
const readBtn = document.querySelector('.btn--read');
const toggleBtn = document.querySelector('.btn--toggle');
const closeBtn = document.querySelector('.btn--close');

// Init speech synth
const message = new SpeechSynthesisUtterance();
let voices = [];

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

// Speak text
const speakText = () => {
  speechSynthesis.speak(message);
};

// Set text
const setTextMessage = (text) => {
  message.text = text;
};

// Create speech boxes
const createBox = (item) => {
  const box = document.createElement('div');
  const { image, text } = item;
  box.classList.add('box');
  box.innerHTML = `
  <img src="${image}" alt="${text}">
  <p class="info">${text}</p>
  `;

  // Speak event
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effective
    box.classList.add('active');
    setTimeout(() => {
      box.classList.remove('active');
    }, 500);
  });

  main.appendChild(box);
};

data.forEach(createBox);

// Store voices
const getVoices = () => {
  voices = speechSynthesis.getVoices();
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

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle dropdown text box
toggleBtn.addEventListener('click', () => {
  document.querySelector('.text__box').classList.toggle('show');
});

// Close button
closeBtn.addEventListener('click', () => {
  document.querySelector('.text__box').classList.remove('show');
});

// Change voice
voiceSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textArea.value);
  speakText();
});

getVoices();
