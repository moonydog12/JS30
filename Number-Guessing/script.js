const msgEl = document.getElementById('msg');
const randomNumber = getRandomNumber();

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
  <div>You said:</div>
  <span class="box">${msg}</span>
  `;
}

// Cehck msg against number
function checkNumber(msg) {
  const num = +msg;

  // Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += '<div>That is not a valid number</div>';
    return;
  }

  // Check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
    return;
  }

  // Check number
  if (num === randomNumber) {
    document.body.innerHTML = `
    <h2>Congrats! You have guessed the number! <br/>It was ${num}</h2>
    <button class="pay-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNumber) {
    msgEl.innerHTML += '<div>GO LOWEr</div>';
  } else {
    msgEl.innerHTML += '<div>GO Higher</div>';
  }
}

// Capture user speak
function onSpeak(event) {
  const message = event.result[0][0].transcript;
  writeMessage(message);
  checkNumber(message);
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (event) => {
  if (event.target.id === 'play-again') {
    window.location.reload();
  }
});
