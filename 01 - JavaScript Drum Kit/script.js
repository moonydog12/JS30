const keys = document.querySelectorAll('.key');

const playSound = function playSoundAfterClick(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return; // 如果沒有該元素，停止執行function
  audio.currentTime = 0; // 讓每次按下按鍵，音效都重新計時
  audio.play();
  key.classList.toggle('playing');
};

const removeTransition = function removeTransition(e) {
  // 如果 propertyName 不是 transform 行為，略過它
  if (e.propertyName !== 'transform') return;
  // this 指向呼叫該行為的元素
  this.classList.remove('playing');
};

// Event Listeners
window.addEventListener('keydown', playSound);
keys.forEach((key) => key.addEventListener('transitionend', removeTransition));
