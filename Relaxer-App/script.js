const container = document.querySelector('.container');
const text = document.querySelector('.text');

// Initialize timers
const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

const breathAnimation = () => {
  container.classList.remove('shrink');
  container.classList.add('grow');
  text.innerText = 'Breath In! 🫁';

  setTimeout(() => {
    text.innerText = 'Hold 🤛🏼';

    setTimeout(() => {
      text.innerText = 'Breath out! 🫁';
      container.classList.remove('grow');
      container.classList.add('shrink');
    }, holdTime);
  }, breatheTime);
};

breathAnimation();

setInterval(breathAnimation, totalTime);
