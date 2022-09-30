const pressedKeys = [];
const modal = document.querySelector('h1');
let secretCode = 'batman';

window.addEventListener('keyup', (e) => {
  pressedKeys.push(e.key);
  let keySecret = pressedKeys.slice(-secretCode.length, pressedKeys.length).join('');
  if (keySecret === secretCode) {
    modal.classList.add('active');
  }
});
