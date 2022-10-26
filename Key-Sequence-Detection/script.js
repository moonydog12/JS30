const pressedKeys = [];
const modal = document.querySelector('h1');
const secretCode = 'batman';

window.addEventListener('keyup', (e) => {
  pressedKeys.push(e.key);
  const keySecret = pressedKeys.slice(-secretCode.length, pressedKeys.length).join('');
  if (keySecret === secretCode) {
    modal.classList.add('active');
  }
});
